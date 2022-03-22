import { useState, useEffect } from "react";

export const isFalsy = (value: unknown) => (value === 0 ? false : !value);
// Do not change the input object in a function
// Objects are reference, the object will change also outside the function
// People do not expect that
export const cleanObject = (object: object) => {
  // Object.assign({}, object)
  const result = { ...object };
  Object.keys(result).forEach((key) => {
    // @ts-ignore
    const value = result[key];
    if (isFalsy(value)) {
      // @ts-ignore
      delete result[key];
    }
  });
  return result;
};

export const useMount = (callback: () => void) => {
  useEffect(() => {
    callback();
  }, []);
};

// export const debounce = (func, delay) => {
//   let timeout; //closure
//   return () => {
//     if (timeout) {
//       clearTimeout(timeout);
//     }
//     timeout = setTimeout(function() {
//       func();
//     }, delay); // the last timeout + delay => call func
//   }
// }

// you cannot assign unknow to any variable
// you cannot use any method of unknown value
// you should give generic type to the return value
export const useDebounce = <V>(value: V, delay?: number) => {
  const [debouncedValue, setDebouncedValue] = useState(value);
  useEffect(() => {
    // set timeout everytime after value changed
    const timeout = setTimeout(() => setDebouncedValue(value), delay);
    // run after the last useEffect finish running
    return () => clearTimeout(timeout);
  }, [value, delay]);
  return debouncedValue;
};

// practice
export const useArray = <T>(initialArray: T[]) => {
  // Do not need to consider button/checkbox/list...
  // Always use useState to catch change
  const [value, setValue] = useState(initialArray);
  return {
    value,
    setValue,
    add: (item: T) => setValue([...value, item]),
    clear: () => setValue([]),
    removeIndex: (index: number) => {
      // shallow copy
      const copy = [...value];
      copy.splice(index, 1);
      setValue(copy);
    },
  };
};
