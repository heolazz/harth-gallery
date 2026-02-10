import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { X, ArrowUpRight, Clock, Ruler, Paintbrush } from 'lucide-react';
import { PortfolioItem, Project, ArtPiece } from '../types';

interface DetailModalProps {
  item: PortfolioItem;
  onClose: () => void;
}

const DetailModal: React.FC<DetailModalProps> = ({ item, onClose }) => {
  // Lock body scroll when modal is open
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEsc);
    return () => {
      document.body.style.overflow = 'auto';
      window.removeEventListener('keydown', handleEsc);
    };
  }, [onClose]);

  const isProject = (item: PortfolioItem): item is Project => {
    return 'category' in item;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8">
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-stone-900/80 backdrop-blur-md cursor-pointer"
      />

      {/* Modal Content */}
      <motion.div
        layoutId={`container-${item.id}`}
        className="relative bg-stone-50 w-full h-full md:max-w-6xl md:h-[85vh] md:max-h-[900px] overflow-hidden rounded-lg shadow-2xl flex flex-col md:flex-row pointer-events-auto"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-50 p-2 bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-full text-stone-900 md:text-stone-500 hover:text-stone-900 transition-colors border border-transparent hover:border-stone-300"
        >
          <X className="w-6 h-6" />
        </button>

        {isProject(item) ? (
          // ==================== DESIGN LAYOUT (Split View) ====================
          <>
            {/* Left: Image */}
            <div className="w-full md:w-3/5 h-[40vh] md:h-full relative bg-stone-200">
              <motion.img
                layoutId={`image-${item.id}`}
                src={item.imageUrl}
                alt={item.title}
                className="w-full h-full object-cover"
              />
               <div className="absolute inset-0 bg-gradient-to-t from-stone-900/40 to-transparent opacity-60 pointer-events-none" />
            </div>

            {/* Right: Content */}
            <div className="w-full md:w-2/5 h-full overflow-y-auto bg-white p-8 md:p-12 flex flex-col">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <div className="flex items-center space-x-3 mb-6">
                  <span className="px-3 py-1 bg-stone-100 border border-stone-200 text-xs font-bold tracking-widest uppercase text-stone-600">
                    {item.category}
                  </span>
                  <span className="text-stone-400 font-serif italic">{item.year}</span>
                </div>

                <h2 className="text-4xl md:text-5xl font-serif text-stone-900 mb-2 leading-tight">
                  {item.title}
                </h2>
                <p className="text-stone-500 font-medium mb-8">{item.role}</p>

                <p className="text-stone-600 leading-relaxed mb-10 text-lg font-light">
                  {item.description}
                  <br /><br />
                  A curated solution designed to solve complex business problems through elegant visual systems and intuitive user interfaces.
                </p>

                {/* Metadata Grid */}
                <div className="grid grid-cols-2 gap-y-8 gap-x-4 mb-12 border-t border-stone-100 pt-8">
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-widest text-stone-400 mb-2">Client</h4>
                    <p className="text-stone-800 font-medium">{item.client || 'Confidential'}</p>
                  </div>
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-widest text-stone-400 mb-2">Deliverables</h4>
                    <ul className="text-stone-800 text-sm space-y-1">
                      {item.deliverables?.map((d, i) => <li key={i}>{d}</li>)}
                    </ul>
                  </div>
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-widest text-stone-400 mb-2">Tools</h4>
                    <div className="flex flex-wrap gap-2">
                        {item.tools?.map((t, i) => (
                             <span key={i} className="text-xs text-stone-500 bg-stone-100 px-2 py-1 rounded">{t}</span>
                        ))}
                    </div>
                  </div>
                </div>

                {/* CTA */}
                <div className="mt-auto pt-8">
                  <button className="w-full group flex items-center justify-center gap-3 bg-stone-900 text-white py-4 px-8 hover:bg-stone-800 transition-colors uppercase tracking-widest text-sm font-medium">
                    <span>View Case Study</span>
                    <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                  </button>
                </div>
              </motion.div>
            </div>
          </>
        ) : (
          // ==================== ART LAYOUT (Centered/Cinematic) ====================
          <div className="w-full h-full flex flex-col md:flex-row bg-stone-100">
            {/* Image Section - Dominant */}
             <div className="w-full md:w-2/3 h-[50vh] md:h-full relative p-4 md:p-8 flex items-center justify-center bg-stone-200/50">
                <motion.div 
                    layoutId={`container-inner-${item.id}`}
                    className="relative w-full h-full flex items-center justify-center shadow-lg md:shadow-2xl overflow-hidden"
                >
                    <motion.img
                        layoutId={`image-${item.id}`}
                        src={item.imageUrl}
                        alt={item.title}
                        className="max-w-full max-h-full object-contain"
                    />
                </motion.div>
             </div>

             {/* Info Section - Minimalist Side Panel */}
             <div className="w-full md:w-1/3 h-full overflow-y-auto bg-white border-l border-stone-200 p-8 md:p-12 flex flex-col justify-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="space-y-8"
                >
                    <div>
                        <h2 className="text-3xl md:text-5xl font-serif text-stone-900 mb-3">
                        {item.title}
                        </h2>
                        <span className="text-stone-500 uppercase tracking-widest text-xs font-medium border-b border-stone-200 pb-1">
                            {item.medium}
                        </span>
                    </div>

                    <blockquote className="border-l-2 border-stone-300 pl-4 py-1">
                        <p className="text-stone-600 font-serif italic text-lg leading-relaxed">
                            "{item.quote || 'Art speaks where words are unable to explain.'}"
                        </p>
                    </blockquote>

                    {/* Technical Specs */}
                    <div className="grid grid-cols-1 gap-6 pt-8 border-t border-stone-100">
                        <div className="flex items-center gap-3">
                            <Clock className="w-4 h-4 text-stone-400" />
                            <div>
                                <h4 className="text-xs font-bold uppercase text-stone-400">Time Spent</h4>
                                <p className="text-sm text-stone-800">{item.timeSpent || 'Unknown'}</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3">
                            <Ruler className="w-4 h-4 text-stone-400" />
                            <div>
                                <h4 className="text-xs font-bold uppercase text-stone-400">Dimensions</h4>
                                <p className="text-sm text-stone-800">{item.dimensions || 'Variable'}</p>
                            </div>
                        </div>
                         <div className="flex items-center gap-3">
                            <Paintbrush className="w-4 h-4 text-stone-400" />
                            <div>
                                <h4 className="text-xs font-bold uppercase text-stone-400">Original Medium</h4>
                                <p className="text-sm text-stone-800">{item.medium}</p>
                            </div>
                        </div>
                    </div>
                </motion.div>
             </div>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default DetailModal;