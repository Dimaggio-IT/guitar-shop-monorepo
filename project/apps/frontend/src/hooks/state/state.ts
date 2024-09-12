import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import type { TState, TAppDispatch } from '../../common';

const useAppDispatch = () => useDispatch<TAppDispatch>();

const useAppSelector: TypedUseSelectorHook<TState> = useSelector;

export { useAppDispatch, useAppSelector };
