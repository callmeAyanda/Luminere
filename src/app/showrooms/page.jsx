// src/app/showrooms/page.js
'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
  MapPin,
  Clock,
  Phone,
  Mail,
  Globe,
  Users,
  Maximize2,
  Camera,
  RotateCw,
  X,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Target,
  ZoomIn,
  Eye,
  Award,
  Shield,
  CheckCircle
} from 'lucide-react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment, Float, ContactShadows, useGLTF } from '@react-three/drei';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import dynamic from 'next/dynamic';

// Dynamically import 3D components to avoid SSR issues
const ARViewer = dynamic(() => import('./components/ARViewer'), {
  ssr: false,
  loading: () => <div className="flex items-center justify-center h-full">
    <div className="w-16 h-16 border-4 border-amber-600/30 border-t-amber-600 rounded-full animate-spin" />
  </div>
});

const ShowroomsPage = () => {
  const router = useRouter();
  const [selectedShowroom, setSelectedShowroom] = useState(0);
  const [arMode, setArMode] = useState(false);
  const [selectedFurniture, setSelectedFurniture] = useState(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [activeTab, setActiveTab] = useState('rooms');
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [bookingData, setBookingData] = useState({
    date: '',
    time: '',
    guests: 1,
    purpose: ''
  });

  const showrooms = [
    {
      id: 1,
      name: 'Manhattan Penthouse',
      location: '432 Park Avenue, NYC',
      hours: 'By Appointment Only',
      phone: '+1 (212) 888-9999',
      email: 'manhattan@lumiere.com',
      features: [
        '360° Central Park Views',
        'Private Elevator Access',
        'Sommelier Service',
        'Personal Art Curator'
      ],
      description: 'Our flagship showroom spanning 12,000 sq ft with panoramic city views and private consultation suites.',
      image: '/api/placeholder/1200/800',
      featuredItems: [1, 2, 3]
    },
    {
      id: 2,
      name: 'Beverly Hills Estate',
      location: 'Rodeo Drive, Los Angeles',
      hours: 'Mon-Sat: 10AM-8PM',
      phone: '+1 (310) 555-7777',
      email: 'beverlyhills@lumiere.com',
      features: [
        'Outdoor Pavilion',
        'Wine Cellar Tasting Room',
        'Celebrity Entrance',
        'Valet Parking'
      ],
      description: 'A Mediterranean-inspired villa with indoor-outdoor living spaces and sunset mountain views.',
      image: '/api/placeholder/1200/800',
      featuredItems: [4, 5, 6]
    },
    {
      id: 3,
      name: 'Knightsbridge Townhouse',
      location: 'Harrods, London',
      hours: 'By Appointment Only',
      phone: '+44 (20) 7123-4567',
      email: 'london@lumiere.com',
      features: [
        'Historical Architecture',
        'Royal Appointment Holder',
        'After-Hours Access',
        'Private Dining Room'
      ],
      description: 'Grade II listed Georgian townhouse with original period features and modern luxury integration.',
      image: '/api/placeholder/1200/800',
      featuredItems: [7, 8, 9]
    },
    {
      id: 4,
      name: 'Dubai Sky Palace',
      location: 'Burj Khalifa, Dubai',
      hours: '24/7 VIP Access',
      phone: '+971 (4) 888-2222',
      email: 'dubai@lumiere.com',
      features: [
        'World\'s Highest Showroom',
        'Helipad Access',
        'Gold Member Lounge',
        'Round-the-clock Concierge'
      ],
      description: 'Situated on the 150th floor with breathtaking desert and ocean views, featuring temperature-controlled galleries.',
      image: '/api/placeholder/1200/800',
      featuredItems: [10, 11, 12]
    }
  ];

  const furnitureItems = [
    {
      id: 1,
      name: 'Celestial Sofa',
      price: '$285,000',
      category: 'Living',
      arModel: '/models/sofa.glb',
      description: 'Italian leather with platinum thread embroidery',
      dimensions: 'L 280cm × W 120cm × H 85cm',
      materials: ['Brushed Gold', 'Cashmere', 'Onyx']
    },
    {
      id: 2,
      name: 'Nebula Dining Table',
      price: '$450,000',
      category: 'Dining',
      arModel: '/models/table.glb',
      description: 'Solid black marble with meteorite inlays',
      dimensions: 'L 400cm × W 150cm × H 75cm',
      materials: ['Marble', 'Titanium', 'Crystal']
    },
    {
      id: 3,
      name: 'Aurora Bed',
      price: '$620,000',
      category: 'Bedroom',
      arModel: '/models/bed.glb',
      description: 'Hand-carved mahogany with silk canopy',
      dimensions: 'L 220cm × W 260cm × H 180cm',
      materials: ['Mahogany', 'Silk', '24k Gold']
    }
  ];

  const features = [
    {
      icon: <Eye className="w-6 h-6" />,
      title: 'AR Preview',
      description: 'Visualize furniture in your space'
    },
    {
      icon: <Target className="w-6 h-6" />,
      title: 'Precision Scanning',
      description: 'Room measurement technology'
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: 'Private Consultations',
      description: 'One-on-one expert guidance'
    },
    {
      icon: <Award className="w-6 h-6" />,
      title: 'Exclusive Collections',
      description: 'Showroom-only pieces'
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: 'Secure Environment',
      description: 'Discrete VIP access'
    },
    {
      icon: <CheckCircle className="w-6 h-6" />,
      title: 'White Glove Service',
      description: 'Full installation included'
    }
  ];

  const handleBookAppointment = () => {
    setShowBookingModal(true);
  };

  const handleZoomIn = () => {
    setZoomLevel(prev => Math.min(prev + 0.25, 3));
  };

  const handleZoomOut = () => {
    setZoomLevel(prev => Math.max(prev - 0.25, 0.5));
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
              <a onClick={() => router.push('/collections')} className="text-sm font-light tracking-widest hover:text-amber-200 transition-colors cursor-pointer">
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
              <a onClick={() => router.push('/showrooms')} className="text-sm font-light tracking-widest text-amber-200 border-b border-amber-200 cursor-pointer">
                SHOWROOMS
              </a>
              <button
                onClick={handleBookAppointment}
                className="px-6 py-2 bg-gradient-to-r from-amber-600 to-amber-800 rounded-full text-sm font-light tracking-widest hover:shadow-2xl hover:shadow-amber-500/20 transition-all"
              >
                BOOK VIEWING
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
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full border border-amber-700/10 animate-pulse" />
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
                <span className="text-sm tracking-[0.3em] text-amber-400">GLOBAL ACCESS</span>
              </div>

              <h1 className="text-7xl md:text-8xl font-light tracking-tight leading-none mb-8">
                <span className="block">IMMERSIVE</span>
                <span className="block text-amber-200">SHOWROOM</span>
                <span className="block">EXPERIENCE</span>
              </h1>

              <p className="text-xl text-zinc-400 font-light mb-12 max-w-2xl mx-auto">
                Step into our world of luxury through augmented reality and exclusive private viewings across the globe
              </p>
            </motion.div>
          </div>
        </section>

        {/* Showrooms Grid */}
        <section className="py-16">
          <div className="container mx-auto px-6">
            <div className="flex items-center justify-between mb-12">
              <h2 className="text-4xl font-light">
                <span className="text-amber-200">GLOBAL</span> SHOWROOMS
              </h2>
              <div className="flex space-x-4">
                <button
                  onClick={() => setActiveTab('rooms')}
                  className={`px-6 py-2 rounded-full text-sm font-light tracking-widest transition-all ${activeTab === 'rooms'
                    ? 'bg-gradient-to-r from-amber-600 to-amber-800'
                    : 'border border-amber-600/30 hover:bg-amber-900/20'
                    }`}
                >
                  SHOWROOMS
                </button>
                <button
                  onClick={() => setActiveTab('ar')}
                  className={`px-6 py-2 rounded-full text-sm font-light tracking-widest transition-all ${activeTab === 'ar'
                    ? 'bg-gradient-to-r from-amber-600 to-amber-800'
                    : 'border border-amber-600/30 hover:bg-amber-900/20'
                    }`}
                >
                  AR EXPERIENCE
                </button>
              </div>
            </div>

            {activeTab === 'rooms' ? (
              <div className="grid md:grid-cols-2 gap-8">
                {showrooms.map((showroom, index) => (
                  <motion.div
                    key={showroom.id}
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className={`group relative overflow-hidden rounded-3xl border transition-all duration-500 ${selectedShowroom === index
                      ? 'border-amber-600 shadow-2xl shadow-amber-900/20'
                      : 'border-zinc-800 hover:border-amber-600/50'
                      }`}
                    onClick={() => setSelectedShowroom(index)}
                  >
                    <div className="aspect-video relative overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/50 to-black" />
                      <div className="absolute inset-0 bg-gradient-to-r from-amber-900/20 to-transparent" />

                      <div className="absolute top-6 left-6 z-10">
                        <div className="inline-flex items-center space-x-2 px-4 py-2 bg-black/60 backdrop-blur-sm rounded-full">
                          <MapPin className="w-4 h-4" />
                          <span className="text-sm tracking-widest">{showroom.location.split(',')[1]?.trim()}</span>
                        </div>
                      </div>

                      <div className="absolute bottom-0 left-0 right-0 p-8 z-10">
                        <h3 className="text-3xl font-light mb-3">{showroom.name}</h3>
                        <p className="text-zinc-400 mb-6">{showroom.description}</p>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-6">
                            <div className="flex items-center space-x-2">
                              <Clock className="w-4 h-4 text-amber-400" />
                              <span className="text-sm">{showroom.hours}</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Phone className="w-4 h-4 text-amber-400" />
                              <span className="text-sm">{showroom.phone}</span>
                            </div>
                          </div>

                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedShowroom(index);
                              setActiveTab('ar');
                            }}
                            className="px-6 py-2 bg-gradient-to-r from-amber-600 to-amber-800 rounded-full text-sm font-light tracking-widest hover:shadow-xl hover:shadow-amber-500/20 transition-all"
                          >
                            VIEW IN AR
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Features List */}
                    <div className="p-6 bg-gradient-to-b from-black/50 to-zinc-900/50">
                      <div className="grid grid-cols-2 gap-3">
                        {showroom.features.map((feature, i) => (
                          <div key={i} className="flex items-center space-x-2">
                            <div className="w-2 h-2 bg-amber-400 rounded-full" />
                            <span className="text-sm text-zinc-300">{feature}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            ) : (
              /* AR Experience Section */
              <div className="relative">
                {/* AR Controls */}
                <div className="absolute top-6 right-6 z-10 flex space-x-3">
                  <button
                    onClick={handleZoomIn}
                    className="w-12 h-12 rounded-full bg-black/60 backdrop-blur-sm border border-amber-600/30 flex items-center justify-center hover:bg-amber-900/30 transition-colors"
                  >
                    <ZoomIn className="w-5 h-5" />
                  </button>
                  <button
                    onClick={handleZoomOut}
                    className="w-12 h-12 rounded-full bg-black/60 backdrop-blur-sm border border-amber-600/30 flex items-center justify-center hover:bg-amber-900/30 transition-colors"
                  >
                    <ZoomIn className="w-5 h-5 rotate-180" />
                  </button>
                  <button
                    onClick={() => setZoomLevel(1)}
                    className="w-12 h-12 rounded-full bg-black/60 backdrop-blur-sm border border-amber-600/30 flex items-center justify-center hover:bg-amber-900/30 transition-colors"
                  >
                    <Target className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => setArMode(!arMode)}
                    className={`w-12 h-12 rounded-full border flex items-center justify-center transition-all ${arMode
                      ? 'bg-gradient-to-r from-amber-600 to-amber-800 border-amber-600'
                      : 'bg-black/60 backdrop-blur-sm border-amber-600/30 hover:bg-amber-900/30'
                      }`}
                  >
                    <Camera className="w-5 h-5" />
                  </button>
                </div>

                {/* AR Viewer */}
                <div className="relative h-[600px] rounded-3xl overflow-hidden border border-amber-600/30 bg-gradient-to-br from-zinc-900 to-black">
                  {arMode ? (
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <div className="text-center mb-8">
                        <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-br from-amber-900/20 to-amber-800/10 border border-amber-800/30 flex items-center justify-center">
                          <Camera className="w-10 h-10 text-amber-400" />
                        </div>
                        <h3 className="text-2xl font-light mb-2">AR Mode Active</h3>
                        <p className="text-zinc-400">Point your camera at a flat surface</p>
                      </div>

                      <div className="grid grid-cols-3 gap-4 max-w-lg mx-auto">
                        {furnitureItems.map((item) => (
                          <button
                            key={item.id}
                            onClick={() => setSelectedFurniture(item)}
                            className={`p-4 rounded-xl border transition-all ${selectedFurniture?.id === item.id
                              ? 'border-amber-600 bg-amber-900/20'
                              : 'border-zinc-800 bg-zinc-900/50 hover:border-amber-600/50'
                              }`}
                          >
                            <div className="text-left">
                              <div className="text-sm font-light mb-1">{item.name}</div>
                              <div className="text-xs text-amber-400">{item.price}</div>
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <ARViewer
                      selectedFurniture={selectedFurniture}
                      zoomLevel={zoomLevel}
                      showroom={showrooms[selectedShowroom]}
                    />
                  )}
                </div>

                {/* Furniture Selector */}
                <div className="mt-6">
                  <h3 className="text-xl font-light mb-4">AVAILABLE FOR PREVIEW</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {furnitureItems.map((item) => (
                      <motion.div
                        key={item.id}
                        whileHover={{ scale: 1.02 }}
                        className={`p-4 rounded-xl border transition-all cursor-pointer ${selectedFurniture?.id === item.id
                          ? 'border-amber-600 bg-amber-900/20'
                          : 'border-zinc-800 bg-zinc-900/50 hover:border-amber-600/50'
                          }`}
                        onClick={() => setSelectedFurniture(item)}
                      >
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <h4 className="text-lg font-light mb-1">{item.name}</h4>
                            <div className="inline-block px-2 py-1 bg-amber-900/30 rounded text-xs">
                              {item.category}
                            </div>
                          </div>
                          <div className="text-amber-400 font-light">{item.price}</div>
                        </div>
                        <p className="text-sm text-zinc-400 mb-3">{item.description}</p>
                        <div className="flex items-center justify-between text-xs text-zinc-500">
                          <span>{item.dimensions}</span>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setArMode(true);
                              setSelectedFurniture(item);
                            }}
                            className="text-amber-400 hover:text-amber-300"
                          >
                            View in AR →
                          </button>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 bg-gradient-to-b from-black/50 to-zinc-950/50">
          <div className="container mx-auto px-6">
            <h2 className="text-4xl font-light text-center mb-16">
              <span className="text-amber-200">SHOWROOM</span> EXPERIENCE
            </h2>

            <div className="grid md:grid-cols-3 lg:grid-cols-6 gap-6">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="text-center group"
                >
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-amber-900/20 to-amber-800/10 border border-amber-800/30 flex items-center justify-center group-hover:shadow-xl group-hover:shadow-amber-500/20 transition-all duration-300"
                  >
                    <div className="text-amber-400">
                      {feature.icon}
                    </div>
                  </motion.div>
                  <h3 className="font-light mb-2">{feature.title}</h3>
                  <p className="text-sm text-zinc-400">{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Booking CTA */}
        <section className="py-20">
          <div className="container mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-zinc-900 to-black border border-amber-800/30 rounded-3xl p-12 shadow-2xl shadow-amber-900/10"
            >
              <div className="max-w-3xl mx-auto text-center">
                <h2 className="text-4xl md:text-5xl font-light mb-6">
                  EXPERIENCE LUXURY IN{' '}
                  <span className="text-amber-200">PERSON</span>
                </h2>
                <p className="text-xl text-zinc-400 mb-10 max-w-2xl mx-auto">
                  Schedule a private viewing at any of our global showrooms. Our concierge team will arrange every detail of your visit.
                </p>

                <div className="grid md:grid-cols-3 gap-8 mb-10">
                  <div className="text-center">
                    <div className="text-3xl font-light text-amber-400 mb-2">24/7</div>
                    <div className="text-sm text-zinc-400">VIP Access</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-light text-amber-400 mb-2">1:1</div>
                    <div className="text-sm text-zinc-400">Consultations</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-light text-amber-400 mb-2">Global</div>
                    <div className="text-sm text-zinc-400">Showrooms</div>
                  </div>
                </div>

                <button
                  onClick={handleBookAppointment}
                  className="px-12 py-4 bg-gradient-to-r from-amber-600 to-amber-800 rounded-full text-lg font-light tracking-widest hover:shadow-2xl hover:shadow-amber-500/30 transition-all duration-300"
                >
                  BOOK PRIVATE VIEWING
                </button>
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      {/* Booking Modal */}
      <AnimatePresence>
        {showBookingModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/80 backdrop-blur-xl"
            onClick={() => setShowBookingModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-2xl bg-gradient-to-br from-zinc-900 to-black border border-amber-800/30 rounded-3xl overflow-hidden"
            >
              <button
                onClick={() => setShowBookingModal(false)}
                className="absolute top-6 right-6 z-10 w-10 h-10 rounded-full bg-black/60 backdrop-blur-sm border border-amber-600/30 flex items-center justify-center hover:bg-amber-900/30 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="p-8">
                <h3 className="text-3xl font-light mb-2">Book Private Viewing</h3>
                <p className="text-zinc-400 mb-8">Select your preferred showroom and time</p>

                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-light tracking-widest mb-2">SELECT SHOWROOM</label>
                    <select className="w-full bg-zinc-900/50 border border-zinc-800 rounded-xl px-6 py-4 focus:outline-none focus:border-amber-600 transition-colors">
                      <option>Manhattan Penthouse - New York</option>
                      <option>Beverly Hills Estate - Los Angeles</option>
                      <option>Knightsbridge Townhouse - London</option>
                      <option>Dubai Sky Palace - Dubai</option>
                    </select>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-light tracking-widest mb-2">DATE</label>
                      <input
                        type="date"
                        className="w-full bg-zinc-900/50 border border-zinc-800 rounded-xl px-6 py-4 focus:outline-none focus:border-amber-600 transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-light tracking-widest mb-2">TIME</label>
                      <select className="w-full bg-zinc-900/50 border border-zinc-800 rounded-xl px-6 py-4 focus:outline-none focus:border-amber-600 transition-colors">
                        <option>10:00 AM</option>
                        <option>11:00 AM</option>
                        <option>12:00 PM</option>
                        <option>2:00 PM</option>
                        <option>4:00 PM</option>
                        <option>6:00 PM</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-light tracking-widest mb-2">GUESTS</label>
                      <select className="w-full bg-zinc-900/50 border border-zinc-800 rounded-xl px-6 py-4 focus:outline-none focus:border-amber-600 transition-colors">
                        <option>1</option>
                        <option>2</option>
                        <option>3</option>
                        <option>4</option>
                        <option>5+</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-light tracking-widest mb-2">PURPOSE</label>
                      <select className="w-full bg-zinc-900/50 border border-zinc-800 rounded-xl px-6 py-4 focus:outline-none focus:border-amber-600 transition-colors">
                        <option>General Viewing</option>
                        <option>Specific Collection</option>
                        <option>Bespoke Consultation</option>
                        <option>Corporate Event</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-light tracking-widest mb-2">SPECIAL REQUESTS</label>
                    <textarea
                      rows="3"
                      placeholder="Any specific requirements or preferences..."
                      className="w-full bg-zinc-900/50 border border-zinc-800 rounded-xl px-6 py-4 focus:outline-none focus:border-amber-600 transition-colors"
                    />
                  </div>

                  <button className="w-full py-4 bg-gradient-to-r from-amber-600 to-amber-800 rounded-xl text-lg font-light tracking-widest hover:shadow-xl hover:shadow-amber-500/20 transition-all">
                    CONFIRM BOOKING
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

export default ShowroomsPage;

