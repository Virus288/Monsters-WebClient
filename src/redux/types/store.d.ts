import type mainStore from '../store';

export type MainDispatch = typeof mainStore.dispatch;
export type MainState = ReturnType<typeof mainStore.getState>;
