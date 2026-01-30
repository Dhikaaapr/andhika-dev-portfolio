import { motion } from 'framer-motion';
import { SOCIAL_LINKS, METADATA } from '../../data/constants';
import { HiHeart } from 'react-icons/hi';

// Flying Vehicle SVGs
const FlyingCar = () => (
  <svg viewBox="0 0 100 40" className="w-full h-full drop-shadow-[0_10px_10px_rgba(124,58,237,0.5)]">
    {/* Body */}
    <path d="M10,20 L5,30 L20,30 L25,25 L75,25 L80,30 L95,30 L90,20 L75,10 L30,10 Z" className="fill-violet-600/90" />
    {/* Cockpit */}
    <path d="M35,10 L45,5 L70,5 L75,10 Z" className="fill-cyan-400/50" />
    {/* Thrusters / Underglow */}
    <ellipse cx="20" cy="32" rx="10" ry="2" className="fill-cyan-400 animate-pulse blur-sm" />
    <ellipse cx="80" cy="32" rx="10" ry="2" className="fill-cyan-400 animate-pulse blur-sm" />
    {/* Tail light */}
    <path d="M90,20 L95,22 L95,18 Z" className="fill-red-500 animate-pulse" />
  </svg>
);

const FlyingBike = () => (
    <svg viewBox="0 0 60 40" className="w-full h-full drop-shadow-[0_10px_10px_rgba(75,85,99,0.5)]">
        {/* Body */}
        <path d="M10,20 L20,15 L40,15 L45,20 L35,30 L15,30 Z" className="fill-gray-400" />
        {/* Rider (Simplified) */}
        <circle cx="35" cy="10" r="4" className="fill-gray-300" />
        <path d="M35,14 L30,22 L40,22" stroke="currentColor" strokeWidth="2" className="stroke-gray-300" />
        {/* Hover Pads */}
        <ellipse cx="15" cy="32" rx="8" ry="2" className="fill-cyan-500/50 blur-sm" />
        <ellipse cx="40" cy="32" rx="8" ry="2" className="fill-cyan-500/50 blur-sm" />
    </svg>
);

const CyberpunkCity = () => (
    <svg viewBox="0 0 1000 300" preserveAspectRatio="none" className="w-full h-full opacity-60">
        {/* Buildings Silhouette */}
        <path d="M0,300 L0,150 L50,150 L50,200 L100,200 L100,100 L150,100 L150,250 L200,250 L200,50 L250,50 L250,180 L300,180 L300,120 L350,120 L350,220 L400,220 L400,80 L450,80 L450,200 L500,200 L500,160 L550,160 L550,240 L600,240 L600,90 L650,90 L650,190 L700,190 L700,60 L750,60 L750,220 L800,220 L800,140 L850,140 L850,240 L900,240 L900,100 L950,100 L950,300 Z" className="fill-gray-900" />
        
        {/* Neon Windows (Randomized Pattern) */}
        <rect x="210" y="60" width="10" height="10" className="fill-violet-500/50 animate-pulse" />
        <rect x="230" y="80" width="10" height="10" className="fill-cyan-500/50" />
        <rect x="410" y="90" width="8" height="20" className="fill-pink-500/50" />
        <rect x="710" y="70" width="10" height="10" className="fill-yellow-500/50 animate-pulse" />
        <rect x="730" y="100" width="10" height="30" className="fill-violet-500/30" />
        <rect x="910" y="110" width="10" height="10" className="fill-cyan-500/30" />
    </svg>
);

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative pt-20 pb-48 min-h-[600px] overflow-hidden bg-gray-950 border-t border-white/5 flex flex-col justify-center">
      
      {/* --- Animated Background Scene --- */}
      <div className="absolute inset-0 z-0 pointer-events-none select-none overflow-hidden">
          
          {/* 1. Starry Sky & Meteors */}
          <div className="absolute inset-0 bg-gradient-to-b from-gray-900 via-indigo-950/20 to-gray-900">
             {[...Array(8)].map((_, i) => (
                <motion.div
                   key={i}
                   className="absolute h-[2px] w-24 bg-gradient-to-r from-transparent via-cyan-400 to-transparent shadow-[0_0_10px_rgba(34,211,238,0.8)]"
                   initial={{ x: -100, y: -100, opacity: 0 }}
                   animate={{ 
                       x: ['120vw', '-20vw'], 
                       y: [Math.random() * -100, Math.random() * 600],
                       opacity: [0, 1, 0] 
                   }}
                   transition={{ 
                       duration: Math.random() * 2 + 1.5,
                       repeat: Infinity,
                       delay: Math.random() * 5,
                       ease: "linear"
                   }}
                   style={{ 
                       top: `${Math.random() * 60}%`, 
                       left: `${Math.random() * 100}%`,
                       rotate: 35
                   }}
                />
             ))}
          </div>

          {/* 2. Cyberpunk Skyline */}
          <div className="absolute bottom-0 left-0 right-0 h-48 md:h-80 z-0">
             <CyberpunkCity />
          </div>

          {/* 3. Fog/Glow at bottom */}
          <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-violet-900/20 to-transparent z-10" />

          {/* 4. Flying Vehicles */}
          
          {/* Flying Car (Fast, Higher) */}
          <motion.div
            className="absolute bottom-20 z-20 w-32 md:w-48"
            initial={{ x: "-20vw" }}
            animate={{ x: "120vw" }}
            transition={{
                duration: 6,
                repeat: Infinity,
                ease: "linear",
                delay: 0.5
            }}
          >
            <FlyingCar />
          </motion.div>

          {/* Flying Bike (Slower, Lower) */}
          <motion.div
            className="absolute bottom-10 z-20 w-20 md:w-24 opacity-90"
            initial={{ x: "-10vw" }}
            animate={{ x: "110vw" }}
            transition={{
                duration: 15,
                repeat: Infinity,
                ease: "linear",
                delay: 2
            }}
          >
            <FlyingBike />
          </motion.div>
      </div>

      {/* --- Overlay Content (Floating above) --- */}
      <div className="relative z-40 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full -mt-20">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 p-8 rounded-2xl bg-gray-900/70 backdrop-blur-xl border border-white/10 shadow-[0_0_50px_rgba(0,0,0,0.5)]">
          {/* Logo & Copyright */}
          <div className="text-center md:text-left">
            <motion.a
              href="#home"
              onClick={(e) => {
                e.preventDefault();
                document.querySelector('#home')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="inline-block text-2xl font-bold bg-gradient-to-r from-violet-400 via-purple-400 to-indigo-400 bg-clip-text text-transparent mb-2"
              whileHover={{ scale: 1.05 }}
            >
              &lt;Andhika /&gt;
            </motion.a>
            <p className="text-gray-400 text-sm flex items-center justify-center md:justify-start gap-1">
              Made with <HiHeart className="text-red-500 animate-pulse" /> by {METADATA.author}
            </p>
            <p className="text-gray-500 text-xs mt-1">
              © {currentYear} All rights reserved.
            </p>
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-4">
            {SOCIAL_LINKS.map((social) => (
              <motion.a
                key={social.name}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-white/5 hover:bg-violet-500/20 text-gray-400 hover:text-violet-300 rounded-xl transition-all duration-300 border border-white/5 hover:border-violet-500/30"
                whileHover={{ scale: 1.1, y: -3 }}
                whileTap={{ scale: 0.9 }}
                title={social.name}
              >
                <social.icon size={20} />
              </motion.a>
            ))}
          </div>

          {/* Back to top */}
          <motion.button
            onClick={() => {
              document.querySelector('#home')?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="hidden md:flex items-center gap-2 px-5 py-2.5 text-sm font-medium text-gray-300 hover:text-white bg-white/5 hover:bg-white/10 rounded-xl transition-all border border-white/5"
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            Back to top
            <span className="text-lg">↑</span>
          </motion.button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
