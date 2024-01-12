import { Link } from "react-router-dom";

const NoPageFound = () => {
  return (
    <div>
      {" "}
      <div className="h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center">
          <h1 className="text-6xl font-bold text-gray-800">404</h1>
          <p className="text-2xl font-light text-gray-600">Page not found</p>
          <div className="mt-6">
            <Link to="/">
              <a className="text-blue-600 hover:text-blue-700 text-lg">
                Go back home
              </a>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NoPageFound;
