import { supabase } from "../lib/supabase";
import blogData from "../data/blog.json";

// ─── HELPERS ─────────────────────────────────────────────
function normalizeProject(p) {
  return {
    ...p,
    intro: p.intro || p.description,
    demoUrl: p.demourl || p.demoUrl,
    githubUrl: p.githuburl || p.githubUrl,
  };
}

async function fetchProjectsFromSupabase() {
  if (!supabase) return null;
  try {
    const { data, error } = await supabase
      .from("projects")
      .select("*")
      .order("id", { ascending: false });
    if (error) throw error;
    if (data && data.length > 0) {
      return data.map(normalizeProject);
    }
  } catch (err) {
    console.warn("Supabase projects fetch failed, using fallback:", err);
  }
  return null;
}

// ─── MOCK FALLBACK DATA ─────────────────────────────────
const MOCK_ALL_PROJECTS = [
  { id: 1, title: "Portfolio V4", description: "A modern portfolio developed with React, Framer Motion, and Tailwind CSS, focusing on fluid animations and premium design.", image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=800", stacks: ["React","Framer Motion","Tailwind"], category: "web", status: "Completed", demoUrl: "https://portfv-4.web.app/", githubUrl: "https://github.com/octavebahoun/Portf_v4" },
  { id: 2, title: "Wget Web Manager", description: "Download videos and files via a remote server with aria2c + ffmpeg. Supports DASH / HLS / MP4 / Vimeo.", image: "https://i.postimg.cc/SxhHLHJy/Capture-d-ecran-du-2026-01-02-02-47-42.png", stacks: ["Node.js","Express","Vanilla JS"], category: "web", status: "Completed", githubUrl: "https://github.com/octavebahoun/Wget-manager-new" },
  { id: 3, title: "Interactive Quiz App", description: "Responsive quiz application with timer modes, dynamic scoring, and performance statistics.", image: "https://octavebahoun.github.io/Portefeuille/static/image/quiz.jpg", stacks: ["Vue.js","Tailwind"], category: "web", status: "Completed", demoUrl: "https://app-quiz-758e0.web.app/", githubUrl: "https://github.com/octavebahoun/quiz-app" },
  { id: 4, title: "Smart Home Hub", description: "IoT system for controlling home devices via Raspberry Pi and MQTT protocol.", image: "https://images.unsplash.com/photo-1558346490-a72e53ae2d4f?q=80&w=800", stacks: ["C++","MQTT","Arduino","WebSockets"], category: "iot", status: "In Progress", demoUrl: "https://homeline-caa2b.web.app/" },
  { id: 5, title: "Trading Academy Software", description: "Interactive platform for paid trading courses with payment system and course management.", image: "https://octavebahoun.github.io/Portefeuille/static/image/trading.jpg", stacks: ["Vue.js","Firebase","Tailwind","KikyaPay"], category: "web", status: "Maintenance", demoUrl: "https://trading-2cf04.web.app/" },
  { id: 6, title: "Logo Rebrand Concept", description: "Case study on visual identity redesign for a tech startup, including brand guidelines and UI Kit.", image: "https://images.unsplash.com/photo-1586717791821-3f44a563dc4c?q=80&w=800", stacks: ["Figma","Photoshop"], category: "design", status: "Completed" },
  { id: 7, title: "Dynamic LED Matrix", description: "Creation of a dynamic display using LED matrices controlled via Firebase.", image: "https://octavebahoun.github.io/Portefeuille/static/image/led.jpeg", stacks: ["C++","Arduino","Firebase","WebSockets"], category: "iot", status: "Completed", demoUrl: "https://esp32-matrix-6e832.web.app/" },
  { id: 8, title: "Pixel Verse", description: "Smart online wallpaper gallery with advanced search and collection system.", image: "https://octavebahoun.github.io/Portefeuille/static/image/pixel.jpg", stacks: ["Python Flask","HTML/CSS","JavaScript"], category: "design", status: "Completed", demoUrl: "https://pixel-hzlm.onrender.com/", githubUrl: "https://github.com/octavebahoun/PixelVerse" },
];

// ─── EXPORTED API FUNCTIONS ──────────────────────────────

export const getLanding = async () => {
  let allProjects = MOCK_ALL_PROJECTS;

  const supabaseProjects = await fetchProjectsFromSupabase();
  if (supabaseProjects && supabaseProjects.length > 0) {
    allProjects = supabaseProjects;
  }

  const selected = allProjects.slice(0, 4).map(p => ({
    ...p,
    intro: p.intro || p.description,
  }));

  const skills = ["React","Next.js","Node.js","TypeScript","Python","Vue.js","MongoDB","PostgreSQL","Docker","Linux","GSAP","Figma","C++","Firebase","Arduino"];

  return {
    hero: {
      greeting: "// fullstack engineer",
      title: "Crafting Digital",
      titleAccent: "Experiences",
      sub: "I build fast, beautiful, and accessible web products — from concept to deployment. Based in Bénin, available worldwide.",
    },
    selectedWork: selected,
    skills,
  };
};

export const getProjects = async () => {
  const supabaseProjects = await fetchProjectsFromSupabase();
  if (supabaseProjects && supabaseProjects.length > 0) {
    return supabaseProjects;
  }
  return MOCK_ALL_PROJECTS;
};

export const getBlog = () => Promise.resolve(blogData.posts);

export { blogData };

export const getAbout = () => Promise.resolve({
  bio: "I'm Octave Précieux Mahunan Bahoun-Houtoukpe — a fullstack engineer and AI enthusiast based in Lokossa, Bénin. I build fast, accessible digital experiences with a strong focus on frontend craft and emerging technologies.",
  mission: "Technology must be a tool for connection and solution. What drives me is designing digital experiences that are useful, accessible, and delightful — where technique truly serves the human.",
  values: [
    { icon: "⚡", title: "User Experience", desc: "I design interfaces that are intuitive, clear, and easy to use." },
    { icon: "🧠", title: "Continuous Learning", desc: "Always exploring new technologies, experimenting and improving daily." },
    { icon: "🔧", title: "Problem Solving", desc: "I enjoy tackling complex problems and finding clear, practical solutions." },
    { icon: "🤖", title: "AI & Machine Learning", desc: "Passionate about how AI can make applications smarter and more efficient." },
    { icon: "🌐", title: "Tech Innovation", desc: "Exploring tools and technologies that improve the way we build solutions." },
  ],
  journey: [
    { year: "2024", title: "Scientific Baccalaureate", subtitle: "CEG Segbeya – LITTORAL", desc: "Obtained my Bac S and chose to pursue computer science." },
    { year: "2024", title: "IT & Telecom Studies", subtitle: "INSTI / Lokossa – FOUNDATION", desc: "Started programming fundamentals: HTML, CSS, JS, and first projects." },
    { year: "2025", title: "First Internship", subtitle: "Bénin Digital", desc: "Web development intern, real projects with WordPress and modern tooling." },
    { year: "2025", title: "Full Stack Development", subtitle: "Freelance", desc: "Node.js, Express, MongoDB, React, Socket.io — focus on real-time apps." },
    { year: "2025", title: "Second Internship", subtitle: "Pro Technologie Plus", desc: "AI engineer — built an AI-powered application from the ground up." },
    { year: "2025", title: "Ongoing Studies", subtitle: "INSTI, Lokossa – Year 2", desc: "Electrical & Computer Engineering, specialization in CS and Telecom." },
  ],
  socials: [
    { label: "GitHub",   href: "https://github.com/octavebahoun" },
    { label: "LinkedIn", href: "https://www.linkedin.com/in/octave-bahoun-b9114b337/" },
    { label: "Email",    href: "mailto:octavebahoun@gmail.com" },
  ],
});

export const getCerts = () => Promise.resolve([
  { id: 1, title: "Responsive Web Design", issuer: "freeCodeCamp", date: "2024", tags: ["HTML","CSS"], url: "#", icon: "🎖️" },
  { id: 2, title: "JavaScript Algorithms & Data Structures", issuer: "freeCodeCamp", date: "2024", tags: ["JavaScript","Algorithms"], url: "#", icon: "🏆" },
  { id: 3, title: "Introduction to AI / ML", issuer: "Google", date: "2025", tags: ["AI","Python","ML"], url: "#", icon: "🤖" },
  { id: 4, title: "Node.js Developer", issuer: "Udemy", date: "2025", tags: ["Node.js","Express","MongoDB"], url: "#", icon: "📜" },
  { id: 5, title: "Cybersecurity Fundamentals", issuer: "IBM SkillsBuild", date: "2025", tags: ["Security","Networking","Linux"], url: "#", icon: "🛡️" },
  { id: 6, title: "React — The Complete Guide", issuer: "Udemy", date: "2025", tags: ["React","Hooks","Redux"], url: "#", icon: "⚛️" },
]);
