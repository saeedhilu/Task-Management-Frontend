import { createContext, useContext, useEffect, useState } from "react";
import { useSelector } from "react-redux";


const ThemeContext = createContext({
  theme: "system",
  setTheme: () => { },
});

export function ThemeProvider({ children, defaultTheme = "system", storageKey = "vite-ui-theme" }) {
  const mode = useSelector((state) => state.theme.theme)
  const [theme, setTheme] = useState(() => ( mode || defaultTheme));



  useEffect(() => {
    const root = document.documentElement;
    root.classList.remove("light", "dark");

    if (theme === "system") {
      const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
      root.classList.add(systemTheme);
    } else {
      root.classList.add(theme);
    }
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => {
  return useContext(ThemeContext);
};
