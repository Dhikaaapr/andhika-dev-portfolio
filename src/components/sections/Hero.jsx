import { useRef } from 'react';
import { motion } from 'framer-motion';
import { ReactTyped } from 'react-typed';
import { HERO, SOCIAL_LINKS } from '../../data/constants';
import { HiDownload, HiArrowRight } from 'react-icons/hi';

const Hero = () => {
  const containerRef = useRef(null);

  // Floating animation variants
  const floatVariants = {
    animate: {
      y: [0, -15, 0],
      transition: {
        duration: 4,
        repeat: Infinity,
        ease: 'easeInOut',
      },
    },
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.2,
      },
    },
  };

  const fadeInUp = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  };

  const scaleIn = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.8,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  };

  return (
    <section
      id="home"
      ref={containerRef}
      className="relative min-h-screen flex items-center overflow-hidden"
    >
      {/* Epic Animated Background */}
      <div className="absolute inset-0 -z-10">
        {/* Large Gradient Orbs */}
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="absolute -top-40 -left-40 w-[600px] h-[600px] bg-gradient-to-br from-violet-600/40 to-purple-800/20 rounded-full blur-[100px]"
        />
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 2,
          }}
          className="absolute -bottom-20 -right-20 w-[700px] h-[700px] bg-gradient-to-tl from-indigo-600/30 to-blue-800/20 rounded-full blur-[120px]"
        />
        <motion.div
          animate={{
            scale: [1, 1.15, 1],
            x: [0, 30, 0],
            y: [0, -20, 0],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full blur-[100px]"
        />

        {/* Grid Pattern */}
        <div 
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
            backgroundSize: '80px 80px',
          }}
        />

        {/* Radial Vignette */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(0,0,0,0.4)_100%)]" />
      </div>

      <div className="w-full max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 pt-20 pb-12">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-8 items-center min-h-[calc(100vh-6rem)]">
          {/* Text Content */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="order-2 lg:order-1 flex flex-col items-center lg:items-start text-center lg:text-left"
          >
            {/* Greeting Badge */}
            <motion.div variants={fadeInUp} className="mb-6">
              <span className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-violet-300 bg-violet-500/10 rounded-full border border-violet-500/20 backdrop-blur-sm">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-violet-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-violet-500"></span>
                </span>
                Available for Projects
              </span>
            </motion.div>

            {/* Name with Gradient Underline */}
            <motion.div variants={fadeInUp} className="mb-4">
              <h1 className="text-4xl sm:text-6xl lg:text-7xl xl:text-8xl font-bold text-white leading-tight">
                Hi, I'm{' '}
                <span className="relative inline-block">
                  <span className="bg-gradient-to-r from-violet-400 via-purple-400 to-indigo-400 bg-clip-text text-transparent">
                    {HERO.firstName}
                  </span>
                  {/* Animated Underline */}
                  <motion.span
                    initial={{ width: 0 }}
                    animate={{ width: '100%' }}
                    transition={{ duration: 1, delay: 1.2, ease: [0.25, 0.46, 0.45, 0.94] }}
                    className="absolute bottom-2 left-0 h-3 bg-gradient-to-r from-violet-500/50 to-indigo-500/50 blur-sm -z-10"
                  />
                  <motion.span
                    initial={{ width: 0 }}
                    animate={{ width: '100%' }}
                    transition={{ duration: 1, delay: 1.2, ease: [0.25, 0.46, 0.45, 0.94] }}
                    className="absolute bottom-1 left-0 h-1.5 bg-gradient-to-r from-violet-500 to-indigo-500 rounded-full"
                  />
                </span>
              </h1>
            </motion.div>

            {/* Typed Text */}
            <motion.div
              variants={fadeInUp}
              className="text-xl sm:text-3xl lg:text-4xl font-medium text-gray-300 font-mono mb-8 min-h-[2.5rem]"
            >
              <span className="text-gray-500">&gt; </span>
              <ReactTyped
                strings={HERO.typedStrings}
                typeSpeed={40}
                backSpeed={25}
                backDelay={2500}
                loop
                className="text-violet-300"
              />
              <span className="animate-pulse text-violet-400">|</span>
            </motion.div>

            {/* Description */}
            <motion.p
              variants={fadeInUp}
              className="text-gray-400 text-base sm:text-xl leading-relaxed max-w-xl mb-10"
            >
              {HERO.description}
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              variants={fadeInUp}
              className="flex flex-wrap items-center justify-center lg:justify-start gap-4 mb-12"
            >
              <motion.a
                href="#contact"
                onClick={(e) => {
                  e.preventDefault();
                  document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="group relative inline-flex items-center gap-3 px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-violet-600 to-indigo-600 text-white font-semibold rounded-2xl overflow-hidden shadow-xl shadow-violet-500/25 hover:shadow-violet-500/40 transition-all duration-300"
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                <span className="relative z-10">Let's Talk</span>
                <HiArrowRight className="relative z-10 group-hover:translate-x-1 transition-transform" size={20} />
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-violet-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </motion.a>

              <motion.a
                href={HERO.cvUrl}
                download
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-3 px-6 sm:px-8 py-3 sm:py-4 text-white font-semibold rounded-2xl border-2 border-gray-700 hover:border-violet-500/50 bg-gray-900/50 backdrop-blur-sm hover:bg-gray-800/70 transition-all duration-300"
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                <HiDownload className="group-hover:animate-bounce" size={20} />
                <span>Download CV</span>
              </motion.a>
            </motion.div>

            {/* Social Links */}
            <motion.div
              variants={fadeInUp}
              className="flex items-center gap-4 hidden sm:flex"
            >
              <span className="text-gray-500 text-sm font-medium">Find me on</span>
              <div className="h-px flex-1 max-w-[60px] bg-gradient-to-r from-gray-700 to-transparent" />
              {SOCIAL_LINKS.map((social, index) => (
                <motion.a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 text-gray-400 hover:text-white bg-gray-800/40 hover:bg-violet-500/20 rounded-xl border border-gray-700/50 hover:border-violet-500/30 transition-all duration-300"
                  whileHover={{ scale: 1.15, y: -4 }}
                  whileTap={{ scale: 0.9 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.5 + index * 0.1 }}
                  title={social.name}
                >
                  <social.icon size={22} />
                </motion.a>
              ))}
            </motion.div>
          </motion.div>

          {/* Profile Image */}
          <motion.div
            variants={scaleIn}
            initial="hidden"
            animate="visible"
            className="order-1 lg:order-2 flex justify-center lg:justify-end py-8 lg:py-0"
          >
            <div className="relative">
              {/* Outer Rotating Ring */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
                className="absolute -inset-6 rounded-full border border-dashed border-violet-500/30"
              />
              
              {/* Inner Rotating Ring (opposite direction) */}
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                className="absolute -inset-3 rounded-full border border-dashed border-indigo-500/20"
              />

              {/* Glow Effect */}
              <div className="absolute -inset-4 bg-gradient-to-r from-violet-500/40 via-purple-500/40 to-indigo-500/40 rounded-full blur-3xl opacity-60" />

              {/* Image Container */}
              <motion.div
                variants={floatVariants}
                animate="animate"
                className="relative w-64 h-64 sm:w-80 sm:h-80 lg:w-[400px] lg:h-[400px]"
              >
                {/* Gradient Border */}
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-violet-500 via-purple-500 to-indigo-500 p-1.5 shadow-2xl shadow-violet-500/30">
                  <div className="w-full h-full rounded-full overflow-hidden bg-gray-900">
                    <img
                      src={HERO.profileImage}
                      alt={HERO.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>

                {/* Floating Status Badge */}
                <motion.div
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1.5, duration: 0.5 }}
                  className="absolute -right-0 top-4 sm:-right-4 sm:top-12"
                >
                  <motion.div
                    animate={{ y: [0, -8, 0] }}
                    transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                    className="px-3 py-2 sm:px-5 sm:py-3 bg-gray-900/95 backdrop-blur-xl rounded-2xl border border-gray-700/50 shadow-2xl"
                  >
                    <div className="flex items-center gap-2.5">
                      <div className="relative">
                        <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 bg-green-500 rounded-full" />
                        <div className="absolute inset-0 w-2.5 h-2.5 sm:w-3 sm:h-3 bg-green-500 rounded-full animate-ping opacity-50" />
                      </div>
                      <span className="text-xs sm:text-sm font-medium text-gray-200">Open for Work</span>
                    </div>
                  </motion.div>
                </motion.div>

                {/* Experience Badge */}
                <motion.div
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1.7, duration: 0.5 }}
                  className="absolute -left-0 bottom-4 sm:-left-4 sm:bottom-16"
                >
                  <motion.div
                    animate={{ y: [0, -6, 0] }}
                    transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
                    className="px-3 py-2 sm:px-5 sm:py-3 bg-gray-900/95 backdrop-blur-xl rounded-2xl border border-gray-700/50 shadow-2xl"
                  >
                    <div className="text-center">
                      <span className="text-xl sm:text-3xl font-bold bg-gradient-to-r from-violet-400 to-indigo-400 bg-clip-text text-transparent">3+</span>
                      <p className="text-[10px] sm:text-xs text-gray-400 mt-0.5">Years Coding</p>
                    </div>
                  </motion.div>
                </motion.div>

                {/* Tech Stack Badge */}
                <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.9, duration: 0.5 }}
                  className="absolute -bottom-4 left-1/2 -translate-x-1/2"
                >
                  <motion.div
                    animate={{ y: [0, -5, 0] }}
                    transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
                    className="px-3 py-2 sm:px-5 sm:py-3 bg-gray-900/95 backdrop-blur-xl rounded-2xl border border-gray-700/50 shadow-2xl"
                  >
                    <div className="text-center">
                      <span className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">15+</span>
                      <p className="text-[10px] sm:text-xs text-gray-400 mt-0.5">Technologies</p>
                    </div>
                  </motion.div>
                </motion.div>
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Scroll Indicator - Hidden on mobile, visible on lg */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden lg:flex flex-col items-center gap-3"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="flex flex-col items-center gap-2 text-gray-500"
          >
            <span className="text-xs uppercase tracking-[0.2em] font-medium">Scroll to explore</span>
            <div className="w-6 h-10 rounded-full border-2 border-gray-600/50 flex items-start justify-center p-1.5">
              <motion.div
                animate={{ y: [0, 16, 0], opacity: [1, 0.3, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="w-1.5 h-1.5 bg-violet-500 rounded-full"
              />
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
