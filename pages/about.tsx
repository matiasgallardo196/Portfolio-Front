import Head from "next/head";
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

  return (
    <>
      <Head>
        <title>About - Matias Gallardo</title>
        <meta
          name="description"
          content="Learn more about Matias Gallardo's experience and skills in full stack development"
        />
      </Head>

      <Navbar />

      <main className="min-h-screen bg-gray-50">
        {/* About Section */}
        <section className="py-16">
          <div className="container-custom">
            <h1 className="section-title">About Me</h1>

            <div className="max-w-4xl mx-auto">
              {/* Personal Story */}
              <div className="card mb-12">
                <h2 className="text-2xl font-semibold text-gray-900 mb-6">
                  My Story
                </h2>
                <div className="prose prose-lg text-gray-600">
                  <p className="mb-4">
                    I&apos;m a Full Stack Web Developer with a strong Back-End
                    orientation, passionate about building scalable systems and
                    delivering real-world solutions with measurable impact. I
                    graduated from Henry&apos;s intensive bootcamp and hold a
                    Technical Analyst degree in Information Systems from UTN
                    FRT.
                  </p>
                  <p className="mb-4">
                    I specialize in modern technologies like NestJS, TypeScript,
                    PostgreSQL, MongoDB, and Docker. I follow best practices in
                    validation, testing, and secure access control through
                    RESTful APIs. My experience includes multi-tenant platforms,
                    Stripe integrations, GitHub Actions, and cloud deployment
                    across various platforms.
                  </p>
                  <p>
                    I&apos;m passionate about clean architecture, automation,
                    and creating solutions that make a real difference. When
                    I&apos;m not coding, I enjoy contributing to the developer
                    community and staying updated with the latest technologies.
                  </p>
                </div>
              </div>

              {/* Key Achievements */}
              <div className="card mb-12">
                <h2 className="text-2xl font-semibold text-gray-900 mb-6">
                  Key Achievements
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <ul className="space-y-3 text-gray-600">
                    <li className="flex items-start">
                      <span className="text-green-500 mr-2">✓</span>5 full-stack
                      projects deployed to production with CI/CD
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-500 mr-2">✓</span>
                      Experience with multi-tenant architecture, Stripe, and
                      OpenAI integrations
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-500 mr-2">✓</span>
                      Proficient in backend development with NestJS, PostgreSQL,
                      and Docker
                    </li>
                  </ul>
                  <ul className="space-y-3 text-gray-600">
                    <li className="flex items-start">
                      <span className="text-green-500 mr-2">✓</span>
                      Designed and implemented secure REST APIs with role-based
                      access
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-500 mr-2">✓</span>
                      Hands-on deployment experience with Oracle Cloud, Render,
                      Vercel, Netlify, Railway, Fly
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-500 mr-2">✓</span>
                      Teaching Assistant at Henry bootcamp, supporting students
                      in JavaScript, TypeScript, React, Node, NestJS
                    </li>
                  </ul>
                </div>
              </div>

              {/* Languages */}
              <div className="card mb-12">
                <h2 className="text-2xl font-semibold text-gray-900 mb-6">
                  Languages
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex items-center">
                    <span className="text-lg font-medium text-gray-900 mr-4">
                      Spanish:
                    </span>
                    <span className="text-gray-600">Mother Tongue</span>
                  </div>
                  <div className="flex items-center">
                    <span className="text-lg font-medium text-gray-900 mr-4">
                      English:
                    </span>
                    <span className="text-gray-600">C1 Level</span>
                  </div>
                </div>
              </div>

              {/* Skills Section */}
              <div className="card">
                <h2 className="text-2xl font-semibold text-gray-900 mb-8">
                  Skills & Technologies
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {/* Languages */}
                  <div>
                    <h3 className="text-xl font-semibold text-primary-600 mb-4 flex items-center">
                      <svg
                        className="w-5 h-5 mr-2"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                      </svg>
                      Languages
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {skills.languages.map((skill, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-blue-100 text-blue-800 text-sm font-medium rounded-full"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Frontend */}
                  <div>
                    <h3 className="text-xl font-semibold text-primary-600 mb-4 flex items-center">
                      <svg
                        className="w-5 h-5 mr-2"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                      </svg>
                      Frontend
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {skills.frontend.map((skill, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-green-100 text-green-800 text-sm font-medium rounded-full"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Backend */}
                  <div>
                    <h3 className="text-xl font-semibold text-primary-600 mb-4 flex items-center">
                      <svg
                        className="w-5 h-5 mr-2"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                      </svg>
                      Backend
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {skills.backend.map((skill, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-purple-100 text-purple-800 text-sm font-medium rounded-full"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Databases */}
                  <div>
                    <h3 className="text-xl font-semibold text-primary-600 mb-4 flex items-center">
                      <svg
                        className="w-5 h-5 mr-2"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                      </svg>
                      Databases
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {skills.databases.map((skill, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-orange-100 text-orange-800 text-sm font-medium rounded-full"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* DevOps */}
                  <div>
                    <h3 className="text-xl font-semibold text-primary-600 mb-4 flex items-center">
                      <svg
                        className="w-5 h-5 mr-2"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                      </svg>
                      DevOps & Tools
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {skills.devops.map((skill, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-indigo-100 text-indigo-800 text-sm font-medium rounded-full"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Integrations */}
                  <div>
                    <h3 className="text-xl font-semibold text-primary-600 mb-4 flex items-center">
                      <svg
                        className="w-5 h-5 mr-2"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                      </svg>
                      Integrations
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {skills.integrations.map((skill, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-pink-100 text-pink-800 text-sm font-medium rounded-full"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Best Practices */}
                <div className="mt-8">
                  <h3 className="text-xl font-semibold text-primary-600 mb-4">
                    Best Practices & Architecture
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {skills.practices.map((skill, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-gray-100 text-gray-800 text-sm font-medium rounded-full"
                      >
                        {skill}
                      </span>
                    ))}
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
