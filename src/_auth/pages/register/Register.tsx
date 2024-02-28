import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import type { AxiosError } from 'axios';
import axios from 'axios';
import { useMutation } from 'react-query';
import { handleRegisterConfig } from './registerFormConfig';
import FormInput from '../../../components/FormInput';

import type { IRegisterFormValues } from '../../../types';
import { createAccount } from '../../../clientApi';

const Register:React.FC = () => {
  const [values, setValues] = useState<IRegisterFormValues>({
    login: '',
    password: '',
    confirmPassword: '',
    email: '',
  });
  const inputs = handleRegisterConfig(values);
  const LOGIN_URL = import.meta.env.VITE_API_REDIRECT_LOGIN_URL;
  const mutation = useMutation(createAccount, {
    onSuccess: (data) => console.log(data),
    onError: (error: AxiosError | Error) => console.log(error.message),
  });

  const onHandleChange = (e, name) => {
    setValues((prev) => ({
      ...prev,
      [name]: e.target.value,
    }));
  };

  const handleSubmit = (formData) => {
    console.log(formData);
    mutation.mutate(formData);
  };

  return (
    <div className="flex flex-col justify-center items-center h-screen flex-1">
      <Link to="/">
        <h2 className="text-slate-400 text-8xl font-bold mb-10">
          <span className="text-violet-600">M</span>onsters
        </h2>
      </Link>
      <h3 className="text-slate-200 text-3xl font-bold">Create a new account</h3>
      <p className="text-slate-400 text-sm text-center mt-2">please eneter your details</p>

      <form action="" className="flex flex-col gap-6 mt-6">
        {inputs.map((input) => {
          return <FormInput {...input} key={input.id} onHandleChange={onHandleChange} />;
        })}
        <div className="flex justify-center">
          <span className="text-slate-400">Already have an account?</span>
          <Link to={LOGIN_URL}>
            <p className="text-violet-200 ml-1">Login</p>
          </Link>
        </div>

        <button
          type="button"
          onClick={() => handleSubmit(values)}
          className="bg-violet-700 py-1 text-light-2 font-semibold rounded-[5px] mt-3"
        >
          Sumbit
        </button>
      </form>
    </div>
  );
};

export default Register;
