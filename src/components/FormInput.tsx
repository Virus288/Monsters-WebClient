import React from 'react'

const FormInput = ({label,type,name,placeholder,onHandleChange, ...inputProps}) => {
  return (
   
    <label htmlFor="" className="flex flex-col gap-3  w-[300px]">
    <span className="text-slate-500 text-sm">{label}</span>
    <input 
    type={type} 
    placeholder={placeholder}
    onChange={(e)=>onHandleChange(e,name)}
    className="px-2  rounded-[4px] h-12 bg-dark-4 text-slate-300 placeholder:text-slate-700" />
  </label>

  )
}

export default FormInput