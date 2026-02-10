import React from 'react';
import { ArrowDown } from 'lucide-react';

interface BridgeCardProps {
  onClick: () => void;
}

const BridgeCard: React.FC<BridgeCardProps> = ({ onClick }) => {
  return (
    <div
      className="flex-shrink-0 w-[85vw] md:w-[600px] h-full flex flex-col justify-center items-center bg-stone-50 border-l border-stone-200 snap-center p-12 transition-all duration-700 hover:bg-white group cursor-pointer relative overflow-hidden"
      onClick={onClick}
    >
      {/* Subtle Paper Texture Overlay */}
      <div className="absolute inset-0 opacity-[0.4] pointer-events-none mix-blend-multiply"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Decorative Background Text - Larger and softer */}
      <div className="absolute inset-0 flex items-center justify-center opacity-[0.04] pointer-events-none select-none">
        <span className="text-[25rem] font-serif font-black text-stone-900 transform rotate-12 leading-none">ART</span>
      </div>

      {/* Floating Accent Elements */}
      <div className="absolute top-20 right-20 w-12 h-12 border border-stone-200 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-1000 group-hover:scale-150 pointer-events-none" />
      <div className="absolute bottom-20 left-20 w-8 h-8 bg-stone-100 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-1000 group-hover:translate-x-10 pointer-events-none" />

      <div className="text-center space-y-8 relative z-10">
        <div className="space-y-2">
          <span className="text-[10px] text-stone-400 uppercase tracking-[0.4em] font-bold block mb-4 translate-y-2 group-hover:translate-y-0 transition-transform duration-500">Curated Work</span>
          <h2 className="text-5xl md:text-7xl font-serif text-stone-900 leading-tight">
            The <br />
            <span className="italic font-light text-stone-700">Collection</span>
          </h2>
        </div>

        {/* Refined Divider */}
        <div className="relative py-4">
          <div className="w-12 h-px bg-stone-300 mx-auto group-hover:w-24 transition-all duration-500"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 bg-stone-900 rounded-full scale-0 group-hover:scale-100 transition-transform duration-500 delay-100"></div>
        </div>

        <p className="text-stone-500 text-base md:text-lg max-w-sm mx-auto font-light leading-relaxed px-4">
          Exploring the boundary between personal expression and digital craft. Step into the playground.
        </p>

        <div className="mt-16 flex flex-col items-center space-y-4">
          <div className="relative">
            {/* Spinning border effect on hover */}
            <div className="absolute inset-0 rounded-full border border-dashed border-stone-300 animate-[spin_10s_linear_infinite] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            <div className="p-5 rounded-full border border-stone-200 bg-white shadow-sm group-hover:shadow-md group-hover:border-stone-400 transition-all duration-300">
              <ArrowDown className="w-6 h-6 text-stone-400 group-hover:text-stone-900 transition-colors animate-bounce" />
            </div>
          </div>

          <p className="text-[9px] text-stone-400 uppercase tracking-[0.3em] font-bold pt-2 group-hover:text-stone-900 transition-colors duration-300">
            Scroll to Discover
          </p>
        </div>
      </div>

      {/* Frame accents */}
      <div className="absolute top-12 left-12 right-12 bottom-12 border border-stone-200/50 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
    </div>
  );
};

export default BridgeCard;