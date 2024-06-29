import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import BubbleHomePage from "../components/BubbleHomePage/BubbleHomePage";
import Eyes from "../assets/images/emotion.gif";

const Home = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleButtonClick = () => {
    if (user) {
      navigate("/users/profile/me");
    } else {
      navigate("/login");
    }
  };

  return (
    <>
      <BubbleHomePage /> {/* Background component */}
      {/*--------- hero start -----------*/}
      <section className="hero__section flex items-center justify-center min-h-screen">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="flex flex-col items-center">
            {/*--------- hero content -----------*/}
            <div className="flex flex-col lg:flex-row items-center lg:space-x-6 justify-center lg:justify-between">
              <h1 className="font-queens text-[60px] md:text-[80px] lg:text-[100px] xl:text-[150px] text-[#2A2A2B]">
                Fluffy
              </h1>
              <img
                src={Eyes}
                alt="Eyes"
                className="w-[250px] md:w-[350px] lg:w-[450px] xl:w-[550px] mx-4"
              />
              <h1 className="font-queens text-[60px] md:text-[80px] lg:text-[100px] xl:text-[150px]  text-[#2A2A2B]">
                Tears.
              </h1>
            </div>
            <div className="mt-8 text-center px-4 lg:px-0 mx-3.5">
              <p className="font-queens text-sm md:text-lg lg:text-xl text-gray-700 lg:mx-96 sm:mx-0">
                Discover the power of your emotions with Fluffy Tears. Write
                your thoughts, and our advanced AI will detect your emotions and
                generate beautiful, personalized illustrations.
              </p>
            </div>
            <div className="mt-10 flex justify-center">
              <button
                onClick={handleButtonClick}
                className="transition ease-in-out font-queens text-gray-700 rounded-full border-solid border-[0.5px] border-gray-700 focus:outline-none hover:scale-110 w-[180px] md:w-[220px] lg:w-[250px] h-[50px] md:h-[60px] sm:h-[40px] cursor-pointer relative"
              >
                Start Your Journal Here
                {/* <span className="bubbles absolute inset-0">
                  {Array(10)
                    .fill()
                    .map((_, i) => (
                      <span
                        key={i}
                        className={`bubble-${i} absolute w-3 h-3 sm:w-4 sm:h-4 bg-[#80c4df] opacity-60 rounded-full`}
                        style={{
                          left: `${Math.random() * 90 + 10}%`,
                          animation: `move-${i} ${3 + i * 0.02}s infinite`,
                          animationDelay: `${i * 0.2}s`,
                        }}
                      ></span>
                    ))}
                </span> */}
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
