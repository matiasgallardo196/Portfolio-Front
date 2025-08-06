import Head from "next/head";
import Link from "next/link";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ProjectCard from "../components/ProjectCard";

export default function Projects() {
  const projects = [
    {
      title: "SmartQR – QR Order Platform for Restaurants",
      description:
        "Multi-tenant platform for restaurants where customers scan a QR code on their table to order without waitstaff. Each restaurant has its own dashboard with reports, product management, and billing. Led the development of the entire reports module and integrated Stripe payment system and OpenAI-powered chatbot.",
      technologies: [
        "NestJS",
        "PostgreSQL",
        "MongoDB",
        "Stripe",
        "Auth0",
        "JWT",
        "Docker",
        "Recharts",
        "React",
        "Vercel",
        "Render",
        "Supabase",
        "Nodemailer",
        "Cloudinary",
        "OpenAI",
      ],
      githubUrl: "https://github.com/SmartQrProject/SmartQrProject",
      demoUrl: "https://www.smart-qr.tech/",
      imageUrl: "/project1.jpg",
    },
    {
      title: "AI Agent – Conversational Assistant for Web & WhatsApp",
      description:
        "Conversational assistant designed for a technical challenge by Laburen.com. The system detects user intents (e.g., product search, cart creation) and responds via WhatsApp or a web interface. Features modular architecture and full backend implementation from scratch with Twilio integration.",
      technologies: [
        "NestJS",
        "TypeScript",
        "PostgreSQL",
        "Prisma",
        "Supabase",
        "pgvector",
        "OpenAI",
        "Twilio",
        "Next.js",
        "React 19",
        "TailwindCSS",
        "Render",
        "Vercel",
      ],
      githubUrl: "https://github.com/matiasgallardo196/AI-agent",
      demoUrl: "https://desafio-tecnico-cse-laburen-com.vercel.app/",
      imageUrl: "/project2.jpg",
    },
    {
      title: "E-Commerce API – Backend for Online Store",
      description:
        "RESTful API built with NestJS to support a complete e-commerce system. Includes user authentication with roles, comprehensive CRUD operations for products and user management, image uploads with Cloudinary, and order creation with purchase details. Deployed with CI/CD pipeline.",
      technologies: [
        "NestJS",
        "TypeScript",
        "PostgreSQL",
        "TypeORM",
        "JWT",
        "bcryptjs",
        "Cloudinary",
        "Swagger",
        "Docker",
        "GitHub Actions",
        "Fly.io",
        "Neon",
      ],
      githubUrl: "https://github.com/matiasgallardo196/ecommerce-api-nestjs",
      demoUrl: "https://ecommerce-api-nestjs.fly.dev/api",
      imageUrl: "/project3.jpg",
    },
    {
      title: "Royal Hotel Booking – Appointment Booking Platform",
      description:
        "Full-stack platform that allows users to register, log in, and schedule hotel appointments through a modern interface. The system includes real-time validations, JWT authentication, image uploads, and email notifications with SendGrid integration.",
      technologies: [
        "Node.js",
        "TypeScript",
        "Express",
        "PostgreSQL",
        "TypeORM",
        "JWT",
        "bcryptjs",
        "React 19",
        "Vite",
        "Axios",
        "CSS Modules",
        "Formik",
        "Cloudinary",
        "SendGrid",
        "Netlify",
        "Railway",
      ],
      githubUrl:
        "https://github.com/matiasgallardo196/royal-hotel-booking-system",
      demoUrl: "https://cute-fox-c52c9e.netlify.app/",
      imageUrl: "/project4.jpg",
    },
    {
      title: "MatiMovies – Movie Management System",
      description:
        "Full-stack application for managing and visualizing a catalog of movies. Includes form-based movie creation, a public catalog, and informational pages about cinema. Developed during full stack development training as a learning project with MongoDB integration.",
      technologies: [
        "Node.js",
        "Express.js",
        "MongoDB",
        "Mongoose",
        "HTML5",
        "CSS3",
        "JavaScript (ES6+)",
        "jQuery",
        "Bootstrap 4",
        "Axios",
        "Webpack",
        "dotenv-webpack",
        "Railway",
        "MongoDB Atlas",
      ],
      githubUrl:
        "https://github.com/matiasgallardo196/mati-movies-management-system",
      demoUrl:
        "https://matimovies-movie-management-system-front-production.up.railway.app",
      imageUrl: "/project5.jpg",
    },
  ];

  return (
    <>
      <Head>
        <title>Matias Gallardo Portfolio</title>
        <meta
          name="description"
          content="Portfolio of full stack development projects by Matias Gallardo"
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
              <h1 className="section-title mb-6">My Projects</h1>

              <div className="glass-card p-8 max-w-4xl mx-auto">
                <p className="text-xl text-gray-700 dark:text-gray-300 leading-relaxed">
                  Here you can see some of the most outstanding projects
                  I&apos;ve worked on. Each one represents different aspects of
                  my experience in full stack development, from multi-tenant
                  platforms to AI integrations and e-commerce solutions.
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
                  Ready to Start Something Amazing?
                </h2>
                <p className="text-lg text-gray-700 dark:text-gray-300 mb-8 leading-relaxed">
                  I'm always excited to work on new projects and collaborate
                  with amazing teams. Whether you have a specific project in
                  mind or just want to explore possibilities, let's create
                  something incredible together.
                </p>
                <Link
                  href="/contact"
                  className="btn-primary text-lg px-10 py-4 group inline-flex items-center"
                >
                  <span className="flex items-center gap-2">
                    Let's Work Together
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

      <Footer />
    </>
  );
}
