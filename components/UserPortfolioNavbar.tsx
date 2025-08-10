import Link from "next/link";
import { useRouter } from "next/router";
import ThemeToggle from "./ThemeToggle";
import { useAuth } from "../context/AuthContext";

const UserPortfolioNavbar = () => {
  const router = useRouter();
  const { id } = router.query;
  const { logout } = useAuth();

  const isActive = (path: string) => {
    return router.pathname === path;
  };

  const navItems = [
    { href: `/portfolio/${id}`, label: "Home" },
    { href: `/portfolio/${id}/about`, label: "About" },
    { href: `/portfolio/${id}/projects`, label: "Projects" },
    { href: `/portfolio/${id}/contact`, label: "Contact" },
  ];

  return (
    <nav className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200/20 dark:border-gray-700/20 rounded-t-lg">
      <div className="container-custom">
        <div className="flex items-center justify-between h-16">
          {/* Logo/Brand */}
          <Link
            href={`/portfolio/${id}`}
            className="flex items-center space-x-2"
          >
            <div className="w-8 h-8 bg-gradient-to-r from-primary-500 to-accent-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">UP</span>
            </div>
            <span className="text-xl font-bold gradient-text">
              User Portfolio
            </span>
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`text-sm font-medium transition-colors duration-200 ${
                  isActive(item.href)
                    ? "text-primary-600 dark:text-primary-400"
                    : "text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* Right side - Theme toggle and logout */}
          <div className="flex items-center space-x-4">
            <ThemeToggle />
            <button
              onClick={logout}
              className="text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors duration-200"
            >
              Logout
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        <div className="md:hidden">
          <div className="flex items-center justify-between py-4">
            <div className="flex space-x-4">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`text-sm font-medium transition-colors duration-200 ${
                    isActive(item.href)
                      ? "text-primary-600 dark:text-primary-400"
                      : "text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400"
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default UserPortfolioNavbar;
