import { useState, useEffect } from "react";

const useLocalStorage = (key, initialValue = "") => {
  const [value, setValue] = useState(() => {
    const res = localStorage.getItem(key);
    if (res) {
      return JSON.parse(res);
    }
    return initialValue;
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
};

export default useLocalStorage;
