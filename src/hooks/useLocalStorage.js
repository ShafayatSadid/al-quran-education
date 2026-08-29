// hooks/useLocalStorage.js
"use client";

import { useState, useEffect } from "react";

export function useLocalStorage(key, initialValue) {
  
  const [storedValue, setStoredValue] = useState(() => {
    if (typeof window === "undefined") return initialValue;
    
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch {
      // কোনো এরর দেখাবে না, শুধু ডিফল্ট রিটার্ন করবে
      return null;
    }
  });

  useEffect(() => {
    if (typeof window === "undefined") return;
    
    try {
      window.localStorage.setItem(key, JSON.stringify(storedValue));
    } catch {
      // কোনো এরর দেখাবে না, চুপচাপ থাকবে
    }
  }, [key, storedValue]);

  return [storedValue, setStoredValue];
}