import type { EUserActions } from '../enums';

export interface IAvailableCommands {
  action: EUserActions | string;
  target?: string[];
  secondTarget?: string[];
  thirdTarget?: string[];
}
