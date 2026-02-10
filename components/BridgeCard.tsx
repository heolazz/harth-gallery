import React from 'react';
import { ArrowDown } from 'lucide-react';

interface BridgeCardProps {
  onClick: () => void;
}

const BridgeCard: React.FC<BridgeCardProps> = ({ onClick }) => {
  return (
    <div 
      className="flex-shrink-0 w-[85vw] md:w-[600px] h-full flex flex-col justify-center items-center bg-stone-100 border-l border-stone-200 snap-center p-12 transition-all duration-500 hover:bg-white group cursor-pointer relative overflow-hidden"
      onClick={onClick}
    >
        {/* Decorative Background Text */}
        <div className="absolute inset-0 flex items-center justify-center opacity-[0.03] pointer-events-none">
            <span className="text-[20rem] font-serif font-black text-stone-900 transform -rotate-90">ART</span>
        </div>

      <div className="text-center space-y-6 relative z-10">
        <h2 className="text-4xl md:text-6xl font-serif text-stone-900 group-hover:scale-105 transition-transform duration-500">
          The Collection
        </h2>
        <div className="w-16 h-px bg-stone-400 mx-auto"></div>
        <p className="text-stone-500 text-lg max-w-sm mx-auto font-light leading-relaxed">
           Beyond the commercial work lies the personal expression. Enter the Harth Gallery.
        </p>
        
        <div className="mt-12 flex justify-center">
          <div className="p-4 rounded-full border border-stone-300 group-hover:border-stone-900 group-hover:bg-stone-900 transition-all duration-300 animate-bounce">
            <ArrowDown className="w-6 h-6 text-stone-400 group-hover:text-white" />
          </div>
        </div>
        
        <p className="text-xs text-stone-400 uppercase tracking-[0.2em] mt-6 group-hover:text-stone-600 transition-colors">
          Enter Gallery
        </p>
      </div>
    </div>
  );
};

export default BridgeCard;