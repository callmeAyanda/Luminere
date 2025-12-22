// src/app/collections/components/CollectionCard.js
'use client';

import { motion } from 'framer-motion';
import { Star, Heart, Eye, Share2 } from 'lucide-react';
import { useState } from 'react';

const CollectionCard = ({ collection, onQuickView, onToggleWishlist, onToggleCompare }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -10 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="group relative"
    >
      {/* Card */}
      <div className="relative overflow-hidden rounded-3xl border border-zinc-800 bg-gradient-to-b from-zinc-900/50 to-black/50 group-hover:border-amber-600/50 transition-all duration-500">
        
        {/* Image Container */}
        <div className="aspect-square relative overflow-hidden">
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-black/60 z-10" />
          
          {/* Badges */}
          <div className="absolute top-4 left-4 z-20 space-y-2">
            {collection.isNew && (
              <div className="px-3 py-1 bg-gradient-to-r from-amber-600 to-amber-800 rounded-full text-xs tracking-widest">
                NEW
              </div>
            )}
            {collection.isBespoke && (
              <div className="px-3 py-1 bg-gradient-to-r from-purple-600 to-purple-800 rounded-full text-xs tracking-widest">
                BESPOKE
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 20 }}
            transition={{ duration: 0.3 }}
            className="absolute top-4 right-4 z-20 flex flex-col space-y-2"
          >
            <button
              onClick={() => onToggleWishlist(collection.id)}
              className="w-10 h-10 rounded-full bg-black/60 backdrop-blur-sm border border-zinc-700 flex items-center justify-center hover:border-amber-600/50 hover:bg-amber-900/20 transition-all"
            >
              <Heart className="w-5 h-5" />
            </button>
            <button
              onClick={() => onToggleCompare(collection.id)}
              className="w-10 h-10 rounded-full bg-black/60 backdrop-blur-sm border border-zinc-700 flex items-center justify-center hover:border-amber-600/50 hover:bg-amber-900/20 transition-all"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
              </svg>
            </button>
            <button
              onClick={() => onQuickView(collection)}
              className="w-10 h-10 rounded-full bg-black/60 backdrop-blur-sm border border-zinc-700 flex items-center justify-center hover:border-amber-600/50 hover:bg-amber-900/20 transition-all"
            >
              <Eye className="w-5 h-5" />
            </button>
          </motion.div>

          {/* View Button */}
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 20 }}
            transition={{ duration: 0.3, delay: 0.1 }}
            className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-20 px-6 py-2 bg-gradient-to-r from-amber-600 to-amber-800 rounded-full text-sm tracking-widest hover:shadow-lg hover:shadow-amber-500/20 transition-all"
          >
            QUICK VIEW
          </motion.button>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Header */}
          <div className="flex items-start justify-between mb-3">
            <div>
              <div className="text-sm text-amber-400 mb-1">{collection.category}</div>
              <h3 className="text-2xl font-light mb-1">{collection.name}</h3>
              <div className="text-sm text-zinc-400">by {collection.designer}</div>
            </div>
            <div className="text-right">
              <div className="text-2xl font-light">{collection.price}</div>
              <div className="text-sm text-zinc-500">Starting price</div>
            </div>
          </div>

          {/* Description */}
          <p className="text-zinc-400 text-sm mb-4 line-clamp-2">{collection.description}</p>

          {/* Rating & Stock */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-2">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${
                      i < Math.floor(collection.rating)
                        ? 'fill-amber-400 text-amber-400'
                        : 'text-zinc-700'
                    }`}
                  />
                ))}
              </div>
              <span className="text-sm text-zinc-400">({collection.reviewCount})</span>
            </div>
            <div className="text-sm">
              {collection.stock <= 5 ? (
                <span className="text-amber-400">Only {collection.stock} left</span>
              ) : (
                <span className="text-zinc-400">In stock</span>
              )}
            </div>
          </div>

          {/* Features */}
          <div className="flex flex-wrap gap-2 mb-6">
            {collection.features.slice(0, 2).map((feature, i) => (
              <span
                key={i}
                className="px-3 py-1 border border-zinc-800 rounded-full text-xs text-zinc-400"
              >
                {feature}
              </span>
            ))}
            {collection.features.length > 2 && (
              <span className="px-3 py-1 border border-zinc-800 rounded-full text-xs text-zinc-400">
                +{collection.features.length - 2} more
              </span>
            )}
          </div>

          {/* CTA Buttons */}
          <div className="flex items-center space-x-3">
            <button className="flex-1 py-3 bg-gradient-to-r from-amber-600 to-amber-800 rounded-full text-sm font-light tracking-widest hover:shadow-lg hover:shadow-amber-500/20 transition-all">
              VIEW COLLECTION
            </button>
            <button className="w-12 h-12 rounded-full border border-zinc-800 flex items-center justify-center hover:border-amber-600/50 hover:bg-amber-900/20 transition-all">
              <Share2 className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default CollectionCard;

