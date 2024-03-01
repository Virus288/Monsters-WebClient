import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AiOutlineSmallDash } from 'react-icons/ai';
import AuthLoader from '../../components/AuthLoader';
import { login } from '../../clientApi';
import Cookies from '../../tools/cookies';
import { loginUser } from '../../controllers';


const Login: React.FC = () => {
const navigate = useNavigate();


useEffect(()=>{

const params = new URLSearchParams(window.location.search);
    const code = params.get('code');
if(!code) navigate('/');


  login(code).then(({  access_token, refresh_token,expires_in})=>{

     new Cookies().addLoginToken(access_token as string, expires_in as number);
  new Cookies().addRefreshToken(refresh_token as string, (expires_in as number) * 2);


loginUser(access_token).then(()=>navigate('/terminal')).catch((e)=>{
  console.log(e);
  navigate('/');
});
  }).catch((e)=>{
    console.log(e);  navigate('/');});

},[]);
return(
  <AuthLoader/>
);
};

export default Login;
