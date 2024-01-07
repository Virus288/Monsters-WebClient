import type { TypedUseSelectorHook } from 'react-redux';
import { useDispatch, useSelector } from 'react-redux';
import type { MainDispatch, MainState } from './types';

export const useMainDispatch = (): MainDispatch => useDispatch<MainDispatch>();

export const useMainSelector: TypedUseSelectorHook<MainState> = useSelector;
