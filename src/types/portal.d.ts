import type { ReactNode } from 'react';

export type IPortalProps = {
  children: ReactNode;
  openButton: ReactNode;
  confirmButtonLabel: string;
  cancelButtonLabel: string;
  isPortalOpen: boolean;
  triggerFn: () => void;
  handleClose: () => void;

};
