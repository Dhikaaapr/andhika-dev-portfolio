import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { ABOUT, HERO } from '../../data/constants';
import { HiCode, HiSparkles, HiLightningBolt } from 'react-icons/hi';

const About = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.7,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  };

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative py-24 lg:py-32 overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-violet-500/10 rounded-full blur-[180px]" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-indigo-500/10 rounded-full blur-[150px]" />
      </div>

      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center"
        >
          {/* Image Side */}
          <motion.div variants={itemVariants} className="relative">
            <div className="relative max-w-lg mx-auto lg:mx-0">
              {/* Decorative Elements */}
              <motion.div
                animate={{
                  rotate: [0, 5, 0, -5, 0],
                }}
                transition={{
                  duration: 10,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
                className="absolute -top-8 -right-8 w-32 h-32 border-2 border-violet-500/20 rounded-3xl"
              />
              <motion.div
                animate={{
                  rotate: [0, -5, 0, 5, 0],
                }}
                transition={{
                  duration: 12,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
                className="absolute -bottom-8 -left-8 w-40 h-40 border-2 border-indigo-500/20 rounded-3xl"
              />
              
              {/* Main Image Container */}
              <div className="relative bg-gradient-to-br from-violet-500/20 via-purple-500/20 to-indigo-500/20 rounded-3xl p-2">
                <div className="relative bg-gray-900 rounded-3xl overflow-hidden">
                  <div className="aspect-[4/5]">
                    <img
                      src={HERO.profileImage}
                      alt={HERO.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  
                  {/* Overlay Gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-transparent to-transparent" />
                </div>
              </div>

              {/* Floating Card */}
              <motion.div
                initial={{ opacity: 0, x: 50, y: 50 }}
                animate={isInView ? { opacity: 1, x: 0, y: 0 } : { opacity: 0, x: 50, y: 50 }}
                transition={{ delay: 0.6, duration: 0.6 }}
                className="absolute -right-6 -bottom-6 lg:-right-12"
              >
                <motion.div
                  animate={{ y: [0, -8, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                  className="bg-gray-900/95 backdrop-blur-xl rounded-2xl border border-gray-700/50 p-5 shadow-2xl"
                >
                  <div className="flex items-center gap-6">
                    {ABOUT.stats.slice(0, 2).map((stat, index) => (
                      <div 
                        key={stat.label} 
                        className={`text-center ${index > 0 ? 'border-l border-gray-700/50 pl-6' : ''}`}
                      >
                        <div className="text-3xl font-bold bg-gradient-to-r from-violet-400 to-indigo-400 bg-clip-text text-transparent">
                          {stat.value}
                        </div>
                        <div className="text-xs text-gray-500 mt-0.5 font-medium">{stat.label}</div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </motion.div>

          {/* Text Side */}
          <motion.div variants={containerVariants} className="space-y-8">
            {/* Section Title */}
            <motion.div variants={itemVariants}>
              <span className="text-sm font-semibold tracking-wider text-violet-400 uppercase">
                About Me
              </span>
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mt-3 leading-tight">
                Turning ideas into{' '}
                <span className="relative inline-block">
                  <span className="bg-gradient-to-r from-violet-400 via-purple-400 to-indigo-400 bg-clip-text text-transparent">
                    reality
                  </span>
                  <motion.span
                    initial={{ width: 0 }}
                    animate={isInView ? { width: '100%' } : { width: 0 }}
                    transition={{ duration: 0.8, delay: 0.8 }}
                    className="absolute bottom-1 left-0 h-1 bg-gradient-to-r from-violet-500 to-indigo-500 rounded-full"
                  />
                </span>
              </h2>
            </motion.div>

            {/* Description */}
            <motion.div variants={itemVariants} className="space-y-5">
              {ABOUT.description.map((paragraph, index) => (
                <p key={index} className="text-gray-400 text-lg leading-relaxed">
                  {paragraph}
                </p>
              ))}
            </motion.div>

            {/* Feature Cards */}
            <motion.div variants={itemVariants} className="grid sm:grid-cols-3 gap-4 pt-4">
              {[
                { icon: HiCode, label: 'Clean Code', color: 'violet' },
                { icon: HiSparkles, label: 'Modern UI', color: 'purple' },
                { icon: HiLightningBolt, label: 'Fast Delivery', color: 'indigo' },
              ].map((feature, index) => (
                <motion.div
                  key={feature.label}
                  whileHover={{ y: -5, scale: 1.02 }}
                  className="relative group"
                >
                  <div className={`absolute inset-0 bg-${feature.color}-500/10 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity`} />
                  <div className="relative flex items-center gap-3 p-4 bg-gray-900/50 backdrop-blur-sm rounded-2xl border border-gray-800/50 group-hover:border-gray-700 transition-colors">
                    <div className={`p-2 rounded-xl bg-${feature.color}-500/10`}>
                      <feature.icon size={24} className={`text-${feature.color}-400`} />
                    </div>
                    <span className="font-semibold text-gray-300 group-hover:text-white transition-colors">
                      {feature.label}
                    </span>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* Stats Row */}
            <motion.div variants={itemVariants} className="flex flex-wrap gap-8 pt-6">
              {ABOUT.stats.map((stat) => (
                <div key={stat.label}>
                  <div className="text-4xl font-bold text-white">{stat.value}</div>
                  <div className="text-sm text-gray-500 font-medium">{stat.label}</div>
                </div>
              ))}
            </motion.div>

            {/* CTA */}
            <motion.div variants={itemVariants}>
              <motion.a
                href="#contact"
                onClick={(e) => {
                  e.preventDefault();
                  document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="inline-flex items-center gap-2 text-violet-400 hover:text-violet-300 font-semibold text-lg group"
                whileHover={{ x: 5 }}
              >
                Let's work together
                <span className="group-hover:translate-x-2 transition-transform">→</span>
              </motion.a>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
