import React from "react";
import { Link } from "react-router-dom";
import { FaStarOfDavid } from "react-icons/fa";
import bg10 from "../Front/assest/imgs/bg10.jpg";
import shape from "../Front/assest/imgs/shape.svg";

// Same banner as the Jap page: tarot background, title, breadcrumb and torn edge.
const PageBanner = ({ title }) => (
  <>
    <div
      className="section-8 pt-40 pb-30 text-center text-white relative overflow-hidden"
      style={{ backgroundImage: `url(${bg10})`, backgroundSize: "100%" }}
    >
      <div className="absolute inset-0 bg-black/70"></div>
      <div className="relative z-10">
        <h2 className="text-2xl">{title}</h2>
        <p className="flex text-xs mt-3 justify-center items-center">
          <Link to="/" className="text-white no-underline">Home</Link>
          <FaStarOfDavid className="mx-2" />
          {title}
        </p>
      </div>
    </div>
    <div
      className="w-full h-[100px] rotate-180 mt-[-90px]"
      style={{ backgroundImage: `url(${shape})` }}
    ></div>
  </>
);

export default PageBanner;
