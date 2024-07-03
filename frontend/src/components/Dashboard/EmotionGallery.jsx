import React, { useEffect, useState } from "react";
import { BASE_URL } from "../../config";
import { toast } from "react-toastify";
import HashLoader from "react-spinners/HashLoader";
import EmotionGalleryItem from "./EmotionGalleryItem"; // Ensure this path is correct

const EmotionGallery = () => {
  const [emotions, setEmotions] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchEmotions = async () => {
      setLoading(true);
      try {
        const res = await fetch(`${BASE_URL}/emotions`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        if (!res.ok) {
          const errorText = await res.text();
          throw new Error(`${res.status} ${res.statusText}: ${errorText}`);
        }

        const data = await res.json();
        setEmotions(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching emotions:", error);
        toast.error("Failed to fetch emotions.");
        setLoading(false);
      }
    };

    fetchEmotions();
  }, []);

  const handleDelete = async (id) => {
    try {
      const res = await fetch(`${BASE_URL}/emotions/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (!res.ok) {
        const errorText = await res.text();
        throw new Error(`${res.status} ${res.statusText}: ${errorText}`);
      }

      setEmotions(emotions.filter((emotion) => emotion._id !== id));
      toast.success("Emotion deleted successfully");
    } catch (err) {
      console.error("Error deleting emotion:", err);
      toast.error("Failed to delete emotion.");
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      {loading ? (
        <div className="flex items-center justify-center w-full h-full">
          <HashLoader color="#0067FF" />
        </div>
      ) : (
        <div className="relative">
          <div className="border-l-2 border-gray-200 absolute h-full left-1/2 transform -translate-x-1/2"></div>
          {emotions.map((emotion, index) => (
            <EmotionGalleryItem
              key={emotion._id}
              emotion={emotion}
              handleDelete={handleDelete}
              isLeft={index % 2 === 0}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default EmotionGallery;
