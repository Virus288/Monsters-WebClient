import type mainStore from '../redux/store';

declare global {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  interface Window {
    store: typeof mainStore;
  }
}
