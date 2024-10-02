import React from "react";
import { Link } from "react-router-dom";

const PageNotFound = () => {
  return (
    <>
      <div className="container h-screen w-full flex justify-center items-center">
        <div className="h-56 w-full m-52 p-14 bg-sky-300 text-center rounded-lg">
          <h1 className="text-5xl font-bold text-slate-600 mb-12">
            Page Not Found!!
          </h1>
          <Link to={'/'} className="mt-36 text-white font-bold text-2xl rounded-xl hover:bg-pink-800 bg-pink-700 p-4">Back to Home</Link>
        </div>
      </div>
    </>
  );
};

export default PageNotFound;
