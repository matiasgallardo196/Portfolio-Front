import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { usePortfolio } from "../context/PortfolioContext";

export default function Home() {
  const { portfolio } = usePortfolio();
  const { about, projects, languages } = portfolio;
  return (
    <>
      <Head>
        <title>Matias Gallardo Portfolio</title>
        <meta
          name="description"
          content="Full Stack Web Developer with strong Back-End orientation. Specialized in NestJS, TypeScript, PostgreSQL, and scalable systems. Based in Sydney, Australia."
        />
      </Head>

      <Navbar />

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
                <h1 className="text-6xl md:text-7xl font-bold mb-6 gradient-text">
                  {about.fullName}
                </h1>
                <h2 className="text-2xl md:text-3xl text-gray-700 dark:text-gray-300 font-semibold mb-8">
                  Full Stack Web Developer
                  <span className="block text-lg text-primary-600 dark:text-primary-400 font-medium mt-2">
                    Back-End Oriented
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
                    Checkout My Work
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
                    Contact Me
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
                      {projects.length}+
                    </div>
                    <div className="text-gray-600 dark:text-gray-400 text-lg font-medium">
                      Full-Stack Projects Deployed
                    </div>
                    <div className="mt-4 text-sm text-gray-500 dark:text-gray-500">
                      Production-ready applications
                    </div>
                  </div>
                  <div className="card hover-lift text-center group">
                    <div className="text-5xl font-bold gradient-text mb-4 group-hover:scale-110 transition-transform duration-300">
                      {Object.values(portfolio.skills).flat().length}+
                    </div>
                    <div className="text-gray-600 dark:text-gray-400 text-lg font-medium">
                      Technologies Mastered
                    </div>
                    <div className="mt-4 text-sm text-gray-500 dark:text-gray-500">
                      Modern stack expertise
                    </div>
                  </div>
                  <div className="card hover-lift text-center group">
                    <div className="text-5xl font-bold gradient-text mb-4 group-hover:scale-110 transition-transform duration-300">
                      {languages.length}
                    </div>
                    <div className="text-gray-600 dark:text-gray-400 text-lg font-medium">
                      Languages ({languages.map((l) => l.name).join(" & ")})
                    </div>
                    <div className="mt-4 text-sm text-gray-500 dark:text-gray-500">
                      Bilingual communication
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
