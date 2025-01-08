import { useState, useEffect } from "react";

function useLocalStorage(key, initialValue = null) {
  const [value, setValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (err) {
      console.error(`Error reading localStorage key "${key}":`, err);
      return initialValue;
    }
  });

  useEffect(() => {
    try {
      if (value === null || value === undefined) {
        window.localStorage.removeItem(key);
      } else {
        window.localStorage.setItem(key, JSON.stringify(value));
      }
    } catch (err) {
      console.error(`Error setting localStorage key "${key}":`, err);
    }
  }, [key, value]);

  return [value, setValue];
}

export default useLocalStorage;
