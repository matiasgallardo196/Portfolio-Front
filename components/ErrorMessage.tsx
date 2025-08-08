interface ErrorMessageProps {
  message: string;
  onRetry?: () => void;
  showRetryButton?: boolean;
}

export const ErrorMessage: React.FC<ErrorMessageProps> = ({
  message,
  onRetry,
  showRetryButton = true,
}) => {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center max-w-md mx-auto p-6">
        <div className="mb-4">
          <svg
            className="mx-auto h-16 w-16 text-red-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
            />
          </svg>
        </div>

        <h2 className="text-2xl font-bold text-red-600 mb-4">
          Error al Cargar el Portfolio
        </h2>

        <p className="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
          {message}
        </p>

        {showRetryButton && onRetry && (
          <button
            onClick={onRetry}
            className="bg-primary-600 hover:bg-primary-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200"
          >
            Intentar de Nuevo
          </button>
        )}
      </div>
    </div>
  );
};
