import React, { useState, useEffect, useContext } from "react";
import { BASE_URL, getToken } from "../../config";
import { AuthContext } from "../../context/AuthContext";
import HashLoader from "react-spinners/HashLoader";
import AddJournal from "./AddJournal";
import { toast } from "react-toastify";
import { createIllustrationSketch } from "../../utils/illustrationSketch";
import p5 from "p5";
import { FiPlus } from "react-icons/fi";
import { PiPencilLineThin } from "react-icons/pi";
import { MdOutlineNavigateNext } from "react-icons/md";
import { MdOutlineNavigateBefore } from "react-icons/md";
import { CiFaceSmile } from "react-icons/ci";

const MyJournal = () => {
  const { token } = useContext(AuthContext);
  const [journals, setJournals] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isAddJournalOpen, setIsAddJournalOpen] = useState(false);
  const [predictions, setPredictions] = useState({});
  const [illustrations, setIllustrations] = useState({});
  const [currentPage, setCurrentPage] = useState(0);

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
    setJournals((prevJournals) => [...prevJournals, newJournal]);
    setIsAddJournalOpen(false);
    setCurrentPage(journals.length + 1); // Go to the newly added journal page
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

      if (!res.ok) {
        const errorText = result.message || "Unknown error";
        throw new Error(`${res.status} ${res.statusText}: ${errorText}`);
      } else {
        toast.success("Illustration added to gallery!");
        // Reset predictions and page view to default state
        setPredictions((prevPredictions) => {
          const updatedPredictions = { ...prevPredictions };
          delete updatedPredictions[journalId];
          return updatedPredictions;
        });
        setCurrentPage(0);
      }
    } catch (err) {
      toast.error(err.message || "Failed to add illustration to gallery.");
    }
  };

  const turnPage = (delta) => {
    setCurrentPage((prevPage) => {
      const newPage = prevPage + delta;
      if (newPage < 0) return 0;
      if (newPage > journals.length) return journals.length; // Adjusted for the cover page
      return newPage;
    });
  };

  useEffect(() => {
    console.log(`Current Page: ${currentPage}`);
  }, [currentPage]);

  const renderContent = () => {
    if (currentPage === 0) {
      return (
        <div className="flex items-center justify-center flex-col h-full w-full rounded-tr-lg rounded-br-lg bg-[#DDC2E1]">
          <h1 className="font-riesling text-[#D5767F] text-[200px]">Dear</h1>
          <h1 className="font-riesling text-[#D5767F] text-[150px]">Diary</h1>
        </div>
      );
    } else {
      const journal = journals[currentPage - 1];
      const { _id: journalId, title, content, createdAt } = journal;
      const formattedDate = createdAt
        ? new Date(createdAt).toLocaleDateString()
        : "Unknown date";

      console.log(`Rendering journal with id: ${journalId}`);
      console.log(`Title: ${title}`);
      console.log(`Content: ${content}`);

      return (
        <div className="font-quicksand rounded-tr-lg rounded-br-lg p-4 md:p-6 lg:p-8 xl:p-10 flex flex-col h-full bg-[#caa6aa]">
          <div>
            <span className="flex flex-row justify-between text-gray-700">
              <p className="text-sm md:text-base lg:text- text-gray-600">
                {formattedDate}
              </p>
              <CiFaceSmile />
              <div className="self-end flex flex-row">
                <p className="text-sm text-gray-500">Page {currentPage}</p>
              </div>
            </span>

            <hr className="border-[#10477D]" />
            <h3 className="pt-4 text-[#10477D] text-lg md:text-xl lg:text-2xl font-semibold">
              {title}
            </h3>

            <p className="pb-4 text-[#10477D] mt-2 text-[14px] md:text-[16px] lg:text-[18px] xl:text-[20px]">
              {content}
            </p>
            <hr className="border-[#10477D]" />
          </div>
          <div className="flex justify-start space-x-2 mt-3">
            <button
              onClick={() => handlePredict(journalId, content)}
              className=" text-[#10477D] rounded-md text-[8px] md:text-[10px] lg:text-[12px] xl:text-[14px]"
            >
              Predict
            </button>
            <button
              onClick={() => handleDeleteJournal(journalId)}
              className="pr-3 text-white text-sm"
            >
              Delete
            </button>
          </div>
          {predictions[journalId] && predictions[journalId].length > 0 && (
            <div className="mt-4 w-full h-full">
              {/* <h4 className="text-sm">Predictions:</h4>
              <ul className="list-disc ml-5">
                {predictions[journalId].map((prediction, index) => (
                  <li key={`${journalId}-${index}`} className="text-sm">
                    {prediction.label}: {prediction.probability.toFixed(4)}
                  </li>
                ))}
              </ul> */}
              <div>
                <div
                  id={`sketch-container-${journalId}`}
                  className="mt-4"
                  style={{ width: "100%", height: "100vh" }}
                ></div>
                <button
                  onClick={() => handleAddToGallery(journalId)}
                  className="px-4 py-2 text-white"
                >
                  Add to Gallery
                </button>
              </div>
            </div>
          )}
        </div>
      );
    }
  };

  return (
    <div className="max-w-[1170px] mx-auto p-4 md:p-6 lg:p-8 xl:p-10">
      {loading && (
        <div className="flex items-center justify-center w-full h-full">
          <HashLoader color="#0067FF" />
        </div>
      )}
      {error && !loading && (
        <div className="flex items-center justify-center w-full h-full">
          <h3 className="text-headingColor text-[16px] md:text-[18px] lg:text-[20px] xl:text-[22px] font-semibold leading-[24px] md:leading-[26px] lg:leading-[28px] xl:leading-[30px]">
            {error}
          </h3>
        </div>
      )}
      {!loading && !error && journals.length === 0 && (
        <div className="text-center">
          <p className="text-[14px] md:text-[16px] lg:text-[18px] xl:text-[20px]">
            No journals found. Start writing your first journal!
          </p>
          <button
            onClick={handleAddJournal}
            className="mt-4 py-2 px-4 rounded-md text-[14px] md:text-[16px] lg:text-[18px] xl:text-[20px]"
          >
            <FiPlus />
          </button>
        </div>
      )}
      {!loading && !error && journals.length > 0 && (
        <div className="">
          <div className="text-right mb-4">
            <button
              onClick={handleAddJournal}
              className="py-2 px-4 rounded-md text-[18px] md:text-[20px] lg:text-[30px] xl:text-[40px]"
            >
              <PiPencilLineThin />
            </button>
          </div>
          <div className="rounded-tr-2xl rounded-br-2xl shadow-custom w-[350px] h-[500px] flex items-center justify-center mx-auto my-auto">
            {renderContent()}
          </div>

          <div className="controls centered mt-6">
            <button
              onClick={() => turnPage(-1)}
              disabled={currentPage === 0}
              id="prevPage"
              className="px-4 py-2 text-gray-700 text-[14px] md:text-[16px] lg:text-[18px] xl:text-[20px] mr-2"
            >
              <MdOutlineNavigateBefore />
            </button>
            <button
              onClick={() => turnPage(1)}
              disabled={currentPage === journals.length}
              id="nextPage"
              className="px-4 py-2 text-gray-700 text-[14px] md:text-[16px] lg:text-[18px] xl:text-[20px]"
            >
              <MdOutlineNavigateNext />
            </button>
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
