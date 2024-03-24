import type { ReactNode } from 'react';

export type IPortalProps = {
  children: ReactNode;
  openButton: ReactNode;
  confirmButtonLabel: string;
  cancelButtonLabel: string;
  deleteButtonLabel: string;
  isPortalOpen: boolean;
  className?: string;
  triggerFn: () => void;
  handleClose: () => void;

};
