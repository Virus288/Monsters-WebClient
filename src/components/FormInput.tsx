import type { HTMLInputTypeAttribute } from 'react';
import React, { useState } from 'react';

type IInputProps ={
  label:string;
  type:HTMLInputTypeAttribute ;
  placeholder:string;
  onHandleChange:(e:React.ChangeEvent<HTMLInputElement>,name:string)=>void;
  required:boolean;
  name:string;

}

const FormInput:React.FC<IInputProps> = ({ label, type, name, placeholder,errorMessage, onHandleChange, ...inputprops}) => {

 const [focused, setFocused] = useState(false);

 const handleFocus = () =>{
  setFocused(true);
 };
  return (
    <div>
    <label htmlFor="" className="flex flex-col gap-3  w-[300px]">
      <span className="text-slate-500 text-sm">{label}</span>
      <input
      {...inputprops}
       onBlur={(e) => handleFocus(e)}
        focused={focused.toString()}
        type={type}
        placeholder={placeholder}
        onChange={(e) => onHandleChange(e, name)}
        className="px-2  rounded-[4px] h-12 bg-dark-4 text-slate-300 placeholder:text-slate-700"
      />
    </label>
    <span className='text-rose-400'>{errorMessage}</span>
    </div>
  );
};

export default FormInput;
