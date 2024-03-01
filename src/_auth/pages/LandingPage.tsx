import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useMutation, useQuery } from 'react-query';
import { log } from 'console';
import { Button } from '../../components/ui/button';
import { sendToLoginPage, userLogin,login } from '../../clientApi';
import Portal from '../../components/Portal';
import { loginUser } from '../../controllers';


const LandingPage: React.FC = () => {
  const [login, setLogin] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const navigate = useNavigate();
const params = new URLSearchParams(window.location.search);
    const code = params.get('code');
    console.log(code);

  // const navigateFn =(url:string):void=>{
  //   navigate(url);
  // };




  // const mutation = useMutation(sendToLoginPage, {
  //   onSuccess: (data: Record<string, string>) => loginUser(data.token,navigateFn),
  //   onError: (e:Error) => console.log(e),
  // });



  return (
    <div className=" flex flex-col justify-center gap-6 items-center  h-screen flex-1">
      <h2 className="text-slate-400 text-6xl md:text-7xl lg:text-8xl font-bold">
        <span className="text-violet-600">M</span>onsters
      </h2>
      <p className="text-slate-300 text-lg font-semibold">
        Text based <span className="text-slate-400">terminal</span> Role Play game.
      </p>
      <div className=" w-full  flex flex-col items-center lg:flex-row  justify-center gap-10  h-1/4">

    <Button className="text-slate-200 font-semibold text-lg bg-violet-900 px-6 " variant="ghost" onClick={(e)=>{
      e.preventDefault();
      sendToLoginPage();
    }}>
            Login
          </Button>
        <Link to="/register">
          <Button className="text-slate-200 font-semibold text-lg bg-violet-900 px-6 " variant="ghost">
            Join
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default LandingPage;
