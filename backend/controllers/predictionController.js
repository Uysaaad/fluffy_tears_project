import * as tf from "@tensorflow/tfjs-node";
import fetch from "node-fetch";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const MODEL_URL = `file://${path.resolve(
  __dirname,
  "../tfjs_model/model.json"
)}`;
const VOCAB_URL = "http://localhost:8000/tokenizer/vocab.txt";
const CONFIG_URL = "http://localhost:8000/tokenizer/tokenizer_config.json";

let model;
let vocab;
let tokenizerConfig;

const loadModel = async () => {
  if (!model) {
    model = await tf.loadGraphModel(MODEL_URL);
  }
  return model;
};

const loadVocab = async () => {
  if (!vocab) {
    const response = await fetch(VOCAB_URL);
    const text = await response.text();
    vocab = text.split("\n").reduce((acc, token, index) => {
      acc[token.trim()] = index;
      return acc;
    }, {});
  }
  return vocab;
};

const loadTokenizerConfig = async () => {
  if (!tokenizerConfig) {
    const response = await fetch(CONFIG_URL);
    tokenizerConfig = await response.json();
  }
  return tokenizerConfig;
};

const tokenize = (text, tokenizerConfig, vocab) => {
  const doLowerCase = tokenizerConfig.do_lower_case;
  const clsToken = vocab[tokenizerConfig.cls_token];
  const sepToken = vocab[tokenizerConfig.sep_token];
  const unkToken = vocab[tokenizerConfig.unk_token];

  const words = text.split(" ");
  const tokens = words.map((word) => {
    const processedWord = doLowerCase ? word.toLowerCase() : word;
    return vocab[processedWord] !== undefined ? vocab[processedWord] : unkToken;
  });

  tokens.unshift(clsToken);
  tokens.push(sepToken);

  return {
    input_ids: tokens,
    attention_mask: new Array(tokens.length).fill(1),
  };
};

export const predictEmotion = async (req, res) => {
  const { content } = req.body;

  try {
    const model = await loadModel();
    const vocab = await loadVocab();
    const tokenizerConfig = await loadTokenizerConfig();

    const input = tokenize(content, tokenizerConfig, vocab);
    const inputTensor = tf.tensor2d(
      [input.input_ids],
      [1, input.input_ids.length],
      "int32"
    );
    const attentionMaskTensor = tf.tensor2d(
      [input.attention_mask],
      [1, input.attention_mask.length],
      "int32"
    );

    const predictions = model.execute({
      input_ids: inputTensor,
      attention_mask: attentionMaskTensor,
    });
    const probabilities = predictions.softmax().dataSync();

    const emotionLabels = ["anger", "fear", "joy", "sadness"];
    const response = emotionLabels.map((label, index) => ({
      label,
      probability: probabilities[index],
    }));

    res.status(200).json({ success: true, data: response });
  } catch (error) {
    console.error("Prediction error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};
