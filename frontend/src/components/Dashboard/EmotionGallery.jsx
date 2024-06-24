import React, { useEffect, useState } from "react";
import { BASE_URL } from "../../config";
import { toast } from "react-toastify";
import HashLoader from "react-spinners/HashLoader";

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
    <div>
      {loading ? (
        <div className="flex items-center justify-center w-full h-full">
          <HashLoader color="#0067FF" />
        </div>
      ) : (
        <div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {emotions.map((emotion) => (
              <div key={emotion._id} className="border p-4 rounded-md">
                <p>{emotion.text}</p>
                <p>{emotion.emotion}</p>
                <img
                  src={emotion.illustration}
                  alt="illustration"
                  className="w-full"
                />
                <button
                  onClick={() => handleDelete(emotion._id)}
                  className="mt-2 bg-red-600 text-white py-2 px-4 rounded"
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default EmotionGallery;
