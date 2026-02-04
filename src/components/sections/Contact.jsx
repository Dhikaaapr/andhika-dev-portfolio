import { useRef, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { CONTACT, SOCIAL_LINKS } from '../../data/constants';
import emailjs from '@emailjs/browser';
import { HiMail, HiPaperAirplane, HiCheck, HiExclamation } from 'react-icons/hi';

const Contact = () => {
  const sectionRef = useRef(null);
  const formRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [status, setStatus] = useState({ type: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus({ type: '', message: '' });

    try {
      // Configuration check with helpful error
      if (!CONTACT.serviceId || CONTACT.serviceId.includes('YOUR_')) {
        await new Promise(resolve => setTimeout(resolve, 2000)); // Simulate delay for animation demo
        console.warn('EmailJS not configured. Using demo mode.');
        setStatus({
          type: 'success',
          message: 'Demo Success! (Configure EmailJS in constants.jsx to send real emails)',
        });
        setFormData({ name: '', email: '', subject: '', message: '' });
        setIsSubmitting(false);
        return;
      }

      await emailjs.sendForm(
        CONTACT.serviceId,
        CONTACT.templateId,
        formRef.current,
        CONTACT.publicKey
      );

      setStatus({
        type: 'success',
        message: 'Message sent successfully! I\'ll get back to you soon.',
      });
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (error) {
      console.error('EmailJS Error:', error);
      setStatus({
        type: 'error',
        message: 'Failed to send message. Please check your connection or try again.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative py-20 lg:py-32 overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 -z-10 pointer-events-none">
        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-violet-500/10 rounded-full blur-[150px]" />
        <div className="absolute top-1/4 right-0 w-64 h-64 bg-indigo-500/10 rounded-full blur-[100px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Unified Glass Card */}
        <motion.div
           initial={{ opacity: 0, y: 50 }}
           animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
           transition={{ duration: 0.8, ease: "easeOut" }}
           className="relative bg-gray-900/80 backdrop-blur-2xl rounded-[2.5rem] border border-white/10 shadow-2xl overflow-hidden"
        >
          <div className="grid lg:grid-cols-12 min-h-[600px]">
            
            {/* Left Panel - Contact Info (Visual Side) */}
            <div className="lg:col-span-5 relative bg-gradient-to-br from-violet-600/20 via-indigo-600/20 to-purple-600/20 p-10 sm:p-12 flex flex-col justify-between overflow-hidden">
               {/* Decorative Circles */}
               <div className="absolute -top-10 -left-10 w-40 h-40 bg-violet-500/30 rounded-full blur-3xl" />
               <div className="absolute bottom-0 right-0 w-60 h-60 bg-indigo-500/20 rounded-full blur-3xl" />

               <div className="relative z-10">
                 <span className="inline-block py-1 px-3 rounded-full bg-white/10 border border-white/20 text-xs font-medium tracking-wider text-white uppercase mb-6 backdrop-blur-md">
                   Contact
                 </span>
                 <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6 leading-tight">
                   Let's start a <br />
                   <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-300 to-indigo-300">
                     conversation
                   </span>
                 </h2>
                 <p className="text-gray-300 text-lg leading-relaxed max-w-sm">
                   {CONTACT.subtitle}
                 </p>
               </div>

               <div className="relative z-10 space-y-8 mt-12">
                 {/* Email Item */}
                 <a href={`mailto:${CONTACT.email}`} className="group flex items-center gap-4 p-4 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all duration-300">
                    <div className="p-3 rounded-xl bg-violet-500 text-white shadow-lg shadow-violet-500/20">
                      <HiMail size={24} />
                    </div>
                    <div>
                      <p className="text-xs text-gray-400 font-medium uppercase tracking-wider mb-1">Email Me</p>
                      <p className="text-white font-medium group-hover:text-violet-200 transition-colors">{CONTACT.email}</p>
                    </div>
                 </a>

                 {/* Social Links */}
                 <div>
                    <p className="text-sm text-gray-400 mb-4 font-medium">Follow Me</p>
                    <div className="flex gap-3">
                       {SOCIAL_LINKS.map((social) => (
                         <motion.a
                           key={social.name}
                           href={social.url}
                           target="_blank"
                           rel="noopener noreferrer"
                           className="p-3 bg-white/5 border border-white/10 rounded-xl text-gray-300 hover:text-white hover:bg-white/10 hover:border-white/20 transition-all duration-300"
                           whileHover={{ scale: 1.1, y: -2 }}
                           whileTap={{ scale: 0.95 }}
                           title={social.name === 'Email' ? 'Send Email via Gmail' : social.name}
                         >
                           <social.icon size={20} />
                         </motion.a>
                       ))}
                    </div>
                 </div>
               </div>
            </div>

            {/* Right Panel - Form (Functional Side) */}
            <div className="lg:col-span-7 bg-gray-900/50 p-10 sm:p-12">
               <form ref={formRef} onSubmit={handleSubmit} className="space-y-8 h-full flex flex-col justify-center">
                 
                 <div className="grid sm:grid-cols-2 gap-6">
                   <div className="space-y-2">
                     <label htmlFor="name" className="text-sm font-medium text-gray-400 ml-1">Name</label>
                     <input
                       type="text"
                       id="name"
                       name="name"
                       value={formData.name}
                       onChange={handleChange}
                       required
                       placeholder="John Doe"
                       className="w-full px-5 py-4 bg-gray-800/50 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500 transition-all duration-300"
                     />
                   </div>
                   <div className="space-y-2">
                     <label htmlFor="email" className="text-sm font-medium text-gray-400 ml-1">Email</label>
                     <input
                       type="email"
                       id="email"
                       name="email"
                       value={formData.email}
                       onChange={handleChange}
                       required
                       placeholder="john@example.com"
                       className="w-full px-5 py-4 bg-gray-800/50 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500 transition-all duration-300"
                     />
                   </div>
                 </div>

                 <div className="space-y-2">
                    <label htmlFor="subject" className="text-sm font-medium text-gray-400 ml-1">Subject</label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      placeholder="Project Inquiry"
                      className="w-full px-5 py-4 bg-gray-800/50 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500 transition-all duration-300"
                    />
                 </div>

                 <div className="space-y-2">
                    <label htmlFor="message" className="text-sm font-medium text-gray-400 ml-1">Message</label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={4}
                      placeholder="Tell me about your project..."
                      className="w-full px-5 py-4 bg-gray-800/50 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500 transition-all duration-300 resize-none"
                    />
                 </div>

                 <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
                   {/* Status Message */}
                   <AnimatePresence mode="wait">
                      {status.message && (
                        <motion.div
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -10 }}
                          className={`text-sm font-medium flex items-center gap-2 ${
                            status.type === 'success' ? 'text-green-400' : 'text-red-400'
                          }`}
                        >
                          {status.type === 'success' ? <HiCheck size={18} /> : <HiExclamation size={18} />}
                          {status.message}
                        </motion.div>
                      )}
                   </AnimatePresence>

                   <motion.button
                     type="submit"
                     disabled={isSubmitting}
                     className={`relative px-8 py-4 font-bold rounded-xl overflow-hidden transition-all duration-300 flex items-center gap-3 ${
                       status.type === 'success' 
                         ? 'bg-green-600 text-white cursor-default' 
                         : 'bg-white text-gray-900 hover:bg-gray-200 shadow-lg shadow-white/5'
                     } disabled:opacity-70 disabled:cursor-not-allowed ml-auto w-full sm:w-auto justify-center`}
                     whileHover={!isSubmitting && status.type !== 'success' ? { scale: 1.02 } : {}}
                     whileTap={!isSubmitting && status.type !== 'success' ? { scale: 0.98 } : {}}
                   >
                     {isSubmitting ? (
                       <>
                         <div className="w-5 h-5 border-2 border-gray-900/30 border-t-gray-900 rounded-full animate-spin" />
                         <span>Sending...</span>
                       </>
                     ) : status.type === 'success' ? (
                       <>
                         <HiCheck size={20} />
                         <span>Sent!</span>
                       </>
                     ) : (
                       <>
                         <span>Send Message</span>
                         <HiPaperAirplane size={20} className="rotate-90 group-hover:-translate-y-1 group-hover:translate-x-1 transition-transform" />
                       </>
                     )}
                   </motion.button>
                 </div>
               </form>
            </div>

          </div>
        </motion.div>
      </div>

      {/* Global Flying Paper Plane Animation */}
      <AnimatePresence>
        {isSubmitting && (
          <motion.div
            className="absolute inset-0 pointer-events-none z-50 overflow-hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
             {/* Plane Container - Handles Position & Scale */}
            <motion.div
              className="absolute right-10 bottom-10 w-24 h-24" // Starting position anchor
              initial={{ x: 0, y: 0, scale: 0.5, rotate: 0 }}
              animate={{
                x: [0, -100, -300, -800, -2000], // Horizontal distance
                y: [0, 50, -100, -400, -1000],   // Vertical curve (dip then soar)
                scale: [0.5, 0.8, 1, 0.8, 0.2],  // Perspective scale
                rotate: [0, 10, -30, -45, -60]   // Nose dive then pull up
              }}
              transition={{
                duration: 2,
                times: [0, 0.1, 0.3, 0.6, 1],
                ease: "easeInOut"
              }}
            >
               {/* Inner SVG Group - Handles wobble/banking */}
               <motion.div
                 animate={{ rotate: [-2, 2, -2] }}
                 transition={{ duration: 0.4, repeat: Infinity, ease: "easeInOut" }}
                 className="w-full h-full"
               >
                 {/* Detailed Paper Plane SVG */}
                 <svg viewBox="0 0 50 50" className="w-full h-full drop-shadow-2xl">
                    {/* Right Wing (Darker Purple) */}
                    <path d="M25 5 L35 45 L25 40 Z" fill="#7c3aed" />
                    {/* Left Wing (Lighter Purple) */}
                    <path d="M25 5 L15 45 L25 40 Z" fill="#8b5cf6" />
                    {/* Central Fold/Body (White-ish for contrast) */}
                    <path d="M25 5 L25 40" stroke="rgba(255,255,255,0.3)" strokeWidth="1" />

                    {/* Speed Lines / Trails */}
                    <motion.g
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: [0, 1, 0], x: [0, -20] }}
                      transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 0.1 }}
                    >
                       <line x1="20" y1="42" x2="15" y2="45" stroke="rgba(255,255,255,0.5)" strokeWidth="1" strokeLinecap="round" />
                       <line x1="30" y1="42" x2="35" y2="45" stroke="rgba(255,255,255,0.5)" strokeWidth="1" strokeLinecap="round" />
                    </motion.g>
                 </svg>
               </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Contact;
