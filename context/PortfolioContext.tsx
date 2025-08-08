import React, {
  createContext,
  useContext,
  ReactNode,
  useState,
  useEffect,
} from "react";
import { PortfolioData } from "../data/types";
import { portfolioApi, ApiError } from "../services/api";

// Context interface
interface PortfolioContextType {
  portfolio: PortfolioData | null;
  loading: boolean;
  error: string | null;
  hasApiError: boolean;
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
  const [portfolio, setPortfolio] = useState<PortfolioData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [hasApiError, setHasApiError] = useState(false);

  // Función para cargar datos desde la API
  const loadPortfolioFromApi = async () => {
    try {
      setLoading(true);
      setError(null);
      setHasApiError(false);

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

      // No usar datos mock - mantener portfolio como null
      setPortfolio(null);
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
