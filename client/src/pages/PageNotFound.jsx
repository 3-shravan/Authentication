import React from "react";

const PageNotFound = () => {
  return (
    <div className="bg-black  h-screen text-white text-2xl flex flex-col items-center justify-center ">
      <h1 className="text-4xl text-red-500 font-semibold text-center inline-block ">
        ERROR 404 {" - "}
        <span className="font-semibold text-zinc-800 text-center text-4xl">
          PAGE NOT FOUND.
        </span>
      </h1>

    </div>
  );
};

export default PageNotFound;
