import React, { createContext, useContext, ReactNode } from 'react';
import { PortfolioData } from '../data/types';
import { portfolioData } from '../data';

// Context interface
interface PortfolioContextType {
  portfolio: PortfolioData;
  // Future API methods can be added here
  // refreshPortfolio: () => Promise<void>;
  // updatePortfolio: (data: Partial<PortfolioData>) => Promise<void>;
}

// Create the context
const PortfolioContext = createContext<PortfolioContextType | undefined>(undefined);

// Provider props interface
interface PortfolioProviderProps {
  children: ReactNode;
}

// Provider component
export const PortfolioProvider: React.FC<PortfolioProviderProps> = ({ children }) => {
  // For now, we use the mock data directly
  // In the future, this could be replaced with:
  // const [portfolio, setPortfolio] = useState<PortfolioData | null>(null);
  // const [loading, setLoading] = useState(true);
  // const [error, setError] = useState<string | null>(null);
  
  // useEffect(() => {
  //   const fetchPortfolio = async () => {
  //     try {
  //       setLoading(true);
  //       const response = await fetch('/api/portfolio');
  //       const data = await response.json();
  //       setPortfolio(data);
  //     } catch (err) {
  //       setError(err instanceof Error ? err.message : 'Failed to fetch portfolio data');
  //     } finally {
  //       setLoading(false);
  //     }
  //   };
  //   
  //   fetchPortfolio();
  // }, []);

  const contextValue: PortfolioContextType = {
    portfolio: portfolioData,
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
    throw new Error('usePortfolio must be used within a PortfolioProvider');
  }
  
  return context;
};

// Export the context for advanced usage if needed
export { PortfolioContext }; 