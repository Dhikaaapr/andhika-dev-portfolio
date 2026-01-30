import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { EDUCATION } from '../../data/constants';
import { HiAcademicCap, HiBookOpen, HiStar, HiLocationMarker, HiCalendar } from 'react-icons/hi';

const Education = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });

  return (
    <section
      id="education"
      ref={sectionRef}
      className="relative py-24 lg:py-32 overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/3 left-0 w-[600px] h-[600px] bg-emerald-500/10 rounded-full blur-[200px]" />
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-teal-500/10 rounded-full blur-[180px]" />
      </div>

      <div className="max-w-5xl mx-auto px-6 sm:px-8 lg:px-12">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-sm font-semibold tracking-wider text-emerald-400 uppercase">
            Education
          </span>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mt-2 mb-4">
            My{' '}
            <span className="bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 bg-clip-text text-transparent">
              Education
            </span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            My academic journey and achievements in Information Technology.
          </p>
        </motion.div>

        {/* Main Education Card */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <motion.div
            whileHover={{ y: -5, scale: 1.01 }}
            transition={{ duration: 0.3 }}
            className="group relative"
          >
            {/* Glow Effect */}
            <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500/20 via-teal-500/20 to-cyan-500/20 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            
            {/* Card */}
            <div className="relative bg-gray-900/80 backdrop-blur-sm rounded-3xl border border-gray-800/50 group-hover:border-emerald-500/30 p-8 md:p-10 transition-all duration-300 overflow-hidden">
              {/* Background Pattern */}
              <div className="absolute top-0 right-0 w-48 h-48 bg-gradient-to-br from-emerald-500/5 to-transparent rounded-full -translate-y-1/2 translate-x-1/2" />
              
              {/* Decorative Icon */}
              <div className="absolute top-8 right-8 opacity-10 group-hover:opacity-20 transition-opacity duration-300">
                <HiAcademicCap size={120} className="text-white" />
              </div>

              <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 relative z-10">
                <div className="flex-1">
                  {/* Status Badge */}
                  <span className="inline-flex px-4 py-1.5 mb-4 text-xs font-bold tracking-wider text-emerald-900 bg-emerald-400 rounded-full uppercase shadow-lg shadow-emerald-500/20">
                    {EDUCATION.degree.status}
                  </span>
                  
                  {/* Degree Title */}
                  <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">
                    {EDUCATION.degree.title}
                  </h3>
                  
                  {/* University */}
                  <p className="text-gray-400 text-lg font-medium mb-4">
                    {EDUCATION.degree.university}
                  </p>
                  
                  {/* Meta Info */}
                  <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
                    <span className="flex items-center gap-2">
                      <HiCalendar className="w-4 h-4" />
                      {EDUCATION.degree.period}
                    </span>
                    <span className="flex items-center gap-2">
                      <HiLocationMarker className="w-4 h-4" />
                      {EDUCATION.degree.location}
                    </span>
                  </div>
                </div>

                {/* GPA Circle */}
                <motion.div
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.3, type: 'spring' }}
                  className="flex flex-col items-center justify-center w-28 h-28 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-full shadow-xl shadow-emerald-500/30 shrink-0"
                >
                  <span className="text-3xl font-bold text-white">{EDUCATION.degree.gpa}</span>
                  <span className="text-xs font-semibold text-emerald-100">GPA / 4.00</span>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Two Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Overview Card */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="group relative"
          >
            <div className="absolute -inset-1 bg-gradient-to-r from-teal-500/10 to-cyan-500/10 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            
            <div className="relative bg-gray-900/60 backdrop-blur-sm rounded-3xl border border-gray-800/50 group-hover:border-teal-500/30 p-8 h-full transition-all duration-300">
              <div className="inline-flex p-3 bg-teal-500/10 rounded-2xl mb-5">
                <HiBookOpen size={28} className="text-teal-400" />
              </div>
              
              <h4 className="text-xl font-bold text-white mb-4">Overview</h4>
              
              <p className="text-gray-400 leading-relaxed">
                {EDUCATION.overview}
              </p>
            </div>
          </motion.div>

          {/* Achievements */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="space-y-4"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="inline-flex p-2 bg-amber-500/10 rounded-xl">
                <HiStar size={24} className="text-amber-400" />
              </div>
              <h4 className="text-xl font-bold text-white">Key Achievements</h4>
            </div>

            {EDUCATION.achievements.map((achievement, index) => (
              <motion.div
                key={achievement.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.4 + index * 0.1 }}
                whileHover={{ scale: 1.02 }}
                className="group/card relative"
              >
                <div className="absolute -inset-1 bg-gradient-to-r from-amber-500/10 to-orange-500/10 rounded-2xl blur-lg opacity-0 group-hover/card:opacity-100 transition-opacity duration-300" />
                
                <div className="relative bg-gray-900/50 backdrop-blur-sm rounded-2xl border border-gray-800/50 group-hover/card:border-amber-500/30 p-6 transition-all duration-300">
                  <h5 className="font-bold text-white mb-2">{achievement.title}</h5>
                  <p className="text-gray-400 text-sm leading-relaxed">
                    {achievement.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Education;
