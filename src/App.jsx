import { Routes, Route } from 'react-router-dom';

// Public Portfolio
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Hero from './components/sections/Hero';
import About from './components/sections/About';
import Skills from './components/sections/Skills';
import Projects from './components/sections/Projects';
import Experience from './components/sections/Experience';
import Education from './components/sections/Education';
import Contact from './components/sections/Contact';

// Admin Panel
import { AuthProvider } from './admin/context/AuthContext';
import AdminLayout from './admin/components/AdminLayout';
import Login from './admin/pages/Login';
import Dashboard from './admin/pages/Dashboard';
import HeroManager from './admin/pages/HeroManager';
import AboutManager from './admin/pages/AboutManager';
import SkillsManager from './admin/pages/SkillsManager';
import ProjectsManager from './admin/pages/ProjectsManager';
import ExperienceManager from './admin/pages/ExperienceManager';
import EducationManager from './admin/pages/EducationManager';
import MessagesPage from './admin/pages/MessagesPage';
import SettingsPage from './admin/pages/SettingsPage';

// Public Portfolio Page
function PortfolioPage() {
  return (
    <div className="min-h-screen bg-gray-950 text-white overflow-x-hidden">
      <Navbar />
      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Experience />
        <Education />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <Routes>
        {/* Public Portfolio */}
        <Route path="/" element={<PortfolioPage />} />

        {/* Admin Login */}
        <Route path="/admin/login" element={<Login />} />

        {/* Admin Panel (Protected) */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="hero" element={<HeroManager />} />
          <Route path="about" element={<AboutManager />} />
          <Route path="skills" element={<SkillsManager />} />
          <Route path="projects" element={<ProjectsManager />} />
          <Route path="experience" element={<ExperienceManager />} />
          <Route path="education" element={<EducationManager />} />
          <Route path="messages" element={<MessagesPage />} />
          <Route path="settings" element={<SettingsPage />} />
        </Route>
      </Routes>
    </AuthProvider>
  );
}

export default App;
