import { useRef, useState, useEffect } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { PROJECTS } from '../../data/constants';
import { HiExternalLink, HiPlay, HiX, HiChevronLeft, HiChevronRight } from 'react-icons/hi';

const ProjectModal = ({ project, onClose }) => {
  useEffect(() => {
    // Lock body scroll when modal is open
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  if (!project) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/90 backdrop-blur-md"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.95, opacity: 0, y: 20 }}
        className={`relative max-h-[90vh] flex flex-col ${
          project.isMobile ? 'items-center' : 'w-full max-w-6xl bg-gray-900 rounded-3xl overflow-hidden'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className={`absolute z-50 p-3 bg-black/50 hover:bg-red-500/80 rounded-full text-white transition-all backdrop-blur-sm border border-white/10 ${
            project.isMobile ? '-top-12 right-0' : 'top-4 right-4'
          }`}
          title="Close (Esc)"
        >
          <HiX size={24} />
        </button>

        {project.isMobile ? (
          // Mobile Layout: iPhone Frame + Info Card
          <div className="w-full h-full overflow-y-auto overflow-x-hidden custom-scrollbar">
            <div className="flex flex-col items-center gap-8 p-6 pb-20 pt-16 sm:py-12">
              {/* iPhone Frame */}
              <div className="relative flex-shrink-0 w-[280px] sm:w-[320px] aspect-[9/19.5]">
                <div className="absolute inset-0 bg-gray-900 rounded-[3rem] border-[8px] border-gray-800 shadow-2xl overflow-hidden ring-1 ring-white/10 z-10">
                  {/* Notch */}
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/3 h-6 bg-black rounded-b-xl z-20" />
                  
                  {/* Video/Image */}
                  <div className="w-full h-full bg-black">
                    {project.video ? (
                      <video
                        src={project.video}
                        controls
                        autoPlay
                        muted
                        loop
                        playsInline
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <img
                        src={project.image}
                        alt={project.name}
                        className="w-full h-full object-cover"
                      />
                    )}
                  </div>
                </div>
                
                {/* Glow behind phone */}
                <div className="absolute -inset-4 bg-violet-500/20 rounded-[4rem] blur-xl -z-10" />
              </div>

              {/* Info Card */}
              <div className="w-full max-w-md bg-gray-900/95 backdrop-blur-xl p-6 rounded-3xl border border-gray-700/50 shadow-2xl">
                <div className="flex items-start justify-between gap-4 mb-4">
                  <div>
                    <h3 className="text-2xl font-bold text-white">{project.name}</h3>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {project.tech.map((tech) => (
                        <span key={tech} className="text-xs font-medium text-violet-300 px-2 py-1 bg-violet-500/10 rounded-full border border-violet-500/20">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                  {project.url && (
                    <a
                      href={project.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3 bg-white text-gray-900 rounded-xl hover:bg-gray-200 transition-colors flex-shrink-0"
                      title="View Project"
                    >
                      <HiExternalLink size={20} />
                    </a>
                  )}
                </div>
                <p className="text-gray-400 text-sm leading-relaxed">{project.description}</p>
              </div>
            </div>
          </div>
        ) : (
          // Desktop Layout: Standard Modal
          <div className="w-full h-full overflow-y-auto overflow-x-hidden custom-scrollbar bg-gray-900 rounded-3xl">
            <div className="relative w-full aspect-video bg-black group-video">
              {project.video ? (
                <video
                  src={project.video}
                  controls
                  autoPlay
                  muted
                  loop
                  playsInline
                  className="w-full h-full object-contain"
                />
              ) : (
                <img
                  src={project.image}
                  alt={project.name}
                  className="w-full h-full object-contain"
                />
              )}
            </div>
            
            <div className="p-6 sm:p-8 border-t border-gray-800">
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-6 mb-6">
                <div className="space-y-4">
                  <div>
                    <h3 className="text-3xl font-bold text-white mb-2">{project.name}</h3>
                    <div className="flex flex-wrap gap-2">
                      {project.tech.map((tech) => (
                        <span key={tech} className="px-3 py-1 text-sm font-medium text-violet-300 bg-violet-500/10 rounded-full border border-violet-500/20">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
                
                {project.url && (
                  <a
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-shrink-0 inline-flex items-center gap-2 px-6 py-3 bg-white text-gray-900 font-bold rounded-xl hover:bg-gray-200 transition-colors h-fit"
                  >
                    Visit Project <HiExternalLink size={18} />
                  </a>
                )}
              </div>

              <p className="text-gray-400 text-lg max-w-4xl leading-relaxed">
                {project.description}
              </p>
            </div>
          </div>
        )}
      </motion.div>
    </motion.div>
  );
};

const ProjectCard = ({ project, index, onClick }) => {
  const [isHovered, setIsHovered] = useState(false);
  const videoRef = useRef(null);

  const handleMouseEnter = () => {
    setIsHovered(true);
    if (videoRef.current && project.video) {
      videoRef.current.play().catch(() => {});
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    if (videoRef.current && project.video) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={() => onClick(project)}
      className="group relative flex-shrink-0 snap-start"
      style={{ width: project.isMobile ? '320px' : '500px' }}
    >
      {/* Card Container with 3D Tilt Effect */}
      <motion.div
        whileHover={{ 
          rotateY: 5,
          rotateX: -5,
          scale: 1.02,
        }}
        transition={{ duration: 0.3 }}
        className="relative h-[400px] rounded-3xl overflow-hidden border border-gray-800/50 hover:border-violet-500/50 transition-all duration-500 cursor-pointer shadow-lg hover:shadow-violet-500/20"
        style={{
          background: `linear-gradient(135deg, ${project.gradient[0]} 0%, ${project.gradient[1]} 100%)`,
          transformStyle: 'preserve-3d',
          perspective: '1000px',
        }}
      >
        {/* Background Pattern */}
        <div 
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />

        {/* Media Container */}
        <div className="absolute inset-0">
          {project.video ? (
            <>
              {project.isMobile ? (
                // Mobile App Video - Phone Frame
                <div className="absolute right-4 top-1/2 -translate-y-1/2 w-[180px] h-[360px]">
                  <div className="relative w-full h-full rounded-[2.5rem] border-[6px] border-gray-900/90 bg-gray-900 overflow-hidden shadow-2xl">
                    <video
                      ref={videoRef}
                      src={project.video}
                      muted
                      loop
                      playsInline
                      className="w-full h-full object-cover"
                    />
                    {/* Play Button Overlay */}
                    <div className={`absolute inset-0 flex items-center justify-center bg-black/30 transition-opacity duration-300 ${isHovered ? 'opacity-0' : 'opacity-100'}`}>
                      <div className="p-3 bg-white/20 backdrop-blur-sm rounded-full">
                        <HiPlay size={24} className="text-white ml-0.5" />
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                // Desktop Video - Browser Frame
                <div className="absolute right-4 top-12 w-[85%] h-[280px]">
                  <div className="relative w-full h-full rounded-xl border-2 border-gray-800/50 bg-gray-900 overflow-hidden shadow-2xl">
                    {/* Browser Header */}
                    <div className="absolute top-0 left-0 right-0 h-7 bg-gray-800/80 flex items-center px-3 gap-1.5">
                      <div className="w-2.5 h-2.5 rounded-full bg-red-500/70" />
                      <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/70" />
                      <div className="w-2.5 h-2.5 rounded-full bg-green-500/70" />
                    </div>
                    <video
                      ref={videoRef}
                      src={project.video}
                      muted
                      loop
                      playsInline
                      className="w-full h-full object-cover pt-7"
                    />
                    <div className={`absolute inset-0 pt-7 flex items-center justify-center bg-black/30 transition-opacity duration-300 ${isHovered ? 'opacity-0' : 'opacity-100'}`}>
                      <div className="p-4 bg-white/20 backdrop-blur-sm rounded-full">
                        <HiPlay size={32} className="text-white ml-1" />
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </>
          ) : project.image ? (
            <img
              src={project.image}
              alt={project.name}
              className="absolute right-0 top-8 w-[90%] h-auto rounded-tl-xl shadow-2xl opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500 object-cover"
            />
          ) : null}
        </div>

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
        <div 
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{
            background: `linear-gradient(to top, ${project.gradient[0]}ee 0%, transparent 60%)`,
          }}
        />

        {/* Content */}
        <div className="absolute inset-0 flex flex-col justify-end p-6 sm:p-8">
          {/* Mobile Badge */}
          {project.isMobile && (
            <div className="absolute top-4 left-4">
              <span className="px-3 py-1.5 bg-white/10 backdrop-blur-sm rounded-full text-xs font-medium text-white border border-white/20">
                📱 Mobile App
              </span>
            </div>
          )}

          {/* Title */}
          <motion.h3
            className="text-2xl sm:text-3xl font-bold text-white mb-2"
            animate={{ y: isHovered ? -8 : 0 }}
            transition={{ duration: 0.3 }}
          >
            {project.name}
          </motion.h3>

          {/* Description - Reveal on hover */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 20 }}
            transition={{ duration: 0.3 }}
            className="text-gray-200 text-sm mb-4 line-clamp-2"
          >
            {project.description}
          </motion.p>

          {/* Tech Stack */}
          <div className="flex flex-wrap gap-2 mb-4">
            {project.tech.map((tech) => (
              <span
                key={tech}
                className="px-3 py-1.5 text-xs font-semibold text-white bg-white/15 backdrop-blur-sm rounded-full border border-white/10"
              >
                {tech}
              </span>
            ))}
          </div>

          {/* Click to Watch Text */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 20 }}
            transition={{ duration: 0.3, delay: 0.1 }}
            className="inline-flex items-center gap-2 text-violet-300 font-semibold text-sm"
          >
            <HiPlay className="text-violet-400" /> Click to watch video
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
};

const Projects = () => {
  const sectionRef = useRef(null);
  const scrollContainerRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });
  const [selectedProject, setSelectedProject] = useState(null);

  const scroll = (direction) => {
    if (scrollContainerRef.current) {
      const scrollAmount = direction === 'left' ? -400 : 400;
      scrollContainerRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="relative py-24 lg:py-32 overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/2 -left-40 w-96 h-96 bg-purple-500/15 rounded-full blur-[150px]" />
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-indigo-500/10 rounded-full blur-[150px]" />
      </div>

      {/* Section Header */}
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 mb-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col md:flex-row md:items-end md:justify-between gap-6"
        >
          <div>
            <span className="text-sm font-semibold tracking-wider text-violet-400 uppercase">
              Projects
            </span>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mt-2">
              Featured{' '}
              <span className="bg-gradient-to-r from-violet-400 via-purple-400 to-indigo-400 bg-clip-text text-transparent">
                Works
              </span>
            </h2>
            <p className="text-gray-400 text-lg mt-4 max-w-xl">
              Some things I've built with love, expertise, and a pinch of magical ingredients.
            </p>
          </div>

          {/* Navigation Arrows */}
          <div className="flex gap-3">
            <motion.button
              onClick={() => scroll('left')}
              className="p-4 bg-gray-800/50 hover:bg-violet-500/20 rounded-xl border border-gray-700/50 hover:border-violet-500/30 text-gray-400 hover:text-white transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <HiChevronLeft size={24} />
            </motion.button>
            <motion.button
              onClick={() => scroll('right')}
              className="p-4 bg-gray-800/50 hover:bg-violet-500/20 rounded-xl border border-gray-700/50 hover:border-violet-500/30 text-gray-400 hover:text-white transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <HiChevronRight size={24} />
            </motion.button>
          </div>
        </motion.div>
      </div>

      {/* Horizontal Scroll Projects */}
      <div
        ref={scrollContainerRef}
        className="flex gap-6 overflow-x-auto no-scrollbar px-6 sm:px-8 lg:px-12 pb-4 snap-x snap-mandatory"
        style={{
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
        }}
      >
        {/* Spacer for first item */}
        <div className="flex-shrink-0 w-0 lg:w-[calc((100vw-1280px)/2)]" />
        
        {PROJECTS.map((project, index) => (
          <ProjectCard
            key={project.name}
            project={project}
            index={index}
            onClick={setSelectedProject}
          />
        ))}
        
        {/* Spacer for last item */}
        <div className="flex-shrink-0 w-6" />
      </div>

      {/* Project Video Modal */}
      <AnimatePresence>
        {selectedProject && (
          <ProjectModal
            project={selectedProject}
            onClose={() => setSelectedProject(null)}
          />
        )}
      </AnimatePresence>
    </section>
  );
};

export default Projects;
