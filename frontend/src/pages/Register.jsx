import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import signupImg from "../assets/images/purple.gif";
import { BASE_URL } from "../config";
import { toast } from "react-toastify";
import uploadImageToCloudinary from "../utils/uploadCloudinary";
import HashLoader from "react-spinners/HashLoader";
import DarkBubblePage from "../components/DarkBubblePage/DarkBubblePage";

const SignUp = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState("");
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    photo: selectedFile,
  });
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileInputChange = async (event) => {
    const file = event.target.files[0];

    if (file) {
      const data = await uploadImageToCloudinary(file);

      setPreviewUrl(data.url);
      setSelectedFile(data.url);
      setFormData({ ...formData, photo: data.url });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch(`${BASE_URL}/auth/register`, {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const { message } = await res.json();

      if (res.status === 400) {
        throw new Error(message);
      }

      setLoading(false);
      toast.success(message);
      navigate("/login");
    } catch (error) {
      toast.error(error.message);
      setLoading(false);
    }
  };

  return (
    <>
      <DarkBubblePage />
      <section className="px-5 xl:px-0">
        <div className="max-w-[1170px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            {/* ============ img box ========= */}
            <div className="hidden lg:block rounded-l-lg">
              <figure className="rounded-l-lg">
                <img
                  className="w-full rounded-l-lg"
                  src="https://i.giphy.com/media/v1.Y2lkPTc5MGI3NjExeDVia3gxZmU2ZDIxNjRnN3l3ZGltbzByOWs5Mmd5aTRxbzc3aTFvZiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9cw/LbN93tzk3P4gL03LXi/giphy.gif"
                  alt=""
                />
              </figure>
            </div>

            <div className="rounded-l-lg lg:pl-16 py-10">
              <h3 className="font-graydesign text-white text-[22px] leading-9 font-bold mb-10">
                Create an <span className="text-babyBlueColor">Account</span>
              </h3>
              <form onSubmit={handleSubmit}>
                <div className="mb-5">
                  <input
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={handleInputChange}
                    placeholder="Username"
                    className="font-graydesign bg-transparent w-full lg:w-[300px] p-[1em] mb-[2em] border-l border-t border-solid border-[rgba(255,255,255,0.3)] rounded-[5000px] backdrop-blur-[5px] text-white font-bold shadow-custom text-shadow-custom  placeholder:text-white"
                    required
                  />
                </div>
                <div className="mb-5">
                  <input
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    name="email"
                    placeholder="Enter Your Email"
                    className="font-graydesign bg-transparent w-full lg:w-[300px] p-[1em] mb-[2em] border-l border-t border-solid border-[rgba(255,255,255,0.3)] rounded-[5000px] backdrop-blur-[5px] text-white font-bold shadow-custom text-shadow-custom  placeholder:text-white"
                    required
                  />
                </div>
                <div className="mb-5">
                  <input
                    type="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    name="password"
                    placeholder="Password"
                    className="font-graydesign bg-transparent w-full lg:w-[300px] p-[1em] mb-[2em] border-l border-t border-solid border-[rgba(255,255,255,0.3)] rounded-[5000px] backdrop-blur-[5px] text-white font-bold shadow-custom text-shadow-custom  placeholder:text-white"
                    required
                  />
                </div>

                <div className="mb-5 flex items-center gap-3">
                  {selectedFile && (
                    <figure className="w-[60px] h-[60px] rounded-full flex items-center justify-center">
                      <img
                        src={previewUrl}
                        alt="Preview"
                        className="w-full rounded-full"
                      />
                    </figure>
                  )}
                  <div className="relative inline-block w-[130px] h-[50px]">
                    <input
                      className="custom-file-input absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer"
                      id="customFile"
                      name="photo"
                      type="file"
                      accept=".jpg,.png"
                      placeholder="Upload Profile"
                      onChange={handleFileInputChange}
                    />

                    <label
                      className="font-graydesign custom-file-label absolute top-0 left-0 w-full h-full flex items-center px-[0.75rem] py-[0.375rem] text-[15px] leading-6 overflow-hidden bg-[#5ef2fd46] text-white font-semibold rounded-[5000px] truncate cursor-pointer"
                      htmlFor="customFile"
                    >
                      {selectedFile ? "Photo Uploaded" : "Upload Photo"}
                    </label>
                  </div>
                </div>

                <div className="mt-7">
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full lg:w-[250px] font-graydesign bg-transparent_white text-white text-shadow-custom py-3 px-4 rounded-[5000px] text-[18px] leading-[30px] shadow-custom transition-all duration-200 ease-in-out hover:bg-[#6F86A8] opacity-50 active:bg-[rgba(255,255,255,0.2)]"
                  >
                    {loading ? (
                      <HashLoader size={25} color="#fff" />
                    ) : (
                      "Sign Up"
                    )}
                  </button>
                </div>

                <p className="font-graydesign mt-5  text-textColor">
                  Already have an account?{" "}
                  <Link to="/login" className="text-[#6F86A8] font-medium">
                    Log In
                  </Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default SignUp;
