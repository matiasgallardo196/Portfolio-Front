import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function Home() {
  return (
    <>
      <Head>
        <title>Matias Gallardo - Full Stack Web Developer</title>
        <meta
          name="description"
          content="Full Stack Web Developer with strong Back-End orientation. Specialized in NestJS, TypeScript, PostgreSQL, and scalable systems. Based in Sydney, Australia."
        />
      </Head>

      <Navbar />

      <main>
        {/* Hero Section */}
        <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-50 to-white">
          <div className="container-custom text-center">
            <div className="max-w-4xl mx-auto">
              {/* Profile Image */}
              <div className="mb-8">
                <div className="relative w-48 h-48 mx-auto mb-6">
                  <Image
                    src="/avatar.jpg"
                    alt="Matias Gallardo"
                    fill
                    className="rounded-full object-cover shadow-2xl"
                    priority
                  />
                </div>
              </div>

              {/* Name and Title */}
              <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-4">
                Matias Gallardo
              </h1>
              <h2 className="text-2xl md:text-3xl text-primary-600 font-semibold mb-6">
                Full Stack Web Developer – Back-End Oriented
              </h2>

              {/* Location */}
              <p className="text-lg text-gray-600 mb-6">
                📍 Sydney, Australia | Open to relocate (within Australia)
              </p>

              {/* Introduction */}
              <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed">
                Full Stack Web Developer with a strong Back-End orientation.
                Graduate of Henry&apos;s intensive bootcamp and Technical
                Analyst in Information Systems (UTN FRT). I specialize in
                building scalable systems using modern technologies like NestJS,
                TypeScript, PostgreSQL, MongoDB, and Docker.
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/projects"
                  className="btn-primary text-lg px-8 py-3"
                >
                  View Projects
                </Link>
                <Link
                  href="/contact"
                  className="btn-secondary text-lg px-8 py-3"
                >
                  Contact Me
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Quick Stats Section */}
        <section className="py-16 bg-white">
          <div className="container-custom">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="text-4xl font-bold text-primary-600 mb-2">
                  5+
                </div>
                <div className="text-gray-600">
                  Full-Stack Projects Deployed
                </div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-primary-600 mb-2">
                  15+
                </div>
                <div className="text-gray-600">Technologies Mastered</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-primary-600 mb-2">
                  2
                </div>
                <div className="text-gray-600">
                  Languages (Spanish & English)
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
