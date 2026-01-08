import React, { useState } from "react";
import { Helmet } from "react-helmet-async";
import { motion as Motion, AnimatePresence } from "framer-motion";
import {
  Send,
  Github,
  Linkedin,
  Facebook,
  MessageCircle,
  CheckCircle2,
  AlertCircle,
  Mail,
  MapPin,
} from "lucide-react";
import {
  AnimatedMail,
  AnimatedMapPin,
  AnimatedPhone,
} from "../UI/AnimatedIcons";

export default function Contact() {
  const [status, setStatus] = useState("idle"); // idle, loading, success, error

  const contactInfo = [
    {
      icon: AnimatedMapPin,
      label: "Location",
      value: "Lokossa, Mono, Benin",
      color: "text-green-500",
    },
    {
      icon: AnimatedMail,
      label: "Email",
      value: "octavebahoun@gmail.com",
      color: "text-green-500",
    },
    {
      icon: AnimatedPhone,
      label: "Phone",
      value: "+229 0151125217",
      color: "text-green-500",
    },
  ];

  const socialLinks = [
    {
      name: "GitHub",
      icon: <Github size={18} />,
      href: "https://github.com/octavebahoun",
    },
    {
      name: "LinkedIn",
      icon: <Linkedin size={18} />,
      href: "https://www.linkedin.com/in/octave-bahoun-b9114b337/",
    },
    { name: "Facebook", icon: <Facebook size={18} />, href: "#" },
    { name: "WhatsApp", icon: <MessageCircle size={18} />, href: "#" },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("loading");

    const formData = new FormData(e.target);
    formData.append("access_key", "7216020c-c646-4dd7-b39a-2bd059d2be01");

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (data.success) {
        setStatus("success");
        e.target.reset();
        setTimeout(() => setStatus("idle"), 5000);
      } else {
        console.error("Web3Forms Error:", data);
        setStatus("error");
      }
    } catch (error) {
      console.error("Submission Error:", error);
      setStatus("error");
    }
  };

  return (
    <div className="selection:bg-green-500/30">
      <Helmet>
        <title>Contact Octave Bahoun | Let's Collaborate</title>
        <meta
          name="description"
          content="Reach out to Octave Bahoun for collaboration, projects, or just a friendly chat. Available for freelance opportunities worldwide."
        />
      </Helmet>
      <section className="relative py-10">
        {/* Simplified Header */}
        <div className="mb-16">
          <Motion.h4
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-green-500 text-xs font-mono tracking-[0.3em] uppercase mb-3"
          >
            Contact
          </Motion.h4>
          <Motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-bold text-white mb-4"
          >
            Let's <span className="text-green-500">Connect</span>
          </Motion.h1>
          <p className="text-gray-500 max-w-xl font-light">
            I'm currently available for freelance work and new opportunities.
            Feel free to reach out for a project or just a friendly chat.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Info Column */}
          <div className="lg:col-span-4 space-y-10">
            <div className="space-y-6">
              {contactInfo.map((info, i) => (
                <Motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="flex items-center gap-5 p-4 rounded-2xl bg-white/5 border border-white/10 hover:border-green-500/30 transition-all group"
                >
                  <div
                    className={`${info.color} bg-green-500/10 p-3 rounded-xl group-hover:scale-110 transition-transform`}
                  >
                    <info.icon size={22} />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 uppercase tracking-widest font-mono">
                      {info.label}
                    </p>
                    <p className="text-white font-medium">{info.value}</p>
                  </div>
                </Motion.div>
              ))}
            </div>

            <div className="p-8 rounded-3xl bg-linear-to-br from-green-600 to-emerald-800 text-white relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-110 transition-transform">
                <MessageCircle size={100} />
              </div>
              <h3 className="text-xl font-bold mb-3 relative z-10">
                Let's talk!
              </h3>
              <p className="text-white/80 text-sm mb-6 relative z-10">
                I usually respond within 24 hours.
              </p>
              <div className="flex gap-3 relative z-10">
                {socialLinks.map((social, i) => (
                  <a
                    key={i}
                    href={social.href}
                    className="p-2 bg-white/20 hover:bg-white/40 rounded-lg transition-colors"
                    title={social.name}
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Form Column */}
          <div className="lg:col-span-8">
            <div className="p-8 md:p-10 rounded-3xl bg-white/5 border border-white/10 relative">
              <form className="space-y-6" onSubmit={handleSubmit}>
                <input
                  type="checkbox"
                  name="botcheck"
                  className="hidden"
                  style={{ display: "none" }}
                />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-mono text-gray-400 uppercase tracking-widest ml-1">
                      Full Name
                    </label>
                    <input
                      name="name"
                      required
                      type="text"
                      placeholder="Octave Bahoun"
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-white focus:outline-hidden focus:border-green-500/50 transition-all placeholder:text-gray-600"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-mono text-gray-400 uppercase tracking-widest ml-1">
                      Email Address
                    </label>
                    <input
                      name="email"
                      required
                      type="email"
                      placeholder="octave@example.com"
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-white focus:outline-hidden focus:border-green-500/50 transition-all placeholder:text-gray-600"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-mono text-gray-400 uppercase tracking-widest ml-1">
                    Your Message
                  </label>
                  <textarea
                    name="message"
                    required
                    rows="5"
                    placeholder="Tell me about your project..."
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-white focus:outline-hidden focus:border-green-500/50 transition-all placeholder:text-gray-600 resize-none"
                  ></textarea>
                </div>

                <button
                  disabled={status === "loading"}
                  type="submit"
                  className="w-full py-4 bg-green-600 disabled:bg-gray-700 hover:bg-green-500 text-white font-bold rounded-xl flex items-center justify-center gap-3 transition-all text-sm uppercase tracking-widest relative overflow-hidden"
                >
                  <AnimatePresence mode="wait">
                    {status === "loading" ? (
                      <Motion.div
                        key="loading"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="flex items-center gap-2"
                      >
                        <Motion.div
                          animate={{ rotate: 360 }}
                          transition={{
                            repeat: Infinity,
                            duration: 1,
                            ease: "linear",
                          }}
                          className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full"
                        />
                        <span>Sending...</span>
                      </Motion.div>
                    ) : (
                      <Motion.div
                        key="idle"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="flex items-center gap-2"
                      >
                        <span>Send Message</span>
                        <Send size={16} />
                      </Motion.div>
                    )}
                  </AnimatePresence>
                </button>

                {/* Status Messages */}
                <AnimatePresence>
                  {status === "success" && (
                    <Motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="p-4 bg-green-500/10 border border-green-500/20 rounded-xl text-green-400 text-sm flex items-center gap-3"
                    >
                      <CheckCircle2 size={18} />
                      <span>
                        Message sent successfully! I'll get back to you soon.
                      </span>
                    </Motion.div>
                  )}
                  {status === "error" && (
                    <Motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-sm flex items-center gap-3"
                    >
                      <AlertCircle size={18} />
                      <span>Something went wrong. Please try again.</span>
                    </Motion.div>
                  )}
                </AnimatePresence>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
