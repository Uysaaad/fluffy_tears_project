import logo from "../../assets/images/logo-mark-ts.png";
import userImg from "../../assets/images/avatar-icon.png";
import { NavLink, Link } from "react-router-dom";
import { BiMenu } from "react-icons/bi";
import { AuthContext } from "./../../context/AuthContext";
import { useContext, useEffect, useRef } from "react";

const navLinks = [
  {
    path: "/",
    display: "Home",
  },
  {
    path: "contact",
    display: "Contact",
  },
];

const Header = () => {
  const { token, user } = useContext(AuthContext);

  useEffect(() => {
    console.log("Token:", token);
    console.log("User data in Header:", user);
    if (user) {
      console.log("User photo in Header:", user.photo);
    }
  }, [user, token]);

  const menuRef = useRef(null);

  const toggleMenu = () => menuRef.current.classList.toggle("show__menu");

  return (
    <header className="header flex items-center">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          {/*-------------- logo ---------*/}
          <div className="w-20 h-20">
            <img className="rounded-full" src={logo} alt="Logo" />
          </div>

          {/*----------- menu -------------*/}
          <div className="navigation" ref={menuRef}>
            <ul className="menu flex items-center gap-[2.7rem]">
              {navLinks.map((link, index) => (
                <li key={index}>
                  <NavLink
                    to={link.path}
                    className={(navClass) =>
                      navClass.isActive
                        ? "text-primaryColor text-[16px] leading-7 font-[600] rounded-full bg-white bg-opacity-10 backdrop-filter backdrop-saturate-150 backdrop-blur-xl shadow-lg px-5 py-1 min-w-[150px] text-center"
                        : "text-textColor text-[16px] leading-7 font-[500] hover:text-primaryColor transition duration-300 ease-in-out hover:scale-110"
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
                  <figure className="w-[35px] h-[35px] rounded-full cursor-pointer">
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
                <button className="bg-buttonBgColor py-2 px-6 rounded-[50px] text-white font-[600] h-[44px] flex items-center justify-center">
                  Log In
                </button>
              </Link>
            )}
            <span className="md:hidden" onClick={toggleMenu}>
              <BiMenu className="w-6 h-6 cursor-pointer" />
            </span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
