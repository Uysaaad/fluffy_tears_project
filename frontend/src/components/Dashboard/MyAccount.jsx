import React, { useContext, useState } from "react";
import MyJournal from "./MyJournal";
import Profile from "./Profile";
import EmotionGallery from "./EmotionGallery";
import Garden from "./Garden";
import { BASE_URL } from "../../config";
import useFetchData from "../../hooks/useFetchData";
import HashLoader from "react-spinners/HashLoader";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import BubbleHomePage from "../BubbleHomePage/BubbleHomePage";
import { BsJournals } from "react-icons/bs";
import { GrGallery } from "react-icons/gr";
import { IoSettingsOutline } from "react-icons/io5";
import { CiLogout } from "react-icons/ci";
import { RiDeleteBin6Line } from "react-icons/ri";
import { GiFlowerPot } from "react-icons/gi";

const MyAccount = () => {
  const [tab, setTab] = useState("journals");
  const [gardenState, setGardenState] = useState({
    seeds: 0,
    sun: 0,
    water: 0,
  });
  const {
    data: userData,
    loading,
    error,
  } = useFetchData(`${BASE_URL}/users/profile/me`);
  const { dispatch } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
    navigate("/login");
  };

  const handleDelete = async () => {
    try {
      const res = await fetch(`${BASE_URL}/users/${userData._id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (!res.ok) {
        const errorText = await res.text();
        throw new Error(`${res.status} ${res.statusText}: ${errorText}`);
      }

      handleLogout();
      toast.success("Account deleted successfully");
    } catch (err) {
      console.error("Error deleting account:", err);
      toast.error("Failed to delete account.");
    }
  };

  const updateGarden = (emotion) => {
    setGardenState((prev) => {
      let newState = { ...prev };
      if (emotion === "joy") newState.sun += 1;
      if (emotion === "sadness") newState.water += 1;
      if (emotion === "seed") newState.seeds += 1;
      return newState;
    });
  };

  return (
    <>
      <BubbleHomePage />
      <section
        className="bg-gray-50 my-10 h-4/5
  mx-2 md:mx-4 lg:mx-[100px] xl:mx-[200px] 
  rounded-2xl 
  bg-opacity-10 
  backdrop-filter 
  backdrop-saturate-150 
  backdrop-blur-xl 
  shadow-lg 
  px-4 md:px-6 lg:px-8 xl:px-10 
  py-4 md:py-6 lg:py-8 xl:py-10 
  "
      >
        <div className="font-queens mx-0 px-0">
          {loading && (
            <div className="flex items-center justify-center ">
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

          {!loading && !error && (
            <div className="grid grid-cols-1 md:grid-cols-8 gap-6 md:gap-4 lg:gap-2 xl:gap-4">
              {/* Sidebar */}
              <div className="md:col-span-1 pb-8 md:pb-12 lg:pb-16 bg-white bg-opacity-10 backdrop-filter backdrop-saturate-150 backdrop-blur-xl shadow-lg px-4 md:px-6 lg:px-8 xl:px-10 py-4 md:py-6 lg:py-8 xl:py-10 rounded-lg">
                <div className="flex items-center justify-center py-4">
                  <figure className="w-[50px] h-[50px] md:w-[40px] md:h-[40px] rounded-full overflow-hidden">
                    <img
                      src={userData?.photo}
                      alt="User"
                      className="w-full h-full object-cover"
                    />
                  </figure>
                </div>

                <div className="mt-8 md:mt-10 lg:mt-12 xl:mt-14">
                  <button
                    onClick={() => setTab("journals")}
                    className={`${
                      tab === "journals" &&
                      "bg-white bg-opacity-10 backdrop-filter backdrop-saturate-150 backdrop-blur-xl shadow-lg px-4 py-2 text-center transition duration-300 ease-in-out hover:scale-110 text-black font-normal"
                    } w-full mb-4 p-3 rounded-md text-headingColor font-semibold text-[14px] md:text-[16px] leading-7`}
                  >
                    <BsJournals />
                  </button>
                  <button
                    onClick={() => setTab("gallery")}
                    className={`${
                      tab === "gallery" &&
                      "bg-white bg-opacity-10 backdrop-filter backdrop-saturate-150 backdrop-blur-xl shadow-lg px-4 py-2 text-center transition duration-300 ease-in-out hover:scale-110 text-black font-normal"
                    } w-full mb-4 p-3 rounded-md text-headingColor font-semibold text-[14px] md:text-[16px] leading-7`}
                  >
                    <GrGallery />
                  </button>
                  <button
                    onClick={() => setTab("garden")}
                    className={`${
                      tab === "garden" &&
                      "bg-white bg-opacity-10 backdrop-filter backdrop-saturate-150 backdrop-blur-xl shadow-lg px-4 py-2 text-center transition duration-300 ease-in-out hover:scale-110 text-black font-normal"
                    } w-full mb-4 p-3 rounded-md text-headingColor font-semibold text-[14px] md:text-[16px] leading-7`}
                  >
                    <GiFlowerPot />
                  </button>
                  {/* <button
                    onClick={() => setTab("settings")}
                    className={`${
                      tab === "settings" &&
                      "bg-white bg-opacity-10 backdrop-filter backdrop-saturate-150 backdrop-blur-xl shadow-lg px-4 py-2 text-center transition duration-300 ease-in-out hover:scale-110 text-black font-normal"
                    } w-full mb-4 p-3 rounded-md text-headingColor font-semibold text-[14px] md:text-[16px] leading-7`}
                  >
                    <IoSettingsOutline />
                  </button> */}

                  <button
                    onClick={handleLogout}
                    className="w-full mb-4 p-3 rounded-md text-[14px] md:text-[16px] leading-7"
                  >
                    <CiLogout />
                  </button>
                  <button
                    onClick={handleDelete}
                    className="w-full p-3 rounded-md text-[14px] md:text-[16px] leading-7"
                  >
                    <RiDeleteBin6Line />
                  </button>
                </div>
              </div>

              {/* Main Content */}
              <div className="md:col-span-7 ">
                <div className="mt-8 md:mt-10 lg:mt-12 xl:mt-14">
                  {tab === "journals" && (
                    <div>
                      <MyJournal updateGarden={updateGarden} />
                    </div>
                  )}
                  {tab === "gallery" && (
                    <div>
                      <EmotionGallery />
                    </div>
                  )}
                  {tab === "settings" && (
                    <div>
                      <h2 className="heading text-[24px] md:text-[26px] lg:text-[28px] xl:text-[30px] font-semibold mb-4 md:mb-6 lg:mb-8 xl:mb-10">
                        Profile Settings
                      </h2>
                      <Profile userData={userData} />
                    </div>
                  )}
                  {tab === "garden" && (
                    <div>
                      <Garden gardenState={gardenState} />
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
          <ToastContainer />
        </div>
      </section>
    </>
  );
};

export default MyAccount;
