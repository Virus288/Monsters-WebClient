import React from 'react'
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
  } from "./ui/alert-dialog"

const Portal = ({children,button,triggerFn}) => {
  return (
    <AlertDialog >
  <AlertDialogTrigger>
    {button}
  </AlertDialogTrigger>
  <AlertDialogContent className='w-[290px] bg-dark-2 border-dark-4 md:w-[490px] h-[350px]'>

    {children}
  
     <div className=' flex justify-end w-[90%] gap-2 mt-3 '>
 
      <AlertDialogCancel className='bg-transparent text-slate-400 border-none hover:bg-gray-500 hover:text-slate-900 hover:font-semibold'>Cancel</AlertDialogCancel>
      <AlertDialogAction className='bg-violet-800' onClick={triggerFn}>Continue</AlertDialogAction>
     </div>
  </AlertDialogContent>
</AlertDialog>
  )
}

export default Portal