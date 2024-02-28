import React from 'react';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';

const RootLoader: React.FC = () => {
  return (
    <div className="h-screen w-full bg-dark-2 flex justify-center items-center flex-col gap-5">
      <h1 className="text-3xl text-slate-200 ">
      Starting the server...
      </h1>
      <AiOutlineLoading3Quarters color='white ' size={44} className='animate-spin'/>
    </div>
  );
};

export default RootLoader;