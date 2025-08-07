import Head from "next/head";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { usePortfolio } from "../context/PortfolioContext";

export default function Contact() {
  const { portfolio } = usePortfolio();
  const { contact } = portfolio;

  const contactInfo = [
    {
      name: "Email",
      value: contact.email,
      url: `mailto:${contact.email}`,
      icon: (
        <svg
          className="w-8 h-8"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
          />
        </svg>
      ),
    },
    {
      name: "GitHub",
      value: contact.github.replace("https://", ""),
      url: contact.github,
      icon: (
        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
        </svg>
      ),
    },
    {
      name: "LinkedIn",
      value: contact.linkedin.replace("https://", ""),
      url: contact.linkedin,
      icon: (
        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
        </svg>
      ),
    },
  ];

  return (
    <>
      <Head>
        <title>{portfolio.about.fullName} Portfolio</title>
        <meta name="description" content={contact.metaDescription} />
      </Head>

      <Navbar />

      <main className="min-h-screen relative">
        {/* Background decoration */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900"></div>
        <div className="absolute top-20 left-10 w-96 h-96 bg-primary-300/10 dark:bg-primary-600/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent-300/10 dark:bg-accent-600/10 rounded-full blur-3xl"></div>

        <section className="py-20 relative z-10">
          <div className="container-custom">
            <div className="text-center mb-16 animate-fade-in">
              <h1 className="section-title mb-6">{contact.heroTitle}</h1>
            </div>

            <div className="max-w-6xl mx-auto">
              {/* Contact Info Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
                {contactInfo.map((contact, index) => (
                  <div
                    key={index}
                    className="animate-slide-up"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <a
                      href={contact.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="card hover-lift group h-full flex flex-col items-center text-center p-8"
                    >
                      <div className="bg-gradient-to-r from-primary-500 to-accent-500 dark:from-primary-400 dark:to-accent-400 p-4 rounded-2xl mb-6 group-hover:scale-110 transition-transform duration-300">
                        <div className="text-white">{contact.icon}</div>
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-2 group-hover:gradient-text transition-all duration-300">
                        {contact.name}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400 text-lg">
                        {contact.value}
                      </p>
                    </a>
                  </div>
                ))}
              </div>

              {/* Main Content */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                {/* Let's Talk Section */}
                <div
                  className="animate-slide-up"
                  style={{ animationDelay: "0.3s" }}
                >
                  <div className="glass-card p-8 h-full">
                    <h2 className="text-3xl font-bold gradient-text mb-6">
                      {contact.letsTalkTitle}
                    </h2>
                    <p className="text-xl text-gray-700 dark:text-gray-300 leading-relaxed mb-8">
                      {contact.letsTalkDescription}
                    </p>

                    <div className="flex items-center gap-4">
                      <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                      <span className="text-lg text-gray-700 dark:text-gray-300 font-semibold">
                        Available for new opportunities
                      </span>
                    </div>
                  </div>
                </div>

                {/* Availability Section */}
                <div
                  className="animate-slide-up"
                  style={{ animationDelay: "0.4s" }}
                >
                  <div className="glass-card p-8 h-full">
                    <h2 className="text-3xl font-bold gradient-text mb-8">
                      {contact.availabilityTitle}
                    </h2>

                    <div className="space-y-8">
                      {/* Current Status */}
                      <div>
                        <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
                          {contact.currentStatusTitle}
                        </h3>
                        <div className="space-y-3">
                          {contact.opportunities.map((item, index) => (
                            <div
                              key={index}
                              className="flex items-center gap-3"
                            >
                              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                              <span className="text-gray-700 dark:text-gray-300">
                                {item}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Location */}
                      <div>
                        <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
                          {contact.locationTitle}
                        </h3>
                        <div className="space-y-3">
                          {contact.locationInfo.map((item, index) => (
                            <div
                              key={index}
                              className="flex items-center gap-3"
                            >
                              <div className="w-2 h-2 bg-primary-500 dark:bg-primary-400 rounded-full"></div>
                              <span className="text-gray-700 dark:text-gray-300">
                                {item}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
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
