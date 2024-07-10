import React from "react";
import SlideBanner from "./SlideBanner";

const Banner = () => {
  return (
    <div className="relative h-[400px] bg-cover bg-center bg-banner">
      <div className="absolute inset-0 bg-black opacity-60"></div>
      <div className="relative h-[400px] flex flex-col pt-25 justify-around">
        <div className="text-center flex flex-col gap-3">
          <h1 className="text-4xl xl:text-6xl font-bold text-blue-400">
            CryptoTracker
          </h1>
          <p className="text-xs md:text-xl">
            Developed by Subigya Subedi...
          </p>
        </div>

        <div className="h-[50%] flex flex-col justify-center text-center bg-red-00">
          <SlideBanner />
        </div>
      </div>
    </div>
  );
};

export default Banner;
