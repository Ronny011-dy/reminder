import { useState, useEffect } from 'react';

import { v4 as uuidv4 } from 'uuid';

import { setCookie } from '../utils/funcs.util';
// Custom hook with generic type to access data in localStorage
// take in key,value and return item with type of value and a function that takes a param of same type
function useLocalStorage<T>(
  key: string,
  initialValue: T
): [T, React.Dispatch<React.SetStateAction<T>>] {
  // ensuring a cookie exists
  setCookie('uid', uuidv4());
  // internal state that holds the info that's also in localstorage
  const [storedValue, setStoredValue] = useState<T>(() => {
    // Get stored value, if exists and save to state
    const item = window.localStorage.getItem(key);
    return item ? JSON.parse(item) : initialValue;
  });
  // Update localStorage when dependencies change
  useEffect(() => {
    window.localStorage.setItem(key, JSON.stringify(storedValue));
  }, [key, storedValue]);

  return [storedValue, setStoredValue];
}

//* side note:
// we don't need to delete from localstorage because if the array
// was updated to a smaller one then that would get pushed
// we only need to deleted from localStorage on group delete
// which we can do directly from the CRUD functions
//? could add exception handling to make sure that items are both in the internal state and localStorage

export default useLocalStorage;
