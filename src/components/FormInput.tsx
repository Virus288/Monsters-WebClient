import type { HTMLInputTypeAttribute } from 'react';
import React from 'react';

type IInputProps = {
  label: string;
  type: HTMLInputTypeAttribute;
  placeholder: string;
  onHandleChange: (e: React.ChangeEvent<HTMLInputElement>, name: string) => void;
  name: string;
};

const FormInput: React.FC<IInputProps> = ({ label, type, name, placeholder, onHandleChange }) => {
  return (
    <label htmlFor="" className="flex flex-col gap-3  w-[300px]">
      <span className="text-slate-500 text-sm">{label}</span>
      <input
        type={type}
        placeholder={placeholder}
        onChange={(e) => onHandleChange(e, name)}
        className="px-2  rounded-[4px] h-12 bg-dark-4 text-slate-300 placeholder:text-slate-700"
      />
    </label>
  );
};

export default FormInput;
