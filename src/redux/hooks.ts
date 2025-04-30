
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "./store";
import { useEffect, useState } from "react";

// 1. Redux Typed Hooks
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

// 2. Type for Debounce Hook
interface UseDebouncedProps {
  searchQuery: string;
  delay?: number; // Made optional with default value
}

// 3. Custom Debounce Hook
export const useDebounced = ({
  searchQuery,
  delay = 500 // Default delay
}: UseDebouncedProps): string => {
  const [debouncedValue, setDebouncedValue] = useState<string>(searchQuery);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(searchQuery);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [searchQuery, delay]);

  return debouncedValue;
};



// import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
// import type { RootState, AppDispatch } from "./store";
// import { useEffect, useState } from "react";

// // Use throughout your app instead of plain `useDispatch` and `useSelector`
// export const useAppDispatch: () => AppDispatch = useDispatch;
// export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;


// interface IDebounced {
//   searchQuery: string;
//   delay: number;
// }

// export const useDebounced = ({ searchQuery, delay }: IDebounced) => {
//   const [debouncedValue, setDebouncedValue] = useState<string>(searchQuery);

//   useEffect(() => {
//     const handler = setTimeout(() => {
//       setDebouncedValue(searchQuery);
//     }, delay);

//     return () => {
//       clearTimeout(handler);
//     };
//   }, [searchQuery, delay]);

//   return debouncedValue;
// };
