import { useContext, useState } from "react";
import MyJournal from "./MyJournal"; // Ensure correct path
import Profile from "./Profile"; // Ensure correct path
import EmotionGallery from "./EmotionGallery"; // Ensure correct path
import { BASE_URL } from "./../../config";
import useFetchData from "../../hooks/useFetchData";
import HashLoader from "react-spinners/HashLoader";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const MyAccount = () => {
  const [tab, setTab] = useState("journals");
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

  return (
    <section>
      <div className="max-w-[1170px] px-5 mx-auto">
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

        {!loading && !error && (
          <div className="grid md:grid-cols-4 gap-10">
            {/* Sidebar */}
            <div className="md:col-span-1 px-[30px] pb-[50px] rounded-md bg-gray-100">
              <div className="flex items-center justify-center">
                <figure className="w-[100px] h-[100px] rounded-full border-2 border-solid border-[#0067FF]">
                  <img
                    src={userData?.photo}
                    alt=""
                    className="w-full rounded-full"
                  />
                </figure>
              </div>

              <div className="text-center mt-4">
                <h3 className="text-[18px] leading-[30px] text-headingColor font-bold">
                  {userData?.username}
                </h3>
                <p className="text-textColor text-[15px] leading-6 font-medium">
                  Email: {userData?.email}
                </p>
              </div>

              <div className="mt-[50px] md:mt-[100px]">
                <button
                  onClick={() => setTab("journals")}
                  className={`${
                    tab === "journals" && "bg-[#0067FF] text-white font-normal"
                  } w-full mb-4 p-2 rounded-md text-headingColor font-semibold text-[16px] leading-7 border border-solid border-[#0067FF]`}
                >
                  My Journals
                </button>
                <button
                  onClick={() => setTab("gallery")}
                  className={`${
                    tab === "gallery" && "bg-[#0067FF] text-white font-normal"
                  } w-full mb-4 p-2 rounded-md text-headingColor font-semibold text-[16px] leading-7 border border-solid border-[#0067FF]`}
                >
                  Emotion Gallery
                </button>
                <button
                  onClick={() => setTab("settings")}
                  className={`${
                    tab === "settings" && "bg-[#0067FF] text-white font-normal"
                  } w-full mb-4 p-2 rounded-md text-headingColor font-semibold text-[16px] leading-7 border border-solid border-[#0067FF]`}
                >
                  Settings
                </button>
                <button
                  onClick={handleLogout}
                  className="w-full bg-[#181A1E] mb-4 p-3 rounded-md text-white text-[16px] leading-7"
                >
                  Logout
                </button>
                <button
                  onClick={handleDelete}
                  className="w-full bg-red-600 p-3 rounded-md text-white text-[16px] leading-7"
                >
                  Delete Account
                </button>
              </div>
            </div>

            {/* Main Content */}
            <div className="md:col-span-3 md:px-[30px]">
              <div className="mt-[50px]">
                {tab === "journals" && (
                  <div>
                    <h2 className="heading text-[30px]">My Journals</h2>
                    <MyJournal />
                  </div>
                )}
                {tab === "gallery" && (
                  <div>
                    <h2 className="heading text-[30px]">Emotion Gallery</h2>
                    <EmotionGallery />
                  </div>
                )}
                {tab === "settings" && (
                  <div>
                    <h2 className="heading text-[30px]">Profile Settings</h2>
                    <Profile userData={userData} />
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
        <ToastContainer />
      </div>
    </section>
  );
};

export default MyAccount;
