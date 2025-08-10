import Head from "next/head";
import Link from "next/link";
import Navbar from "../../../components/Navbar";
import Footer from "../../../components/Footer";
import UserPortfolioNavbar from "../../../components/UserPortfolioNavbar";
import UserPortfolioFooter from "../../../components/UserPortfolioFooter";
import ProjectCard from "../../../components/ProjectCard";
import LoadingSpinner from "../../../components/LoadingSpinner";
import ErrorMessage from "../../../components/ErrorMessage";
import ProtectedRoute from "../../../components/ProtectedRoute";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { portfolioApi, ApiError } from "../../../services/api";
import { PortfolioData } from "../../../data/types";
import { useAuth } from "../../../context/AuthContext";
import {
  projectsPageDescription,
  projectsCallToAction,
} from "../../../data/projects";

export default function UserProjects() {
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
        <LoadingSpinner message="Cargando proyectos..." />
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

  const { projects, about } = portfolio;

  return (
    <ProtectedRoute>
      <>
        <Head>
          <title>{about.fullName} Portfolio</title>
          <meta
            name="description"
            content="Portfolio of full stack development projects"
          />
        </Head>

        <Navbar />

        {/* Contenedor rojo para TODO el contenido del usuario */}
        <div className="border-4 border-red-500 rounded-lg m-4 bg-red-50 dark:bg-red-900/20">
          <UserPortfolioNavbar />

          <main className="min-h-screen relative">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900"></div>
            <div className="absolute top-20 right-10 w-96 h-96 bg-primary-300/10 dark:bg-primary-600/10 rounded-full blur-3xl"></div>
            <div className="absolute bottom-20 left-10 w-96 h-96 bg-accent-300/10 dark:bg-accent-600/10 rounded-full blur-3xl"></div>

            <section className="py-20 relative z-10">
              <div className="container-custom">
                <div className="text-center mb-16 animate-fade-in">
                  <h1 className="section-title mb-6">My Projects</h1>

                  <div className="glass-card p-8 max-w-4xl mx-auto">
                    <p className="text-xl text-gray-700 dark:text-gray-300 leading-relaxed">
                      {projectsPageDescription}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
                  {projects.map((project, index) => (
                    <div
                      key={index}
                      className="animate-slide-up"
                      style={{ animationDelay: `${index * 0.1}s` }}
                    >
                      <ProjectCard
                        title={project.title}
                        description={project.description}
                        technologies={project.technologies}
                        githubUrl={project.githubUrl}
                        demoUrl={project.demoUrl}
                        imageUrl={project.imageUrl}
                      />
                    </div>
                  ))}
                </div>

                <div
                  className="text-center animate-slide-up"
                  style={{ animationDelay: "0.6s" }}
                >
                  <div className="bg-gradient-to-r from-primary-500/10 to-accent-500/10 dark:from-primary-600/20 dark:to-accent-600/20 backdrop-blur-sm border border-primary-200/20 dark:border-primary-700/20 rounded-2xl p-8 max-w-3xl mx-auto">
                    <h2 className="text-3xl font-bold gradient-text mb-4">
                      {projectsCallToAction.title}
                    </h2>
                    <p className="text-lg text-gray-700 dark:text-gray-300 mb-8 leading-relaxed">
                      {projectsCallToAction.description}
                    </p>
                    <Link
                      href="/contact"
                      className="btn-primary text-lg px-10 py-4 group inline-flex items-center"
                    >
                      <span className="flex items-center gap-2">
                        {projectsCallToAction.buttonText}
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
