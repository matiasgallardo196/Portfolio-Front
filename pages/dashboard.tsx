import { useAuth } from "../context/AuthContext";
import ProtectedRoute from "../components/ProtectedRoute";
import { useTheme } from "./_app";
import { useTokenValidation } from "../hooks/useTokenValidation";
import TokenExpiryAlert from "../components/TokenExpiryAlert";
import TokenValidationStatus from "../components/TokenValidationStatus";
import AutoValidationStatus from "../components/AutoValidationStatus";
import Link from "next/link";

const Dashboard = () => {
  const { user, logout, token, validateToken } = useAuth();
  const { theme } = useTheme();
  const { getTokenInfo } = useTokenValidation();

  return (
    <ProtectedRoute>
      <TokenExpiryAlert />
      <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
        <div className="container-custom">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="section-title">Dashboard</h1>
            <p className="text-xl text-gray-600 dark:text-gray-400">
              Welcome to your control panel
            </p>
          </div>

          {/* Welcome Card */}
          <div className="max-w-4xl mx-auto">
            <div className="card">
              <div className="text-center">
                <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-r from-primary-500 to-accent-500 rounded-full flex items-center justify-center">
                  <span className="text-2xl font-bold text-white">
                    {user?.email?.charAt(0).toUpperCase() || "U"}
                  </span>
                </div>

                <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">
                  Hello, {user?.email}!
                </h2>

                <p className="text-gray-600 dark:text-gray-400 mb-8 max-w-2xl mx-auto">
                  You have successfully signed in. This is your personal control
                  panel where you can manage your account and access exclusive
                  features.
                </p>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                  <div className="glass-card p-6 text-center">
                    <div className="text-3xl font-bold text-primary-600 dark:text-primary-400 mb-2">
                      1
                    </div>
                    <div className="text-gray-600 dark:text-gray-400">
                      Active Session
                    </div>
                  </div>

                  <div className="glass-card p-6 text-center">
                    <div className="text-3xl font-bold text-accent-600 dark:text-accent-400 mb-2">
                      ✓
                    </div>
                    <div className="text-gray-600 dark:text-gray-400">
                      Authenticated
                    </div>
                  </div>

                  <div className="glass-card p-6 text-center">
                    <div className="text-3xl font-bold text-green-600 dark:text-green-400 mb-2">
                      🔒
                    </div>
                    <div className="text-gray-600 dark:text-gray-400">
                      Secure
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <button onClick={logout} className="btn-secondary">
                    Sign Out
                  </button>

                  <Link
                    href={`/portfolio/${user?.id ?? ""}`}
                    className="btn-primary"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Ver mi Portfolio
                  </Link>
                </div>

                {/* Token Validation Test */}
                <TokenValidationStatus />

                {/* Automatic Validation Status */}
                <AutoValidationStatus />
              </div>
            </div>
          </div>

          {/* Additional Info */}
          <div className="mt-12 text-center">
            <div className="glass-card p-6 max-w-2xl mx-auto">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
                Session Information
              </h3>
              <div className="text-sm text-gray-600 dark:text-gray-400 space-y-2">
                <p>
                  <strong>Email:</strong> {user?.email}
                </p>
                <p>
                  <strong>User ID:</strong> {user?.id}
                </p>
                <p>
                  <strong>Current Theme:</strong>{" "}
                  {theme === "dark" ? "Dark" : "Light"}
                </p>
                <p>
                  <strong>Status:</strong> Authenticated ✓
                </p>
                {token && getTokenInfo(token) && (
                  <>
                    <p>
                      <strong>Token Expires In:</strong>{" "}
                      {getTokenInfo(token)?.expiresInMinutes} minutes
                    </p>
                    <p>
                      <strong>Token Issued:</strong>{" "}
                      {new Date(
                        getTokenInfo(token)?.payload.iat * 1000
                      ).toLocaleString()}
                    </p>
                    <p>
                      <strong>Token Expires:</strong>{" "}
                      {new Date(
                        getTokenInfo(token)?.payload.exp * 1000
                      ).toLocaleString()}
                    </p>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default Dashboard;
