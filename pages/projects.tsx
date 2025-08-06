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
        <title>Projects - Matias Gallardo</title>
        <meta
          name="description"
          content="Portfolio of full stack development projects by Matias Gallardo"
        />
      </Head>

      <Navbar />

      <main className="min-h-screen bg-gray-50">
        <section className="py-16">
          <div className="container-custom">
            <h1 className="section-title">My Projects</h1>

            <div className="mb-8 text-center">
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Here you can see some of the most outstanding projects I&apos;ve
                worked on. Each one represents different aspects of my
                experience in full stack development, from multi-tenant
                platforms to AI integrations and e-commerce solutions.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {projects.map((project, index) => (
                <ProjectCard
                  key={index}
                  title={project.title}
                  description={project.description}
                  technologies={project.technologies}
                  githubUrl={project.githubUrl}
                  demoUrl={project.demoUrl}
                  imageUrl={project.imageUrl}
                />
              ))}
            </div>

            <div className="mt-12 text-center">
              <p className="text-gray-600 mb-4">
                Are you interested in any of these projects or want to
                collaborate on something new?
              </p>
              <Link href="/contact" className="btn-primary">
                Contact Me
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
