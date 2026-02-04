import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { EXPERIENCES } from '../../data/constants';
import { HiBriefcase, HiAcademicCap } from 'react-icons/hi';

const Experience = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });

  return (
    <section
      id="experience"
      ref={sectionRef}
      className="relative py-20 lg:py-32 overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-violet-500/10 rounded-full blur-[180px]" />
        <div className="absolute bottom-0 left-1/4 w-[400px] h-[400px] bg-purple-500/10 rounded-full blur-[150px]" />
      </div>

      <div className="max-w-5xl mx-auto px-6 sm:px-8 lg:px-12">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-sm font-semibold tracking-wider text-violet-400 uppercase">
            Experience
          </span>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mt-2 mb-4">
            My{' '}
            <span className="bg-gradient-to-r from-violet-400 via-purple-400 to-indigo-400 bg-clip-text text-transparent">
              Journey
            </span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            My professional journey and the organizations I've been part of.
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Central Timeline Line */}
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-violet-500/50 via-purple-500/50 to-indigo-500/50 transform md:-translate-x-1/2" />

          {/* Experience Items */}
          <div className="space-y-16">
            {EXPERIENCES.map((exp, index) => {
              const isLeft = index % 2 === 0;
              const Icon = index === 0 ? HiBriefcase : HiAcademicCap;
              
              return (
                <motion.div
                  key={exp.company}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{ duration: 0.6, delay: index * 0.15 }}
                  className={`relative flex flex-col md:flex-row gap-8 ${
                    isLeft ? 'md:flex-row' : 'md:flex-row-reverse'
                  }`}
                >
                  {/* Timeline Dot */}
                  <div className="absolute left-8 md:left-1/2 w-4 h-4 transform -translate-x-1/2">
                    <div className="absolute inset-0 bg-violet-500 rounded-full animate-ping opacity-20" />
                    <div className="relative w-4 h-4 bg-gradient-to-r from-violet-500 to-indigo-500 rounded-full border-4 border-gray-950 shadow-lg shadow-violet-500/30" />
                  </div>

                  {/* Content Card */}
                  <div className={`flex-1 ml-16 md:ml-0 ${isLeft ? 'md:pr-16' : 'md:pl-16'}`}>
                    <motion.div 
                      whileHover={{ y: -5, scale: 1.02 }}
                      transition={{ duration: 0.3 }}
                      className="group relative"
                    >
                      {/* Glow Effect */}
                      <div className="absolute -inset-1 bg-gradient-to-r from-violet-500/20 via-purple-500/20 to-indigo-500/20 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      
                      {/* Card */}
                      <div className="relative bg-gray-900/80 backdrop-blur-sm rounded-3xl border border-gray-800/50 group-hover:border-violet-500/30 p-8 transition-all duration-300 overflow-hidden">
                        {/* Background Pattern */}
                        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-violet-500/5 to-transparent rounded-full -translate-y-1/2 translate-x-1/2" />
                        
                        {/* Icon */}
                        <div className="inline-flex p-3 bg-violet-500/10 rounded-2xl mb-5">
                          <Icon size={28} className="text-violet-400" />
                        </div>

                        {/* Header */}
                        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-5">
                          <div>
                            <h3 className="text-2xl font-bold text-white">{exp.company}</h3>
                            <p className="text-violet-400 font-semibold mt-1">{exp.role}</p>
                          </div>
                          <span className="inline-flex px-4 py-2 bg-violet-500/10 text-violet-300 text-sm font-semibold rounded-full border border-violet-500/20 whitespace-nowrap">
                            {exp.period}
                          </span>
                        </div>

                        {/* Description */}
                        <ul className="space-y-3 mb-6">
                          {exp.description.map((item, i) => (
                            <li key={i} className="flex items-start gap-3 text-gray-400">
                              <span className="w-2 h-2 bg-gradient-to-r from-violet-500 to-indigo-500 rounded-full mt-2 flex-shrink-0" />
                              <span className="leading-relaxed">{item}</span>
                            </li>
                          ))}
                        </ul>

                        {/* Tech Stack */}
                        <div className="flex flex-wrap gap-2">
                          {exp.tech.map((tech) => (
                            <span
                              key={tech}
                              className="px-4 py-1.5 text-sm font-medium text-gray-300 bg-gray-800/50 rounded-full border border-gray-700/50"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  </div>

                  {/* Spacer for alternating layout */}
                  <div className="hidden md:block flex-1" />
                </motion.div>
              );
            })}
          </div>

          {/* End Dot */}
          <div className="absolute left-8 md:left-1/2 bottom-0 w-3 h-3 bg-gray-700 rounded-full transform -translate-x-1/2 translate-y-4" />
        </div>
      </div>
    </section>
  );
};

export default Experience;
