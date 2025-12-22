// src/app/artisans/page.js
'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Award,
  Clock,
  MapPin,
  Users,
  Star,
  Shield,
  Sparkles,
  Heart,
  Share2,
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize2,
  ChevronLeft,
  ChevronRight,
  Instagram,
  Linkedin,
  Mail,
  Camera,
  ToolCase,
  Brush,
  Scissors,
  Gem,
  Feather,
  Zap,
  Filter,
  X,
  BookOpen,
  Calendar,
  MessageCircle,
  ArrowRight,
  Trophy,
  Target,
  CheckCircle
} from 'lucide-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay, EffectCreative } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import dynamic from 'next/dynamic';

// Dynamically import video player
// use the main package entry to avoid module path issues
const ReactPlayer = dynamic(() => import('react-player'), { ssr: false });

const ArtisansPage = () => {
  const router = useRouter();
  const [selectedArtisan, setSelectedArtisan] = useState(null);
  const [activeFilter, setActiveFilter] = useState('all');
  const [videoPlaying, setVideoPlaying] = useState(false);
  const [muted, setMuted] = useState(true);
  const [showVideoModal, setShowVideoModal] = useState(false);
  const [showMasterclassModal, setShowMasterclassModal] = useState(false);
  const [bookmarkArtisans, setBookmarkArtisans] = useState([]);
  const [activeTab, setActiveTab] = useState('gallery');
  const videoRef = useRef(null);

  // Animated icons array with keys
  const animatedIcons = [
    { key: 0, icon: <ToolCase /> },
    { key: 1, icon: <Brush /> },
    { key: 2, icon: <Scissors /> },
    { key: 3, icon: <Gem /> }
  ];

  // Generate random values once on component mount
  const [floatingElements] = useState(() =>
    [...Array(20)].map((_, i) => ({
      id: i,
      randomDuration: 8 + Math.random() * 4,
      left: Math.random() * 100,
      top: Math.random() * 100,
    }))
  );

  const artisans = [
    {
      id: 1,
      name: 'Giovanni Moretti',
      title: 'Master Woodcarver',
      location: 'Florence, Italy',
      experience: '42 years',
      specialty: 'Renaissance Revival',
      description: 'Seventh-generation woodcarver specializing in intricate renaissance motifs. Trained at the Scuola di Arte in Florence.',
      rating: 4.9,
      completedProjects: 187,
      materials: ['Mahogany', 'Walnut', 'Cherry Wood'],
      techniques: ['Hand Carving', 'Marquetry', 'Gilding'],
      video: 'https://www.youtube.com/watch?v=example1',
      gallery: Array(6).fill('/api/placeholder/800/600'),
      certifications: ['Master Artisan Certification', 'UNESCO Heritage', 'Italian Guild of Woodcarvers'],
      story: 'Born into a family of woodcarvers dating back to the 16th century, Giovanni learned his craft from his grandfather. His hands have shaped furniture for royal families and museums worldwide.',
      signature: 'Each piece carries the family crest hidden within the carving.',
      availableFor: ['Bespoke Commissions', 'Restoration Projects', 'Masterclasses'],
      awards: [
        { year: 2023, name: 'International Craftsmanship Award' },
        { year: 2021, name: 'European Heritage Prize' },
        { year: 2019, name: 'Master of Wood Arts' }
      ]
    },
    {
      id: 2,
      name: 'Isabelle Laurent',
      title: 'Textile Artisan',
      location: 'Lyon, France',
      experience: '28 years',
      specialty: 'Silk & Velvet Upholstery',
      description: 'Master of rare textile techniques including passementerie and silk embroidery. Sources materials from historic French mills.',
      rating: 4.8,
      completedProjects: 134,
      materials: ['Silk', 'Velvet', 'Cashmere', 'Linen'],
      techniques: ['Passementerie', 'Embroidery', 'Weaving'],
      video: 'https://www.youtube.com/watch?v=example2',
      gallery: Array(6).fill('/api/placeholder/800/600'),
      certifications: ['Métiers d\'Art Certification', 'French Textile Guild', 'Sustainable Materials'],
      story: 'Isabelle revived the lost art of French passementerie after discovering her great-grandmother\'s textile journals. She now trains the next generation of textile artists.',
      signature: 'Incorporates a single golden thread in every piece for luck.',
      availableFor: ['Custom Upholstery', 'Textile Design', 'Workshops'],
      awards: [
        { year: 2022, name: 'French Arts Medal' },
        { year: 2020, name: 'Textile Innovation Award' },
        { year: 2018, name: 'Sustainable Craft Prize' }
      ]
    },
    {
      id: 3,
      name: 'Hiroshi Tanaka',
      title: 'Metalwork Master',
      location: 'Kyoto, Japan',
      experience: '35 years',
      specialty: 'Titanium & Steel',
      description: 'Combines ancient Japanese metalworking techniques with modern aerospace materials. Apprenticed under a sword-making master.',
      rating: 4.9,
      completedProjects: 92,
      materials: ['Titanium', 'Stainless Steel', 'Bronze', 'Copper'],
      techniques: ['Forging', 'Patination', 'Metal Inlay'],
      video: 'https://www.youtube.com/watch?v=example3',
      gallery: Array(6).fill('/api/placeholder/800/600'),
      certifications: ['Living National Treasure', 'Japanese Craft Association', 'Traditional Metal Arts'],
      story: 'Hiroshi\'s journey began at age 15, apprenticing under a master sword maker. He adapted traditional techniques to create contemporary furniture that lasts for generations.',
      signature: 'Every piece includes a hidden "mei" (artist signature) in Japanese script.',
      availableFor: ['Structural Elements', 'Custom Hardware', 'Collaborations'],
      awards: [
        { year: 2023, name: 'Living National Treasure' },
        { year: 2021, name: 'International Design Excellence' },
        { year: 2019, name: 'Craft Innovation Award' }
      ]
    },
    {
      id: 4,
      name: 'Elena Petrova',
      title: 'Stone & Marble Specialist',
      location: 'St. Petersburg, Russia',
      experience: '25 years',
      specialty: 'Marble Inlay & Sculpture',
      description: 'Master of pietra dura and marble sculpture. Works with rare stones from quarries around the world.',
      rating: 4.7,
      completedProjects: 156,
      materials: ['Carrara Marble', 'Lapis Lazuli', 'Malachite', 'Onyx'],
      techniques: ['Pietra Dura', 'Stone Mosaic', 'Polishing'],
      video: 'https://www.youtube.com/watch?v=example4',
      gallery: Array(6).fill('/api/placeholder/800/600'),
      certifications: ['Russian Academy of Arts', 'Stone Masters Guild', 'Geological Institute'],
      story: 'Elena grew up in the Ural Mountains, surrounded by precious stones. She combines geological knowledge with artistic vision to create stone masterpieces.',
      signature: 'Includes a small piece of Ural Mountain stone in every creation.',
      availableFor: ['Tabletops', 'Sculptures', 'Architectural Elements'],
      awards: [
        { year: 2022, name: 'Stone Masters Award' },
        { year: 2020, name: 'Russian Arts Prize' },
        { year: 2018, name: 'International Stone Design' }
      ]
    },
    {
      id: 5,
      name: 'Kwame Okafor',
      title: 'Organic Materials Expert',
      location: 'Accra, Ghana',
      experience: '20 years',
      specialty: 'Sustainable & Natural Materials',
      description: 'Pioneer in using traditional African techniques with sustainable modern materials. Focuses on community-based production.',
      rating: 4.8,
      completedProjects: 78,
      materials: ['Rattan', 'Bamboo', 'Petrified Wood', 'Natural Fibers'],
      techniques: ['Weaving', 'Steam Bending', 'Natural Dyeing'],
      video: 'https://www.youtube.com/watch?v=example5',
      gallery: Array(6).fill('/api/placeholder/800/600'),
      certifications: ['Fair Trade Certified', 'Sustainable Design', 'African Craft Heritage'],
      story: 'Kwame combines centuries-old West African techniques with contemporary design, creating pieces that tell stories of heritage and sustainability.',
      signature: 'Each piece carries a symbol from Adinkra wisdom.',
      availableFor: ['Sustainable Projects', 'Cultural Collaborations', 'Material Research'],
      awards: [
        { year: 2023, name: 'Sustainable Design Award' },
        { year: 2021, name: 'African Innovation Prize' },
        { year: 2019, name: 'Fair Trade Excellence' }
      ]
    },
    {
      id: 6,
      name: 'Sofia Chen',
      title: 'Modern Techniques Innovator',
      location: 'Shanghai, China',
      experience: '18 years',
      specialty: 'Digital Craft & Traditional Fusion',
      description: 'Merges cutting-edge technology with ancient Chinese craftsmanship. Uses 3D scanning and digital fabrication.',
      rating: 4.9,
      completedProjects: 105,
      materials: ['Resin', 'Carbon Fiber', 'Smart Materials', 'Glass'],
      techniques: ['3D Printing', 'CNC Carving', 'LED Integration'],
      video: 'https://www.youtube.com/watch?v=example6',
      gallery: Array(6).fill('/api/placeholder/800/600'),
      certifications: ['Digital Craft Certification', 'Chinese Arts Academy', 'Technology Innovation'],
      story: 'Sofia bridges the gap between traditional craftsmanship and digital innovation, creating pieces that are both technically advanced and deeply artistic.',
      signature: 'Embeds NFC chips with the story of each piece.',
      availableFor: ['Technology Integration', 'Limited Editions', 'Research Projects'],
      awards: [
        { year: 2023, name: 'Digital Craft Award' },
        { year: 2022, name: 'Asian Innovation Prize' },
        { year: 2020, name: 'Future of Craft' }
      ]
    }
  ];

  const crafts = [
    { id: 'woodworking', name: 'Woodworking', icon: <ToolCase className="w-5 h-5" />, count: 12 },
    { id: 'textiles', name: 'Textiles', icon: <Scissors className="w-5 h-5" />, count: 8 },
    { id: 'metalwork', name: 'Metalwork', icon: <Zap className="w-5 h-5" />, count: 6 },
    { id: 'stone', name: 'Stone & Marble', icon: <Gem className="w-5 h-5" />, count: 7 },
    { id: 'organic', name: 'Organic Materials', icon: <Feather className="w-5 h-5" />, count: 5 },
    { id: 'digital', name: 'Digital Craft', icon: <Brush className="w-5 h-5" />, count: 4 }
  ];

  const toggleBookmark = (artisanId) => {
    setBookmarkArtisans(prev =>
      prev.includes(artisanId)
        ? prev.filter(id => id !== artisanId)
        : [...prev, artisanId]
    );
  };

  const handleVideoPlay = () => {
    setVideoPlaying(!videoPlaying);
  };

  const filteredArtisans = activeFilter === 'all'
    ? artisans
    : artisans.filter(artisan =>
      artisan.materials.some(material =>
        material.toLowerCase().includes(activeFilter) ||
        artisan.techniques.some(tech =>
          tech.toLowerCase().includes(activeFilter)
        )
      )
    );

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
              <a onClick={() => router.push('/collections')} className="text-sm font-light tracking-widest hover:text-amber-200 transition-colors cursor-pointer">
                COLLECTIONS
              </a>
              <a onClick={() => router.push('/bespoke')} className="text-sm font-light tracking-widest hover:text-amber-200 transition-colors cursor-pointer">
                BESPOKE
              </a>
              <a onClick={() => router.push('/artisans')} className="text-sm font-light tracking-widest text-amber-200 border-b border-amber-200 cursor-pointer">
                ARTISANS
              </a>
              <a onClick={() => router.push('/clients')} className="text-sm font-light tracking-widest hover:text-amber-200 transition-colors cursor-pointer">
                CLIENTS
              </a>
              <a onClick={() => router.push('/showrooms')} className="text-sm font-light tracking-widest hover:text-amber-200 transition-colors cursor-pointer">
                SHOWROOMS
              </a>
              <button
                onClick={() => setShowMasterclassModal(true)}
                className="px-6 py-2 bg-gradient-to-r from-amber-600 to-amber-800 rounded-full text-sm font-light tracking-widest hover:shadow-2xl hover:shadow-amber-500/20 transition-all"
              >
                MASTERCLASS
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
            {/* Animated Craft Tools */}
            {[...Array(20)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute"
                animate={{
                  y: [0, -100, 0],
                  rotate: [0, 360, 0],
                }}
                transition={{
                  duration: floatingElements[i].randomDuration,
                  repeat: Infinity,
                  delay: i * 0.3,
                }}
                style={{
                  left: `${floatingElements[i].left}%`,
                  top: `${floatingElements[i].top}%`,
                  opacity: 0.1,
                }}
              >
                {animatedIcons[i % animatedIcons.length].icon}
              </motion.div>
            ))}
          </div>

          <div className="container mx-auto px-6 relative z-10">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              {/* Left Content */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
              >
                <div className="inline-flex items-center space-x-2 mb-6">
                  <Sparkles className="w-5 h-5 text-amber-400" />
                  <span className="text-sm tracking-[0.3em] text-amber-400">MASTERS OF CRAFT</span>
                </div>

                <h1 className="text-7xl md:text-8xl font-light tracking-tight leading-none mb-8">
                  <span className="block">HANDS THAT</span>
                  <span className="block text-amber-200">SHAPE</span>
                  <span className="block">LEGACY</span>
                </h1>

                <p className="text-xl text-zinc-400 font-light mb-12 max-w-xl">
                  Meet the master artisans whose hands transform rare materials into heirlooms.
                  Each piece carries their signature, story, and centuries of tradition.
                </p>

                <div className="flex items-center space-x-6">
                  <div className="text-center">
                    <div className="text-3xl font-light text-amber-400 mb-1">42</div>
                    <div className="text-sm text-zinc-400">Years Average Experience</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-light text-amber-400 mb-1">6</div>
                    <div className="text-sm text-zinc-400">Master Artisans</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-light text-amber-400 mb-1">750+</div>
                    <div className="text-sm text-zinc-400">Masterpieces Created</div>
                  </div>
                </div>
              </motion.div>

              {/* Right Content - Video Hero */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="relative"
              >
                <div className="bg-gradient-to-br from-zinc-900 to-black border border-amber-800/30 rounded-3xl overflow-hidden shadow-2xl shadow-amber-900/10">
                  {/* Video Player */}
                  <div className="relative aspect-video">
                    <div className="absolute inset-0 bg-gradient-to-br from-amber-900/20 to-black/50" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center">
                        <button
                          onClick={() => setShowVideoModal(true)}
                          className="w-20 h-20 rounded-full bg-gradient-to-r from-amber-600 to-amber-800 flex items-center justify-center hover:scale-110 transition-transform group"
                        >
                          <Play className="w-8 h-8 ml-1 group-hover:scale-110 transition-transform" />
                        </button>
                        <div className="mt-6 text-amber-400">Watch Master at Work</div>
                      </div>
                    </div>
                  </div>

                  {/* Video Stats */}
                  <div className="p-8">
                    <div className="grid grid-cols-3 gap-4">
                      <div className="text-center p-4 border border-zinc-800 rounded-xl">
                        <div className="text-sm text-zinc-400 mb-1">Training</div>
                        <div className="text-2xl font-light">10+ years</div>
                      </div>
                      <div className="text-center p-4 border border-zinc-800 rounded-xl">
                        <div className="text-sm text-zinc-400 mb-1">Certifications</div>
                        <div className="text-2xl font-light">24</div>
                      </div>
                      <div className="text-center p-4 border border-zinc-800 rounded-xl">
                        <div className="text-sm text-zinc-400 mb-1">Awards</div>
                        <div className="text-2xl font-light">38</div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Craft Filters */}
        <section className="py-12 bg-gradient-to-b from-black/50 to-transparent">
          <div className="container mx-auto px-6">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 mb-8">
              <h2 className="text-4xl font-light">
                Master <span className="text-amber-200">Crafts</span>
              </h2>

              <div className="flex items-center space-x-4">
                <button
                  onClick={() => setActiveTab('gallery')}
                  className={`px-6 py-2 rounded-full text-sm font-light tracking-widest transition-all ${activeTab === 'gallery'
                    ? 'bg-gradient-to-r from-amber-600 to-amber-800'
                    : 'border border-amber-600/30 hover:bg-amber-900/20'
                    }`}
                >
                  Gallery
                </button>
                <button
                  onClick={() => setActiveTab('stories')}
                  className={`px-6 py-2 rounded-full text-sm font-light tracking-widest transition-all ${activeTab === 'stories'
                    ? 'bg-gradient-to-r from-amber-600 to-amber-800'
                    : 'border border-amber-600/30 hover:bg-amber-900/20'
                    }`}
                >
                  Stories
                </button>
                <button
                  onClick={() => setActiveTab('techniques')}
                  className={`px-6 py-2 rounded-full text-sm font-light tracking-widest transition-all ${activeTab === 'techniques'
                    ? 'bg-gradient-to-r from-amber-600 to-amber-800'
                    : 'border border-amber-600/30 hover:bg-amber-900/20'
                    }`}
                >
                  Techniques
                </button>
              </div>
            </div>

            {/* Craft Categories */}
            <div className="flex overflow-x-auto space-x-4 pb-4">
              <button
                onClick={() => setActiveFilter('all')}
                className={`flex items-center space-x-2 px-6 py-3 rounded-full whitespace-nowrap transition-all ${activeFilter === 'all'
                  ? 'bg-gradient-to-r from-amber-600 to-amber-800'
                  : 'border border-zinc-700 hover:border-amber-600/50'
                  }`}
              >
                <Filter className="w-4 h-4" />
                <span>All Crafts</span>
              </button>

              {crafts.map(craft => (
                <button
                  key={craft.id}
                  onClick={() => setActiveFilter(craft.id)}
                  className={`flex items-center space-x-2 px-6 py-3 rounded-full whitespace-nowrap transition-all ${activeFilter === craft.id
                    ? 'bg-gradient-to-r from-amber-600 to-amber-800'
                    : 'border border-zinc-700 hover:border-amber-600/50'
                    }`}
                >
                  {craft.icon}
                  <span>{craft.name}</span>
                  <span className="text-zinc-400 text-sm">({craft.count})</span>
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Artisans Gallery */}
        <section className="py-12">
          <div className="container mx-auto px-6">
            {activeTab === 'gallery' ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredArtisans.map((artisan, index) => (
                  <motion.div
                    key={artisan.id}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="group relative"
                  >
                    <div className="relative overflow-hidden rounded-3xl border border-zinc-800 bg-gradient-to-b from-zinc-900/50 to-black/50 group-hover:border-amber-600/50 transition-all duration-500">
                      {/* Artisan Image */}
                      <div className="aspect-square relative overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-black/60" />

                        {/* Bookmark Button */}
                        <button
                          onClick={() => toggleBookmark(artisan.id)}
                          className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-black/60 backdrop-blur-sm border border-zinc-700 flex items-center justify-center hover:bg-amber-900/30 transition-all"
                        >
                          <Heart className={`w-5 h-5 ${bookmarkArtisans.includes(artisan.id) ? 'fill-amber-400 text-amber-400' : ''
                            }`} />
                        </button>

                        {/* Artisan Stats */}
                        <div className="absolute bottom-0 left-0 right-0 p-6 z-10">
                          <div className="flex items-center justify-between mb-4">
                            <div>
                              <h3 className="text-2xl font-light mb-1">{artisan.name}</h3>
                              <div className="text-sm text-amber-400">{artisan.title}</div>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Star className="w-5 h-5 fill-amber-400 text-amber-400" />
                              <span className="text-lg font-light">{artisan.rating}</span>
                            </div>
                          </div>

                          <div className="flex items-center space-x-4 text-sm text-zinc-400">
                            <div className="flex items-center space-x-1">
                              <MapPin className="w-4 h-4" />
                              <span>{artisan.location}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Clock className="w-4 h-4" />
                              <span>{artisan.experience}</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Artisan Info */}
                      <div className="p-6">
                        <p className="text-zinc-400 text-sm mb-6 line-clamp-2">{artisan.description}</p>

                        {/* Materials & Techniques */}
                        <div className="space-y-4 mb-6">
                          <div>
                            <div className="text-xs text-zinc-400 mb-2">MATERIALS</div>
                            <div className="flex flex-wrap gap-2">
                              {artisan.materials.slice(0, 3).map((material, i) => (
                                <span
                                  key={i}
                                  className="px-3 py-1 border border-zinc-800 rounded-full text-xs"
                                >
                                  {material}
                                </span>
                              ))}
                              {artisan.materials.length > 3 && (
                                <span className="px-3 py-1 border border-zinc-800 rounded-full text-xs text-zinc-400">
                                  +{artisan.materials.length - 3}
                                </span>
                              )}
                            </div>
                          </div>
                          <div>
                            <div className="text-xs text-zinc-400 mb-2">TECHNIQUES</div>
                            <div className="flex flex-wrap gap-2">
                              {artisan.techniques.slice(0, 2).map((tech, i) => (
                                <span
                                  key={i}
                                  className="px-3 py-1 border border-zinc-800 rounded-full text-xs"
                                >
                                  {tech}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex items-center space-x-3">
                          <button
                            onClick={() => setSelectedArtisan(artisan)}
                            className="flex-1 py-3 bg-gradient-to-r from-amber-600 to-amber-800 rounded-full text-sm font-light tracking-widest hover:shadow-lg hover:shadow-amber-500/20 transition-all"
                          >
                            VIEW PROFILE
                          </button>
                          <button className="w-12 h-12 rounded-full border border-zinc-800 flex items-center justify-center hover:border-amber-600/50 hover:bg-amber-900/20 transition-all">
                            <Share2 className="w-5 h-5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            ) : activeTab === 'stories' ? (
              <div className="space-y-8">
                {artisans.map((artisan, index) => (
                  <motion.div
                    key={artisan.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="group"
                  >
                    <div className="flex flex-col md:flex-row gap-8 p-8 rounded-3xl border border-zinc-800 bg-gradient-to-b from-zinc-900/50 to-black/50 group-hover:border-amber-600/50 transition-all duration-500">
                      <div className="md:w-1/3 aspect-square rounded-2xl overflow-hidden relative">
                        <div className="absolute inset-0 bg-gradient-to-br from-amber-900/20 to-black/50" />
                      </div>

                      <div className="md:w-2/3">
                        <div className="mb-6">
                          <div className="text-sm text-amber-400 mb-2">{artisan.specialty}</div>
                          <h3 className="text-3xl font-light mb-4">{`${artisan.name}'s`} Journey</h3>
                          <p className="text-zinc-400 mb-6">{artisan.story}</p>

                          <div className="flex items-center space-x-6 mb-6">
                            <div className="flex items-center space-x-2">
                              <Award className="w-4 h-4 text-amber-400" />
                              <span className="text-sm">{artisan.awards.length} Awards</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Users className="w-4 h-4 text-amber-400" />
                              <span className="text-sm">{artisan.completedProjects} Projects</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Shield className="w-4 h-4 text-amber-400" />
                              <span className="text-sm">{artisan.certifications.length} Certifications</span>
                            </div>
                          </div>
                        </div>

                        <button
                          onClick={() => setSelectedArtisan(artisan)}
                          className="px-6 py-3 border border-amber-600/30 rounded-full text-sm hover:bg-amber-900/20 transition-all group"
                        >
                          Read Full Story
                          <ArrowRight className="w-4 h-4 inline ml-2 group-hover:translate-x-1 transition-transform" />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="grid md:grid-cols-2 gap-8">
                {artisans.map((artisan, index) => (
                  <motion.div
                    key={artisan.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="bg-gradient-to-br from-zinc-900 to-black border border-amber-800/30 rounded-3xl p-8"
                  >
                    <div className="flex items-center space-x-4 mb-6">
                      <div className="w-16 h-16 rounded-full bg-gradient-to-br from-amber-900/20 to-amber-800/10 border border-amber-800/30 flex items-center justify-center">
                        {artisan.title.includes('Wood') ? <ToolCase className="w-8 h-8 text-amber-400" /> :
                          artisan.title.includes('Textile') ? <Scissors className="w-8 h-8 text-amber-400" /> :
                            artisan.title.includes('Metal') ? <Zap className="w-8 h-8 text-amber-400" /> :
                              artisan.title.includes('Stone') ? <Gem className="w-8 h-8 text-amber-400" /> :
                                <Brush className="w-8 h-8 text-amber-400" />}
                      </div>
                      <div>
                        <h3 className="text-2xl font-light">{artisan.name}</h3>
                        <div className="text-sm text-amber-400">{artisan.specialty}</div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <div className="text-sm text-zinc-400 mb-2">MASTER TECHNIQUES</div>
                        <div className="space-y-2">
                          {artisan.techniques.map((tech, i) => (
                            <div key={i} className="flex items-center justify-between p-3 border border-zinc-800 rounded-lg">
                              <span>{tech}</span>
                              <CheckCircle className="w-4 h-4 text-amber-400" />
                            </div>
                          ))}
                        </div>
                      </div>

                      <div>
                        <div className="text-sm text-zinc-400 mb-2">SIGNATURE ELEMENT</div>
                        <div className="p-4 border border-amber-800/30 rounded-lg bg-amber-900/10">
                          {artisan.signature}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}

            {/* Global Stats */}
            <div className="mt-16 pt-16 border-t border-zinc-800">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                <div className="text-center">
                  <div className="text-5xl font-light text-amber-400 mb-2">750+</div>
                  <div className="text-zinc-400">Masterpieces Created</div>
                </div>
                <div className="text-center">
                  <div className="text-5xl font-light text-amber-400 mb-2">250+</div>
                  <div className="text-zinc-400">Years Combined Experience</div>
                </div>
                <div className="text-center">
                  <div className="text-5xl font-light text-amber-400 mb-2">42</div>
                  <div className="text-zinc-400">International Awards</div>
                </div>
                <div className="text-center">
                  <div className="text-5xl font-light text-amber-400 mb-2">16</div>
                  <div className="text-zinc-400">Generations of Craft</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Masterclass Section */}
        <section className="py-20 bg-gradient-to-b from-black/50 to-zinc-950/50">
          <div className="container mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-zinc-900 to-black border border-amber-800/30 rounded-3xl p-12 shadow-2xl shadow-amber-900/10 overflow-hidden"
            >
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                <div>
                  <div className="inline-flex items-center space-x-2 mb-6">
                    <BookOpen className="w-5 h-5 text-amber-400" />
                    <span className="text-sm tracking-[0.3em] text-amber-400">EXCLUSIVE EXPERIENCE</span>
                  </div>

                  <h2 className="text-4xl md:text-5xl font-light mb-6">
                    Private <span className="text-amber-200">Masterclasses</span>
                  </h2>

                  <p className="text-xl text-zinc-400 mb-8">
                    Learn directly from our master artisans in exclusive private sessions.
                    Experience centuries-old techniques firsthand.
                  </p>

                  <div className="space-y-6 mb-10">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-amber-900/20 to-amber-800/10 border border-amber-800/30 flex items-center justify-center">
                        <Users className="w-6 h-6 text-amber-400" />
                      </div>
                      <div>
                        <div className="font-light">1:1 Sessions</div>
                        <div className="text-sm text-zinc-400">Personal attention from masters</div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-amber-900/20 to-amber-800/10 border border-amber-800/30 flex items-center justify-center">
                        <Calendar className="w-6 h-6 text-amber-400" />
                      </div>
                      <div>
                        <div className="font-light">Flexible Scheduling</div>
                        <div className="text-sm text-zinc-400">At your convenience worldwide</div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-amber-900/20 to-amber-800/10 border border-amber-800/30 flex items-center justify-center">
                        <Trophy className="w-6 h-6 text-amber-400" />
                      </div>
                      <div>
                        <div className="font-light">Certificate of Completion</div>
                        <div className="text-sm text-zinc-400">Signed by the master artisan</div>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => setShowMasterclassModal(true)}
                    className="px-8 py-4 bg-gradient-to-r from-amber-600 to-amber-800 rounded-full text-lg font-light tracking-widest hover:shadow-2xl hover:shadow-amber-500/30 transition-all duration-300"
                  >
                    INQUIRE ABOUT MASTERCLASSES
                  </button>
                </div>

                {/* Masterclass Gallery */}
                <div className="relative">
                  <Swiper
                    modules={[Navigation, Pagination, EffectCreative]}
                    spaceBetween={20}
                    slidesPerView={1}
                    navigation
                    pagination={{ clickable: true }}
                    effect="creative"
                    creativeEffect={{
                      prev: {
                        translate: [0, 0, -400],
                      },
                      next: {
                        translate: ['100%', 0, 0],
                      },
                    }}
                    className="rounded-2xl overflow-hidden"
                  >
                    {[1, 2, 3].map((slide) => (
                      <SwiperSlide key={slide}>
                        <div className="aspect-video rounded-2xl overflow-hidden relative">
                          <div className="absolute inset-0 bg-gradient-to-br from-amber-900/20 to-black/50" />
                          <div className="absolute bottom-0 left-0 right-0 p-8">
                            <div className="text-sm text-amber-400 mb-2">Masterclass #{slide}</div>
                            <div className="text-2xl font-light">Woodcarving with Giovanni</div>
                          </div>
                        </div>
                      </SwiperSlide>
                    ))}
                  </Swiper>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      {/* Artisan Detail Modal */}
      <AnimatePresence>
        {selectedArtisan && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/80 backdrop-blur-xl"
            onClick={() => setSelectedArtisan(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-6xl h-[90vh] overflow-y-auto bg-gradient-to-br from-zinc-900 to-black border border-amber-800/30 rounded-3xl"
            >
              <button
                onClick={() => setSelectedArtisan(null)}
                className="absolute top-6 right-6 z-10 w-10 h-10 rounded-full bg-black/60 backdrop-blur-sm border border-amber-600/30 flex items-center justify-center hover:bg-amber-900/30 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              {selectedArtisan && (
                <div className="p-8">
                  {/* Artisan Header */}
                  <div className="grid md:grid-cols-3 gap-8 mb-12">
                    <div className="md:col-span-2">
                      <div className="flex items-center space-x-4 mb-6">
                        <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-amber-900/20 to-black/50 border border-amber-800/30" />
                        <div>
                          <h3 className="text-4xl font-light mb-2">{selectedArtisan.name}</h3>
                          <div className="text-xl text-amber-400 mb-2">{selectedArtisan.title}</div>
                          <div className="flex items-center space-x-4 text-sm text-zinc-400">
                            <div className="flex items-center space-x-1">
                              <MapPin className="w-4 h-4" />
                              <span>{selectedArtisan.location}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Clock className="w-4 h-4" />
                              <span>{selectedArtisan.experience} experience</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      <p className="text-zinc-300 text-lg mb-8">{selectedArtisan.description}</p>

                      <div className="flex items-center space-x-6">
                        <button className="px-6 py-3 bg-gradient-to-r from-amber-600 to-amber-800 rounded-full text-sm font-light tracking-widest hover:shadow-lg hover:shadow-amber-500/20 transition-all">
                          REQUEST COLLABORATION
                        </button>
                        <button className="px-6 py-3 border border-amber-600/30 rounded-full text-sm hover:bg-amber-900/20 transition-all">
                          <MessageCircle className="w-4 h-4 inline mr-2" />
                          Send Message
                        </button>
                      </div>
                    </div>

                    <div className="space-y-6">
                      <div className="p-6 border border-zinc-800 rounded-2xl">
                        <div className="text-sm text-zinc-400 mb-4">STATS</div>
                        <div className="space-y-4">
                          <div className="flex justify-between">
                            <span className="text-zinc-400">Rating</span>
                            <div className="flex items-center space-x-2">
                              <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                              <span className="font-light">{selectedArtisan.rating}/5.0</span>
                            </div>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-zinc-400">Projects</span>
                            <span className="font-light">{selectedArtisan.completedProjects}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-zinc-400">Certifications</span>
                            <span className="font-light">{selectedArtisan.certifications.length}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-zinc-400">Awards</span>
                            <span className="font-light">{selectedArtisan.awards.length}</span>
                          </div>
                        </div>
                      </div>

                      <div className="p-6 border border-zinc-800 rounded-2xl">
                        <div className="text-sm text-zinc-400 mb-4">SOCIAL</div>
                        <div className="flex space-x-4">
                          <button className="p-3 border border-zinc-800 rounded-lg hover:border-amber-600/50 hover:bg-amber-900/20 transition-all">
                            <Instagram className="w-5 h-5" />
                          </button>
                          <button className="p-3 border border-zinc-800 rounded-lg hover:border-amber-600/50 hover:bg-amber-900/20 transition-all">
                            <Linkedin className="w-5 h-5" />
                          </button>
                          <button className="p-3 border border-zinc-800 rounded-lg hover:border-amber-600/50 hover:bg-amber-900/20 transition-all">
                            <Mail className="w-5 h-5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Gallery */}
                  <div className="mb-12">
                    <h4 className="text-2xl font-light mb-6">{`${selectedArtisan.name}'s`} Gallery</h4>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      {selectedArtisan.gallery.slice(0, 6).map((img, i) => (
                        <div key={i} className="aspect-square rounded-xl overflow-hidden bg-gradient-to-br from-amber-900/20 to-black/50 border border-zinc-800" />
                      ))}
                    </div>
                  </div>

                  {/* Details Grid */}
                  <div className="grid md:grid-cols-3 gap-8">
                    <div className="space-y-6">
                      <h5 className="text-xl font-light">Techniques</h5>
                      <div className="space-y-3">
                        {selectedArtisan.techniques.map((tech, i) => (
                          <div key={i} className="flex items-center space-x-2">
                            <CheckCircle className="w-4 h-4 text-amber-400" />
                            <span>{tech}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-6">
                      <h5 className="text-xl font-light">Awards</h5>
                      <div className="space-y-3">
                        {selectedArtisan.awards.map((award, i) => (
                          <div key={i} className="p-3 border border-zinc-800 rounded-lg">
                            <div className="text-sm text-amber-400">{award.year}</div>
                            <div>{award.name}</div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-6">
                      <h5 className="text-xl font-light">Available For</h5>
                      <div className="space-y-3">
                        {selectedArtisan.availableFor.map((item, i) => (
                          <div key={i} className="p-3 border border-zinc-800 rounded-lg">
                            {item}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Masterclass Modal */}
      <AnimatePresence>
        {showMasterclassModal && (
          <MasterclassModal
            isOpen={showMasterclassModal}
            onClose={() => setShowMasterclassModal(false)}
            artisans={artisans}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

// Masterclass Modal Component
function MasterclassModal({ isOpen, onClose, artisans }) {
  const [selectedArtisan, setSelectedArtisan] = useState(artisans[0]);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    artisan: artisans[0].id,
    duration: '3',
    location: 'in-person',
    date: '',
    experience: 'beginner'
  });

  const durations = [
    { value: '1', label: '1 Day Intensive' },
    { value: '3', label: '3 Days Workshop' },
    { value: '5', label: '5 Days Masterclass' },
    { value: '7', label: '1 Week Immersion' }
  ];

  const experienceLevels = [
    { value: 'beginner', label: 'Beginner' },
    { value: 'intermediate', label: 'Intermediate' },
    { value: 'advanced', label: 'Advanced' },
    { value: 'professional', label: 'Professional' }
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/80 backdrop-blur-xl"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-4xl bg-gradient-to-br from-zinc-900 to-black border border-amber-800/30 rounded-3xl overflow-hidden"
      >
        <button
          onClick={onClose}
          className="absolute top-6 right-6 z-10 w-10 h-10 rounded-full bg-black/60 backdrop-blur-sm border border-amber-600/30 flex items-center justify-center hover:bg-amber-900/30 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="p-8">
          <h3 className="text-3xl font-light mb-2">Private Masterclass Inquiry</h3>
          <p className="text-zinc-400 mb-8">Learn directly from our master artisans</p>

          <div className="space-y-8">
            {/* Artisan Selection */}
            <div>
              <label className="block text-sm font-light tracking-widest mb-4">SELECT MASTER ARTISAN</label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {artisans.map(artisan => (
                  <button
                    key={artisan.id}
                    onClick={() => {
                      setSelectedArtisan(artisan);
                      setFormData(prev => ({ ...prev, artisan: artisan.id }));
                    }}
                    className={`p-4 rounded-xl border text-left transition-all ${selectedArtisan.id === artisan.id
                      ? 'border-amber-600 bg-amber-900/20'
                      : 'border-zinc-800 hover:border-amber-600/30'
                      }`}
                  >
                    <div className="font-light mb-1">{artisan.name}</div>
                    <div className="text-sm text-zinc-400">{artisan.specialty}</div>
                  </button>
                ))}
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-light tracking-widest mb-2">FULL NAME</label>
                <input
                  type="text"
                  className="w-full bg-zinc-900/50 border border-zinc-800 rounded-xl px-6 py-4 focus:outline-none focus:border-amber-600 transition-colors"
                  placeholder="Enter your name"
                />
              </div>
              <div>
                <label className="block text-sm font-light tracking-widest mb-2">EMAIL ADDRESS</label>
                <input
                  type="email"
                  className="w-full bg-zinc-900/50 border border-zinc-800 rounded-xl px-6 py-4 focus:outline-none focus:border-amber-600 transition-colors"
                  placeholder="Enter your email"
                />
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-light tracking-widest mb-2">DURATION</label>
                <select className="w-full bg-zinc-900/50 border border-zinc-800 rounded-xl px-6 py-4 focus:outline-none focus:border-amber-600 transition-colors">
                  {durations.map(duration => (
                    <option key={duration.value} value={duration.value}>{duration.label}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-light tracking-widest mb-2">EXPERIENCE LEVEL</label>
                <select className="w-full bg-zinc-900/50 border border-zinc-800 rounded-xl px-6 py-4 focus:outline-none focus:border-amber-600 transition-colors">
                  {experienceLevels.map(level => (
                    <option key={level.value} value={level.value}>{level.label}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-light tracking-widest mb-2">PREFERRED DATE</label>
                <input
                  type="date"
                  className="w-full bg-zinc-900/50 border border-zinc-800 rounded-xl px-6 py-4 focus:outline-none focus:border-amber-600 transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-light tracking-widest mb-2">SPECIAL REQUESTS</label>
              <textarea
                rows="3"
                className="w-full bg-zinc-900/50 border border-zinc-800 rounded-xl px-6 py-4 focus:outline-none focus:border-amber-600 transition-colors"
                placeholder="Any specific techniques or areas of focus..."
              />
            </div>

            <button className="w-full py-4 bg-gradient-to-r from-amber-600 to-amber-800 rounded-xl text-lg font-light tracking-widest hover:shadow-xl hover:shadow-amber-500/20 transition-all">
              SUBMIT INQUIRY
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default ArtisansPage;

