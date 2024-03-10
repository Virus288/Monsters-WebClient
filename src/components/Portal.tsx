import type { ReactNode } from 'react';
import React from 'react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogTrigger,
} from './ui/alert-dialog';

type IPortalProps = {
  children: ReactNode;
  button: ReactNode;
  triggerFn: () => void;
};

const Portal: React.FC<IPortalProps> = ({ children, button, triggerFn }) => {
  return (

    <AlertDialog >
      <AlertDialogTrigger>{button}</AlertDialogTrigger>
      <AlertDialogContent className="min-w-[270px]  bg-dark-2 border-dark-4 md:min-w-[700px] lg:min-w-[900px] h-[500px]  flex flex-col justify-between gap-8 ">
       <div className='h-[100%]'>
         {children}
       </div>

        <div className=" flex justify-end w-[100%] gap-2 mt-3  ">
          <AlertDialogCancel className="bg-transparent text-slate-400 border-none hover:bg-transparent hover:text-slate-300">
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction className="bg-violet-800 hover:bg-violet-700" onClick={triggerFn}>
            Sumbit
          </AlertDialogAction>
        </div>
      </AlertDialogContent>
    </AlertDialog>

  );
};

export default Portal;
