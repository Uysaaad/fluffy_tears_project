import React, { useState, useContext } from "react";
import { BASE_URL, getToken } from "../../config";
import { AuthContext } from "../../context/AuthContext";
import { toast } from "react-toastify";
import { MdOutlineCancel } from "react-icons/md";
import { MdOutlineDone } from "react-icons/md";

const AddJournal = ({ isOpen, onClose, onJournalAdded }) => {
  const { token } = useContext(AuthContext);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch(`${BASE_URL}/journals`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getToken()}`,
        },
        body: JSON.stringify({ title, content }),
      });

      if (!res.ok) {
        const errorText = await res.text();
        throw new Error(`${res.status} ${res.statusText}: ${errorText}`);
      }

      const newJournal = await res.json();
      toast.success("Journal added successfully!");
      setTitle("");
      setContent("");
      onClose();
      onJournalAdded(newJournal.data); // Accessing the journal data correctly
    } catch (err) {
      console.error("Error adding journal:", err);
      setError(err.message);
      toast.error("Failed to add journal.");
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="font-quicksand fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-[#D3F4C7] p-6 rounded-tr-lg rounded-br-lg shadow-lg w-[300px] h-[400px] lg:w-[450px] lg:h-[600px] xl:w-[600px] xl:h-[800px]">
        <div className="flex flex-row justify-between">
          <h2 className="text-[#10477D] text-lg font-bold mb-4">Dear Diary,</h2>
          <button type="button" onClick={onClose} className="mb-4 text-red-400 text-[20px] hover:text-red-900">
            <MdOutlineCancel />
          </button>
        </div>

        {error && <p className="text-red-500">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-bold mb-2 text-[#10477D]">
              Title
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full bg-[#D3F4C7] border-b-[0.5px] border-[#10477D] text-[#10477D]"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-bold mb-2 text-[#10477D]">
              Content
            </label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full h-[200px] bg-[#D3F4C7] border-b-[0.5px] border-[#10477D] text-[#10477D]"
              required
            ></textarea>
          </div>
          <div className="flex justify-end">
            <button
              type="submit"
              disabled={loading}
              className="px-2 py-2  text-[#10477D] rounded-full border border-[#10477D] hover:text-white hover:bg-[#10477D]"
            >
              {loading ? "Adding..." : <MdOutlineDone />}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddJournal;
