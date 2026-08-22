"use client";

import { useTheme } from "next-themes";
import { IoMoonOutline, IoSunnyOutline } from "react-icons/io5";

export function ThemeSwitch() {
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-full hover:bg-primary/10 dark:hover:bg-primary/20 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary/50"
      aria-label="থিম পরিবর্তন করুন"
    >
      {theme === "dark" ? (
        <IoSunnyOutline className="text-secondary size-5" />
      ) : (
        <IoMoonOutline className="text-content size-5" />
      )}
    </button>
  );
}