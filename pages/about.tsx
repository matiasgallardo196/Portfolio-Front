import Head from "next/head";
import Image from "next/image";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function About() {
  const skills = {
    languages: ["JavaScript", "TypeScript", "SQL"],
    frontend: ["React", "Recharts", "HTML", "CSS", "TailwindCSS"],
    backend: ["NestJS", "Node.js", "Express", "RESTful APIs"],
    databases: ["PostgreSQL", "MongoDB"],
    devops: ["Docker", "Vercel", "Render", "Supabase", "Git", "GitHub"],
    integrations: ["Auth0", "Stripe", "Nodemailer", "Cloudinary", "OpenAI"],
    practices: [
      "Testing",
      "Access Control",
      "Validation",
      "Multi-Tenant Architecture",
    ],
  };

  const achievements = [
    "5 full-stack projects deployed to production with CI/CD",
    "Experience with multi-tenant architecture, Stripe, and OpenAI integrations",
    "Proficient in backend development with NestJS, PostgreSQL, and Docker",
    "Designed and implemented secure REST APIs with role-based access",
    "Hands-on deployment experience with Oracle Cloud, Render, Vercel, Netlify, Railway, Fly",
    "Teaching Assistant at Henry bootcamp, supporting students in JavaScript, TypeScript, React, Node, NestJS",
  ];

  return (
    <>
      <Head>
        <title>Matias Gallardo Portfolio</title>
        <meta
          name="description"
          content="Learn more about Matias Gallardo's experience and skills in full stack development"
        />
      </Head>

      <Navbar />

      <main className="min-h-screen relative">
        {/* Background decoration */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900"></div>
        <div className="absolute top-20 right-10 w-96 h-96 bg-primary-300/10 dark:bg-primary-600/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-10 w-96 h-96 bg-accent-300/10 dark:bg-accent-600/10 rounded-full blur-3xl"></div>

        <section className="py-20 relative z-10">
          <div className="container-custom">
            <div className="text-center mb-16 animate-fade-in">
              <h1 className="section-title mb-6">About Me</h1>
            </div>

            <div className="max-w-6xl mx-auto space-y-12">
              {/* Profile Image, Location and My Story */}
              <div className="animate-fade-in">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
                  {/* Left side - Profile Image and Location */}
                  <div className="lg:col-span-1 flex flex-col items-center">
                    {/* Profile Image */}
                    <div className="mb-8">
                      <div className="relative w-56 h-56 mx-auto group">
                        <div className="absolute inset-0 bg-gradient-to-r from-primary-400 to-accent-400 dark:from-primary-500 dark:to-accent-500 rounded-full blur-xl opacity-30 group-hover:opacity-50 transition-opacity duration-300"></div>
                        <Image
                          src="/avatar.jpg"
                          alt="Matias Gallardo"
                          fill
                          className="rounded-full object-cover shadow-2xl border-4 border-white/20 dark:border-gray-700/20 floating"
                          priority
                        />
                        <div className="absolute inset-0 rounded-full border-4 border-transparent bg-gradient-to-r from-primary-400 to-accent-400 dark:from-primary-500 dark:to-accent-500 bg-clip-border opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      </div>
                    </div>

                    {/* Location */}
                    <div
                      className="animate-slide-up"
                      style={{ animationDelay: "0.2s" }}
                    >
                      <div className="inline-flex items-center gap-2 bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm px-6 py-3 rounded-full border border-white/20 dark:border-gray-700/20 shadow-lg">
                        <span className="text-2xl">📍</span>
                        <div className="flex flex-col">
                          <p className="text-lg text-gray-700 dark:text-gray-300 font-medium">
                            Sydney, Australia
                          </p>
                          <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">
                            Open to relocate
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Right side - My Story */}
                  <div className="lg:col-span-2">
                    <div className="glass-card p-8 h-full">
                      <h2 className="text-3xl font-bold gradient-text mb-8">
                        My Story
                      </h2>
                      <div className="prose prose-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                        <p className="mb-6 text-xl">
                          I&apos;m a Full Stack Web Developer with a strong
                          Back-End orientation, passionate about building
                          scalable systems and delivering real-world solutions
                          with measurable impact. I graduated from Henry&apos;s
                          intensive bootcamp and hold a Technical Analyst degree
                          in Information Systems from UTN FRT.
                        </p>
                        <p className="mb-6 text-xl">
                          I specialize in modern technologies and follow best
                          practices in validation, testing, and secure access
                          control through RESTful APIs. My experience includes
                          multi-tenant platforms, Stripe integrations, GitHub
                          Actions, and cloud deployment across various
                          platforms.
                        </p>
                        <p className="text-xl">
                          I&apos;m passionate about clean architecture,
                          automation, and creating solutions that make a real
                          difference. When I&apos;m not coding, I enjoy
                          contributing to the developer community and staying
                          updated with the latest technologies.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Key Achievements */}
              <div
                className="animate-slide-up"
                style={{ animationDelay: "0.2s" }}
              >
                <div className="glass-card p-8">
                  <h2 className="text-3xl font-bold gradient-text mb-8">
                    Key Achievements
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {achievements.map((achievement, index) => (
                      <div key={index} className="flex items-start gap-3 group">
                        <div className="w-2 h-2 bg-green-500 rounded-full mt-3 group-hover:scale-150 transition-transform duration-300"></div>
                        <span className="text-gray-700 dark:text-gray-300 text-lg">
                          {achievement}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Languages */}
              <div
                className="animate-slide-up"
                style={{ animationDelay: "0.3s" }}
              >
                <div className="glass-card p-8">
                  <h2 className="text-3xl font-bold gradient-text mb-8">
                    Languages
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="flex items-center justify-between p-6 bg-white/50 dark:bg-gray-800/50 rounded-xl hover:bg-white/70 dark:hover:bg-gray-800/70 hover:scale-105 transition-all duration-300 group">
                      <span className="text-xl font-semibold text-gray-900 dark:text-gray-100 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors duration-300">
                        Spanish
                      </span>
                      <span className="text-lg text-gray-600 dark:text-gray-400 bg-green-100 dark:bg-green-900/30 px-4 py-2 rounded-full group-hover:bg-green-200 dark:group-hover:bg-green-800/40 transition-colors duration-300">
                        Mother Tongue
                      </span>
                    </div>
                    <div className="flex items-center justify-between p-6 bg-white/50 dark:bg-gray-800/50 rounded-xl hover:bg-white/70 dark:hover:bg-gray-800/70 hover:scale-105 transition-all duration-300 group">
                      <span className="text-xl font-semibold text-gray-900 dark:text-gray-100 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors duration-300">
                        English
                      </span>
                      <span className="text-lg text-gray-600 dark:text-gray-400 bg-blue-100 dark:bg-blue-900/30 px-4 py-2 rounded-full group-hover:bg-blue-200 dark:group-hover:bg-blue-800/40 transition-colors duration-300">
                        C1 Level
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Skills Section */}
              <div
                className="animate-slide-up"
                style={{ animationDelay: "0.4s" }}
              >
                <div className="glass-card p-8">
                  <h2 className="text-3xl font-bold gradient-text mb-12">
                    Skills & Technologies
                  </h2>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {/* Languages */}
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
                        {skills.languages.map((skill, index) => (
                          <span
                            key={index}
                            className="px-4 py-2 bg-gradient-to-r from-blue-100 to-blue-200 dark:from-blue-900/30 dark:to-blue-800/30 text-blue-800 dark:text-blue-300 text-sm font-semibold rounded-full border border-blue-200 dark:border-blue-700/30 hover:scale-105 transition-transform duration-200"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Frontend */}
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
                        {skills.frontend.map((skill, index) => (
                          <span
                            key={index}
                            className="px-4 py-2 bg-gradient-to-r from-green-100 to-green-200 dark:from-green-900/30 dark:to-green-800/30 text-green-800 dark:text-green-300 text-sm font-semibold rounded-full border border-green-200 dark:border-green-700/30 hover:scale-105 transition-transform duration-200"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Backend */}
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
                        {skills.backend.map((skill, index) => (
                          <span
                            key={index}
                            className="px-4 py-2 bg-gradient-to-r from-purple-100 to-purple-200 dark:from-purple-900/30 dark:to-purple-800/30 text-purple-800 dark:text-purple-300 text-sm font-semibold rounded-full border border-purple-200 dark:border-purple-700/30 hover:scale-105 transition-transform duration-200"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Databases */}
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
                        {skills.databases.map((skill, index) => (
                          <span
                            key={index}
                            className="px-4 py-2 bg-gradient-to-r from-orange-100 to-orange-200 dark:from-orange-900/30 dark:to-orange-800/30 text-orange-800 dark:text-orange-300 text-sm font-semibold rounded-full border border-orange-200 dark:border-orange-700/30 hover:scale-105 transition-transform duration-200"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* DevOps */}
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
                        {skills.devops.map((skill, index) => (
                          <span
                            key={index}
                            className="px-4 py-2 bg-gradient-to-r from-indigo-100 to-indigo-200 dark:from-indigo-900/30 dark:to-indigo-800/30 text-indigo-800 dark:text-indigo-300 text-sm font-semibold rounded-full border border-indigo-200 dark:border-indigo-700/30 hover:scale-105 transition-transform duration-200"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Integrations */}
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
                        {skills.integrations.map((skill, index) => (
                          <span
                            key={index}
                            className="px-4 py-2 bg-gradient-to-r from-pink-100 to-pink-200 dark:from-pink-900/30 dark:to-pink-800/30 text-pink-800 dark:text-pink-300 text-sm font-semibold rounded-full border border-pink-200 dark:border-pink-700/30 hover:scale-105 transition-transform duration-200"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Best Practices */}
                  <div className="mt-12">
                    <h3 className="text-2xl font-bold gradient-text mb-6">
                      Best Practices & Architecture
                    </h3>
                    <div className="flex flex-wrap gap-3">
                      {skills.practices.map((skill, index) => (
                        <span
                          key={index}
                          className="px-4 py-2 bg-gradient-to-r from-gray-100 to-gray-200 dark:from-gray-800/30 dark:to-gray-700/30 text-gray-800 dark:text-gray-300 text-sm font-semibold rounded-full border border-gray-200 dark:border-gray-600/30 hover:scale-105 transition-transform duration-200"
                        >
                          {skill}
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

      <Footer />
    </>
  );
}
