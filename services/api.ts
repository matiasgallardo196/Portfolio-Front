import { PortfolioData } from "../data/types";
import { API_CONFIG, buildApiUrl } from "../config/api";

export class ApiError extends Error {
  constructor(
    message: string,
    public status: number,
    public statusText: string
  ) {
    super(message);
    this.name = "ApiError";
  }
}

export const portfolioApi = {
  async getPortfolio(): Promise<PortfolioData> {
    try {
      const response = await fetch(
        buildApiUrl(API_CONFIG.ENDPOINTS.PORTFOLIO),
        {
          method: "GET",
          headers: API_CONFIG.DEFAULT_HEADERS,
        }
      );

      if (!response.ok) {
        throw new ApiError(
          `Error al obtener el portfolio: ${response.statusText}`,
          response.status,
          response.statusText
        );
      }

      const data = await response.json();
      return data;
    } catch (error) {
      if (error instanceof ApiError) {
        throw error;
      }

      // Error de red o conexión
      throw new ApiError("Error de conexión al servidor", 0, "NETWORK_ERROR");
    }
  },

  async getPortfolioById(id: string, token?: string): Promise<PortfolioData> {
    try {
      const response = await fetch(
        buildApiUrl(`${API_CONFIG.ENDPOINTS.PORTFOLIO}/${id}`),
        {
          method: "GET",
          headers: {
            ...API_CONFIG.DEFAULT_HEADERS,
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
          },
        }
      );

      if (!response.ok) {
        throw new ApiError(
          `Error al obtener el portfolio por id: ${response.statusText}`,
          response.status,
          response.statusText
        );
      }

      const data = await response.json();
      return data;
    } catch (error) {
      if (error instanceof ApiError) {
        throw error;
      }

      throw new ApiError("Error de conexión al servidor", 0, "NETWORK_ERROR");
    }
  },

  // Métodos adicionales para futuras funcionalidades
  async updatePortfolio(
    portfolioData: Partial<PortfolioData>
  ): Promise<PortfolioData> {
    try {
      const response = await fetch(
        buildApiUrl(API_CONFIG.ENDPOINTS.PORTFOLIO),
        {
          method: "PUT",
          headers: API_CONFIG.DEFAULT_HEADERS,
          body: JSON.stringify(portfolioData),
        }
      );

      if (!response.ok) {
        throw new ApiError(
          `Error al actualizar el portfolio: ${response.statusText}`,
          response.status,
          response.statusText
        );
      }

      const data = await response.json();
      return data;
    } catch (error) {
      if (error instanceof ApiError) {
        throw error;
      }

      throw new ApiError("Error de conexión al servidor", 0, "NETWORK_ERROR");
    }
  },
};
