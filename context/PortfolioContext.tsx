import React, {
  createContext,
  useContext,
  ReactNode,
  useState,
  useEffect,
} from "react";
import { PortfolioData } from "../data/types";
import { portfolioData } from "../data";
import { portfolioApi, ApiError } from "../services/api";

// Context interface
interface PortfolioContextType {
  portfolio: PortfolioData;
  loading: boolean;
  error: string | null;
  hasApiError: boolean;
  isUsingMockData: boolean;
  refreshPortfolio: () => Promise<void>;
  updatePortfolio: (data: Partial<PortfolioData>) => Promise<void>;
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
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [hasApiError, setHasApiError] = useState(false);
  const [isUsingMockData, setIsUsingMockData] = useState(false);

  // Función para cargar datos desde la API
  const loadPortfolioFromApi = async () => {
    try {
      setLoading(true);
      setError(null);
      setHasApiError(false);
      setIsUsingMockData(false);

      const apiData = await portfolioApi.getPortfolio();
      setPortfolio(apiData);
    } catch (error) {
      console.error("Error loading portfolio from API:", error);

      if (error instanceof ApiError) {
        setError(error.message);
        setHasApiError(true);
      } else {
        setError("Error inesperado al cargar el portfolio");
        setHasApiError(true);
      }

      // Fallback a datos mock en caso de error
      setPortfolio(portfolioData);
      setIsUsingMockData(true);
    } finally {
      setLoading(false);
    }
  };

  // Función para refrescar datos
  const refreshPortfolio = async () => {
    await loadPortfolioFromApi();
  };

  // Función para actualizar datos
  const updatePortfolio = async (data: Partial<PortfolioData>) => {
    try {
      setLoading(true);
      setError(null);

      const updatedData = await portfolioApi.updatePortfolio(data);
      setPortfolio(updatedData);
    } catch (error) {
      console.error("Error updating portfolio:", error);

      if (error instanceof ApiError) {
        setError(error.message);
      } else {
        setError("Error inesperado al actualizar el portfolio");
      }

      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Cargar datos al montar el componente
  useEffect(() => {
    loadPortfolioFromApi();
  }, []);

  const contextValue: PortfolioContextType = {
    portfolio,
    loading,
    error,
    hasApiError,
    isUsingMockData,
    refreshPortfolio,
    updatePortfolio,
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
