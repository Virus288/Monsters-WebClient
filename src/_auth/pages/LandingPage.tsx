import React, { useState } from "react";
import { Button } from "../../components/ui/button";
import { Link } from "react-router-dom";
import { getUserLogin, getUserProfile, sendToLoginPage, userLogin } from "../../clientApi/clientApi";
import Portal from "../../components/Portal";
import Cookies from "../../tools/cookies";
import { useMutation } from "react-query";
import { useAccountStore } from "../../zustand/store";



const LandingPage = () => {
  const [login,setLogin]=useState<string>('')
  const [password,setPassword]=useState<string>('')
  const [cookie, setCookie] = useState<string | undefined>(undefined);
  const setUser = useAccountStore((state) => state.setAccount);

  const addCookie = (): void => {
   
      console.log('Adding cookie. Please refresh the page after adding');
      new Cookies().addLoginToken(cookie ?? '', Date.now() + 1000 * 60 * 24 * 30);

  };

const loginUser= async(cookie:string)=>{
  new Cookies().addLoginToken(cookie, Date.now() + 1000 * 60 * 24 * 30)
 const data=  await getUserLogin()
 console.log(data)
 setUser({id:data.sub,login:data.login})
  // await getUserProfile(data.id)
}

  const mutation = useMutation(userLogin,{
    onSuccess:(data)=>loginUser(data.token),
    onError:(e)=>console.log(e)
  })


  const handleLogin =(data)=>{
    mutation.mutate(data)
  }

  return (
    <div className=" flex flex-col justify-center gap-6 items-center  h-screen flex-1">
      <h2 className="text-slate-400 text-6xl md:text-7xl lg:text-8xl font-bold"><span className="text-violet-600">M</span>onsters</h2>
<p className="text-slate-300 text-lg font-semibold">
 Text based <span className="text-slate-400">terminal</span> Role Play game. 
</p>
      <div className=" w-full  flex flex-col items-center lg:flex-row  justify-center gap-10  h-1/4">
      <Portal button={<Button className="text-slate-200 text-lg" variant="ghost">Login</Button>} triggerFn={()=>handleLogin({login,password})} >
<div className="flex flex-col justify-evenly  ">
<label className=" text-slate-400 font-semibold mb-6" htmlFor="login">Login</label>
  <input  placeholder="login" onChange={(e) => setLogin(e.target.value)} id="cookie" type="text"  
  className="w-[80%]  rounded-[5px] mx-auto py-3 bg-dark-4 outline-none px-2 text-slate-400"/>
  <label className=" text-slate-400 font-semibold mb-6" htmlFor="cookie">Password</label>
    <input  placeholder="password" onChange={(e) => setPassword(e.target.value)} id="cookie" type="password"  
  className="w-[80%]  rounded-[5px] mx-auto py-3 bg-dark-4 outline-none px-2 text-slate-400"/>
    
</div>
      </Portal>

        <Link to="/register">
          <Button className="text-slate-200 font-semibold text-lg bg-violet-900 px-6 " variant="ghost">Join</Button>
        </Link>
    
      </div>
    </div>
  );
};

export default LandingPage;
