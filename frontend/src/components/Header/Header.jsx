import React, { useContext, useEffect, useRef, useState } from "react";
import { NavLink, Link } from "react-router-dom";
import { BiMenu } from "react-icons/bi";
import { CiLogin } from "react-icons/ci";
import { AuthContext } from "./../../context/AuthContext";

import userImg from "../../assets/images/flower.webp";

const Header = () => {
  const { token, user } = useContext(AuthContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    console.log("Token:", token);
    console.log("User data in Header:", user);
    if (user) {
      console.log("User photo in Header:", user.photo);
    }
  }, [user, token]);

  const menuRef = useRef(null);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target) &&
        !event.target.closest(".hamburger-icon")
      ) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  // Define navLinks based on the authentication status
  const navLinks = [
    {
      path: "/",
      display: "Home",
    },
    {
      path: token ? "users/profile/me" : "/login",
      display: "Journal",
    },
  ];

  return (
    <header className="header flex items-center py-2">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex items-center justify-between">
          {/*-------------- logo ---------*/}
          <div className="font-queens text-lg">
            <h1 className="text-lg sm:text-xl md:text-2xl lg:text-3xl">
              ffts.
            </h1>
          </div>

          {/*----------- menu -------------*/}
          <div
            className={`navigation lg:relative lg:bg-transparent w-full lg:w-auto lg:flex ${
              isMenuOpen ? "flex" : "hidden"
            } lg:flex-row items-center gap-4 lg:gap-8 bg-white shadow-lg lg:shadow-none rounded-lg lg:rounded-none py-4 lg:py-0 px-4 lg:px-0 absolute lg:static top-16 right-0 lg:top-0 lg:right-0`}
            ref={menuRef}
          >
            <ul className="menu flex flex-col lg:flex-row items-center gap-4 lg:gap-8">
              {navLinks.map((link, index) => (
                <li key={index}>
                  <NavLink
                    to={link.path}
                    className={(navClass) =>
                      navClass.isActive
                        ? "font-queens text-primaryColor text-xs sm:text-sm md:text-base lg:text-lg leading-7 font-[600] rounded-full bg-[#b7f8f6] bg-opacity-30 backdrop-filter backdrop-saturate-150 backdrop-blur-xl shadow-lg px-4 py-1 min-w-[120px] text-center"
                        : "font-queens text-textColor text-xs sm:text-sm md:text-base lg:text-lg leading-7 font-[500] hover:text-primaryColor transition duration-300 ease-in-out hover:scale-110"
                    }
                  >
                    {link.display}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>

          {/*--------------- nav right -----------*/}
          <div className="flex items-center gap-4">
            {token && user ? (
              <div>
                <Link to={"/users/profile/me"}>
                  <figure className="w-[30px] h-[30px] rounded-full cursor-pointer">
                    <img
                      className="w-full rounded-full"
                      src={user.photo || userImg} // Fallback to a default image
                      alt="User"
                    />
                  </figure>
                </Link>
              </div>
            ) : (
              <Link to="/login">
                <button className="font-queens bg-buttonBgColor py-2 px-6 rounded-[50px] text-black font-[600] text-xs sm:text-sm md:text-base lg:text-lg h-[40px] flex items-center justify-center">
                  <CiLogin className="w-5 h-5 mr-2" />
                  Log In
                </button>
              </Link>
            )}
            <span className="lg:hidden hamburger-icon" onClick={toggleMenu}>
              <BiMenu className="w-6 h-6 cursor-pointer" />
            </span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
