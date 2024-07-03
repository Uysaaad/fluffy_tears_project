import React from "react";
import { RiDeleteBinLine } from "react-icons/ri";

const EmotionGalleryItem = ({ emotion, handleDelete, isLeft }) => {
  const { _id, text, emotion: emotionType, illustration, createdAt } = emotion;
  const formattedDate = createdAt
    ? new Date(createdAt).toLocaleDateString()
    : "Unknown date";

  return (
    <div
      className={`flex items-center w-full my-8 ${
        isLeft ? "justify-start" : "justify-end"
      } relative`}
    >
      <div className={`w-1/2 px-4 ${isLeft ? "text-right" : "text-left"}`}>
        <div className="font-quicksand bg-white bg-opacity-10 backdrop-filter backdrop-saturate-150 backdrop-blur-xl shadow-lg p-6 rounded-lg shadow-lg">
          <span
            className={`text-sm font-medium inline-block mb-2 px-2 py-1 rounded ${getColor(
              emotionType
            )}`}
          >
            {emotionType}
          </span>
          <time className="block text-xs text-gray-500 mb-2">
            {formattedDate}
          </time>
          <p className="text-sm mb-4">{text}</p>
          <img
            src={illustration}
            alt={`Illustration for ${emotionType}`}
            className="w-full rounded-lg"
          />
          <button
            onClick={() => handleDelete(_id)}
            className="mt-2 text-gray-500 py-2 px-4 rounded"
          >
            <RiDeleteBinLine />
          </button>
        </div>
      </div>
      <span className="w-4 h-4 bg-white border-2 border-gray-200 rounded-full absolute left-1/2 transform -translate-x-1/2"></span>
    </div>
  );
};

const getColor = (emotionType) => {
  switch (emotionType) {
    case "anger":
      return "bg-[#FE6F9A] text-black";
    case "joy":
      return "bg-[#FFFF63] text-black";
    case "fear":
      return "bg-[#85E64F] text-black";
    case "sadness":
      return "bg-[#BFC3E6] text-black";
    default:
      return "bg-gray-500 text-white";
  }
};

export default EmotionGalleryItem;
