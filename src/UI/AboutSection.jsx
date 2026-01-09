import { motion as Motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

export default function AboutSection() {
  const interests = [
    {
      label: "Web Development",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="18"
          height="18"
          viewBox="0 0 24 24"
          className="mr-2"
        >
          <g fill="none" fillRule="evenodd" clipRule="evenodd">
            <path
              fill="currentColor"
              d="M23.396 11.994c-.18 1.289-.52 3.387-.88 5.385c-.999 5.754-1.129 5.205-1.049 5.135c-.649.44-5.994-.09-7.492-1.18c0 .13-.24-.519.89-6.992c.888-5.145.998-4.645 1.737-4.705c0 .799 0 1.788.63 2.108a9.7 9.7 0 0 0 4.155.919c.56-.25.81-.75 1.579-1.898l.48.21a.342.342 0 1 0 .31-.61c-1.55-.83-7.643-2.497-8.602-1.099c-.96 1.399-2.558 10.989-2.308 12.338a1.64 1.64 0 0 0 .95.999c1.628.829 7.372 1.838 8.47.559c.49-.56 1.649-10.34 1.729-11.059a.305.305 0 1 0-.6-.11m-1.12-1.518c-.28.29-.569.69-.869.999s-.31.2-.499.16l-3.227-.8l-.19-1.228a19.3 19.3 0 0 1 4.786.899zm-7.64-8.881a24 24 0 0 1 2.867 1.998c.52.496.99 1.045 1.398 1.638c1.2 1.739 1 2.319 1.48 2.169a.31.31 0 0 0 .19-.4c-.73-3.106-1.999-4.195-3.627-5.094c-.75-.4-1.578-.79-1.998-1a.378.378 0 0 0-.31.69m-3.447 17.981c-3.576.2-9.69-2.238-9.99-8.092C.818 6.37 5.414.346 11.778.935a.302.302 0 0 0 .07-.599C6.562-.384 2.636 2.574.617 7.57a8.99 8.99 0 0 0 3.587 10.889a12.5 12.5 0 0 0 6.993 1.808a.35.35 0 0 0-.01-.69"
            />
          </g>
        </svg>
      ),
    },
    {
      label: "Mobile Apps",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          color="#60a5fa"
          width="18"
          height="18"
          viewBox="0 0 24 24"
          className="mr-2"
        >
          <path
            fill="currentColor"
            d="M7 21V3zm5.039-14.692q.328 0 .548-.22t.22-.55t-.22-.549t-.549-.22t-.549.22t-.22.55t.22.548t.55.22M7.615 22q-.672 0-1.144-.472T6 20.385V3.615q0-.69.463-1.152T7.616 2h8.846q.67 0 1.143.472q.472.472.472 1.144V6.83q.373.04.648.31q.275.269.275.648v1.769q0 .379-.275.648t-.648.31v2.618h-1V3.616q0-.27-.173-.443T16.462 3H7.616q-.27 0-.443.173T7 3.616v16.769q0 .269.173.442t.443.173h2.461v1zm7.734-.611L12.462 18.5l2.888-2.888l.688.713l-2.175 2.175l2.175 2.175zm3.762 0l-.689-.714l2.175-2.175l-2.175-2.175l.689-.713L22 18.5z"
          />
        </svg>
      ),
    },
    {
      label: "AI & ML",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          color="#60a5fa"
          width="18"
          height="18"
          viewBox="0 0 24 24"
          className="mr-2"
        >
          <rect
            width="18"
            height="18"
            x="3"
            y="3"
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            rx="4"
            ry="4"
            strokeWidth="2"
          />
          <circle cx="12" cy="12" r="3" fill="currentColor" />
        </svg>
      ),
    },
    {
      label: "Data Science",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="18"
          height="18"
          viewBox="0 0 20 20"
          className="mr-2"
        >
          <path
            fill="#a855f7"
            d="M8.003 4.07C8.55 3.994 9 4.449 9 5v6h6c.552 0 1.008.45.93.997A7.001 7.001 0 0 1 2 11a7 7 0 0 1 6.003-6.93"
          />
          <path
            fill="#ec4899"
            d="M17.062 10c.498 0 .927-.366.937-.864L18 9a7 7 0 0 0-7.136-6.999c-.498.01-.864.44-.864.937V9a1 1 0 0 0 1 1z"
          />
        </svg>
      ),
    },
    {
      label: "IoT & Embedded",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          color="#e23cb4"
          width="18"
          height="18"
          viewBox="0 0 24 24"
          className="mr-2"
        >
          <path
            fill="currentColor"
            d="M5 13v9H3v-9Zm18 0v2h-2v7h-2v-7h-2v-2Zm-11-2a7.54 7.54 0 0 1 3.96 1.149l1.447-1.45A9.5 9.5 0 0 0 12 9a9.36 9.36 0 0 0-5.333 1.68l1.449 1.453A7.36 7.36 0 0 1 12 11M12 7a11.5 11.5 0 0 1 6.834 2.27l1.427-1.43A13.48 13.48 0 0 0 12 5a13.33 13.33 0 0 0-8.186 2.822l1.426 1.43A11.34 11.34 0 0 1 12 7M12 3a15.47 15.47 0 0 1 9.687 3.41l1.427-1.429A17.43 17.43 0 0 0 .96 4.964l1.427 1.429A15.33 15.33 0 0 1 12 3m0 10a4.5 4.5 0 1 0 4.5 4.5A4.5 4.5 0 0 0 12 13m0 7a2.5 2.5 0 1 1 2.5-2.5A2.5 2.5 0 0 1 12 20"
          />
        </svg>
      ),
    },
  ];

  return (
    <section className="py-24 relative overflow-hidden" id="about">
      <div className="container mx-auto px-6">
        <Motion.h2
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent mb-12 inline-block"
        >
          About Me
        </Motion.h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Text Content */}
          <Motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="space-y-8 text-gray-300 will-change-transform"
          >
            <div className="flex items-start space-x-4">
              <div className="mt-1 flex-shrink-0">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="28"
                  height="28"
                  viewBox="0 0 32 32"
                >
                  <defs>
                    <linearGradient
                      id="SVGcDbQtc0c"
                      x1=".5"
                      x2=".5"
                      y1="-1.054"
                      y2="1.002"
                      gradientUnits="objectBoundingBox"
                    >
                      <stop offset="0" stopColor="#3b82f6" />
                      <stop offset="1" stopColor="#a855f7" />
                    </linearGradient>
                  </defs>
                  <path
                    fill="url(#SVGcDbQtc0c)"
                    d="M581.955 173.456c-.732-1.3-1.349-1.489-1.949-1.489c-.882 0-1.495.815-1.887 1.539l-1.564 3.212l.426.7a5.836 5.836 0 0 0 7.852 2.464l.407-.212Z"
                    transform="translate(-555.24 -156.938)"
                  />
                  <path
                    fill="url(#SVGcDbQtc0c)"
                    d="M519.451 173.456c.732-1.3 1.348-1.489 1.95-1.489c.882 0 1.494.815 1.886 1.539l1.564 3.212l-.426.7a5.836 5.836 0 0 1-7.852 2.464l-.407-.212Z"
                    transform="translate(-514.167 -156.938)"
                  />
                </svg>
              </div>
              <p className="text-lg leading-relaxed">
                As an{" "}
                <span className="text-blue-400 font-semibold">
                  Electrical and Computer Engineering
                </span>{" "}
                student at INSTI Lokossa, I am deeply passionate about the
                intersection of software development and Artificial
                Intelligence.
              </p>
            </div>

            <div className="flex items-start space-x-4">
              <div className="mt-1 flex-shrink-0">
                <Motion.div
                  animate={{ opacity: [0.4, 1, 0.4] }}
                  transition={{ repeat: Infinity, duration: 2 }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="28"
                    height="28"
                    viewBox="0 0 24 24"
                  >
                    <g
                      fill="none"
                      stroke="#a855f7"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                    >
                      <path d="M12 17h-7v-10h14v10Z" />
                      <path d="M3 19h18" />
                    </g>
                  </svg>
                </Motion.div>
              </div>
              <p className="text-lg leading-relaxed">
                My goal is to craft{" "}
                <span className="text-purple-400 font-semibold">
                  innovative digital solutions
                </span>{" "}
                that solve real-world problems. I am particularly interested in
                AI applications for education, building intuitive mobile apps,
                and creating modern, high-performance web experiences.
              </p>
            </div>

            <div className="flex items-start space-x-4">
              <div className="mt-1 flex-shrink-0">
                <div className="w-7 h-7 bg-green-500/20 rounded-full flex items-center justify-center border border-green-500/30">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                </div>
              </div>
              <p className="text-lg leading-relaxed italic text-gray-400">
                Always seeking new challenges, I enjoy exploring cutting-edge
                technologies and contributing to projects that make a positive
                impact.
              </p>
            </div>

            <div className="flex flex-wrap gap-3 pt-4">
              {interests.map((item, idx) => (
                <Motion.span
                  key={idx}
                  whileHover={{
                    scale: 1.05,
                    backgroundColor: "rgba(255,255,255,0.1)",
                  }}
                  className="flex items-center px-4 py-2 rounded-full bg-white/5 border border-white/10 text-xs font-bold tracking-wider uppercase text-gray-400 hover:text-white transition-colors"
                >
                  {item.icon}
                  {item.label}
                </Motion.span>
              ))}
            </div>

            <div className="pt-6">
              <Link
                to="/about"
                className="group flex items-center space-x-3 text-blue-400 font-semibold hover:text-blue-300 transition-colors"
              >
                <span>Learn More About Me</span>
                <Motion.div
                  animate={{ x: [0, 5, 0] }}
                  transition={{ repeat: Infinity, duration: 2 }}
                >
                  <ArrowRight
                    size={20}
                    className="group-hover:translate-x-1 transition-transform"
                  />
                </Motion.div>
              </Link>
            </div>
          </Motion.div>

          {/* Stats Card */}
          <Motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="relative group lg:justify-self-end w-full max-w-md"
          >
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
            <div className="relative bg-[#0a0a0a] border border-white/10 p-10 rounded-3xl text-center space-y-12 shadow-2xl">
              <div>
                <h3 className="text-5xl md:text-6xl font-black bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent mb-2">
                  08+
                </h3>
                <p className="text-gray-400 font-mono tracking-widest uppercase text-[10px] md:text-xs">
                  Projects Completed
                </p>
              </div>
              <div>
                <h3 className="text-5xl md:text-6xl font-black bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent mb-2">
                  09+
                </h3>
                <p className="text-gray-400 font-mono tracking-widest uppercase text-[10px] md:text-xs">
                  Technologies Mastered
                </p>
              </div>
              <div>
                <h3 className="text-5xl md:text-6xl font-black bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent mb-2">
                  ∞
                </h3>
                <p className="text-gray-400 font-mono tracking-widest uppercase text-[10px] md:text-xs">
                  Passion for Code
                </p>
              </div>
            </div>
          </Motion.div>
        </div>
      </div>
    </section>
  );
}
