import type { AppProps } from "next/app";
import "../styles/globals.css";
import { createContext, useContext, useEffect, useState } from "react";
import { portfolioData } from "../data";

// Contexto para el tema
type Theme = "light" | "dark";

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};

function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>("light");
  const { theme: themeConfig } = portfolioData;

  useEffect(() => {
    // Obtener el tema guardado en localStorage o usar el tema del sistema
    const savedTheme = localStorage.getItem("theme") as Theme;
    const systemTheme = window.matchMedia("(prefers-color-scheme: dark)")
      .matches
      ? "dark"
      : "light";
    const initialTheme = savedTheme || systemTheme;

    setTheme(initialTheme);
    document.documentElement.classList.toggle("dark", initialTheme === "dark");

    // Aplicar estilos del tema centralizado
    const root = document.documentElement;
    root.style.setProperty(
      "--transition-normal",
      themeConfig.transitions.normal
    );
    root.style.setProperty("--border-radius-lg", themeConfig.borderRadius.lg);
    root.style.setProperty(
      "--z-index-navbar",
      themeConfig.zIndex.navbar.toString()
    );
  }, [themeConfig]);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    document.documentElement.classList.toggle("dark", newTheme === "dark");
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider>
      <Component {...pageProps} />
    </ThemeProvider>
  );
}
