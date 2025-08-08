// Configuración de la API
export const API_CONFIG = {
  // URL base de la API - puede ser configurada por variables de entorno
  BASE_URL: process.env.NEXT_PUBLIC_API_URL,

  // Timeout para las peticiones (en milisegundos)
  TIMEOUT: 10000,

  // Headers por defecto
  DEFAULT_HEADERS: {
    "Content-Type": "application/json",
  },

  // Endpoints
  ENDPOINTS: {
    PORTFOLIO: "/portfolio",
  },
} as const;

// Función para construir URLs completas
export const buildApiUrl = (endpoint: string): string => {
  return `${API_CONFIG.BASE_URL}${endpoint}`;
};

// Función para validar si la API está disponible
export const isApiAvailable = async (): Promise<boolean> => {
  try {
    const response = await fetch(buildApiUrl("/health"), {
      method: "GET",
      headers: API_CONFIG.DEFAULT_HEADERS,
    });
    return response.ok;
  } catch {
    return false;
  }
};
