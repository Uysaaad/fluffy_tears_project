import React, { useEffect, useState, useContext } from "react";
import { BASE_URL, getToken } from "./../../config";
import { AuthContext } from "../../context/AuthContext";
import HashLoader from "react-spinners/HashLoader";
import { toast } from "react-toastify";

const EmotionGallery = () => {
  const { token } = useContext(AuthContext);
  const [galleryItems, setGalleryItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchGalleryItems = async () => {
      setLoading(true);
      const token = getToken();

      if (!token) {
        setError("No token, authorization denied 🤢");
        setLoading(false);
        return;
      }

      try {
        const res = await fetch(`${BASE_URL}/emotion-gallery`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!res.ok) {
          const errorText = await res.text();
          throw new Error(`${res.status} ${res.statusText}: ${errorText}`);
        }

        const result = await res.json();
        setGalleryItems(result.data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching gallery items:", err);
        setError(err.message);
        setLoading(false);
      }
    };

    fetchGalleryItems();
  }, [token]);

  const handleDeleteGalleryItem = async (id) => {
    try {
      const res = await fetch(`${BASE_URL}/emotion-gallery/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!res.ok) {
        throw new Error("Failed to delete gallery item");
      }

      setGalleryItems(galleryItems.filter((item) => item._id !== id));
      toast.success("Gallery item deleted successfully");
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <div>
      {loading && (
        <div className="flex items-center justify-center w-full h-full">
          <HashLoader color="#0067FF" />
        </div>
      )}
      {error && !loading && (
        <div className="flex items-center justify-center w-full h-full">
          <h3 className="text-headingColor text-[20px] font-semibold leading-[30px]">
            {error}
          </h3>
        </div>
      )}
      {!loading && !error && galleryItems.length === 0 && (
        <div className="text-center">
          <p>No gallery items found. Add some illustrations!</p>
        </div>
      )}
      {!loading && !error && galleryItems.length > 0 && (
        <div className="grid gap-4">
          {galleryItems.map((item) => (
            <div
              key={item._id}
              className="p-4 border rounded-lg shadow-md bg-white"
            >
              <h3 className="text-lg font-semibold">{item.title}</h3>
              <img
                src={item.imageUrl}
                alt={item.title}
                className="w-full h-auto mt-2 rounded-md"
              />
              <p className="text-sm text-gray-600 mt-2">
                Emotions: {item.emotions.join(", ")}
              </p>
              <div className="flex justify-end">
                <button
                  onClick={() => handleDeleteGalleryItem(item._id)}
                  className="px-4 py-2 bg-red-500 text-white rounded-md"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default EmotionGallery;
