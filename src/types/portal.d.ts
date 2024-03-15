import type { ReactNode } from 'react';

export type IPortalProps = {
  children: ReactNode;
  button: ReactNode;
  triggerFn: () => void;
};
