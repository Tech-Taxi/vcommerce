import React from "react";
import { Link } from "react-router-dom";
import BgImage from '../assets/backhero.jpg';

const HomeHero = () => {
  return (
    <div className="bg-no-repeat bg-cover" style={{backgroundImage: `url(${BgImage})`}}>
      <div className="max-w-[650px] mx-16 h-screen flex flex-col justify-center">
        <p className="text-black font-bold p-2 md:text-4xl sm:text-3xl text-xl pl-20">
          Your Unique VIT Market
        </p>

        <h1 className="text-[#69CC55] font-bold p-2 md:text-5xl sm:text-4xl text-2xl pl-20">
          VCommerce
        </h1>

        <div className="md:text-5xl sm:text-4xl text-xl font-bold py-4 pl-5 pt-20">
          From Books to Gadgets
        </div>
        <p className="md:text-xl text-2xl text-gray-700 pt-30 pl-5">
          Beyond Classes, Connect through Commerce - VIT, Let's Vcommerce
        </p>
        <Link to="/login" className="w-max my-6 mx-10">
          <button className="bg-black rounded-md py-3 px-8 text-[#B6FFA2] font-medium hover:-translate-y-0.5 hover:shadow-md transition-all">
            Get Started
          </button>
        </Link>
      </div>
    </div>
  );
};

export default HomeHero;
