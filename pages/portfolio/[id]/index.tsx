import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
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

export default function UserHome() {
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
        <LoadingSpinner message="Cargando portfolio..." />
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

  const { about, projects, languages, skills } = portfolio;

  const safeAbout =
    about ||
    ({
      fullName: "Portfolio",
      metaDescription: "Portfolio personal",
      heroTitle: "Desarrollador Full Stack",
      heroSubtitle: "Apasionado por crear experiencias digitales únicas",
      ctaButtons: {
        projects: "Ver Proyectos",
        contact: "Contactar",
      },
      stats: {
        projects: { title: "Proyectos", subtitle: "Completados" },
        technologies: { title: "Tecnologías", subtitle: "Dominadas" },
        languages: { title: "Idiomas", subtitle: "Fluidez" },
      },
    } as PortfolioData["about"]);

  const safeProjects = projects || [];
  const safeLanguages = languages || [];
  const safeSkills =
    skills ||
    ({
      languages: [],
      frontend: [],
      backend: [],
      databases: [],
      devops: [],
      integrations: [],
      practices: [],
    } as PortfolioData["skills"]);

  return (
    <ProtectedRoute>
      <>
        <Head>
          <title>{safeAbout.fullName} Portfolio</title>
          <meta name="description" content={safeAbout.metaDescription} />
        </Head>

        <Navbar />

        {/* Contenedor rojo para TODO el contenido del usuario */}
        <div className="border-4 border-red-500 rounded-lg m-4 p-4 bg-red-50 dark:bg-red-900/20">
          <UserPortfolioNavbar />

          <main className="pt-4">
            {/* Hero Section */}
            <section className="min-h-screen flex items-center justify-center relative overflow-hidden">
              {/* Background Elements */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900"></div>
              <div className="absolute top-20 left-10 w-72 h-72 bg-primary-300 dark:bg-primary-600 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse-slow"></div>
              <div
                className="absolute top-40 right-10 w-72 h-72 bg-accent-300 dark:bg-accent-600 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse-slow"
                style={{ animationDelay: "2s" }}
              ></div>
              <div
                className="absolute -bottom-8 left-20 w-72 h-72 bg-purple-300 dark:bg-purple-600 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse-slow"
                style={{ animationDelay: "4s" }}
              ></div>

              <div className="container-custom text-center relative z-10">
                <div className="max-w-5xl mx-auto">
                  {/* Name and Title */}
                  <div className="animate-slide-up">
                    <h1 className="text-6xl md:text-7xl font-bold mb-6 gradient-text">
                      {safeAbout.fullName}
                    </h1>
                    <h2 className="text-2xl md:text-3xl text-gray-700 dark:text-gray-300 font-semibold mb-8">
                      {safeAbout.heroTitle}
                      <span className="block text-lg text-primary-600 dark:text-primary-400 font-medium mt-2">
                        {safeAbout.heroSubtitle}
                      </span>
                    </h2>
                  </div>

                  {/* CTA Buttons */}
                  <div
                    className="animate-slide-up flex flex-col sm:flex-row gap-6 justify-center mb-16"
                    style={{ animationDelay: "0.2s" }}
                  >
                    <Link
                      href="/projects"
                      className="btn-primary text-lg px-10 py-4 group"
                    >
                      <span className="flex items-center gap-2">
                        {safeAbout.ctaButtons.projects}
                        <svg
                          className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M13 7l5 5m0 0l-5 5m5-5H6"
                          />
                        </svg>
                      </span>
                    </Link>
                    <Link
                      href="/contact"
                      className="btn-secondary text-lg px-10 py-4 group"
                    >
                      <span className="flex items-center gap-2">
                        {safeAbout.ctaButtons.contact}
                        <svg
                          className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                          />
                        </svg>
                      </span>
                    </Link>
                  </div>

                  {/* Quick Stats Section */}
                  <div
                    className="animate-slide-up"
                    style={{ animationDelay: "0.4s" }}
                  >
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                      <div className="card hover-lift text-center group">
                        <div className="text-5xl font-bold gradient-text mb-4 group-hover:scale-110 transition-transform duration-300">
                          {safeProjects.length}+
                        </div>
                        <div className="text-gray-600 dark:text-gray-400 text-lg font-medium">
                          {safeAbout.stats.projects.title}
                        </div>
                        <div className="mt-4 text-sm text-gray-500 dark:text-gray-500">
                          {safeAbout.stats.projects.subtitle}
                        </div>
                      </div>
                      <div className="card hover-lift text-center group">
                        <div className="text-5xl font-bold gradient-text mb-4 group-hover:scale-110 transition-transform duration-300">
                          {Object.values(safeSkills).flat().length}+
                        </div>
                        <div className="text-gray-600 dark:text-gray-400 text-lg font-medium">
                          {safeAbout.stats.technologies.title}
                        </div>
                        <div className="mt-4 text-sm text-gray-500 dark:text-gray-500">
                          {safeAbout.stats.technologies.subtitle}
                        </div>
                      </div>
                      <div className="card hover-lift text-center group">
                        <div className="text-5xl font-bold gradient-text mb-4 group-hover:scale-110 transition-transform duration-300">
                          {safeLanguages.length}
                        </div>
                        <div className="text-gray-600 dark:text-gray-400 text-lg font-medium">
                          {safeAbout.stats.languages.title} (
                          {safeLanguages.map((l) => l.name).join(" & ")})
                        </div>
                        <div className="mt-4 text-sm text-gray-500 dark:text-gray-500">
                          {safeAbout.stats.languages.subtitle}
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
