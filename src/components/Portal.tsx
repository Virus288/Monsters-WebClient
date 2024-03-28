import { useCallback, useState } from 'react';
import * as dialogs from './ui/alert-dialog';
import type { IPortalProps } from '../types/portal';
import DeleteAccountForm from './forms/DeleteAccountForm';

const Portal: React.FC<IPortalProps> = ({ className, children, openButton, handleClose, triggerFn, isPortalOpen, confirmButtonLabel, cancelButtonLabel, deleteButtonLabel }) => {

  const [cofirmDialog, setConfrimDialog] = useState(false)

  return (
    <dialogs.AlertDialog open={isPortalOpen}  >
      <dialogs.AlertDialogTrigger>{openButton}</dialogs.AlertDialogTrigger>
      <dialogs.AlertDialogContent className={className as string}>
        <div className={cofirmDialog ? 'h-[30%]' : 'h-[100%]'}>{children}</div>
        <dialogs.AlertDialogCancel className=" absolute top-0 right-0 bg-transparent text-slate-400 my-2 border-none hover:bg-transparent hover:text-slate-300" onClick={() => { handleClose(); setConfrimDialog(false) }}>
          &#x2716;
        </dialogs.AlertDialogCancel>
        {!cofirmDialog ? (<div className="flex  flex-col-reverse  gap-2 mt-3 md:flex-row">

          <div className='flex flex-col w-3/4 mx-auto md:flex-row md:justify-start md:px-6'>
            {deleteButtonLabel && <dialogs.AlertDialogAction className=" bg-rose-800 hover:bg-rose-700 my-2" onClick={() => setConfrimDialog(true)}>
              {deleteButtonLabel}
            </dialogs.AlertDialogAction>}
          </div>
          <div className='flex flex-col w-3/4 mx-auto md:flex-row md:justify-end '>
            {cancelButtonLabel && <dialogs.AlertDialogCancel className="bg-transparent text-slate-400 my-2 border-none hover:bg-transparent hover:text-slate-300" onClick={handleClose}>
              {cancelButtonLabel}
            </dialogs.AlertDialogCancel>}
            {confirmButtonLabel && <dialogs.AlertDialogAction className="bg-violet-800 hover:bg-violet-700" onClick={triggerFn}>
              {confirmButtonLabel}
            </dialogs.AlertDialogAction>}
          </div>

        </div>)
          : (
            <DeleteAccountForm
              triggerFn={triggerFn}
            />
          )
        }
      </dialogs.AlertDialogContent>
    </dialogs.AlertDialog>
  );
};

export default Portal;
