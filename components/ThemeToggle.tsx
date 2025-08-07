import { useTheme } from "../pages/_app";
import { usePortfolio } from "../context/PortfolioContext";

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();
  const { portfolio } = usePortfolio();
  const { theme: themeConfig } = portfolio;

  return (
    <button
      onClick={toggleTheme}
      className="relative p-2 rounded-xl bg-white/10 backdrop-blur-sm hover:bg-white/20 border border-white/20 hover:border-white/30 transition-all duration-300 group"
      style={{
        borderRadius: themeConfig.borderRadius.lg,
        transition: themeConfig.transitions.normal,
      }}
      aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
    >
      <div className="relative w-6 h-6">
        {/* Sol */}
        <svg
          className={`w-6 h-6 transition-all duration-500 ${
            theme === "light" ? "opacity-100 rotate-0" : "opacity-0 -rotate-90"
          }`}
          style={{ color: themeConfig.colors.yellow[500] }}
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M12 2.25a.75.75 0 01.75.75v2.25a.75.75 0 01-1.5 0V3a.75.75 0 01.75-.75zM7.5 12a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM18.894 6.166a.75.75 0 00-1.06-1.06l-1.591 1.59a.75.75 0 101.06 1.061l1.591-1.59zM21.75 12a.75.75 0 01-.75.75h-2.25a.75.75 0 010-1.5H21a.75.75 0 01.75.75zM17.834 18.894a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 10-1.061 1.06l1.59 1.591zM12 18a.75.75 0 01.75.75V21a.75.75 0 01-1.5 0v-2.25A.75.75 0 0112 18zM7.758 17.303a.75.75 0 00-1.061-1.06l-1.591 1.59a.75.75 0 001.06 1.061l1.591-1.59zM6 12a.75.75 0 01-.75.75H3a.75.75 0 010-1.5h2.25A.75.75 0 016 12zM6.697 7.757a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 00-1.061 1.06l1.59 1.591z" />
        </svg>

        {/* Luna */}
        <svg
          className={`absolute top-0 left-0 w-6 h-6 transition-all duration-500 ${
            theme === "dark" ? "opacity-100 rotate-0" : "opacity-0 rotate-90"
          }`}
          style={{ color: themeConfig.colors.blue[400] }}
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M9.528 1.718a.75.75 0 01.162.819A8.97 8.97 0 009 6a9 9 0 009 9 8.97 8.97 0 003.463-.69.75.75 0 01.981.98 10.503 10.503 0 01-9.694 6.46c-5.799 0-10.5-4.701-10.5-10.5 0-4.368 2.667-8.112 6.46-9.694a.75.75 0 01.818.162z" />
        </svg>
      </div>

      {/* Efecto de glow */}
      <div
        className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{
          borderRadius: themeConfig.borderRadius.lg,
          background: `linear-gradient(to right, ${themeConfig.colors.yellow[400]}20, ${themeConfig.colors.blue[400]}20)`,
          transition: themeConfig.transitions.normal,
        }}
      ></div>
    </button>
  );
};

export default ThemeToggle;
