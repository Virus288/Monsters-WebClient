import {
  BrowserRouter as Router,
  Route,
  Routes,

} from 'react-router-dom';
import './App.css';
import { QueryClient} from 'react-query';
import { useEffect, useState } from 'react';
import RootLayout from './_root/RootLayout';
import Home from './_root/pages/Home';
import AuthLayout from './_auth/AuthLayout';
import Register from './_auth/pages/register/Register';
import Login from './_auth/pages/Login';
import LandingPage from './_auth/pages/LandingPage';
import Cookies from './tools/cookies';
import { loginUser } from './controllers';
import { useAccountStore,useProfileStore } from './zustand/store';
import RootLoader from './components/RootLoader';
import AuthLoader from './components/AuthLoader';

const  App=():React.FC=> {

const [isRootRdy,setIsRootRdy]=useState(false);
const [isAuthRdy,setIsAuthRdy]=useState(false);


const acc = useAccountStore((state)=>state.account);
const isLoggedIn = useAccountStore((state)=>state.isLoggedIn);


const { setAccount } = useAccountStore.getState();
const { setProfile } = useProfileStore.getState();
const { setIsLoggedIn } = useAccountStore.getState();






  useEffect(() => {
    const accessToken = new Cookies().getToken('monsters.uid');

    if (accessToken) {
      loginUser(accessToken).then((data,profile)=>{
          setAccount({ id: data?.sub, login: data?.login });
  setProfile(profile);
  setIsLoggedIn(true);


      });
    }
setTimeout(() => {
    setIsRootRdy(true);
    setIsAuthRdy(true);
}, 500);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  // if(!rdy){
  //   return(
  //     <Loader />
  //   );
  // }


  return (
<main className='bg-[#010B00]'>
<Router>
<Routes>

<Route element={isAuthRdy?<AuthLayout/>:<AuthLoader/>}>

<Route path='/' element={<LandingPage/>}/>
<Route path='/register' element={<Register/>}/>


</Route>

<Route element={isRootRdy?<RootLayout/>:<RootLoader/>}>

<Route path='/terminal' element={<Home/>}/>



</Route>



  </Routes>


</Router>
</main>
  );
};

export default App;
