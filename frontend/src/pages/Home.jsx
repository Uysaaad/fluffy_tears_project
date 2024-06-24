import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext"; 
import BubbleHomePage from "../components/BubbleHomePage/BubbleHomePage"; 

const Home = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleButtonClick = () => {
    if (user) {
       navigate("/users/profile/me")
    } else {
      navigate("/login");
    }
  };

  return (
    <>
      <BubbleHomePage /> {/* Background component */}
      {/*--------- hero start -----------*/}
      <section className="hero__section 2xl:h-[800px] relative z-10">
        <div className="container">
          <div className="flex flex-col items-center justify-between">
            {/*--------- hero content -----------*/}
            <div className="flex items-center space-x-4 p-20 ">
              <h1 className="text-6btb  md:text-7xl lg:text-8xl xl:text-9xl transition duration-300 ease-in-out hover:scale-110">
                Fluffy Tears
              </h1>
            </div>
            <div>
              <div className="p-10">
                <button
                  onClick={handleButtonClick}
                  className="btn border border-1 border-solid border-gray-700"
                >
                  Write Down Your Thoughts
                </button>
              </div>
              {/*--------- hero counter  -----------*/}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
