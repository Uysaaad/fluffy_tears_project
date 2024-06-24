import React, { useState, useEffect, useContext } from "react";
import { BASE_URL, getToken } from "../../config";
import { AuthContext } from "../../context/AuthContext";
import HashLoader from "react-spinners/HashLoader";
import AddJournal from "./AddJournal";
import { toast } from "react-toastify";
import { createIllustrationSketch } from "../../utils/illustrationSketch";
import p5 from "p5";

const MyJournal = () => {
  const { token } = useContext(AuthContext);
  const [journals, setJournals] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isAddJournalOpen, setIsAddJournalOpen] = useState(false);
  const [predictions, setPredictions] = useState({});
  const [illustrations, setIllustrations] = useState({});

  useEffect(() => {
    const fetchJournals = async () => {
      setLoading(true);
      const token = getToken();

      if (!token) {
        setError("No token, authorization denied 🤢");
        setLoading(false);
        return;
      }

      try {
        const res = await fetch(`${BASE_URL}/journals`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!res.ok) {
          const errorText = await res.text();
          throw new Error(`${res.status} ${res.statusText}: ${errorText}`);
        }

        const result = await res.json();
        setJournals(result.data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchJournals();
  }, [token]);

  const handleAddJournal = () => {
    setIsAddJournalOpen(true);
  };

  const handleJournalAdded = (newJournal) => {
    setJournals((prevJournals) => [newJournal, ...prevJournals]);
    setIsAddJournalOpen(false);
  };

  const handleDeleteJournal = async (id) => {
    try {
      const res = await fetch(`${BASE_URL}/journals/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!res.ok) {
        throw new Error("Failed to delete journal");
      }

      setJournals(journals.filter((journal) => journal._id !== id));
      toast.success("Journal deleted successfully");
    } catch (err) {
      toast.error(err.message);
    }
  };

  const handlePredict = async (journalId, content) => {
    try {
      const res = await fetch(`${BASE_URL}/predict`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ content }),
      });

      if (!res.ok) {
        const errorText = await res.text();
        throw new Error(`${res.status} ${res.statusText}: ${errorText}`);
      }

      const result = await res.json();
      if (result.success && result.data) {
        setPredictions((prevPredictions) => ({
          ...prevPredictions,
          [journalId]: result.data,
        }));
        toast.success("Journal processed successfully!");

        // Wait for the container to render before creating the p5 instance
        setTimeout(() => {
          const containerId = `sketch-container-${journalId}`;
          new p5(
            createIllustrationSketch(
              result.data,
              setIllustrations,
              journalId,
              containerId
            ),
            document.getElementById(containerId)
          );
        }, 0);
      } else {
        toast.error("Failed to process journal.");
      }
    } catch (err) {
      toast.error("Failed to process journal.");
    }
  };

const handleAddToGallery = async (journalId) => {
  try {
    const illustration = illustrations[journalId];
    const content = journals.find(
      (journal) => journal._id === journalId
    ).content;
    let emotion = null;
    if (predictions[journalId] && predictions[journalId].length > 0) {
      const sortedPredictions = predictions[journalId].sort(
        (a, b) => b.probability - a.probability
      );
      emotion = sortedPredictions[0].label;
    }
    // Log the data being sent
    console.log("Data being sent:", {
      journalId,
      content,
      emotion,
      illustration,
    });

    const res = await fetch(`${BASE_URL}/emotion-gallery`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        journalId,
        content,
        emotion,
        illustration,
      }),
    });

    const result = await res.json();

    // Log the response received
    console.log("Response received:", result);

    if (!res.ok) {
      const errorText = result.message || "Unknown error";
      throw new Error(`${res.status} ${res.statusText}: ${errorText}`);
    } else {
      toast.success("Illustration added to gallery!");
    }
  } catch (err) {
    console.error("Error adding to gallery:", err); // Log the error to the console
    toast.error(err.message || "Failed to add illustration to gallery.");
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
      {!loading && !error && journals.length === 0 && (
        <div className="text-center">
          <p>No journals found. Start writing your first journal!</p>
          <button
            onClick={handleAddJournal}
            className="mt-4 bg-blue-500 text-white py-2 px-4 rounded-md"
          >
            Add Journal
          </button>
        </div>
      )}
      {!loading && !error && journals.length > 0 && (
        <div>
          <div className="text-right mb-4">
            <button
              onClick={handleAddJournal}
              className="bg-blue-500 text-white py-2 px-4 rounded-md"
            >
              Add Journal
            </button>
          </div>
          <div className="grid gap-4">
            {journals.map((journal) => {
              const { _id: journalId, title, content, createdAt } = journal;
              const formattedDate = createdAt
                ? new Date(createdAt).toLocaleDateString()
                : "Unknown date";
              return (
                <div
                  key={journalId}
                  className="p-4 border rounded-lg shadow-md bg-white"
                >
                  <h3 className="text-lg font-semibold">{title}</h3>
                  <p className="text-sm text-gray-600">{formattedDate}</p>
                  <p className="mt-2">{content}</p>
                  <div className="flex justify-end space-x-2">
                    <button
                      onClick={() => handlePredict(journalId, content)}
                      className="px-4 py-2 bg-green-500 text-white rounded-md"
                    >
                      Predict
                    </button>
                    <button
                      onClick={() => handleDeleteJournal(journalId)}
                      className="px-4 py-2 bg-red-500 text-white rounded-md"
                    >
                      Delete
                    </button>
                  </div>
                  {predictions[journalId] &&
                    predictions[journalId].length > 0 && (
                      <div className="mt-4">
                        <h4 className="text-md font-semibold">Predictions:</h4>
                        <ul>
                          {predictions[journalId].map((prediction, index) => (
                            <li key={`${journalId}-${index}`}>
                              {prediction.label}:{" "}
                              {prediction.probability.toFixed(4)}
                            </li>
                          ))}
                        </ul>
                        <div
                          id={`sketch-container-${journalId}`}
                          style={{ width: "100%", height: "400px" }}
                        ></div>
                        <button
                          onClick={() => handleAddToGallery(journalId)}
                          className="px-4 py-2 bg-blue-500 text-white rounded-md mt-4"
                        >
                          Add to Gallery
                        </button>
                      </div>
                    )}
                </div>
              );
            })}
          </div>
        </div>
      )}
      <AddJournal
        isOpen={isAddJournalOpen}
        onClose={() => setIsAddJournalOpen(false)}
        onJournalAdded={handleJournalAdded}
      />
    </div>
  );
};

export default MyJournal;
