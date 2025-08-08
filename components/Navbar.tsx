import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import ThemeToggle from "./ThemeToggle";
import { usePortfolio } from "../context/PortfolioContext";
import { useAuth } from "../context/AuthContext";
import { themeData } from "../data/theme";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const { portfolio } = usePortfolio();
  const { user, logout } = useAuth();

  // Si no hay portfolio, no renderizar nada (la página mostrará error)
  if (!portfolio) {
    return null;
  }

  const { theme: themeConfig, about } = portfolio;

  // Usar themeData como fallback si themeConfig es undefined o no tiene las propiedades necesarias
  const safeThemeConfig = themeConfig || themeData;

  // Validaciones adicionales para propiedades específicas
  const zIndex = safeThemeConfig?.zIndex?.navbar ?? 50;
  const navbarHeight = safeThemeConfig?.spacing?.navbar?.height ?? "5rem";
  const backdropBlur = safeThemeConfig?.backdropBlur?.md ?? "12px";
  const transition =
    safeThemeConfig?.transitions?.normal ?? "300ms ease-in-out";

  const navItems = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/projects", label: "Projects" },
    { href: "/contact", label: "Contact" },
  ];

  const authItems = user
    ? [
        { href: "/dashboard", label: "Dashboard" },
        { action: logout, label: "Sign Out" },
      ]
    : [
        { href: "/login", label: "Sign In" },
        { href: "/register", label: "Sign Up" },
      ];

  const isActive = (href: string) => router.pathname === href;

  return (
    <nav
      className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-md shadow-lg sticky top-0 z-50 border-b border-white/20 dark:border-gray-700/20"
      style={{
        zIndex: zIndex,
        height: navbarHeight,
        backdropFilter: `blur(${backdropBlur})`,
      }}
    >
      <div className="container-custom">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link
            href="/"
            className="text-2xl font-bold gradient-text hover:scale-105 transition-transform duration-300"
            style={{
              transition: transition,
            }}
          >
            {about?.fullName || "Portfolio"}
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`relative group ${
                  isActive(item.href)
                    ? "text-primary-600 dark:text-primary-400 font-semibold"
                    : "text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400"
                } transition-all duration-300`}
              >
                {item.label}
                <span
                  className={`absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-primary-600 to-accent-600 group-hover:w-full transition-all duration-300 ${
                    isActive(item.href) ? "w-full" : ""
                  }`}
                ></span>
              </Link>
            ))}

            {/* Auth Items */}
            {authItems.map((item) =>
              item.action ? (
                <button
                  key={item.label}
                  onClick={item.action}
                  className="text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition-all duration-300"
                >
                  {item.label}
                </button>
              ) : (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`relative group ${
                    isActive(item.href)
                      ? "text-primary-600 dark:text-primary-400 font-semibold"
                      : "text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400"
                  } transition-all duration-300`}
                >
                  {item.label}
                  <span
                    className={`absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-primary-600 to-accent-600 group-hover:w-full transition-all duration-300 ${
                      isActive(item.href) ? "w-full" : ""
                    }`}
                  ></span>
                </Link>
              )
            )}

            {/* Theme Toggle */}
            <ThemeToggle />
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center space-x-4">
            <ThemeToggle />
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-3 rounded-xl text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 hover:bg-white/50 dark:hover:bg-gray-800/50 focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all duration-300"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden animate-fade-in">
            <div className="px-4 pt-4 pb-6 space-y-2 bg-white/90 dark:bg-gray-900/90 backdrop-blur-md border-t border-white/20 dark:border-gray-700/20 rounded-b-2xl shadow-xl">
              {navItems.map((item, index) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`${
                    isActive(item.href)
                      ? "text-primary-600 dark:text-primary-400 bg-primary-50/50 dark:bg-primary-900/20 border-l-4 border-primary-600 dark:border-primary-400"
                      : "text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 hover:bg-gray-50/50 dark:hover:bg-gray-800/50"
                  } block px-4 py-3 rounded-xl text-base font-medium transition-all duration-300 transform hover:translate-x-2`}
                  onClick={() => setIsOpen(false)}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  {item.label}
                </Link>
              ))}

              {/* Divider */}
              <div className="border-t border-gray-200 dark:border-gray-700 my-2"></div>

              {/* Auth Items */}
              {authItems.map((item, index) =>
                item.action ? (
                  <button
                    key={item.label}
                    onClick={() => {
                      item.action();
                      setIsOpen(false);
                    }}
                    className="text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 hover:bg-gray-50/50 dark:hover:bg-gray-800/50 block w-full text-left px-4 py-3 rounded-xl text-base font-medium transition-all duration-300 transform hover:translate-x-2"
                    style={{
                      animationDelay: `${(navItems.length + index) * 0.1}s`,
                    }}
                  >
                    {item.label}
                  </button>
                ) : (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`${
                      isActive(item.href)
                        ? "text-primary-600 dark:text-primary-400 bg-primary-50/50 dark:bg-primary-900/20 border-l-4 border-primary-600 dark:border-primary-400"
                        : "text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 hover:bg-gray-50/50 dark:hover:bg-gray-800/50"
                    } block px-4 py-3 rounded-xl text-base font-medium transition-all duration-300 transform hover:translate-x-2`}
                    onClick={() => setIsOpen(false)}
                    style={{
                      animationDelay: `${(navItems.length + index) * 0.1}s`,
                    }}
                  >
                    {item.label}
                  </Link>
                )
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
