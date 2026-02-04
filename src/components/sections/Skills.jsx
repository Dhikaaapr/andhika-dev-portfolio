import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { SKILLS } from '../../data/constants';

const Skills = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
        delayChildren: 0.2,
      },
    },
  };

  const categoryVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  };

  const skillCardVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: 'easeOut',
      },
    },
  };

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="relative py-20 lg:py-32 overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute bottom-0 left-1/4 w-[500px] h-[500px] bg-indigo-500/10 rounded-full blur-[150px]" />
        <div className="absolute top-1/4 -right-20 w-80 h-80 bg-violet-500/15 rounded-full blur-[100px]" />
        
        {/* Decorative Pattern */}
        <svg className="absolute right-0 top-1/4 w-64 h-64 text-gray-800/20" viewBox="0 0 200 200" fill="none">
          <defs>
            <pattern id="grid" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
              <path d="M 20 0 L 0 0 0 20" fill="none" stroke="currentColor" strokeWidth="0.5"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <span className="text-sm font-semibold tracking-wider text-violet-400 uppercase">
            Skills
          </span>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mt-2 mb-4">
            Technologies I{' '}
            <span className="bg-gradient-to-r from-violet-400 via-purple-400 to-indigo-400 bg-clip-text text-transparent">
              Work With
            </span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl">
            I love crafting aesthetic user experiences using modern technologies and best practices.
          </p>
        </motion.div>

        {/* Skills Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="space-y-12"
        >
          {SKILLS.map((category) => (
            <motion.div 
              key={category.category} 
              variants={categoryVariants}
              className="relative"
            >
              {/* Category Badge */}
              <div className="flex items-center gap-4 mb-6">
                <h3 className="text-sm font-bold tracking-widest text-gray-400 uppercase">
                  {category.category}
                </h3>
                <div className="h-px flex-1 bg-gradient-to-r from-gray-700/50 to-transparent" />
              </div>
              
              {/* Skills Row */}
              <div className="flex flex-wrap gap-4">
                {category.items.map((skill) => (
                  <motion.div
                    key={skill.name}
                    variants={skillCardVariants}
                    whileHover={{ 
                      y: -8, 
                      scale: 1.05,
                    }}
                    whileTap={{ scale: 0.98 }}
                    className="group relative cursor-pointer"
                  >
                    {/* Glow Effect on Hover */}
                    <div
                      className="absolute -inset-1 rounded-2xl opacity-0 group-hover:opacity-50 blur-lg transition-opacity duration-500"
                      style={{ backgroundColor: skill.color }}
                    />
                    
                    {/* Card */}
                    <div
                      className="relative flex items-center gap-3 px-5 py-4 bg-gray-900/80 backdrop-blur-sm rounded-2xl border border-gray-800/80 group-hover:border-gray-700 transition-all duration-300"
                    >
                      {/* Icon with color */}
                      <div 
                        className="p-2 rounded-xl transition-all duration-300"
                        style={{ 
                          backgroundColor: `${skill.color}15`,
                        }}
                      >
                        <skill.icon
                          size={26}
                          style={{ color: skill.color }}
                        />
                      </div>
                      
                      {/* Name */}
                      <span className="font-semibold text-gray-300 group-hover:text-white transition-colors">
                        {skill.name}
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-16 pt-12 border-t border-gray-800/50"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { label: 'Languages', value: '5+' },
              { label: 'Frameworks', value: '7+' },
              { label: 'Databases', value: '2+' },
              { label: 'Tools', value: '5+' },
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.5, delay: 1 + index * 0.1 }}
                className="text-center"
              >
                <div className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-violet-400 to-indigo-400 bg-clip-text text-transparent">
                  {stat.value}
                </div>
                <div className="text-gray-500 text-sm mt-1 font-medium uppercase tracking-wider">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;
