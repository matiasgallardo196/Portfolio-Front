import { useEffect } from "react";
import { useAutoValidation } from "../hooks/useAutoValidation";

const AutoValidationStatus = () => {
  const { validationInfo, getTimeUntilNext, formatTime } = useAutoValidation();

  // Actualizar el contador cada segundo para mostrar el tiempo restante
  useEffect(() => {
    const interval = setInterval(() => {
      // Forzar re-render para actualizar el tiempo
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl">
      <h4 className="text-lg font-semibold text-blue-900 dark:text-blue-100 mb-3">
        🤖 Automatic Token Validation
      </h4>

      <div className="space-y-3 text-sm">
        <div className="flex justify-between">
          <span className="text-blue-700 dark:text-blue-300">Status:</span>
          <span
            className={`font-medium ${
              validationInfo.isActive
                ? "text-green-600 dark:text-green-400"
                : "text-gray-500 dark:text-gray-400"
            }`}
          >
            {validationInfo.isActive ? "Active ✓" : "Inactive"}
          </span>
        </div>

        <div className="flex justify-between">
          <span className="text-blue-700 dark:text-blue-300">Interval:</span>
          <span className="text-blue-900 dark:text-blue-100">
            Every 5 minutes
          </span>
        </div>

        <div className="flex justify-between">
          <span className="text-blue-700 dark:text-blue-300">Validations:</span>
          <span className="text-blue-900 dark:text-blue-100">
            {validationInfo.validationCount}
          </span>
        </div>

        {validationInfo.lastValidation && (
          <div className="flex justify-between">
            <span className="text-blue-700 dark:text-blue-300">
              Last check:
            </span>
            <span className="text-blue-900 dark:text-blue-100">
              {formatTime(validationInfo.lastValidation)}
            </span>
          </div>
        )}

        <div className="flex justify-between">
          <span className="text-blue-700 dark:text-blue-300">Next check:</span>
          <span className="text-blue-900 dark:text-blue-100 font-medium">
            {getTimeUntilNext()}
          </span>
        </div>
      </div>

      <div className="mt-4 p-3 bg-blue-100 dark:bg-blue-800/30 rounded-lg">
        <h5 className="text-sm font-medium text-blue-800 dark:text-blue-200 mb-2">
          🔄 Validation Triggers:
        </h5>
        <ul className="text-xs text-blue-700 dark:text-blue-300 space-y-1">
          <li>• Every 5 minutes automatically</li>
          <li>• When returning to this tab</li>
          <li>• On page load/refresh</li>
          <li>• Manual validation (button below)</li>
        </ul>
      </div>

      <div className="mt-3 text-xs text-blue-600 dark:text-blue-400">
        💡 Automatic validation ensures your session stays secure and
        up-to-date.
      </div>
    </div>
  );
};

export default AutoValidationStatus;
