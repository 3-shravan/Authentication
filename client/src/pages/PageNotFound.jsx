import React from "react";

const PageNotFound = () => {
  return (
    <div className="bg-zinc-950 font-bold h-screen text-white text-5xl flex flex-col items-center justify-center ">
      <h1 className="text-8xl text-red-500 text-center inline-block ">
        ERROR 404
      </h1>
      <span className="font-bold text-zinc-800 text-center text-4xl">
        Page Do Not Exist
      </span>
    </div>
  );
};

export default PageNotFound;
