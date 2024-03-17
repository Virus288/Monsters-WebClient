import React from 'react';

const ReportBugForm: React.FC<{
  setBugReport: React.Dispatch<React.SetStateAction<string>>;
}> = ({ setBugReport }) => {
  return (
    <form className="h-[100%]">
      <label className="text-slate-300 text-xl font-semibold">Report a Bug</label>
      <textarea onChange={(e) => setBugReport(e.target.value)} className="shad-textarea" maxLength={300} />
      <div className="text-slate-300">
        Reporting bug in this form is useful, but we might see if faster, if you report it{' '}
        <a
          href="https://github.com/Monsters-RPG-game/WebClient/issues"
          target="_blank"
          rel="noreferrer"
          className="text-rose-600"
        >
          Here.{' '}
        </a>
        Thank you in advance.
      </div>
    </form>
  );
};

export default ReportBugForm;
