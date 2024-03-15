import React from 'react';
import { useForm } from 'react-hook-form';
import { useMutation } from 'react-query';
import { handleBugReport } from '../../communication';

const ReportBugForm: React.FC = () => {
  const { handleSubmit } = useForm();

  const mutation = useMutation(handleBugReport, {
    // onSuccess:()=>console.log('SUCESS'),
    // onError:(e)=>console.log(e)
  });

  const onSubmit = handleSubmit((data): void => {
    mutation.mutate(data);
  });

  return (
    <form onSubmit={onSubmit} className="h-[100%]">
      <label className="text-slate-300 text-xl font-semibold">Report a Bug</label>

      <textarea className="shad-textarea" />
    </form>
  );
};

export default ReportBugForm;
