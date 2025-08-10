import Head from "next/head";
import Image from "next/image";
import Navbar from "../../../components/Navbar";
import Footer from "../../../components/Footer";
import UserPortfolioNavbar from "../../../components/UserPortfolioNavbar";
import UserPortfolioFooter from "../../../components/UserPortfolioFooter";
import LoadingSpinner from "../../../components/LoadingSpinner";
import ErrorMessage from "../../../components/ErrorMessage";
import ProtectedRoute from "../../../components/ProtectedRoute";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { portfolioApi, ApiError } from "../../../services/api";
import { PortfolioData } from "../../../data/types";
import { useAuth } from "../../../context/AuthContext";

export default function UserAbout() {
  const router = useRouter();
  const { id } = router.query;
  const { token } = useAuth();

  const [portfolio, setPortfolio] = useState<PortfolioData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [hasApiError, setHasApiError] = useState(false);

  const loadPortfolio = async () => {
    if (!router.isReady || typeof id !== "string") return;
    try {
      setLoading(true);
      setError(null);
      setHasApiError(false);
      const data = await portfolioApi.getPortfolioById(id, token || undefined);
      setPortfolio(data);
    } catch (err) {
      if (err instanceof ApiError) {
        setError(err.message);
      } else {
        setError("Error inesperado al cargar el portfolio");
      }
      setHasApiError(true);
      setPortfolio(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void loadPortfolio();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.isReady, id, token]);

  if (loading) {
    return (
      <ProtectedRoute>
        <LoadingSpinner message="Cargando información..." />
      </ProtectedRoute>
    );
  }

  if (hasApiError && error) {
    return (
      <ProtectedRoute>
        <ErrorMessage message={error} onRetry={loadPortfolio} />
      </ProtectedRoute>
    );
  }

  if (!portfolio) {
    return (
      <ProtectedRoute>
        <ErrorMessage
          message="No se pudieron cargar los datos del portfolio"
          onRetry={loadPortfolio}
        />
      </ProtectedRoute>
    );
  }

  const { skills, achievements, about, languages } = portfolio;

  return (
    <ProtectedRoute>
      <>
        <Head>
          <title>{about.fullName} Portfolio</title>
          <meta name="description" content={about.pageDescription} />
        </Head>

        <Navbar />

        {/* Contenedor rojo para TODO el contenido del usuario */}
        <div className="border-4 border-red-500 rounded-lg m-4 p-4 bg-red-50 dark:bg-red-900/20">
          <UserPortfolioNavbar />

          <main className="min-h-screen relative pt-4">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900"></div>
            <div className="absolute top-20 right-10 w-96 h-96 bg-primary-300/10 dark:bg-primary-600/10 rounded-full blur-3xl"></div>
            <div className="absolute bottom-20 left-10 w-96 h-96 bg-accent-300/10 dark:bg-accent-600/10 rounded-full blur-3xl"></div>

            <section className="py-20 relative z-10">
              <div className="container-custom">
                <div className="text-center mb-16 animate-fade-in">
                  <h1 className="section-title mb-6">About Me</h1>
                </div>

                <div className="max-w-6xl mx-auto space-y-12">
                  <div className="animate-fade-in">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
                      <div className="lg:col-span-1 flex flex-col items-center">
                        <div className="mb-8">
                          <div className="relative w-56 h-56 mx-auto group">
                            <div className="absolute inset-0 bg-gradient-to-r from-primary-400 to-accent-400 dark:from-primary-500 dark:to-accent-500 rounded-full blur-xl opacity-30 group-hover:opacity-50 transition-opacity duration-300"></div>
                            <Image
                              src={about.avatarUrl}
                              alt={about.fullName}
                              fill
                              className="rounded-full object-cover shadow-2xl border-4 border-white/20 dark:border-gray-700/20 floating"
                              priority
                            />
                            <div className="absolute inset-0 rounded-full border-4 border-transparent bg-gradient-to-r from-primary-400 to-accent-400 dark:from-primary-500 dark:to-accent-500 bg-clip-border opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                          </div>
                        </div>

                        <div
                          className="animate-slide-up"
                          style={{ animationDelay: "0.2s" }}
                        >
                          <div className="inline-flex items-center gap-2 bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm px-6 py-3 rounded-full border border-white/20 dark:border-gray-700/20 shadow-lg">
                            <span className="text-2xl">📍</span>
                            <div className="flex flex-col">
                              <p className="text-lg text-gray-700 dark:text-gray-300 font-medium">
                                {about.location}
                              </p>
                              <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">
                                {about.relocationStatus}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="lg:col-span-2">
                        <div className="glass-card p-8 h-full">
                          <h2 className="text-3xl font-bold gradient-text mb-8">
                            My Story
                          </h2>
                          <div className="prose prose-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                            {about.biography
                              .split("\n\n")
                              .map((paragraph, index) => (
                                <p
                                  key={index}
                                  className={
                                    index ===
                                    about.biography.split("\n\n").length - 1
                                      ? "text-xl"
                                      : "mb-6 text-xl"
                                  }
                                >
                                  {paragraph}
                                </p>
                              ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div
                    className="animate-slide-up"
                    style={{ animationDelay: "0.2s" }}
                  >
                    <div className="glass-card p-8">
                      <h2 className="text-3xl font-bold gradient-text mb-8">
                        Key Achievements
                      </h2>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {achievements.map((achievement) => (
                          <div
                            key={achievement.id}
                            className="flex items-start gap-3 group"
                          >
                            <div className="w-2 h-2 bg-green-500 rounded-full mt-3 group-hover:scale-150 transition-transform duration-300"></div>
                            <span className="text-gray-700 dark:text-gray-300 text-lg">
                              {achievement.description}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div
                    className="animate-slide-up"
                    style={{ animationDelay: "0.3s" }}
                  >
                    <div className="glass-card p-8">
                      <h2 className="text-3xl font-bold gradient-text mb-8">
                        Languages
                      </h2>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {languages.map((language) => (
                          <div
                            key={language.name}
                            className="flex items-center justify-between p-6 bg-white/50 dark:bg-gray-800/50 rounded-xl hover:bg-white/70 dark:hover:bg-gray-800/70 hover:scale-105 transition-all duration-300 group"
                          >
                            <span className="text-xl font-semibold text-gray-900 dark:text-gray-100 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors duration-300">
                              {language.name}
                            </span>
                            <span
                              className={`text-lg text-gray-600 dark:text-gray-400 px-4 py-2 rounded-full transition-colors duration-300 ${
                                language.isNative
                                  ? "bg-green-100 dark:bg-green-900/30 group-hover:bg-green-200 dark:group-hover:bg-green-800/40"
                                  : "bg-blue-100 dark:bg-blue-900/30 group-hover:bg-blue-200 dark:group-hover:bg-blue-800/40"
                              }`}
                            >
                              {language.level}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div
                    className="animate-slide-up"
                    style={{ animationDelay: "0.4s" }}
                  >
                    <div className="glass-card p-8">
                      <h2 className="text-3xl font-bold gradient-text mb-12">
                        Skills & Technologies
                      </h2>

                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        <div className="group">
                          <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-4 flex items-center gap-2">
                            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-blue-600 dark:from-blue-400 dark:to-blue-500 rounded-lg flex items-center justify-center">
                              <svg
                                className="w-5 h-5 text-white"
                                fill="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                              </svg>
                            </div>
                            Languages
                          </h3>
                          <div className="flex flex-wrap gap-2">
                            {skills.languages.map((skill) => (
                              <span
                                key={skill.id}
                                className="px-4 py-2 bg-gradient-to-r from-blue-100 to-blue-200 dark:from-blue-900/30 dark:to-blue-800/30 text-blue-800 dark:text-blue-300 text-sm font-semibold rounded-full border border-blue-200 dark:border-blue-700/30 hover:scale-105 transition-transform duration-200"
                              >
                                {skill.name}
                              </span>
                            ))}
                          </div>
                        </div>

                        <div className="group">
                          <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-4 flex items-center gap-2">
                            <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-green-600 dark:from-green-400 dark:to-green-500 rounded-lg flex items-center justify-center">
                              <svg
                                className="w-5 h-5 text-white"
                                fill="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                              </svg>
                            </div>
                            Frontend
                          </h3>
                          <div className="flex flex-wrap gap-2">
                            {skills.frontend.map((skill) => (
                              <span
                                key={skill.id}
                                className="px-4 py-2 bg-gradient-to-r from-green-100 to-green-200 dark:from-green-900/30 dark:to-green-800/30 text-green-800 dark:text-green-300 text-sm font-semibold rounded-full border border-green-200 dark:border-green-700/30 hover:scale-105 transition-transform duration-200"
                              >
                                {skill.name}
                              </span>
                            ))}
                          </div>
                        </div>

                        <div className="group">
                          <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-4 flex items-center gap-2">
                            <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-purple-600 dark:from-purple-400 dark:to-purple-500 rounded-lg flex items-center justify-center">
                              <svg
                                className="w-5 h-5 text-white"
                                fill="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                              </svg>
                            </div>
                            Backend
                          </h3>
                          <div className="flex flex-wrap gap-2">
                            {skills.backend.map((skill) => (
                              <span
                                key={skill.id}
                                className="px-4 py-2 bg-gradient-to-r from-purple-100 to-purple-200 dark:from-purple-900/30 dark:to-purple-800/30 text-purple-800 dark:text-purple-300 text-sm font-semibold rounded-full border border-purple-200 dark:border-purple-700/30 hover:scale-105 transition-transform duration-200"
                              >
                                {skill.name}
                              </span>
                            ))}
                          </div>
                        </div>

                        <div className="group">
                          <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-4 flex items-center gap-2">
                            <div className="w-8 h-8 bg-gradient-to-r from-orange-500 to-orange-600 dark:from-orange-400 dark:to-orange-500 rounded-lg flex items-center justify-center">
                              <svg
                                className="w-5 h-5 text-white"
                                fill="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                              </svg>
                            </div>
                            Databases
                          </h3>
                          <div className="flex flex-wrap gap-2">
                            {skills.databases.map((skill) => (
                              <span
                                key={skill.id}
                                className="px-4 py-2 bg-gradient-to-r from-orange-100 to-orange-200 dark:from-orange-900/30 dark:to-orange-800/30 text-orange-800 dark:text-orange-300 text-sm font-semibold rounded-full border border-orange-200 dark:border-orange-700/30 hover:scale-105 transition-transform duration-200"
                              >
                                {skill.name}
                              </span>
                            ))}
                          </div>
                        </div>

                        <div className="group">
                          <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-4 flex items-center gap-2">
                            <div className="w-8 h-8 bg-gradient-to-r from-indigo-500 to-indigo-600 dark:from-indigo-400 dark:to-indigo-500 rounded-lg flex items-center justify-center">
                              <svg
                                className="w-5 h-5 text-white"
                                fill="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                              </svg>
                            </div>
                            DevOps & Tools
                          </h3>
                          <div className="flex flex-wrap gap-2">
                            {skills.devops.map((skill) => (
                              <span
                                key={skill.id}
                                className="px-4 py-2 bg-gradient-to-r from-indigo-100 to-indigo-200 dark:from-indigo-900/30 dark:to-indigo-800/30 text-indigo-800 dark:text-indigo-300 text-sm font-semibold rounded-full border border-indigo-200 dark:border-indigo-700/30 hover:scale-105 transition-transform duration-200"
                              >
                                {skill.name}
                              </span>
                            ))}
                          </div>
                        </div>

                        <div className="group">
                          <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-4 flex items-center gap-2">
                            <div className="w-8 h-8 bg-gradient-to-r from-pink-500 to-pink-600 dark:from-pink-400 dark:to-pink-500 rounded-lg flex items-center justify-center">
                              <svg
                                className="w-5 h-5 text-white"
                                fill="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                              </svg>
                            </div>
                            Integrations
                          </h3>
                          <div className="flex flex-wrap gap-2">
                            {skills.integrations.map((skill) => (
                              <span
                                key={skill.id}
                                className="px-4 py-2 bg-gradient-to-r from-pink-100 to-pink-200 dark:from-pink-900/30 dark:to-pink-800/30 text-pink-800 dark:text-pink-300 text-sm font-semibold rounded-full border border-pink-200 dark:border-pink-700/30 hover:scale-105 transition-transform duration-200"
                              >
                                {skill.name}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>

                      <div className="mt-12">
                        <h3 className="text-2xl font-bold gradient-text mb-6">
                          Best Practices & Architecture
                        </h3>
                        <div className="flex flex-wrap gap-3">
                          {skills.practices.map((skill) => (
                            <span
                              key={skill.id}
                              className="px-4 py-2 bg-gradient-to-r from-gray-100 to-gray-200 dark:from-gray-800/30 dark:to-gray-700/30 text-gray-800 dark:text-gray-300 text-sm font-semibold rounded-full border border-gray-200 dark:border-gray-600/30 hover:scale-105 transition-transform duration-200"
                            >
                              {skill.name}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </main>

          <UserPortfolioFooter />
        </div>

        <Footer />
      </>
    </ProtectedRoute>
  );
}
