import React from 'react';
import { Project } from '../types';
import { motion } from 'framer-motion';
import { X, ArrowUpRight } from 'lucide-react';

interface ActiveProjectProps {
    project: Project;
    onClose: () => void;
}

const ActiveProject: React.FC<ActiveProjectProps> = ({ project, onClose }) => {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">

            {/* 1. Backdrop */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 bg-stone-100/98 backdrop-blur-md"
                onClick={onClose}
            />

            {/* 2. Main Content Container - Back to Full Screen */}
            <motion.div
                layoutId={`card-container-${project.id}`}
                className="relative w-full h-full flex flex-col md:flex-row bg-white overflow-hidden shadow-2xl"
            >
                {/* Close Button */}
                <button
                    onClick={(e) => { e.stopPropagation(); onClose(); }}
                    className="absolute top-8 right-8 z-[60] p-2 text-stone-300 hover:text-stone-900 transition-colors"
                >
                    <X size={32} strokeWidth={1} />
                </button>

                {/* LEFT: GALLERY FRAME SECTION - Thinner Frame */}
                <div className="w-full h-[40vh] md:w-1/2 md:h-full relative bg-stone-50 flex items-center justify-center p-6 md:p-12 lg:p-20">
                    {/* The "Frame" - Adapts to image size */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                        className="relative w-auto h-auto max-w-[90%] max-h-[90%] bg-white p-2 md:p-3 shadow-[0_20px_60px_rgba(0,0,0,0.05)] border border-stone-200 flex items-center justify-center group"
                    >
                        <motion.img
                            layoutId={`image-${project.id}`}
                            src={project.imageUrl}
                            alt={project.title}
                            className="block w-auto h-auto max-w-full max-h-[80vh] md:max-h-[85vh] object-contain transition-all duration-1000 grayscale-0"
                        />

                        {/* Year Label - Tucked away */}
                        <div className="absolute top-4 left-4 mix-blend-difference">
                            <span className="text-[9px] font-bold tracking-[0.3em] text-white/30 uppercase">
                                {project.year}
                            </span>
                        </div>
                    </motion.div>
                </div>

                {/* RIGHT: CONTENT SECTION - More Compact */}
                <div className="w-full h-[60vh] md:w-1/2 md:h-full bg-white relative">
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                        transition={{ delay: 0.3, duration: 0.8 }}
                        className="h-full flex flex-col p-8 md:p-12 lg:p-16 justify-center"
                    >
                        {/* Header Info - Tighter spacing */}
                        <div className="mb-8">
                            <div className="flex items-center gap-3 mb-4">
                                <span className="text-[10px] font-bold tracking-[0.3em] uppercase text-stone-300">
                                    {project.category}
                                </span>
                                <div className="w-8 h-px bg-stone-100" />
                            </div>

                            <h2 className="text-4xl md:text-5xl font-serif text-stone-900 leading-tight mb-4 tracking-tight">
                                {project.title}
                            </h2>

                            <p className="text-stone-500 font-light text-base md:text-lg leading-relaxed max-w-md">
                                {project.description}
                            </p>
                        </div>

                        {/* Details List - Inline/Compact */}
                        <div className="flex flex-col gap-6 mb-8 py-6 border-y border-stone-50">
                            <div className="flex gap-8">
                                <div>
                                    <h4 className="text-[9px] font-bold uppercase tracking-[0.2em] text-stone-300 mb-1">Client</h4>
                                    <p className="text-stone-900 text-xs font-medium">{project.client || 'Private'}</p>
                                </div>
                                <div>
                                    <h4 className="text-[9px] font-bold uppercase tracking-[0.2em] text-stone-300 mb-1">Tools</h4>
                                    <div className="flex flex-wrap gap-2 text-stone-500 text-[10px]">
                                        {project.tools?.map((t, i) => <span key={i} className="bg-stone-50 px-1.5 py-0.5 border border-stone-100">{t}</span>)}
                                    </div>
                                </div>
                                <div>
                                    <h4 className="text-[9px] font-bold uppercase tracking-[0.2em] text-stone-300 mb-1">Focus</h4>
                                    <div className="flex flex-wrap gap-x-3 text-stone-500 text-[11px]">
                                        {project.deliverables?.slice(0, 3).map((d, i) => <span key={i}>{d}</span>)}
                                    </div>
                                </div>
                            </div>
                        </div>


                    </motion.div>
                </div>
            </motion.div>
        </div>
    );
};

export default ActiveProject;