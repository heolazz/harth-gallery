import React from 'react';
import { motion } from 'framer-motion';
import { ART_GALLERY } from '../constants';
import { ArtPiece } from '../types';

interface ArtGalleryProps {
  isVisible: boolean;
  innerRef: React.RefObject<HTMLDivElement>;
  onSelectArt: (art: ArtPiece) => void;
}

const ArtGallery: React.FC<ArtGalleryProps> = ({ isVisible, innerRef, onSelectArt }) => {
  return (
    <motion.section
      ref={innerRef}
      initial={{ opacity: 0, y: 100 }}
      animate={{
        opacity: isVisible ? 1 : 0,
        y: isVisible ? 0 : 100,
        pointerEvents: isVisible ? 'auto' : 'none'
      }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="w-full min-h-screen bg-white relative z-10 py-24 px-4 md:px-12"
    >
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-24">
          <span className="text-stone-400 text-xs font-bold tracking-[0.3em] uppercase mb-6 block">Personal Works</span>
          <h2 className="text-5xl md:text-8xl font-serif text-stone-900 mb-8 tracking-tight">The Playground</h2>
          <p className="text-stone-500 max-w-xl mx-auto font-light leading-loose text-lg">
            Where rules are broken and creativity flows without a brief. A curated selection of experiments and sketches.
          </p>
        </div>

        <div className="columns-2 lg:columns-3 gap-2 md:gap-8 space-y-2 md:space-y-8">
          {ART_GALLERY.map((art, index) => (
            <motion.div
              key={art.id}
              layoutId={`container-${art.id}`}
              onClick={() => onSelectArt(art)}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.8 }}
              className="break-inside-avoid group relative overflow-hidden bg-stone-100 cursor-pointer rounded-xl"
            >
              <motion.img
                layoutId={`image-${art.id}`}
                src={art.imageUrl}
                alt={art.title}
                className="w-full h-auto object-cover transition-transform duration-700 ease-in-out group-hover:scale-110 grayscale-[0.2] group-hover:grayscale-0 block"
              />

              {/* Information Overlay - Refined for Touch & Desktop */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4 md:p-6">
                <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                  <h3 className="text-xl md:text-2xl font-serif text-white mb-1">{art.title}</h3>
                  <p className="text-[10px] md:text-xs text-white/70 uppercase tracking-widest">{art.medium}</p>
                </div>
              </div>

              {/* Subtle border on hover */}
              <div className="absolute inset-0 border border-white/0 group-hover:border-white/20 transition-colors duration-300 pointer-events-none" />
            </motion.div>
          ))}
        </div>

        <footer className="mt-40 text-center border-t border-stone-200 pt-16 pb-8">
          <div className="mb-8">
            <h4 className="font-serif text-2xl text-stone-900">Harth Gallery</h4>
          </div>
          <p className="text-stone-400 text-sm">© {new Date().getFullYear()} Harth Gallery. Curated with React & Gemini.</p>
        </footer>
      </div>
    </motion.section>
  );
};

export default ArtGallery;