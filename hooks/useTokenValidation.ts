import { useEffect, useState } from "react";

interface TokenPayload {
  exp: number;
  iat: number;
  sub: string;
  email?: string;
  [key: string]: any;
}

export const useTokenValidation = () => {
  const [isValid, setIsValid] = useState<boolean | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Decodificar token JWT
  const decodeToken = (token: string): TokenPayload | null => {
    try {
      const base64Url = token.split(".")[1];
      const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
      const jsonPayload = decodeURIComponent(
        atob(base64)
          .split("")
          .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
          .join("")
      );
      return JSON.parse(jsonPayload);
    } catch (error) {
      console.error("Error decoding token:", error);
      return null;
    }
  };

  // Verificar si el token ha expirado
  const isTokenExpired = (token: string): boolean => {
    const payload = decodeToken(token);
    if (!payload) return true;

    const currentTime = Date.now() / 1000;
    return payload.exp < currentTime;
  };

  // Verificar si el token expirará pronto (ej: en los próximos 5 minutos)
  const isTokenExpiringSoon = (token: string, minutes: number = 5): boolean => {
    const payload = decodeToken(token);
    if (!payload) return true;

    const currentTime = Date.now() / 1000;
    const timeUntilExpiry = payload.exp - currentTime;
    return timeUntilExpiry < minutes * 60;
  };

  // Obtener información del token
  const getTokenInfo = (token: string) => {
    const payload = decodeToken(token);
    if (!payload) return null;

    const currentTime = Date.now() / 1000;
    const timeUntilExpiry = payload.exp - currentTime;

    return {
      payload,
      isExpired: payload.exp < currentTime,
      expiresIn: Math.max(0, timeUntilExpiry),
      expiresInMinutes: Math.max(0, Math.floor(timeUntilExpiry / 60)),
      expiresInHours: Math.max(0, Math.floor(timeUntilExpiry / 3600)),
    };
  };

  // Validar token con el backend (opcional)
  const validateWithBackend = async (token: string): Promise<boolean> => {
    try {
      const response = await fetch("/auth/validate", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      return response.ok;
    } catch (error) {
      console.error("Error validating token with backend:", error);
      return false;
    }
  };

  // Validar token almacenado
  const validateStoredToken = async (): Promise<boolean> => {
    const token = localStorage.getItem("authToken");

    if (!token) {
      setIsValid(false);
      setIsLoading(false);
      return false;
    }

    // Validación básica (expiración)
    if (isTokenExpired(token)) {
      localStorage.removeItem("authToken");
      localStorage.removeItem("userData");
      setIsValid(false);
      setIsLoading(false);
      return false;
    }

    // Opcional: Validación con backend
    // const backendValid = await validateWithBackend(token);
    // if (!backendValid) {
    //   localStorage.removeItem('authToken');
    //   localStorage.removeItem('userData');
    //   setIsValid(false);
    //   setIsLoading(false);
    //   return false;
    // }

    setIsValid(true);
    setIsLoading(false);
    return true;
  };

  // Validar token al montar el componente
  useEffect(() => {
    validateStoredToken();
  }, []);

  return {
    isValid,
    isLoading,
    validateStoredToken,
    isTokenExpired,
    isTokenExpiringSoon,
    getTokenInfo,
    validateWithBackend,
  };
};
