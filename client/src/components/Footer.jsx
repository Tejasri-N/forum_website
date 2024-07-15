import React from "react";
import Logo from "../assets/Logo1.png";

function Footer() {
  return (
    <div className="footer-container bg-custom-footer-bg w-[100%] h-[15vh]">
      {/* <div className="banner flex justify-center">
        <img src={Logo} alt="Data In Your Hands" className="h-auto w-14 m-3" />
        <div className="banner-text top-1/2 left-1/2 transform -translate-y-1/2 text-white font-bold w-25 mx-10">
          Data In Your Hands
        </div>
      </div> */}
      <div className="banner flex justify-center">
        <img src={Logo} alt="Data In Your Hands" className="h-auto w-14 m-3" />
        <div className="banner-text text-white font-bold w-25 flex items-center">
          Data In Your Hands
        </div>
      </div>
      <div className="footer-content flex justify-center text-white">
        {/* Add your footer content here */}
        &copy; 2024, Data In Your Hands. All rights reserved.
      </div>
    </div>
  );
}

export default Footer;
