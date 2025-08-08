import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import { useRouter } from "next/router";
import { buildApiUrl, API_CONFIG } from "../config/api";

interface User {
  id: string;
  email: string;
  name?: string;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (email: string, password: string) => Promise<boolean>;
  register: (
    email: string,
    password: string,
    confirmPassword: string
  ) => Promise<boolean>;
  logout: () => void;
  validateToken: () => Promise<boolean>;
  isLoading: boolean;
  error: string | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  // Verificar token al cargar la aplicación
  useEffect(() => {
    const validateStoredToken = async () => {
      const storedToken = localStorage.getItem("authToken");
      if (storedToken) {
        // Verificar si el token no ha expirado (validación básica)
        if (isTokenExpired(storedToken)) {
          // Token expirado, limpiar datos
          localStorage.removeItem("authToken");
          localStorage.removeItem("userData");
          setIsLoading(false);
          return;
        }

        setToken(storedToken);
        const userData = localStorage.getItem("userData");
        if (userData) {
          setUser(JSON.parse(userData));
        }

        // Validar token con el backend
        const backendValid = await validateTokenWithBackend(storedToken);
        if (!backendValid) {
          localStorage.removeItem("authToken");
          localStorage.removeItem("userData");
          setIsLoading(false);
          return;
        }
      }
      setIsLoading(false);
    };

    validateStoredToken();
  }, []);

  // Nota: Las validaciones automáticas se manejan en el hook useAutoValidation
  // para evitar duplicación y mantener el código más organizado

  // Función para verificar si el token ha expirado
  const isTokenExpired = (token: string): boolean => {
    try {
      const payload = JSON.parse(atob(token.split(".")[1]));
      const currentTime = Date.now() / 1000;
      return payload.exp < currentTime;
    } catch (error) {
      // Si hay error al decodificar, considerar como expirado
      return true;
    }
  };

  // Función para validar token con el backend
  const validateTokenWithBackend = async (token: string): Promise<boolean> => {
    try {
      const response = await fetch(
        buildApiUrl(API_CONFIG.ENDPOINTS.AUTH.VALIDATE),
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        // Token inválido, limpiar datos
        setUser(null);
        setToken(null);
        localStorage.removeItem("authToken");
        localStorage.removeItem("userData");
        return false;
      }

      // Si la respuesta es exitosa, actualizar datos del usuario si los devuelve
      const data = await response.json();
      if (data.valid && data.user) {
        setUser(data.user);
        localStorage.setItem("userData", JSON.stringify(data.user));
      }

      return true;
    } catch (error) {
      console.error("Error validating token:", error);
      return false;
    }
  };

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(
        buildApiUrl(API_CONFIG.ENDPOINTS.AUTH.LOGIN),
        {
          method: "POST",
          headers: API_CONFIG.DEFAULT_HEADERS,
          body: JSON.stringify({ email, password }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        setToken(data.token);
        setUser(data.user);
        localStorage.setItem("authToken", data.token);
        localStorage.setItem("userData", JSON.stringify(data.user));
        return true;
      } else {
        setError(data.message || "Error signing in");
        return false;
      }
    } catch (err) {
      setError("Connection error. Please try again.");
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (
    email: string,
    password: string,
    confirmPassword: string
  ): Promise<boolean> => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(
        buildApiUrl(API_CONFIG.ENDPOINTS.AUTH.REGISTER),
        {
          method: "POST",
          headers: API_CONFIG.DEFAULT_HEADERS,
          body: JSON.stringify({ email, password, confirmPassword }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        return true;
      } else {
        setError(data.message || "Error signing up");
        return false;
      }
    } catch (err) {
      setError("Connection error. Please try again.");
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("authToken");
    localStorage.removeItem("userData");
    router.push("/login");
  };

  // Función para validar token manualmente
  const validateToken = async (): Promise<boolean> => {
    if (!token) return false;
    return await validateTokenWithBackend(token);
  };

  const value = {
    user,
    token,
    login,
    register,
    logout,
    validateToken,
    isLoading,
    error,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
