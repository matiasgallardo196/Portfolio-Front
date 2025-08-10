import Link from "next/link";
import { useRouter } from "next/router";
import ThemeToggle from "./ThemeToggle";
import { usePortfolio } from "../context/PortfolioContext";

const UserPortfolioNavbar = () => {
  const router = useRouter();
  const { id } = router.query;
  const { portfolio } = usePortfolio();

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
    <nav className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200/20 dark:border-gray-700/20">
      <div className="container-custom">
        <div className="flex items-center justify-between h-16">
          {/* Logo/Brand */}
          <Link
            href={`/portfolio/${id}`}
            className="text-2xl font-bold gradient-text hover:scale-105 transition-transform duration-300"
          >
            {portfolio?.about?.fullName || "Portfolio"}
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

            {/* Theme Toggle */}
            <ThemeToggle />
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
