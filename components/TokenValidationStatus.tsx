import { useState } from "react";
import { useAuth } from "../context/AuthContext";

const TokenValidationStatus = () => {
  const { validateToken } = useAuth();
  const [isValidating, setIsValidating] = useState(false);
  const [validationResult, setValidationResult] = useState<{
    isValid: boolean;
    message: string;
  } | null>(null);

  const handleValidation = async () => {
    setIsValidating(true);
    setValidationResult(null);

    try {
      const isValid = await validateToken();
      setValidationResult({
        isValid,
        message: isValid
          ? "✅ Token is valid and authenticated with backend!"
          : "❌ Token is invalid or expired!",
      });
    } catch (error) {
      setValidationResult({
        isValid: false,
        message: "❌ Error validating token with backend!",
      });
    } finally {
      setIsValidating(false);
    }
  };

  return (
    <div className="mt-6 p-4 bg-gray-50 dark:bg-gray-800 rounded-xl">
      <h4 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-3">
        🔍 Token Validation Test
      </h4>

      <button
        onClick={handleValidation}
        disabled={isValidating}
        className="btn-primary bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isValidating ? (
          <>
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
            Validating...
          </>
        ) : (
          "Test Backend Validation"
        )}
      </button>

      {validationResult && (
        <div
          className={`mt-3 p-3 rounded-lg ${
            validationResult.isValid
              ? "bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800"
              : "bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800"
          }`}
        >
          <p
            className={`text-sm ${
              validationResult.isValid
                ? "text-green-700 dark:text-green-300"
                : "text-red-700 dark:text-red-300"
            }`}
          >
            {validationResult.message}
          </p>
        </div>
      )}

      <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
        This test validates your token with the backend server to ensure it's
        still valid.
      </p>
    </div>
  );
};

export default TokenValidationStatus;
