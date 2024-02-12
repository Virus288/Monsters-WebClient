import React, { useState } from "react";
import { Button } from "../../components/ui/button";
import { Link } from "react-router-dom";
import { sendToLoginPage } from "../../clientApi/clientApi";

const LandingPage = () => {

  const LOGIN_URL = import.meta.env.VITE_API_REDIRECT_LOGIN_URL
  
  return (
    <div className=" flex flex-col justify-center gap-6 items-center  h-screen flex-1">
      <h2 className="text-slate-400 text-6xl md:text-7xl lg:text-8xl font-bold"><span className="text-violet-600">M</span>onsters</h2>
<p className="text-slate-300 text-lg font-semibold">
 Text based <span className="text-slate-400">terminal</span> Role Play game. 
</p>
      <div className=" w-full  flex flex-col items-center lg:flex-row  justify-center gap-10  h-1/4">
       
          <div 
          onClick={()=>sendToLoginPage()}
          className="  text-slate-200  border-2 text-center text-2xl border-slate-600 font-semibold  w-[250px] lg:w-auto lg:text-lg rounded-[4px] px-5 py-3 ">Login</div>
     
        <Link to="/register">
          <div className="text-slate-200 border-2 border-slate-600 text-center text-2xl font-semibold px-5 py-3 rounded-[4px] w-[250px] lg:w-auto  lg:text-lg  ">Join</div>
        </Link>
      </div>
    </div>
  );
};

export default LandingPage;
