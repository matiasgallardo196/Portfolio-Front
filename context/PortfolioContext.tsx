import React, {
  createContext,
  useContext,
  ReactNode,
  useState,
  useEffect,
} from "react";
import { PortfolioData } from "../data/types";

// Context interface
interface PortfolioContextType {
  portfolio: PortfolioData | null;
  loading: boolean;
  error: string | null;
  // Future API methods can be added here
  // refreshPortfolio: () => Promise<void>;
  // updatePortfolio: (data: Partial<PortfolioData>) => Promise<void>;
}

// Create the context
const PortfolioContext = createContext<PortfolioContextType | undefined>(
  undefined
);

// Provider props interface
interface PortfolioProviderProps {
  children: ReactNode;
}

// Provider component
export const PortfolioProvider: React.FC<PortfolioProviderProps> = ({
  children,
}) => {
  const [portfolio, setPortfolio] = useState<PortfolioData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPortfolio = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch("http://localhost:3001/api/portfolio");

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data: PortfolioData = await response.json();
        setPortfolio(data);
      } catch (err) {
        console.error("Failed to fetch portfolio data:", err);
        setError(
          err instanceof Error ? err.message : "Failed to fetch portfolio data"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchPortfolio();
  }, []);

  const contextValue: PortfolioContextType = {
    portfolio,
    loading,
    error,
  };

  return (
    <PortfolioContext.Provider value={contextValue}>
      {children}
    </PortfolioContext.Provider>
  );
};

// Custom hook to use the portfolio context
export const usePortfolio = (): PortfolioContextType => {
  const context = useContext(PortfolioContext);

  if (context === undefined) {
    throw new Error("usePortfolio must be used within a PortfolioProvider");
  }

  return context;
};

// Export the context for advanced usage if needed
export { PortfolioContext };
