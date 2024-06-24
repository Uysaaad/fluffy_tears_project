import React, { useEffect, useState, useContext } from "react";
import { BASE_URL, getToken } from "./../../config";
import { AuthContext } from "../../context/AuthContext";
import HashLoader from "react-spinners/HashLoader";
import AddJournal from "./AddJournal"; // Ensure correct path
import { toast } from "react-toastify";

const MyJournal = () => {
  const { token } = useContext(AuthContext);
  const [journals, setJournals] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isAddJournalOpen, setIsAddJournalOpen] = useState(false);
  const [predictions, setPredictions] = useState({});

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
        console.log("Fetched Journals: ", result.data); // Log the fetched data
        setJournals(result.data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching journals:", err);
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
      } else {
        toast.error("Failed to process journal.");
      }
    } catch (err) {
      console.error("Error processing journal:", err);
      toast.error("Failed to process journal.");
    }
  };

  console.log("Journals: ", journals);
  console.log("Predictions: ", predictions);

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
            {journals.map((journal, index) => {
              const { _id, title, content, createdAt } = journal;
              const journalId = _id || `journal-${index}`;
              const formattedDate = createdAt
                ? new Date(createdAt).toLocaleDateString()
                : "Unknown date";
              console.log("Journal ID: ", journalId);
              console.log("Title: ", title);
              console.log("Content: ", content);
              console.log("Date: ", formattedDate);
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
                          {predictions[journalId].map((prediction, index) => {
                            const predictionKey = `${journalId}-${index}`;
                            console.log("Prediction Key: ", predictionKey);
                            return (
                              <li key={predictionKey}>
                                {prediction.label}:{" "}
                                {prediction.probability.toFixed(4)}
                              </li>
                            );
                          })}
                        </ul>
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
