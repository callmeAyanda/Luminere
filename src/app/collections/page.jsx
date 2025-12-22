// src/app/collections/page.js
'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Filter,
  Grid,
  List,
  ChevronDown,
  Star,
  Eye,
  Heart,
  Share2,
  ZoomIn,
  RotateCw,
  X,
  Check,
  Sparkles,
  Award,
  Clock,
  Users,
  Tag,
  ShoppingBag,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Maximize2,
  Play
} from 'lucide-react';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Thumbs, FreeMode, EffectFade } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';
import * as Slider from '@radix-ui/react-slider';
import * as Dialog from '@radix-ui/react-dialog';

const CollectionsPage = () => {
  const router = useRouter();
  const [viewMode, setViewMode] = useState('grid');
  const [selectedCollection, setSelectedCollection] = useState(null);
  const [filters, setFilters] = useState({
    category: [],
    priceRange: [0, 1000000],
    materials: [],
    availability: 'all',
    sortBy: 'featured'
  });
  const [showFilters, setShowFilters] = useState(false);
  const [wishlist, setWishlist] = useState([]);
  const [compareItems, setCompareItems] = useState([]);
  const [quickViewItem, setQuickViewItem] = useState(null);
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const [activeFilter, setActiveFilter] = useState('all');
  const [show360View, setShow360View] = useState(false);
  const [randomValues] = useState(() => {
    return [...Array(10)].map(() => ({
      x: Math.random() * 100 - 50,
      duration: 4 + Math.random() * 2,
      left: Math.random() * 100,
      top: Math.random() * 100
    }));
  });

  const categories = [
    { id: 'living', name: 'Living Room', count: 24 },
    { id: 'dining', name: 'Dining', count: 18 },
    { id: 'bedroom', name: 'Bedroom', count: 22 },
    { id: 'office', name: 'Office', count: 12 },
    { id: 'outdoor', name: 'Outdoor', count: 8 },
    { id: 'decor', name: 'Decor', count: 36 }
  ];

  const materials = [
    'Italian Leather',
    'Solid Mahogany',
    'Carrara Marble',
    '24K Gold Leaf',
    'Crystal Inlay',
    'Stainless Steel',
    'Cashmere',
    'Onyx',
    'Titanium',
    'Mother of Pearl'
  ];

  const collections = [
    {
      id: 1,
      name: 'Celestial Collection',
      designer: 'Massimo Ferrari',
      price: '$285,000 - $1.2M',
      category: 'Limited Edition',
      description: 'Inspired by the cosmos, featuring meteorite inlays and constellations in 24k gold.',
      features: ['Meteorite Accents', 'Gold Leaf Detailing', 'Custom Constellations'],
      images: Array(5).fill('/api/placeholder/800/600'),
      rating: 4.9,
      reviewCount: 48,
      dimensions: 'Various',
      materials: ['Gold Leaf', 'Meteorite', 'Walnut'],
      isNew: true,
      isBespoke: true,
      stock: 5
    },
    {
      id: 2,
      name: 'Sapphire Series',
      designer: 'Isabelle Laurent',
      price: '$180,000 - $850,000',
      category: 'Ocean Inspired',
      description: 'Deep blue lacquer with mother-of-pearl detailing and wave-like silhouettes.',
      features: ['Mother-of-Pearl', 'Ocean Wave Design', 'Hand-Painted Lacquer'],
      images: Array(5).fill('/api/placeholder/800/600'),
      rating: 4.8,
      reviewCount: 32,
      dimensions: 'Various',
      materials: ['Lacquer', 'Mother of Pearl', 'Brass'],
      isNew: false,
      isBespoke: false,
      stock: 12
    },
    {
      id: 3,
      name: 'Onyx Noir',
      designer: 'Hiroshi Tanaka',
      price: '$320,000 - $2.5M',
      category: 'Modern Minimalist',
      description: 'Polished black marble with titanium framework and hidden LED illumination.',
      features: ['LED Integration', 'Titanium Frame', 'Polished Marble'],
      images: Array(5).fill('/api/placeholder/800/600'),
      rating: 4.9,
      reviewCount: 29,
      dimensions: 'Various',
      materials: ['Black Marble', 'Titanium', 'Glass'],
      isNew: true,
      isBespoke: true,
      stock: 3
    },
    {
      id: 4,
      name: 'Renaissance Revival',
      designer: 'Giovanni Moretti',
      price: '$450,000 - $3.8M',
      category: 'Classical',
      description: 'Hand-carved mahogany with silk upholstery and renaissance-inspired motifs.',
      features: ['Hand-Carved Details', 'Silk Upholstery', 'Gold Gilding'],
      images: Array(5).fill('/api/placeholder/800/600'),
      rating: 4.7,
      reviewCount: 56,
      dimensions: 'Various',
      materials: ['Mahogany', 'Silk', 'Gold Leaf'],
      isNew: false,
      isBespoke: true,
      stock: 8
    },
    {
      id: 5,
      name: 'Aurora',
      designer: 'Sofia Chen',
      price: '$220,000 - $950,000',
      category: 'Contemporary',
      description: 'Dynamic lighting effects mimic the northern lights within crystal and glass.',
      features: ['Dynamic Lighting', 'Crystal Elements', 'Interactive Design'],
      images: Array(5).fill('/api/placeholder/800/600'),
      rating: 4.8,
      reviewCount: 41,
      dimensions: 'Various',
      materials: ['Crystal', 'Glass', 'LED'],
      isNew: true,
      isBespoke: false,
      stock: 15
    },
    {
      id: 6,
      name: 'Savannah',
      designer: 'Kwame Okafor',
      price: '$190,000 - $1.1M',
      category: 'Organic Modern',
      description: 'Natural materials including petrified wood, bronze, and hand-woven textiles.',
      features: ['Petrified Wood', 'Hand-Woven Textiles', 'Bronze Castings'],
      images: Array(5).fill('/api/placeholder/800/600'),
      rating: 4.6,
      reviewCount: 37,
      dimensions: 'Various',
      materials: ['Petrified Wood', 'Bronze', 'Wool'],
      isNew: false,
      isBespoke: true,
      stock: 7
    }
  ];

  const sortOptions = [
    { id: 'featured', label: 'Featured' },
    { id: 'newest', label: 'Newest' },
    { id: 'price-high', label: 'Price: High to Low' },
    { id: 'price-low', label: 'Price: Low to High' },
    { id: 'rating', label: 'Highest Rated' }
  ];

  const handleFilterChange = (filterType, value) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: value
    }));
  };

  const toggleWishlist = (itemId) => {
    setWishlist(prev =>
      prev.includes(itemId)
        ? prev.filter(id => id !== itemId)
        : [...prev, itemId]
    );
  };

  const toggleCompare = (itemId) => {
    setCompareItems(prev =>
      prev.includes(itemId)
        ? prev.filter(id => id !== itemId)
        : prev.length < 4 ? [...prev, itemId] : prev
    );
  };

  const formatPrice = (price) => {
    return price.toLocaleString('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-zinc-950 via-zinc-900 to-zinc-950 text-white">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-black/80 backdrop-blur-xl border-b border-zinc-800">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-to-br from-amber-500 to-amber-800 rounded-full" />
              <span className="text-2xl font-light tracking-widest">LUMINÈRE</span>
            </div>
            <div className="flex items-center space-x-8">
              <a onClick={() => router.push('/')} className="text-sm font-light tracking-widest hover:text-amber-200 transition-colors cursor-pointer">
                HOME
              </a>
              <a onClick={() => router.push('/collections')} className="text-sm font-light tracking-widest text-amber-200 border-b border-amber-200 cursor-pointer">
                COLLECTIONS
              </a>
              <a onClick={() => router.push('/bespoke')} className="text-sm font-light tracking-widest hover:text-amber-200 transition-colors cursor-pointer">
                BESPOKE
              </a>
              <a onClick={() => router.push('/artisans')} className="text-sm font-light tracking-widest hover:text-amber-200 transition-colors cursor-pointer">
                ARTISANS
              </a>
              <a onClick={() => router.push('/clients')} className="text-sm font-light tracking-widest hover:text-amber-200 transition-colors cursor-pointer">
                CLIENTS
              </a>
              <a onClick={() => router.push('/showrooms')} className="text-sm font-light tracking-widest hover:text-amber-200 transition-colors cursor-pointer">
                SHOWROOMS
              </a>
              <button className="relative">
                <ShoppingBag className="w-5 h-5" />
                <span className="absolute -top-2 -right-2 w-5 h-5 bg-amber-600 rounded-full text-xs flex items-center justify-center">
                  3
                </span>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="pt-32">
        {/* Hero Section */}
        <section className="relative py-20 overflow-hidden">
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-gradient-to-r from-amber-900/10 via-transparent to-amber-900/10" />
            {randomValues.map((values, i) => (
              <motion.div
                key={i}
                className="absolute w-px h-px bg-amber-500/20 rounded-full"
                animate={{
                  y: [0, -100, 0],
                  x: [0, values.x, 0],
                }}
                transition={{
                  duration: values.duration,
                  repeat: Infinity,
                  delay: i * 0.2,
                }}
                style={{
                  left: `${values.left}%`,
                  top: `${values.top}%`,
                }}
              />
            ))}
          </div>

          <div className="container mx-auto px-6 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center max-w-4xl mx-auto"
            >
              <div className="inline-flex items-center space-x-2 mb-6">
                <Sparkles className="w-5 h-5 text-amber-400" />
                <span className="text-sm tracking-[0.3em] text-amber-400">EXCLUSIVE COLLECTIONS</span>
              </div>

              <h1 className="text-7xl md:text-8xl font-light tracking-tight leading-none mb-8">
                <span className="block">CURATED</span>
                <span className="block text-amber-200">MASTERPIECES</span>
                <span className="block">OF DESIGN</span>
              </h1>

              <p className="text-xl text-zinc-400 font-light mb-12 max-w-2xl mx-auto">
                Each collection represents the pinnacle of craftsmanship, materials, and timeless design
              </p>
            </motion.div>
          </div>
        </section>

        {/* Filters & Controls */}
        <section className="sticky top-20 z-40 bg-zinc-900/80 backdrop-blur-xl border-y border-zinc-800 py-4">
          <div className="container mx-auto px-6">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
              {/* Category Filters */}
              <div className="flex items-center space-x-4 overflow-x-auto pb-2 md:pb-0">
                <button
                  onClick={() => setActiveFilter('all')}
                  className={`px-6 py-2 rounded-full whitespace-nowrap transition-all ${activeFilter === 'all'
                    ? 'bg-gradient-to-r from-amber-600 to-amber-800'
                    : 'border border-zinc-700 hover:border-amber-600/50'
                    }`}
                >
                  All Collections
                </button>
                {categories.map(category => (
                  <button
                    key={category.id}
                    onClick={() => setActiveFilter(category.id)}
                    className={`px-4 py-2 rounded-full whitespace-nowrap transition-all ${activeFilter === category.id
                      ? 'bg-gradient-to-r from-amber-600 to-amber-800'
                      : 'border border-zinc-700 hover:border-amber-600/50'
                      }`}
                  >
                    {category.name} <span className="text-zinc-400 ml-1">({category.count})</span>
                  </button>
                ))}
              </div>

              {/* View Controls */}
              <div className="flex items-center space-x-6">
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`p-2 rounded-lg transition-all ${viewMode === 'grid'
                      ? 'bg-amber-900/30 border border-amber-600/50'
                      : 'border border-zinc-700 hover:border-amber-600/30'
                      }`}
                  >
                    <Grid className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`p-2 rounded-lg transition-all ${viewMode === 'list'
                      ? 'bg-amber-900/30 border border-amber-600/50'
                      : 'border border-zinc-700 hover:border-amber-600/30'
                      }`}
                  >
                    <List className="w-5 h-5" />
                  </button>
                </div>

                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className="flex items-center space-x-2 px-4 py-2 border border-zinc-700 rounded-full hover:border-amber-600/50 transition-all"
                >
                  <Filter className="w-4 h-4" />
                  <span>Filters</span>
                  <ChevronDown className="w-4 h-4" />
                </button>

                <select
                  value={filters.sortBy}
                  onChange={(e) => handleFilterChange('sortBy', e.target.value)}
                  className="bg-transparent border border-zinc-700 rounded-full px-4 py-2 focus:outline-none focus:border-amber-600"
                >
                  {sortOptions.map(option => (
                    <option key={option.id} value={option.id} className="bg-zinc-900">
                      Sort: {option.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Advanced Filters Panel */}
            <AnimatePresence>
              {showFilters && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="overflow-hidden"
                >
                  <div className="grid md:grid-cols-4 gap-8 pt-8 pb-4">
                    {/* Price Range */}
                    <div>
                      <h4 className="font-light mb-4">PRICE RANGE</h4>
                      <div className="space-y-4">
                        <Slider.Root
                          className="relative flex items-center select-none touch-none w-full h-5"
                          value={filters.priceRange}
                          onValueChange={(value) => handleFilterChange('priceRange', value)}
                          max={1000000}
                          step={50000}
                        >
                          <Slider.Track className="bg-zinc-800 relative grow rounded-full h-1">
                            <Slider.Range className="absolute bg-gradient-to-r from-amber-600 to-amber-800 rounded-full h-full" />
                          </Slider.Track>
                          <Slider.Thumb className="block w-5 h-5 bg-amber-600 rounded-full focus:outline-none focus:shadow-lg" />
                          <Slider.Thumb className="block w-5 h-5 bg-amber-600 rounded-full focus:outline-none focus:shadow-lg" />
                        </Slider.Root>
                        <div className="flex justify-between text-sm text-zinc-400">
                          <span>{formatPrice(filters.priceRange[0])}</span>
                          <span>{formatPrice(filters.priceRange[1])}</span>
                        </div>
                      </div>
                    </div>

                    {/* Materials */}
                    <div>
                      <h4 className="font-light mb-4">MATERIALS</h4>
                      <div className="space-y-2">
                        {materials.slice(0, 5).map(material => (
                          <label key={material} className="flex items-center space-x-2 cursor-pointer">
                            <input
                              type="checkbox"
                              checked={filters.materials.includes(material)}
                              onChange={(e) => {
                                const newMaterials = e.target.checked
                                  ? [...filters.materials, material]
                                  : filters.materials.filter(m => m !== material);
                                handleFilterChange('materials', newMaterials);
                              }}
                              className="w-4 h-4 rounded border-zinc-700 bg-zinc-900 text-amber-600 focus:ring-amber-600"
                            />
                            <span className="text-sm">{material}</span>
                          </label>
                        ))}
                      </div>
                    </div>

                    {/* Availability */}
                    <div>
                      <h4 className="font-light mb-4">AVAILABILITY</h4>
                      <div className="space-y-2">
                        {['In Stock', 'Made to Order', 'Limited Edition'].map(option => (
                          <label key={option} className="flex items-center space-x-2 cursor-pointer">
                            <input
                              type="radio"
                              name="availability"
                              checked={filters.availability === option.toLowerCase()}
                              onChange={() => handleFilterChange('availability', option.toLowerCase())}
                              className="w-4 h-4 border-zinc-700 bg-zinc-900 text-amber-600 focus:ring-amber-600"
                            />
                            <span className="text-sm">{option}</span>
                          </label>
                        ))}
                      </div>
                    </div>

                    {/* Reset & Apply */}
                    <div className="flex flex-col justify-end space-y-3">
                      <button
                        onClick={() => {
                          setFilters({
                            category: [],
                            priceRange: [0, 1000000],
                            materials: [],
                            availability: 'all',
                            sortBy: 'featured'
                          });
                        }}
                        className="px-4 py-2 border border-zinc-700 rounded-full hover:border-amber-600/50 transition-all text-sm"
                      >
                        Reset Filters
                      </button>
                      <button
                        onClick={() => setShowFilters(false)}
                        className="px-4 py-2 bg-gradient-to-r from-amber-600 to-amber-800 rounded-full text-sm font-light hover:shadow-lg hover:shadow-amber-500/20 transition-all"
                      >
                        Apply Filters
                      </button>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </section>

        {/* Collections Grid/List */}
        <section className="py-12">
          <div className="container mx-auto px-6">
            {/* Stats Bar */}
            <div className="flex items-center justify-between mb-8">
              <div className="text-zinc-400">
                Showing <span className="text-white">{collections.length}</span> of{' '}
                <span className="text-white">24</span> collections
              </div>
              {compareItems.length > 0 && (
                <div className="flex items-center space-x-4">
                  <span className="text-sm">Comparing {compareItems.length} items</span>
                  <button className="px-4 py-2 bg-gradient-to-r from-amber-600 to-amber-800 rounded-full text-sm hover:shadow-lg hover:shadow-amber-500/20 transition-all">
                    Compare Now
                  </button>
                </div>
              )}
            </div>

            {viewMode === 'grid' ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {collections.map((collection) => (
                  <motion.div
                    key={collection.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                    className="group relative"
                  >
                    <div className="relative overflow-hidden rounded-3xl border border-zinc-800 bg-gradient-to-b from-zinc-900/50 to-black/50 group-hover:border-amber-600/50 transition-all duration-500">
                      {/* Collection Image */}
                      <div className="aspect-square relative overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-black/60" />
                        <div className="absolute top-4 left-4 z-10">
                          {collection.isNew && (
                            <div className="px-3 py-1 bg-gradient-to-r from-amber-600 to-amber-800 rounded-full text-xs tracking-widest">
                              NEW
                            </div>
                          )}
                          {collection.isBespoke && (
                            <div className="mt-2 px-3 py-1 bg-gradient-to-r from-purple-600 to-purple-800 rounded-full text-xs tracking-widest">
                              BESPOKE
                            </div>
                          )}
                        </div>

                        {/* Action Buttons */}
                        <div className="absolute top-4 right-4 z-10 flex flex-col space-y-2">
                          <button
                            onClick={() => toggleWishlist(collection.id)}
                            className="w-10 h-10 rounded-full bg-black/60 backdrop-blur-sm border border-zinc-700 flex items-center justify-center hover:border-amber-600/50 transition-all"
                          >
                            <Heart className={`w-5 h-5 ${wishlist.includes(collection.id) ? 'fill-amber-400 text-amber-400' : ''
                              }`} />
                          </button>
                          <button
                            onClick={() => toggleCompare(collection.id)}
                            className={`w-10 h-10 rounded-full border flex items-center justify-center transition-all ${compareItems.includes(collection.id)
                              ? 'bg-gradient-to-r from-amber-600 to-amber-800 border-amber-600'
                              : 'bg-black/60 backdrop-blur-sm border-zinc-700 hover:border-amber-600/50'
                              }`}
                          >
                            <Check className="w-5 h-5" />
                          </button>
                          <button
                            onClick={() => setQuickViewItem(collection)}
                            className="w-10 h-10 rounded-full bg-black/60 backdrop-blur-sm border border-zinc-700 flex items-center justify-center hover:border-amber-600/50 transition-all"
                          >
                            <Eye className="w-5 h-5" />
                          </button>
                        </div>
                      </div>

                      {/* Collection Info */}
                      <div className="p-6">
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <div className="text-sm text-amber-400 mb-1">{collection.category}</div>
                            <h3 className="text-2xl font-light mb-2">{collection.name}</h3>
                            <div className="text-sm text-zinc-400">by {collection.designer}</div>
                          </div>
                          <div className="text-right">
                            <div className="text-2xl font-light">{collection.price}</div>
                            <div className="text-sm text-zinc-500">Starting price</div>
                          </div>
                        </div>

                        <p className="text-zinc-400 text-sm mb-4 line-clamp-2">{collection.description}</p>

                        {/* Rating & Stock */}
                        <div className="flex items-center justify-between mb-6">
                          <div className="flex items-center space-x-2">
                            <div className="flex">
                              {[...Array(5)].map((_, i) => (
                                <Star
                                  key={i}
                                  className={`w-4 h-4 ${i < Math.floor(collection.rating)
                                    ? 'fill-amber-400 text-amber-400'
                                    : 'text-zinc-700'
                                    }`}
                                />
                              ))}
                            </div>
                            <span className="text-sm text-zinc-400">({collection.reviewCount})</span>
                          </div>
                          <div className="text-sm text-zinc-400">
                            {collection.stock <= 5 ? (
                              <span className="text-amber-400">Only {collection.stock} left</span>
                            ) : (
                              'In stock'
                            )}
                          </div>
                        </div>

                        {/* Features */}
                        <div className="flex flex-wrap gap-2 mb-6">
                          {collection.features.map((feature, i) => (
                            <span
                              key={i}
                              className="px-3 py-1 border border-zinc-800 rounded-full text-xs text-zinc-400"
                            >
                              {feature}
                            </span>
                          ))}
                        </div>

                        {/* Action Buttons */}
                        <div className="flex items-center space-x-3">
                          <button className="flex-1 py-3 bg-gradient-to-r from-amber-600 to-amber-800 rounded-full text-sm font-light tracking-widest hover:shadow-lg hover:shadow-amber-500/20 transition-all">
                            VIEW COLLECTION
                          </button>
                          <button className="w-12 h-12 rounded-full border border-zinc-800 flex items-center justify-center hover:border-amber-600/50 transition-all">
                            <Share2 className="w-5 h-5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            ) : (
              /* List View */
              <div className="space-y-6">
                {collections.map((collection) => (
                  <motion.div
                    key={collection.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="group"
                  >
                    <div className="flex flex-col md:flex-row gap-6 p-6 rounded-3xl border border-zinc-800 bg-gradient-to-b from-zinc-900/50 to-black/50 group-hover:border-amber-600/50 transition-all duration-500">
                      {/* Image */}
                      <div className="md:w-1/3 aspect-square rounded-2xl overflow-hidden relative">
                        <div className="absolute inset-0 bg-gradient-to-br from-amber-900/20 to-transparent" />
                        <div className="absolute bottom-4 left-4 z-10">
                          {collection.isNew && (
                            <div className="px-3 py-1 bg-gradient-to-r from-amber-600 to-amber-800 rounded-full text-xs tracking-widest">
                              NEW
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Details */}
                      <div className="md:w-2/3">
                        <div className="flex flex-col md:flex-row justify-between mb-4">
                          <div>
                            <div className="text-sm text-amber-400 mb-1">{collection.category}</div>
                            <h3 className="text-3xl font-light mb-2">{collection.name}</h3>
                            <div className="text-sm text-zinc-400 mb-4">Designed by {collection.designer}</div>
                          </div>
                          <div className="text-right">
                            <div className="text-3xl font-light mb-1">{collection.price}</div>
                            <div className="text-sm text-zinc-500">Starting price</div>
                          </div>
                        </div>

                        <p className="text-zinc-400 mb-6">{collection.description}</p>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-6">
                            <div className="flex items-center space-x-2">
                              <div className="flex">
                                {[...Array(5)].map((_, i) => (
                                  <Star
                                    key={i}
                                    className={`w-4 h-4 ${i < Math.floor(collection.rating)
                                      ? 'fill-amber-400 text-amber-400'
                                      : 'text-zinc-700'
                                      }`}
                                  />
                                ))}
                              </div>
                              <span className="text-sm">({collection.reviewCount})</span>
                            </div>
                            <div className="text-sm text-zinc-400">
                              <Clock className="w-4 h-4 inline mr-1" />
                              Made to order: 12-16 weeks
                            </div>
                          </div>

                          <div className="flex items-center space-x-3">
                            <button className="px-6 py-3 border border-zinc-800 rounded-full text-sm hover:border-amber-600/50 transition-all">
                              Quick View
                            </button>
                            <button className="px-6 py-3 bg-gradient-to-r from-amber-600 to-amber-800 rounded-full text-sm font-light tracking-widest hover:shadow-lg hover:shadow-amber-500/20 transition-all">
                              Explore
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}

            {/* Load More */}
            <div className="text-center mt-16">
              <button className="px-8 py-3 border border-amber-600/30 rounded-full text-lg font-light tracking-widest hover:bg-amber-900/20 transition-all group">
                LOAD MORE COLLECTIONS
                <ArrowRight className="w-5 h-5 inline ml-2 group-hover:translate-x-2 transition-transform" />
              </button>
            </div>
          </div>
        </section>

        {/* Featured Collection */}
        <section className="py-20 bg-gradient-to-b from-black/50 to-zinc-950/50">
          <div className="container mx-auto px-6">
            <div className="bg-gradient-to-br from-zinc-900 to-black border border-amber-800/30 rounded-3xl overflow-hidden">
              <div className="grid md:grid-cols-2">
                {/* Left Content */}
                <div className="p-12">
                  <div className="inline-flex items-center space-x-2 mb-6">
                    <Award className="w-5 h-5 text-amber-400" />
                    <span className="text-sm tracking-[0.3em] text-amber-400">FEATURED COLLECTION</span>
                  </div>

                  <h2 className="text-5xl font-light mb-6">
                    The <span className="text-amber-200">Celestial</span> Collection
                  </h2>

                  <p className="text-zinc-400 text-lg mb-8">
                    A limited edition series featuring actual meteorite fragments and constellations mapped in 24k gold.
                    Each piece is numbered and certified with cosmic authentication.
                  </p>

                  <div className="space-y-6 mb-10">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-amber-900/20 to-amber-800/10 border border-amber-800/30 flex items-center justify-center">
                        <Sparkles className="w-6 h-6 text-amber-400" />
                      </div>
                      <div>
                        <div className="font-light">Meteorite Authentication</div>
                        <div className="text-sm text-zinc-400">Certified fragments from space</div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-amber-900/20 to-amber-800/10 border border-amber-800/30 flex items-center justify-center">
                        <Users className="w-6 h-6 text-amber-400" />
                      </div>
                      <div>
                        <div className="font-light">Exclusive Ownership</div>
                        <div className="text-sm text-zinc-400">Limited to 50 pieces worldwide</div>
                      </div>
                    </div>
                  </div>

                  <button className="px-8 py-4 bg-gradient-to-r from-amber-600 to-amber-800 rounded-full text-lg font-light tracking-widest hover:shadow-2xl hover:shadow-amber-500/30 transition-all">
                    EXPLORE CELESTIAL
                  </button>
                </div>

                {/* Right Content - 3D Viewer */}
                <div className="relative min-h-[500px]">
                  <div className="absolute inset-0 bg-gradient-to-br from-amber-900/10 via-transparent to-black/50" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="relative">
                      <div className="w-64 h-64 rounded-full border-2 border-amber-600/30 animate-spin-slow" />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-48 h-48 rounded-full border border-amber-600/20 animate-spin-slow [animation-direction:reverse]" />
                      </div>
                      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                        <div className="text-center">
                          <div className="text-amber-400 text-sm mb-2">3D PREVIEW</div>
                          <button
                            onClick={() => setShow360View(true)}
                            className="w-16 h-16 rounded-full bg-gradient-to-r from-amber-600 to-amber-800 flex items-center justify-center hover:scale-110 transition-transform"
                          >
                            <Play className="w-6 h-6" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Quick View Modal */}
      <Dialog.Root open={!!quickViewItem} onOpenChange={() => setQuickViewItem(null)}>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 bg-black/80 backdrop-blur-xl z-50" />
          <Dialog.Content className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 w-full max-w-6xl bg-gradient-to-br from-zinc-900 to-black border border-amber-800/30 rounded-3xl overflow-hidden">
            {quickViewItem && (
              <div className="p-8">
                <div className="flex justify-between items-start mb-8">
                  <Dialog.Title className="text-3xl font-light">
                    {quickViewItem.name}
                  </Dialog.Title>
                  <Dialog.Close className="w-10 h-10 rounded-full bg-black/60 backdrop-blur-sm border border-amber-600/30 flex items-center justify-center hover:bg-amber-900/30 transition-colors">
                    <X className="w-5 h-5" />
                  </Dialog.Close>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                  {/* Image Gallery */}
                  <div>
                    <Swiper
                      spaceBetween={10}
                      navigation={true}
                      thumbs={{ swiper: thumbsSwiper }}
                      modules={[Navigation, Thumbs]}
                      className="rounded-2xl overflow-hidden mb-4"
                    >
                      {quickViewItem.images.map((img, i) => (
                        <SwiperSlide key={i}>
                          <div className="aspect-square bg-gradient-to-br from-amber-900/20 to-black/50 rounded-2xl" />
                        </SwiperSlide>
                      ))}
                    </Swiper>

                    <Swiper
                      onSwiper={setThumbsSwiper}
                      spaceBetween={10}
                      slidesPerView={4}
                      freeMode={true}
                      watchSlidesProgress={true}
                      modules={[FreeMode, Navigation, Thumbs]}
                      className="rounded-xl"
                    >
                      {quickViewItem.images.map((img, i) => (
                        <SwiperSlide key={i}>
                          <div className="aspect-square bg-gradient-to-br from-zinc-800 to-zinc-900 rounded-xl cursor-pointer" />
                        </SwiperSlide>
                      ))}
                    </Swiper>
                  </div>

                  {/* Details */}
                  <div>
                    <div className="mb-6">
                      <div className="text-amber-400 text-sm mb-2">{quickViewItem.category}</div>
                      <div className="text-4xl font-light mb-4">{quickViewItem.price}</div>
                      <div className="flex items-center space-x-2 mb-4">
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`w-5 h-5 ${i < Math.floor(quickViewItem.rating)
                                ? 'fill-amber-400 text-amber-400'
                                : 'text-zinc-700'
                                }`}
                            />
                          ))}
                        </div>
                        <span className="text-zinc-400">({quickViewItem.reviewCount} reviews)</span>
                      </div>
                      <p className="text-zinc-300 mb-6">{quickViewItem.description}</p>
                    </div>

                    <div className="space-y-4 mb-8">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="border border-zinc-800 rounded-xl p-4">
                          <div className="text-sm text-zinc-400 mb-1">Materials</div>
                          <div>{quickViewItem.materials.join(', ')}</div>
                        </div>
                        <div className="border border-zinc-800 rounded-xl p-4">
                          <div className="text-sm text-zinc-400 mb-1">Dimensions</div>
                          <div>{quickViewItem.dimensions}</div>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center space-x-4">
                      <button className="flex-1 py-4 bg-gradient-to-r from-amber-600 to-amber-800 rounded-xl text-lg font-light tracking-widest hover:shadow-xl hover:shadow-amber-500/20 transition-all">
                        ADD TO INQUIRY
                      </button>
                      <button className="px-6 py-4 border border-amber-600/30 rounded-xl hover:bg-amber-900/20 transition-all">
                        <Heart className="w-6 h-6" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>

      {/* 360 View Modal */}
      <AnimatePresence>
        {show360View && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/90 backdrop-blur-xl"
            onClick={() => setShow360View(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-4xl bg-gradient-to-br from-zinc-900 to-black border border-amber-800/30 rounded-3xl overflow-hidden"
            >
              <button
                onClick={() => setShow360View(false)}
                className="absolute top-6 right-6 z-10 w-10 h-10 rounded-full bg-black/60 backdrop-blur-sm border border-amber-600/30 flex items-center justify-center hover:bg-amber-900/30 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="p-8">
                <h3 className="text-3xl font-light mb-2 text-center">360° Product View</h3>
                <p className="text-zinc-400 text-center mb-8">Drag to rotate • Scroll to zoom</p>

                <div className="relative h-[400px] rounded-2xl overflow-hidden bg-gradient-to-br from-amber-900/10 to-black/50">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <div className="w-64 h-64 mx-auto rounded-full border-2 border-amber-600/30 animate-spin-slow mb-8" />
                      <div className="text-amber-400">Interactive 3D Viewer Loading...</div>
                    </div>
                  </div>
                </div>

                <div className="flex justify-center space-x-4 mt-8">
                  <button className="px-6 py-2 border border-amber-600/30 rounded-full hover:bg-amber-900/20 transition-all">
                    <RotateCw className="w-5 h-5 inline mr-2" />
                    Auto Rotate
                  </button>
                  <button className="px-6 py-2 border border-amber-600/30 rounded-full hover:bg-amber-900/20 transition-all">
                    <Maximize2 className="w-5 h-5 inline mr-2" />
                    Fullscreen
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CollectionsPage;

