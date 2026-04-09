import { Routes, Route } from 'react-router-dom'
import Navbar from './components/shared/Navbar'
import Footer from './components/shared/Footer'
import ScrollProgress from './components/shared/ScrollProgress'
import RagWidget from './features/rag/RagWidget'
import DarkClouds from './components/shared/DarkClouds'
import Home from './pages/Home'
import Projects from './pages/Projects'
import Certs from './pages/Certs'
import Blog from './pages/Blog'
import About from './pages/About'

function App() {
  return (
    <div className="min-h-screen relative">
      <ScrollProgress />
      <Navbar />
      <DarkClouds />
      <RagWidget />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/certs" element={<Certs />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}

export default App
