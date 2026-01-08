import React, { useState } from "react";
import { motion as Motion, AnimatePresence } from "framer-motion";
import {
  Mail,
  MapPin,
  Phone,
  Send,
  Github,
  Linkedin,
  Facebook,
  MessageCircle,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";

export default function ContactSection() {
  const [status, setStatus] = useState("idle");

  const contactInfo = [
    {
      icon: <MapPin className="text-green-500" size={20} />,
      label: "Location",
      value: "Lokossa, Mono, Benin",
    },
    {
      icon: <Mail className="text-green-500" size={20} />,
      label: "E-mail",
      value: "octavebahoun@gmail.com",
    },
    {
      icon: <Phone className="text-green-500" size={20} />,
      label: "Phone",
      value: "+229 01 50 65 45 75",
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
    {
      name: "WhatsApp",
      icon: <MessageCircle size={18} />,
      href: "#",
    },
    { name: "Facebook", icon: <Facebook size={18} />, href: "" },
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
    <section className="py-24 relative" id="contact">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <Motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent inline-block mb-4"
          >
            Contact Me
          </Motion.h2>
          <Motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-gray-400 max-w-2xl mx-auto"
          >
            Ready to start your next project? Let's talk and see how we can
            bring your ideas to life.
          </Motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Left Column - Form */}
          <Motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-[#0a0a0a] border border-white/5 p-8 rounded-3xl shadow-2xl overflow-hidden relative group"
          >
            <div className="absolute top-0 left-0 w-1 h-full bg-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            <h3 className="text-2xl font-bold mb-8 text-white">
              Send me a message
            </h3>

            <form className="space-y-6" onSubmit={handleSubmit}>
              <input
                type="checkbox"
                name="botcheck"
                className="hidden"
                style={{ display: "none" }}
              />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <input
                    required
                    name="name"
                    type="text"
                    placeholder="Your name"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-4 text-white placeholder:text-gray-500 focus:outline-none focus:border-green-500/50 transition-colors"
                  />
                </div>
                <div className="space-y-2">
                  <input
                    required
                    name="email"
                    type="email"
                    placeholder="Your email"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-4 text-white placeholder:text-gray-500 focus:outline-none focus:border-green-500/50 transition-colors"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <textarea
                  required
                  name="message"
                  rows="5"
                  placeholder="Your message"
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-4 text-white placeholder:text-gray-500 focus:outline-none focus:border-green-500/50 transition-colors resize-none"
                ></textarea>
              </div>

              <Motion.button
                disabled={status === "loading"}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full bg-blue-600 disabled:bg-gray-700 hover:bg-blue-500 text-white font-bold py-4 rounded-xl flex items-center justify-center space-x-3 transition-colors shadow-lg shadow-blue-600/20"
              >
                {status === "loading" ? (
                  <Motion.div
                    animate={{ rotate: 360 }}
                    transition={{
                      repeat: Infinity,
                      duration: 1,
                      ease: "linear",
                    }}
                    className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full"
                  />
                ) : (
                  <>
                    <Send size={18} />
                    <span>SEND MESSAGE</span>
                  </>
                )}
              </Motion.button>

              <AnimatePresence>
                {status === "success" && (
                  <Motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="flex items-center gap-2 text-green-500 text-xs font-medium justify-center"
                  >
                    <CheckCircle2 size={14} />
                    Message sent successfully!
                  </Motion.div>
                )}
                {status === "error" && (
                  <Motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="flex items-center gap-2 text-red-500 text-xs font-medium justify-center"
                  >
                    <AlertCircle size={14} />
                    Something went wrong. Please try again.
                  </Motion.div>
                )}
              </AnimatePresence>
            </form>
          </Motion.div>

          {/* Right Column - Info & Socials */}
          <div className="space-y-10">
            {/* Contact Info */}
            <Motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-6"
            >
              <h3 className="text-2xl font-bold text-white mb-6">
                Contact Information
              </h3>
              <div className="space-y-4">
                {contactInfo.map((info, idx) => (
                  <div
                    key={idx}
                    className="flex items-center space-x-4 bg-white/5 border border-white/5 p-4 rounded-2xl hover:border-green-500/30 transition-colors group"
                  >
                    <div className="p-3 bg-green-500/10 rounded-xl group-hover:bg-green-500/20 transition-colors">
                      {info.icon}
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 font-mono uppercase tracking-widest">
                        {info.label}
                      </p>
                      <p className="text-white text-sm font-medium">
                        {info.value}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </Motion.div>

            {/* Social Links */}
            <Motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="space-y-6"
            >
              <h3 className="text-xl font-bold text-white">Follow me</h3>
              <div className="grid grid-cols-2 gap-4">
                {socialLinks.map((social, idx) => (
                  <Motion.a
                    key={idx}
                    href={social.href}
                    whileHover={{
                      scale: 1.03,
                      backgroundColor: "rgba(255,255,255,0.08)",
                    }}
                    className="flex items-center space-x-3 bg-white/5 border border-white/5 p-4 rounded-xl text-gray-400 hover:text-white transition-all group"
                  >
                    <div className="text-gray-500 group-hover:text-green-400 transition-colors">
                      {social.icon}
                    </div>
                    <span className="text-sm font-medium">{social.name}</span>
                  </Motion.a>
                ))}
              </div>
            </Motion.div>

            {/* Availability Badge */}
            <Motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4 }}
              className="p-6 bg-green-500/5 border border-green-500/20 rounded-2xl relative overflow-hidden"
            >
              <div className="flex items-center space-x-3 mb-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                <h4 className="text-green-400 font-bold text-sm tracking-wide uppercase">
                  Available for work
                </h4>
              </div>
              <p className="text-xs text-gray-400 leading-relaxed">
                I am currently available for freelance missions and full-time
                opportunities.
              </p>
            </Motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
