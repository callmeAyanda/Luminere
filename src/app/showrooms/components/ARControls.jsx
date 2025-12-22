// src/app/showrooms/components/ARControls.js
'use client';

import { motion } from 'framer-motion';
import { 
  ZoomIn, 
  ZoomOut, 
  RotateCw, 
  Maximize2, 
  Camera,
  Target 
} from 'lucide-react';

export default function ARControls({
  onZoomIn,
  onZoomOut,
  onReset,
  onFullscreen,
  arMode,
  onToggleAR
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="absolute bottom-8 right-8 flex space-x-3"
    >
      <button
        onClick={onZoomIn}
        className="w-14 h-14 rounded-full bg-black/80 backdrop-blur-sm border border-amber-600/30 flex items-center justify-center hover:bg-amber-900/30 transition-all group"
      >
        <ZoomIn className="w-6 h-6 group-hover:scale-110 transition-transform" />
      </button>
      
      <button
        onClick={onZoomOut}
        className="w-14 h-14 rounded-full bg-black/80 backdrop-blur-sm border border-amber-600/30 flex items-center justify-center hover:bg-amber-900/30 transition-all group"
      >
        <ZoomOut className="w-6 h-6 group-hover:scale-110 transition-transform" />
      </button>
      
      <button
        onClick={onReset}
        className="w-14 h-14 rounded-full bg-black/80 backdrop-blur-sm border border-amber-600/30 flex items-center justify-center hover:bg-amber-900/30 transition-all group"
      >
        <RotateCw className="w-6 h-6 group-hover:rotate-180 transition-transform" />
      </button>
      
      <button
        onClick={onToggleAR}
        className={`w-14 h-14 rounded-full border flex items-center justify-center transition-all group ${
          arMode
            ? 'bg-gradient-to-r from-amber-600 to-amber-800 border-amber-600'
            : 'bg-black/80 backdrop-blur-sm border-amber-600/30 hover:bg-amber-900/30'
        }`}
      >
        <Camera className="w-6 h-6 group-hover:scale-110 transition-transform" />
      </button>
      
      <button
        onClick={onFullscreen}
        className="w-14 h-14 rounded-full bg-black/80 backdrop-blur-sm border border-amber-600/30 flex items-center justify-center hover:bg-amber-900/30 transition-all group"
      >
        <Maximize2 className="w-6 h-6 group-hover:scale-110 transition-transform" />
      </button>
    </motion.div>
  );
}

