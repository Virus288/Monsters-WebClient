import type { MainDispatch } from '../../redux/types';
import * as hooks from '../../redux';

export const toggleSettings = (dispatch: MainDispatch, state: boolean): void => {
  if (state) {
    dispatch(hooks.closeSettingsPanel());
  } else {
    dispatch(hooks.openSettingsPanel());
  }
};

export const toggleAccount = (dispatch: MainDispatch, state: boolean): void => {
  if (state) {
    dispatch(hooks.closeAccountPanel());
  } else {
    dispatch(hooks.openAccountPanel());
  }
};
