import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HiMusicNote, HiVolumeUp, HiVolumeOff } from 'react-icons/hi';

const MusicPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const audioRef = useRef(null);
  const [volume, setVolume] = useState(0.5);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch(error => {
          console.log("Audio play failed:", error);
        });
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  // Adjust volume
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  // Handle global pause/resume events (e.g. from Video Modal)
  useEffect(() => {
    const handlePause = () => {
      // Pause if playing
      if (audioRef.current && !audioRef.current.paused) {
        audioRef.current.pause();
        // We do NOT update isPlaying state here to keep the UI showing "playing" (or we could, but then we lose state).
        // Actually, if we want to resume, we need to know if it was playing.
        // Let's rely on the fact that if the user hits play, isPlaying is true.
        // If we pause programmatically, we keep isPlaying true so we know to resume.
      }
    };

    const handleResume = () => {
      // Only resume if the UI thinks we should be playing
      if (audioRef.current && isPlaying) {
        audioRef.current.play().catch(() => {});
      }
    };

    window.addEventListener('bg-music-pause', handlePause);
    window.addEventListener('bg-music-resume', handleResume);

    return () => {
      window.removeEventListener('bg-music-pause', handlePause);
      window.removeEventListener('bg-music-resume', handleResume);
    };
  }, [isPlaying]);

  // Audio Visualizer Bars
  const bars = [1, 2, 3, 4];

  return (
    <div className="flex items-center gap-3">
      {/* Hidden Audio Element */}
      <audio
        ref={audioRef}
        src="/audio/cyberpunk-metaverse-event-background-music-391980.mp3"
        loop
      />

      {/* Player Container */}
      <motion.div 
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="flex items-center gap-3 px-3 py-1.5 bg-white/5 border border-white/10 rounded-full hover:bg-white/10 transition-colors"
      >
        {/* Play/Pause Button */}
        <button
          onClick={togglePlay}
          className="relative w-8 h-8 flex items-center justify-center rounded-full bg-violet-600 hover:bg-violet-500 text-white transition-all duration-300 shadow-lg shadow-violet-500/20"
        >
          {isPlaying ? (
            <div className="flex gap-1">
               <span className="w-0.5 h-3 bg-white rounded-full" />
               <span className="w-0.5 h-3 bg-white rounded-full" />
            </div>
          ) : (
             <HiMusicNote size={14} className="ml-0.5" />
          )}
        </button>

        {/* Visualizer & Info */}
        <div className="hidden lg:flex flex-col">
           <div className="flex items-end gap-0.5 h-3">
              {bars.map((bar) => (
                <motion.div
                  key={bar}
                  className="w-0.5 bg-violet-400 rounded-t-sm"
                  animate={{
                    height: isPlaying ? [3, 12, 6, 10, 3] : 3,
                  }}
                  transition={{
                    duration: 0.5,
                    repeat: Infinity,
                    repeatType: "reverse",
                    delay: bar * 0.1,
                    ease: "easeInOut"
                  }}
                />
              ))}
           </div>
        </div>

        {/* Mute Toggle */}
        <button 
           onClick={toggleMute}
           className="text-gray-400 hover:text-white transition-colors"
        >
          {isMuted ? <HiVolumeOff size={16} /> : <HiVolumeUp size={16} />}
        </button>
      </motion.div>
    </div>
  );
};

export default MusicPlayer;
