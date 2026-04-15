import { createContext, useContext, useState, useEffect, type ReactNode } from "react";
import { DEFAULT_THEME } from "./themeDefinitions";

interface ThemeCtx {
  theme: string;
  setTheme: (id: string) => void;
}

const ThemeContext = createContext<ThemeCtx>({
  theme: DEFAULT_THEME,
  setTheme: () => {},
});

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState(() => {
    return localStorage.getItem("ic-theme") || DEFAULT_THEME;
  });

  const setTheme = (id: string) => {
    setThemeState(id);
    localStorage.setItem("ic-theme", id);
  };

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}
