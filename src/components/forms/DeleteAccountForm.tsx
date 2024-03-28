import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { AiFillEyeInvisible } from 'react-icons/ai';
import { MdVisibility } from 'react-icons/md';
import type { IDeleteAccountFormProps } from '../../types';



const DeleteAccountForm: React.FC<IDeleteAccountFormProps> = ({ triggerFn }) => {

    const [isPasswordVisible, setIsPasswordVisible] = useState(false)
    const {
        register, handleSubmit, formState: { errors, isValid } } = useForm({
            defaultValues: {
                password: ''
            },
        });

    const submitHandler = async (data) => {
        await triggerFn(data)
    }


    return (
        <div className='h-[100%]  '>
            <form action="" className='h-full flex flex-col gap-y-6' onSubmit={handleSubmit(submitHandler)} >
                <div className='relative w-full'>
                    <input
                        {...register("password", {
                            minLength: {
                                value: 8,
                                message: "Password is too short."
                            },
                            required: {
                                value: true,
                                message: "Password is required"
                            }
                        })}
                        type={isPasswordVisible ? 'text' : 'password'}
                        id='confirm'
                        className='w-full h-10 shad-textarea'

                    />
                    {!isPasswordVisible ? (
                        <MdVisibility

                            color='#cbd5e1'
                            className='absolute top-[25%] right-0 m-2 cursor-pointer w-5 h-auto'
                            onClick={() => setIsPasswordVisible(true)}
                        />)
                        : (<AiFillEyeInvisible
                            color='#cbd5e1'
                            className='absolute top-[25%] right-0 m-2 cursor-pointer w-5 h-auto'
                            onClick={() => setIsPasswordVisible(false)}
                        />)}
                </div>

                {errors.password && <span>{errors.password.message}</span>}
                <button
                    type='submit'
                    className='text-slate-200 font-bold bg-green-900 py-2 px-2 rounded-lg cursor-pointer disabled:opacity-60'

                    disabled={!isValid}
                >Confirm</button>
                <button type='button' onClick={() => setConfrimDialog(false)} className='text-slate-200 font-bold bg-rose-950 py-2 px-2 rounded-lg'>Cancel</button>

            </form>
        </div>
    )
}

export default DeleteAccountForm;