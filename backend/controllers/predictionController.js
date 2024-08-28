// https://www.tensorflow.org/js/tutorials

import * as tf from "@tensorflow/tfjs-node";
import fetch from "node-fetch";
import path from "path";
import { fileURLToPath } from "url";
import spellchecker from "spellchecker";

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
    //  Splits the text into an array of lines.
    // Transforms this array into an object.
    vocab = text.split("\n").reduce((acc, token, index) => {
      acc[token.trim()] = index;
      return acc;
    }, {});
  }
  return vocab;
};

// Define an asynchronous function to load the tokenizer configuration
const loadTokenizerConfig = async () => {
  if (!tokenizerConfig) {
    // If not loaded, fetch the configuration from the specified URL
    const response = await fetch(CONFIG_URL);
    // Parse the JSON response and store it in the tokenizerConfig variable
    tokenizerConfig = await response.json();
  }
  // Return the tokenizer configuration (either freshly loaded or from cache)
  return tokenizerConfig;
};

const correctSpelling = (text) => {
  return text
    .split(" ")
    .map((word) => {
      if (spellchecker.isMisspelled(word)) {
        const corrections = spellchecker.getCorrectionsForMisspelling(word);
        if (corrections.length > 0) {
          return corrections[0];
        }
      }
      return word;
    })
    .join(" ");
};

// Convert text into tokens suitable for the model
const tokenize = (text, tokenizerConfig, vocab) => {
  // Convert all text to lowercase based on config
  const doLowerCase = tokenizerConfig.do_lower_case;
  // Get special tokens from the vocabulary using config
  const clsToken = vocab[tokenizerConfig.cls_token]; // Classification token
  const sepToken = vocab[tokenizerConfig.sep_token]; // Separator token
  const unkToken = vocab[tokenizerConfig.unk_token]; // Unknown token

  const words = text.split(" ");
  // Convert each word to its token ID
  const tokens = words.map((word) => {
    const processedWord = doLowerCase ? word.toLowerCase() : word;
    return vocab[processedWord] !== undefined ? vocab[processedWord] : unkToken;
  });

  // Add classification token at the start
  tokens.unshift(clsToken);
  // Add separator token at the end
  tokens.push(sepToken);
  // Return the tokens and attention mask
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

    // Correct spelling before tokenization
    const correctedContent = correctSpelling(content);
    // Convert the corrected text to tokens
    const input = tokenize(correctedContent, tokenizerConfig, vocab);
    // Create a 2D tensor from the token IDs
    const inputTensor = tf.tensor2d(
      [input.input_ids],
      [1, input.input_ids.length],
      "int32"
    );
    // Create a 2D tensor from the attention mask
    const attentionMaskTensor = tf.tensor2d(
      [input.attention_mask],
      [1, input.attention_mask.length],
      "int32"
    );

    // Run the model to get predictions
    const predictions = model.execute({
      input_ids: inputTensor,
      attention_mask: attentionMaskTensor,
    });
    // Convert raw predictions to probabilities
    const probabilities = predictions.softmax().dataSync();
    // Define the emotion labels
    const emotionLabels = ["anger", "fear", "joy", "sadness"];
    // Create the response by mapping probabilities to labels
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
