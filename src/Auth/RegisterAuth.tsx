import { Link } from "react-router-dom";
import LoginImage from "../assets/images/signup-image.png";
import { useState } from "react";
import supabase from "../config/superbaseClient";

const RegisterAuth = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
  });
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  function handleChange(event: { target: { name: any; value: any } }) {
    setFormData((prevFormData) => {
      return {
        ...prevFormData,
        [event.target.name]: event.target.value,
      };
    });
  }

  async function handleSubmit(e: { preventDefault: () => void }) {
    e.preventDefault();
    setErrorMessage("");
    if (
      !formData.fullName.trim() ||
      !formData.email.trim() ||
      !formData.password.trim()
    ) {
      setErrorMessage("Please fill in all fields.");
      return; // Stop the function if any field is empty
    }

    try {
      const { data, error } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          data: {
            full_name: formData.fullName,
          },
        },
      });
      if (error) {
        console.log(error.message);
      } else if (data)
        setSuccessMessage("Successful: Check Your Email For Verification");
      setFormData({ fullName: "", email: "", password: "" });
      console.log(data);
    } catch (error) {
      if (error instanceof Error) {
        setErrorMessage(error.message);
      } else {
        setErrorMessage("An unexpected error occurred.");
      }
    }
  }

  // console.log(formData);

  return (
    <div>
      <div>
        <div className="grid grid-cols-1 lg:grid-cols-2 h-screen w-full text-[#424242] font-medium">
          <div>
            <form
              className="lg:max-w-[600px] w-full lg:mx-20 rounded-lg p-8 px-8"
              onSubmit={handleSubmit}
            >
              <div className="flex justify-between text-accent font-extrabold">
                <h1>JUKWAA</h1>
              </div>

              <h2 className="text-start text-3xl md:text-5xl font-bold pt-16 md:pt-28 pb-8 text-accent">
                Register
              </h2>
              {successMessage && (
                <div className="bg-successTwo px-4 p-1">{successMessage}</div>
              )}
              {errorMessage && (
                <div className="bg-errorTwo px-4 p-1">{errorMessage}</div>
              )}
              <div className="flex flex-col py-4">
                <label className="text-start text-base">Full Name</label>
                <input
                  type="text"
                  name="fullName"
                  placeholder="John Doe"
                  onChange={handleChange}
                  className="text-base rounded-md mt-2 px-4 py-3 focus:bg-gray-100 focus:outline-2 focus:outline-[#6C2D1B] outline outline-1 outline-[#D9D9D9]"
                />
              </div>
              <div className="flex flex-col py-4">
                <label className="text-start text-base">Email</label>
                <input
                  type="email"
                  name="email"
                  placeholder="Joe@gmail.com"
                  onChange={handleChange}
                  className="text-base rounded-md mt-2 px-4 py-3 focus:bg-gray-100 focus:outline-2 focus:outline-[#6C2D1B] outline outline-1 outline-[#D9D9D9]"
                />
              </div>
              <div className="flex flex-col py-4">
                <label className="text-start text-base">Password</label>
                <input
                  type="password"
                  name="password"
                  onChange={handleChange}
                  placeholder="**********"
                  className="text-base rounded-md mt-2 px-4 py-3 focus:bg-gray-100 focus:outline-2 focus:outline-[#6C2D1B] outline outline-1 outline-[#D9D9D9]"
                />
              </div>
              <p className="text-start">
                <input className="mr-2" type="checkbox" />
                Remember Me
              </p>
              <div className="mt-16">
                <button
                  type="submit"
                  className="w-full my-5 py-4 bg-[#6C2D1B] shadow-lg hover:shadow-[#6C2D1B]/40 text-BackgroundOne font-semibold rounded-md text-xl"
                >
                  Register
                </button>
              </div>

              <div className="flex justify-between">
                <p>
                  Forgot password?{" "}
                  <span className="text-[#6C2D1B] underline">Click here</span>
                </p>
                <Link to="/">
                  <p className="text-[#6C2D1B] underline">Login</p>
                </Link>
              </div>
            </form>
          </div>

          <div className="hidden lg:block relative">
            <img
              src={LoginImage}
              alt=""
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-32 left-14 text-BackgroundTwo">
              <h1 className="text-7xl font-extrabold text-white text-start">
                Tujenge inchi yetu Together
              </h1>
              <p className="mt-8 text-start text-2xl">
                With our platform, you can expect to experience greater
                <br /> transparency and accountability from your government.{" "}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterAuth;
