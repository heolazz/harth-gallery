import React from 'react';
import { Project } from '../types';
import { motion } from 'framer-motion';

interface ProjectCardProps {
  project: Project;
  index: number;
  displacementState: 'idle' | 'left' | 'right' | 'active';
  onClick: (id: string) => void;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, index, displacementState, onClick }) => {

  // Size classes based on orientation
  const getSizeClasses = () => {
    switch (project.orientation) {
      // Desktop: Lowered height for better visual balance
      // Mobile: Wider width so banners don't look too short
      case 'portrait': return 'w-[52vw] h-[36vh] md:w-auto md:h-[42vh]';
      case 'landscape': return 'w-[102vw] h-auto md:w-auto md:h-[42vh]';
      case 'square': return 'w-[102vw] h-auto md:w-auto md:h-[42vh]';
      default: return 'w-[102vw] h-auto md:w-auto md:h-[42vh]';
    }
  };

  const isHidden = displacementState === 'active';

  return (
    <motion.div
      // Displacement Animation Logic
      animate={displacementState}
      variants={{
        idle: { x: 0, opacity: 1, filter: 'blur(0px)' },
        // Siblings fly away further to clear screen
        left: { x: -1500, opacity: 0, filter: 'blur(20px)' },
        right: { x: 1500, opacity: 0, filter: 'blur(20px)' },
        active: { opacity: 0 }
      }}
      transition={{ type: 'spring', stiffness: 70, damping: 20 }}

      className="flex-shrink-0 relative group snap-center cursor-pointer mx-4 md:mx-12 flex flex-col items-center justify-center"
      onClick={() => onClick(project.id)}
    >
      {/* The Image Wrapper - Flex to hug content */}
      <div
        className={`relative overflow-hidden bg-stone-200 shadow-sm group-hover:shadow-2xl transition-all duration-700 rounded-[2px] flex items-center justify-center ${getSizeClasses()}`}
      >
        <motion.img
          layoutId={`image-${project.id}`}
          src={project.imageUrl}
          alt={project.title}
          // Mobile: w-full h-auto (width constrained)
          // Desktop: w-auto h-full (height constrained)
          className="w-full h-auto md:w-auto md:h-full block transition-transform duration-1000 ease-out group-hover:scale-105"
        />

        {/* Subtle Overlay on Hover */}
        <div className={`absolute inset-0 bg-stone-900/0 group-hover:bg-stone-900/5 transition-colors duration-500 ${isHidden ? 'opacity-0' : 'opacity-100'}`} />
      </div>

      {/* Info visible only when IDLE - Now using standard flow for better spacing */}
      <motion.div
        initial={false}
        animate={{
          opacity: isHidden ? 0 : 1,
          y: isHidden ? 20 : 0
        }}
        className="mt-8 text-center flex flex-col items-center"
      >
        <span className="text-[10px] font-bold tracking-[0.4em] text-stone-300 uppercase mb-2 block transition-colors group-hover:text-stone-500">
          {project.category}
        </span>
        <h3 className="text-xl md:text-2xl font-serif text-stone-900 leading-tight">
          {project.title}
        </h3>

        {/* Subtle underline decoration that appears on hover */}
        <div className="w-0 h-px bg-stone-400 mt-3 group-hover:w-12 transition-all duration-500 ease-in-out" />
      </motion.div>

    </motion.div>
  );
};

export default ProjectCard;