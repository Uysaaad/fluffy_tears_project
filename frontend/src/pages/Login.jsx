import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BASE_URL } from "../config";
import { toast } from "react-toastify";
import HashLoader from "react-spinners/HashLoader";
import { AuthContext } from "../context/AuthContext";
import DarkBubblePage from "../components/DarkBubblePage/DarkBubblePage";

const Login = () => {
  const { dispatch } = useContext(AuthContext); // Use AuthContext
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    try {
      const res = await fetch(`${BASE_URL}/auth/login`, {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.message);
      }

      console.log("Login successful, result:", result);

      dispatch({
        type: "LOGIN_SUCCESS",
        payload: {
          user: result.user,
          token: result.token,
        },
      });

      setLoading(false);
      toast.success(result.message);
      navigate("/"); // Navigate to the homepage
    } catch (error) {
      toast.error(error.message);
      console.error("Login failed:", error);
      setLoading(false);
    }
  };

  return (
    <>
      <DarkBubblePage />
      <section className="px-4 md:px-8 lg:px-16 xl:px-20 bg-login bg-no-repeat bg-center min-h-screen flex items-center justify-center">
        <div className="bg-[rgba(255,255,255,0.3)] w-full max-w-[300px] sm:max-w-[400px] md:max-w-[400px] lg:max-w-[500px] xl:max-w-[600px] mx-auto rounded-[20px] shadow-[20px_20px_40px_-6px_rgba(0,0,0,0.2)] p-4 sm:p-6 md:p-8 lg:p-10 xl:p-12 relative backdrop-blur-[10px] transition-all duration-200 ease-in-out">
          <h3 className="font-graydesign text-white text-[18px] sm:text-[20px] md:text-[22px] lg:text-[24px] xl:text-[26px] leading-9 font-bold mb-4 sm:mb-6 md:mb-8 lg:mb-10 xl:mb-12 text-shadow-custom">
            Welcome
          </h3>
          <form onSubmit={handleSubmit} className="py-4 md:py-0 text-center">
            <div className="mb-4 sm:mb-5 md:mb-6 lg:mb-7 xl:mb-8">
              <input
                type="email"
                value={formData.email}
                onChange={handleInputChange}
                name="email"
                placeholder="Enter Your Email"
                className="font-graydesign bg-transparent w-full p-1 sm:p-2 md:p-2 lg:p-3 xl:p-4 mb-4 sm:mb-5 md:mb-6 lg:mb-7 xl:mb-8 border-l border-t border-solid border-[rgba(255,255,255,0.3)] rounded-[5000px] backdrop-blur-[5px] shadow-custom text-white text-shadow-custom font-bold  placeholder:text-white text-[14px] sm:text-[15px] md:text-[16px] lg:text-[18px] xl:text-[20px]"
                required
              />
            </div>

            <div className="mb-4 sm:mb-5 md:mb-6 lg:mb-7 xl:mb-8">
              <input
                type="password"
                value={formData.password}
                onChange={handleInputChange}
                name="password"
                placeholder="Password"
                className="font-graydesign bg-transparent w-full p-1 sm:p-2 md:p-2 lg:p-3 xl:p-4 mb-4 sm:mb-5 md:mb-6 lg:mb-7 xl:mb-8 border-l border-t border-solid border-[rgba(255,255,255,0.3)] rounded-[5000px] backdrop-blur-[5px] shadow-custom text-white text-shadow-custom font-bold  placeholder:text-white text-[14px] sm:text-[15px] md:text-[16px] lg:text-[18px] xl:text-[20px]"
                required
              />
            </div>

            <div className="mt-6 sm:mt-7 md:mt-8 lg:mt-9 xl:mt-10">
              <button
                type="submit"
                disabled={loading}
                className="w-full sm:w-[180px] md:w-[200px] lg:w-[220px] xl:w-[240px] font-graydesign bg-transparent_white text-white text-shadow-custom py-1 sm:py-2 md:py-2 lg:py-3 xl:py-4 rounded-[5000px] text-[14px] sm:text-[16px] md:text-[18px] lg:text-[20px] xl:text-[22px] leading-[24px] sm:leading-[26px] md:leading-[28px] lg:leading-[30px] xl:leading-[32px] shadow-custom transition-all duration-200 ease-in-out hover:bg-[#6F86A8] opacity-50 active:bg-[rgba(255,255,255,0.2)]"
              >
                {loading ? <HashLoader size={25} color="#fff" /> : "Log In"}
              </button>
            </div>

            <p className="font-graydesign mt-4 sm:mt-5 md:mt-6 lg:mt-7 xl:mt-8 text-white opacity-70 text-[12px] sm:text-[13px] md:text-[14px] lg:text-[16px] xl:text-[18px] text-shadow-custom">
              Don't have an account?
              <Link
                to="/register"
                className="text-[#6F86A8] font-medium ml-1 font-graydesign"
              >
                Register
              </Link>
            </p>
          </form>
        </div>
      </section>
    </>
  );
};
export default Login;
