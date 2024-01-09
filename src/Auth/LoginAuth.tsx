import LoginImage from "../assets/images/signup-image.png";
import { Link } from "react-router-dom";

const LoginAuth = () => {
  return (
    <div>
      <div className="grid grid-cols-1 lg:grid-cols-2 h-screen w-full text-[#424242] font-medium">
        <div>
          <form className="lg:max-w-[600px] w-full lg:mx-20 rounded-lg p-8 px-8">
            <div className="flex justify-between text-accent font-extrabold">
              <h1>JUKWAA</h1>
            </div>

            <h2 className="text-start text-3xl md:text-5xl font-bold pt-16 md:pt-28 pb-8 text-accent">
              Login
            </h2>
            <div className="flex flex-col py-4">
              <label className="text-start text-base">Username / Email</label>
              <input
                type="email"
                name=""
                placeholder="Joe@gmail.com"
                id="email"
                className="text-base rounded-md mt-2 px-4 py-3 focus:bg-gray-100 focus:outline-2 focus:outline-[#6C2D1B] outline outline-1 outline-[#D9D9D9]"
              />
            </div>
            <div className="flex flex-col py-4">
              <label className="text-start text-base">Password</label>
              <input
                type="password"
                name=""
                id="password"
                placeholder="**********"
                className="text-base rounded-md mt-2 px-4 py-3 focus:bg-gray-100 focus:outline-2 focus:outline-[#6C2D1B] outline outline-1 outline-[#D9D9D9]"
              />
            </div>
            <p className="text-start">
              <input className="mr-2" type="checkbox" />
              Remember Me
            </p>

            <button
              type="submit"
              className="w-full my-5 py-4 bg-[#6C2D1B] shadow-lg hover:shadow-[#6C2D1B]/40 text-BackgroundOne font-semibold rounded-md text-xl mt-16"
            >
              Login
            </button>

            <div className="flex justify-between">
              <p>
                Forgot password?{" "}
                <span className="text-[#6C2D1B] underline">Click here</span>
              </p>
              <Link to="/register">
                <p className="text-[#6C2D1B] underline">Create Account</p>
              </Link>
            </div>
          </form>
        </div>

        <div className="hidden lg:block relative">
          <img src={LoginImage} alt="" className="w-full h-full object-cover" />
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
  );
};

export default LoginAuth;
