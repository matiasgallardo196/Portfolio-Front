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
import EditableText from "../../../components/EditableText";
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
  const [saving, setSaving] = useState(false);

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

  const updatePortfolio = async (updates: Partial<PortfolioData>) => {
    if (!portfolio || !id || typeof id !== "string") return;

    try {
      setSaving(true);
      const updatedPortfolio = await portfolioApi.updatePortfolioById(
        id,
        updates,
        token || undefined
      );
      setPortfolio(updatedPortfolio);
    } catch (err) {
      console.error("Error updating portfolio:", err);
      // Aquí podrías mostrar un toast de error
    } finally {
      setSaving(false);
    }
  };

  const handleUpdateAbout = (
    field: keyof PortfolioData["about"],
    value: string
  ) => {
    if (!portfolio) return;

    const updatedAbout = {
      ...portfolio.about,
      [field]: value,
    };

    updatePortfolio({
      ...portfolio,
      about: updatedAbout,
    });
  };

  const handleUpdateCtaButton = (
    buttonType: "projects" | "contact",
    value: string
  ) => {
    if (!portfolio) return;

    const updatedCtaButtons = {
      ...portfolio.about.ctaButtons,
      [buttonType]: value,
    };

    const updatedAbout = {
      ...portfolio.about,
      ctaButtons: updatedCtaButtons,
    };

    updatePortfolio({
      ...portfolio,
      about: updatedAbout,
    });
  };

  const handleUpdateStats = (
    statType: "projects" | "technologies" | "languages",
    field: "title" | "subtitle",
    value: string
  ) => {
    if (!portfolio) return;

    const updatedStats = {
      ...portfolio.about.stats,
      [statType]: {
        ...portfolio.about.stats[statType],
        [field]: value,
      },
    };

    const updatedAbout = {
      ...portfolio.about,
      stats: updatedStats,
    };

    updatePortfolio({
      ...portfolio,
      about: updatedAbout,
    });
  };

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
        <div className="border-4 border-red-500 rounded-lg m-4 bg-red-50 dark:bg-red-900/20">
          <UserPortfolioNavbar />

          <main>
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
                    <EditableText
                      value={safeAbout.fullName}
                      onSave={(value) => handleUpdateAbout("fullName", value)}
                      className="text-6xl md:text-7xl font-bold mb-6 gradient-text"
                      tag="h1"
                      placeholder="Tu nombre completo"
                    />
                    <div className="text-2xl md:text-3xl text-gray-700 dark:text-gray-300 font-semibold mb-8">
                      <EditableText
                        value={safeAbout.heroTitle}
                        onSave={(value) =>
                          handleUpdateAbout("heroTitle", value)
                        }
                        className="block"
                        tag="div"
                        placeholder="Tu título profesional"
                      />
                      <EditableText
                        value={safeAbout.heroSubtitle}
                        onSave={(value) =>
                          handleUpdateAbout("heroSubtitle", value)
                        }
                        className="block text-lg text-primary-600 dark:text-primary-400 font-medium mt-2"
                        tag="div"
                        placeholder="Tu subtítulo o descripción"
                      />
                    </div>
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
                        <EditableText
                          value={safeAbout.ctaButtons.projects}
                          onSave={(value) =>
                            handleUpdateCtaButton("projects", value)
                          }
                          className="inline"
                          placeholder="Ver Proyectos"
                        />
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
                        <EditableText
                          value={safeAbout.ctaButtons.contact}
                          onSave={(value) =>
                            handleUpdateCtaButton("contact", value)
                          }
                          className="inline"
                          placeholder="Contactar"
                        />
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
                          <EditableText
                            value={safeAbout.stats.projects.title}
                            onSave={(value) =>
                              handleUpdateStats("projects", "title", value)
                            }
                            placeholder="Proyectos"
                          />
                        </div>
                        <div className="mt-4 text-sm text-gray-500 dark:text-gray-500">
                          <EditableText
                            value={safeAbout.stats.projects.subtitle}
                            onSave={(value) =>
                              handleUpdateStats("projects", "subtitle", value)
                            }
                            placeholder="Completados"
                          />
                        </div>
                      </div>
                      <div className="card hover-lift text-center group">
                        <div className="text-5xl font-bold gradient-text mb-4 group-hover:scale-110 transition-transform duration-300">
                          {Object.values(safeSkills).flat().length}+
                        </div>
                        <div className="text-gray-600 dark:text-gray-400 text-lg font-medium">
                          <EditableText
                            value={safeAbout.stats.technologies.title}
                            onSave={(value) =>
                              handleUpdateStats("technologies", "title", value)
                            }
                            placeholder="Tecnologías"
                          />
                        </div>
                        <div className="mt-4 text-sm text-gray-500 dark:text-gray-500">
                          <EditableText
                            value={safeAbout.stats.technologies.subtitle}
                            onSave={(value) =>
                              handleUpdateStats(
                                "technologies",
                                "subtitle",
                                value
                              )
                            }
                            placeholder="Dominadas"
                          />
                        </div>
                      </div>
                      <div className="card hover-lift text-center group">
                        <div className="text-5xl font-bold gradient-text mb-4 group-hover:scale-110 transition-transform duration-300">
                          {safeLanguages.length}
                        </div>
                        <div className="text-gray-600 dark:text-gray-400 text-lg font-medium">
                          <EditableText
                            value={`${
                              safeAbout.stats.languages.title
                            } (${safeLanguages
                              .map((l) => l.name)
                              .join(" & ")})`}
                            onSave={(value) =>
                              handleUpdateStats("languages", "title", value)
                            }
                            placeholder="Idiomas (Spanish & English)"
                          />
                        </div>
                        <div className="mt-4 text-sm text-gray-500 dark:text-gray-500">
                          <EditableText
                            value={safeAbout.stats.languages.subtitle}
                            onSave={(value) =>
                              handleUpdateStats("languages", "subtitle", value)
                            }
                            placeholder="Fluidez"
                          />
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
