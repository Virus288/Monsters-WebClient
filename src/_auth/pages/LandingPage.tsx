import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { PiCookieDuotone } from 'react-icons/pi';
import { Button } from '../../components/ui/button';
import { sendToLoginPage } from '../../communication';
import Portal from '../../components/Portal';

const LandingPage: React.FC = () => {

  const [isPrivacyPopupVisible, setIsPrivacyPopupVisible] = useState(false);


  useEffect(() => {
    const privacyPolicy = localStorage.getItem('privacyPolicy');


    if (!privacyPolicy) {
      setIsPrivacyPopupVisible(true);
    }



  }, []);




  return (
    <div className=" flex flex-col justify-center gap-6 items-center min-h-[100%]   h-screen flex-1">
      <h2 className="text-slate-400 text-6xl md:text-7xl lg:text-8xl font-bold">
        <span className="text-violet-600">M</span>onsters
      </h2>
      <p className="text-slate-300 text-lg font-semibold">
        Text based <span className="text-slate-400">terminal</span> Role Play game.
      </p>
      <div className=" w-full  flex flex-col items-center lg:flex-row  justify-center gap-10  h-1/4">
        <Button
          className="text-slate-200 font-semibold text-lg bg-violet-900 px-6 "
          variant="ghost"
          onClick={(e) => {
            e.preventDefault();
            sendToLoginPage();
          }}
        >
          Login
        </Button>
        <Link to="/register">
          <Button className="text-slate-200 font-semibold text-lg bg-violet-900 px-6 " variant="ghost">
            Join
          </Button>
        </Link>
      </div>
      <Portal
        handleClose={() => setIsPrivacyPopupVisible(prevState => !prevState)}
        confirmButtonLabel="Accept"

        isPortalOpen={isPrivacyPopupVisible}
        triggerFn={() => {
          localStorage.setItem('privacyPolicy', '1');
          setIsPrivacyPopupVisible(false);
        }}
      >

        <div className='flex flex-col justify-evenly items-center h-full px-20 '>
          <PiCookieDuotone color='white' size='118' />
          <h2 className='text-slate-500 text-3xl font-bold tracking-tight '>WE USE COOKIES</h2>
          <p className='text-slate-200 text-base leading-7'>

            We would like to inform you that our website uses cookies solely for account validation.
            Cookies are essential to ensure the security of your account and customize content according to your preferences.
            By accepting our privacy policy and the use of cookies, you enable full access to the features of our application.
            Click <span className='font-semibold text-violet-300'>"Accept"</span> to continue using our website.
          </p>
        </div>

      </Portal>
    </div>
  );
};

export default LandingPage;
