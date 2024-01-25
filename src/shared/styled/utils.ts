import type { MainDispatch } from '../../redux/types';
import * as hooks from '../../redux';

// eslint-disable-next-line import/prefer-default-export
export const toggleSettings = (dispatch: MainDispatch, state: boolean): void => {
  if (state) {
    dispatch(hooks.closeSettings());
  } else {
    dispatch(hooks.openSettings());
  }
};
