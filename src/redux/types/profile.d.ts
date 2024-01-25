import type { PayloadAction } from '@reduxjs/toolkit';
import type { IUserProfile } from '../../types';

export interface IProfileState {
  profile: IUserProfile;
}

export type IAddProfileAction = PayloadAction<IUserProfile>;
