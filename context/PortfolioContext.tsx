import React, {
  createContext,
  useContext,
  ReactNode,
  useState,
  useEffect,
} from "react";
import { PortfolioData } from "../data/types";
import { portfolioData } from "../data";

// Context interface
interface PortfolioContextType {
  portfolio: PortfolioData;
  loading: boolean;
  error: string | null;
  hasApiError: boolean;
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
  const [portfolio, setPortfolio] = useState<PortfolioData>(portfolioData);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasApiError, setHasApiError] = useState(false);

  // Simulate API loading with useEffect for future migration
  useEffect(() => {
    // For now, we use mock data directly
    // In the future, this could be replaced with a real API call
    setPortfolio(portfolioData);
    setLoading(false);
  }, []);

  const contextValue: PortfolioContextType = {
    portfolio,
    loading,
    error,
    hasApiError,
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
