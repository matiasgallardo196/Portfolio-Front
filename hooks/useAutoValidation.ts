import { useState, useEffect, useCallback } from "react";
import { useAuth } from "../context/AuthContext";

interface ValidationInfo {
  lastValidation: Date | null;
  nextValidation: Date | null;
  validationCount: number;
  isActive: boolean;
}

export const useAutoValidation = () => {
  const { token, validateToken } = useAuth();
  const [validationInfo, setValidationInfo] = useState<ValidationInfo>({
    lastValidation: null,
    nextValidation: null,
    validationCount: 0,
    isActive: false,
  });

  const updateValidationInfo = useCallback(() => {
    const now = new Date();
    setValidationInfo((prev) => ({
      ...prev,
      lastValidation: now,
      nextValidation: new Date(now.getTime() + 5 * 60 * 1000), // 5 minutos
      validationCount: prev.validationCount + 1,
    }));
  }, []);

  // Validación por intervalo
  useEffect(() => {
    if (!token) {
      setValidationInfo((prev) => ({ ...prev, isActive: false }));
      return;
    }

    setValidationInfo((prev) => ({ ...prev, isActive: true }));
    updateValidationInfo();

    const interval = setInterval(async () => {
      console.log("🔄 Auto-validating token...");
      const isValid = await validateToken();
      if (isValid) {
        updateValidationInfo();
      }
    }, 5 * 60 * 1000); // 5 minutos

    return () => clearInterval(interval);
  }, [token, validateToken, updateValidationInfo]);

  // Validación al volver a la pestaña
  useEffect(() => {
    if (!token) return;

    const handleVisibilityChange = async () => {
      if (!document.hidden) {
        console.log("👁️ Tab became visible, validating token...");
        const isValid = await validateToken();
        if (isValid) {
          updateValidationInfo();
        }
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () =>
      document.removeEventListener("visibilitychange", handleVisibilityChange);
  }, [token, validateToken, updateValidationInfo]);

  const getTimeUntilNext = useCallback(() => {
    if (!validationInfo.nextValidation) return "Calculating...";

    const now = new Date();
    const diff = validationInfo.nextValidation.getTime() - now.getTime();

    if (diff <= 0) return "Any moment...";

    const minutes = Math.floor(diff / 60000);
    const seconds = Math.floor((diff % 60000) / 1000);

    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  }, [validationInfo.nextValidation]);

  const formatTime = useCallback((date: Date) => {
    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
  }, []);

  return {
    validationInfo,
    getTimeUntilNext,
    formatTime,
  };
};
