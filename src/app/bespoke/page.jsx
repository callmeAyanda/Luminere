// src/app/bespoke/page.js
'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Palette,
  Ruler,
  Layers,
  Sparkles,
  Clock,
  Award,
  Users,
  CheckCircle,
  ArrowRight,
  ChevronDown,
  ZoomIn,
  RotateCw,
  Download,
  Share2,
  Save,
  Printer,
  Eye,
  Grid,
  Sliders,
  Droplets,
  Gem,
  Scissors,
  Brush,
  Settings,
  RefreshCw,
  Star,
  Shield,
  Truck,
  MessageCircle,
  X
} from 'lucide-react';
import { HexColorPicker } from 'react-colorful';
import * as Select from '@radix-ui/react-select';
import * as Slider from '@radix-ui/react-slider';
import * as Tabs from '@radix-ui/react-tabs';
import dynamic from 'next/dynamic';

// Dynamically import fabric to avoid SSR
const DesignStudio = dynamic(() => import('./components/DesignStudio'), {
  ssr: false,
  loading: () => <div className="flex items-center justify-center h-full">
    <div className="w-16 h-16 border-4 border-amber-600/30 border-t-amber-600 rounded-full animate-spin" />
  </div>
});

const BespokePage = () => {
  const router = useRouter();
  const [activeStep, setActiveStep] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState('sofa');
  const [customization, setCustomization] = useState({
    color: '#B88B4A',
    material: 'italian-leather',
    dimensions: { width: 220, depth: 95, height: 85 },
    features: ['adjustable-headrest', 'storage-compartment'],
    upholstery: 'premium-leather',
    finish: 'matte',
    stitching: 'double-stitch',
    legs: 'brass'
  });
  const [showMaterialPreview, setShowMaterialPreview] = useState(false);
  const [selectedMaterial, setSelectedMaterial] = useState(null);
  const [designProgress, setDesignProgress] = useState(30);
  const [show3DPreview, setShow3DPreview] = useState(false);
  const [savedDesigns, setSavedDesigns] = useState([]);
  const [activeTab, setActiveTab] = useState('design');
  const [showConsultationModal, setShowConsultationModal] = useState(false);
  const [consultationData, setConsultationData] = useState({
    timeline: '3-6 months',
    budget: '$500,000+',
    usage: 'primary-residence'
  });

  const categories = [
    { id: 'sofa', name: 'Sofa', icon: '🛋️', description: 'Custom luxury seating' },
    { id: 'bed', name: 'Bed', icon: '🛏️', description: 'Masterpiece sleeping systems' },
    { id: 'dining-table', name: 'Dining Table', icon: '🍽️', description: 'Statement dining pieces' },
    { id: 'cabinet', name: 'Cabinet', icon: '🗄️', description: 'Artisan storage solutions' },
    { id: 'desk', name: 'Desk', icon: '💼', description: 'Executive office furniture' },
    { id: 'lighting', name: 'Lighting', icon: '💡', description: 'Custom illumination' }
  ];

  const materials = [
    {
      id: 'italian-leather',
      name: 'Italian Full-Grain Leather',
      type: 'Leather',
      description: 'Hand-selected hides from Tuscany, vegetable-tanned',
      price: '+$85,000',
      colors: ['#8B4513', '#A0522D', '#654321'],
      texture: '/textures/leather.jpg',
      properties: ['Ages beautifully', 'Natural markings', 'Breathable']
    },
    {
      id: 'cashmere-wool',
      name: 'Mongolian Cashmere',
      type: 'Fabric',
      description: 'Grade A cashmere from Inner Mongolia',
      price: '+$120,000',
      colors: ['#F5F5DC', '#FAEBD7', '#DEB887'],
      texture: '/textures/cashmere.jpg',
      properties: ['18-micron fibers', 'Silk-like feel', 'Temperature regulating']
    },
    {
      id: 'carrara-marble',
      name: 'Carrara Marble',
      type: 'Stone',
      description: 'Premium statuario marble from Italy',
      price: '+$250,000',
      colors: ['#FFFFFF', '#F0F0F0', '#E0E0E0'],
      texture: '/textures/marble.jpg',
      properties: ['Unique veining', 'Cold to touch', 'Timeless elegance']
    },
    {
      id: 'mahogany',
      name: 'Honduras Mahogany',
      type: 'Wood',
      description: 'Century-old mahogany, air-dried for 5 years',
      price: '+$95,000',
      colors: ['#8B4513', '#A0522D', '#654321'],
      texture: '/textures/mahogany.jpg',
      properties: ['Dense grain', 'Natural oils', 'Sustainably sourced']
    },
    {
      id: 'titanium',
      name: 'Aerospace Titanium',
      type: 'Metal',
      description: 'Grade 5 titanium with PVD coating',
      price: '+$180,000',
      colors: ['#C0C0C0', '#A9A9A9', '#808080'],
      texture: '/textures/titanium.jpg',
      properties: ['Corrosion resistant', 'Lightweight', 'Strength-to-weight ratio']
    },
    {
      id: 'crystal',
      name: 'Swarovski Crystal',
      type: 'Crystal',
      description: 'Optically pure lead crystal',
      price: '+$350,000',
      colors: ['#FFFFFF', '#F0F8FF', '#E6E6FA'],
      texture: '/textures/crystal.jpg',
      properties: ['99.9% clarity', 'Light refraction', 'Hand-cut facets']
    }
  ];

  const features = [
    { id: 'adjustable-headrest', name: 'Adjustable Headrest', icon: '↕️', category: 'comfort' },
    { id: 'storage-compartment', name: 'Hidden Storage', icon: '📦', category: 'function' },
    { id: 'massage-system', name: 'Integrated Massage', icon: '💆', category: 'luxury' },
    { id: 'heated-seating', name: 'Heated Seating', icon: '🔥', category: 'comfort' },
    { id: 'led-lighting', name: 'Ambient LED', icon: '💡', category: 'tech' },
    { id: 'wireless-charging', name: 'Wireless Charging', icon: '🔋', category: 'tech' },
    { id: 'builtin-speakers', name: 'Built-in Speakers', icon: '🔊', category: 'tech' },
    { id: 'climate-control', name: 'Climate Control', icon: '❄️', category: 'comfort' }
  ];

  const designProcess = [
    {
      step: 1,
      title: 'Initial Consultation',
      description: 'Meet with our master artisans to discuss your vision',
      duration: '1-2 weeks',
      icon: <MessageCircle className="w-8 h-8" />
    },
    {
      step: 2,
      title: 'Concept Design',
      description: 'Create 3D renderings and material selections',
      duration: '2-3 weeks',
      icon: <Brush className="w-8 h-8" />
    },
    {
      step: 3,
      title: 'Material Selection',
      description: 'Choose from exclusive materials and finishes',
      duration: '1 week',
      icon: <Gem className="w-8 h-8" />
    },
    {
      step: 4,
      title: 'Artisan Crafting',
      description: 'Handcrafting by master artisans',
      duration: '3-6 months',
      icon: <Scissors className="w-8 h-8" />
    },
    {
      step: 5,
      title: 'Quality Assurance',
      description: 'Rigorous quality checks and finishing',
      duration: '2 weeks',
      icon: <CheckCircle className="w-8 h-8" />
    },
    {
      step: 6,
      title: 'White Glove Delivery',
      description: 'Global delivery and installation',
      duration: '1-4 weeks',
      icon: <Truck className="w-8 h-8" />
    }
  ];

  const handleCustomizationChange = (key, value) => {
    setCustomization(prev => ({
      ...prev,
      [key]: value
    }));
    // Update design progress
    const progress = Object.keys(customization).length * 10;
    setDesignProgress(Math.min(progress + 10, 100));
  };

  const handleSaveDesign = () => {
    const newDesign = {
      id: Date.now(),
      name: `Design ${savedDesigns.length + 1}`,
      category: selectedCategory,
      customization: { ...customization },
      timestamp: new Date().toISOString(),
      thumbnail: '/api/placeholder/400/300'
    };
    setSavedDesigns(prev => [newDesign, ...prev]);
  };

  const handleMaterialSelect = (material) => {
    setSelectedMaterial(material);
    setShowMaterialPreview(true);
    handleCustomizationChange('material', material.id);
  };

  const calculatePrice = () => {
    let basePrice = 250000; // Starting price for bespoke sofa
    // Add material premium
    const material = materials.find(m => m.id === customization.material);
    if (material) {
      const materialPremium = parseInt(material.price.replace(/[^0-9]/g, '')) * 1000;
      basePrice += materialPremium;
    }
    // Add feature premiums
    const featureCount = customization.features.length;
    basePrice += featureCount * 25000;
    // Size multiplier
    const sizeMultiplier = (customization.dimensions.width * customization.dimensions.depth) / 20000;
    basePrice *= (1 + sizeMultiplier);
    return `$${Math.round(basePrice / 1000)}k - $${Math.round(basePrice / 1000) + 500}k`;
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
              <a onClick={() => router.push('/bespoke')} className="text-sm font-light tracking-widest text-amber-200 border-b border-amber-200 cursor-pointer">
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
              <button
                onClick={handleSaveDesign}
                className="px-6 py-2 bg-gradient-to-r from-amber-600 to-amber-800 rounded-full text-sm font-light tracking-widest hover:shadow-2xl hover:shadow-amber-500/20 transition-all"
              >
                SAVE DESIGN
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
            {/* Animated pattern */}
            <svg className="absolute inset-0 w-full h-full opacity-5">
              <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="1" />
              </pattern>
              <rect width="100%" height="100%" fill="url(#grid)" />
            </svg>
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
                  <span className="text-sm tracking-[0.3em] text-amber-400">YOUR VISION, CRAFTED</span>
                </div>

                <h1 className="text-7xl md:text-8xl font-light tracking-tight leading-none mb-8">
                  <span className="block">DREAM IT.</span>
                  <span className="block text-amber-200">DESIGN IT.</span>
                  <span className="block">OWN IT.</span>
                </h1>

                <p className="text-xl text-zinc-400 font-light mb-12 max-w-xl">
                  Collaborate with master artisans to create one-of-a-kind pieces that reflect your unique taste and lifestyle.
                  Every detail is customized to your exact specifications.
                </p>

                <div className="flex items-center space-x-6">
                  <div className="flex items-center space-x-2">
                    <Shield className="w-5 h-5 text-amber-400" />
                    <span className="text-sm">Lifetime Warranty</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Award className="w-5 h-5 text-amber-400" />
                    <span className="text-sm">Master Artisans</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Users className="w-5 h-5 text-amber-400" />
                    <span className="text-sm">1:1 Design Service</span>
                  </div>
                </div>
              </motion.div>

              {/* Right Content - Design Preview */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="relative"
              >
                <div className="bg-gradient-to-br from-zinc-900 to-black border border-amber-800/30 rounded-3xl p-8 shadow-2xl shadow-amber-900/10">
                  <div className="flex items-center justify-between mb-8">
                    <div>
                      <h3 className="text-2xl font-light mb-2">Design Preview</h3>
                      <p className="text-zinc-400 text-sm">Real-time customization</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => setShow3DPreview(true)}
                        className="px-4 py-2 border border-amber-600/30 rounded-full text-sm hover:bg-amber-900/20 transition-all"
                      >
                        3D View
                      </button>
                      <button className="px-4 py-2 border border-amber-600/30 rounded-full text-sm hover:bg-amber-900/20 transition-all">
                        Share
                      </button>
                    </div>
                  </div>

                  {/* Preview Area */}
                  <div className="relative h-[400px] rounded-2xl overflow-hidden mb-6">
                    <div className="absolute inset-0 bg-gradient-to-br from-amber-900/10 to-black/50" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      {/* Design visualization */}
                      <div className="relative">
                        <div
                          className="w-64 h-48 rounded-2xl transition-all duration-300"
                          style={{ backgroundColor: customization.color }}
                        />
                        {/* Material texture overlay */}
                        <div className="absolute inset-0 rounded-2xl opacity-30 bg-[url('/textures/leather.jpg')] bg-cover" />
                        {/* Details */}
                        <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                          <div className="w-12 h-2 rounded-full bg-amber-400" />
                          <div className="w-8 h-2 rounded-full bg-amber-600" />
                          <div className="w-12 h-2 rounded-full bg-amber-400" />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Design Stats */}
                  <div className="grid grid-cols-3 gap-4">
                    <div className="text-center p-4 border border-zinc-800 rounded-xl">
                      <div className="text-sm text-zinc-400 mb-1">Price Estimate</div>
                      <div className="text-2xl font-light text-amber-400">{calculatePrice()}</div>
                    </div>
                    <div className="text-center p-4 border border-zinc-800 rounded-xl">
                      <div className="text-sm text-zinc-400 mb-1">Timeline</div>
                      <div className="text-2xl font-light">4-8 months</div>
                    </div>
                    <div className="text-center p-4 border border-zinc-800 rounded-xl">
                      <div className="text-sm text-zinc-400 mb-1">Design Progress</div>
                      <div className="text-2xl font-light">{designProgress}%</div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Design Process */}
        <section className="py-20">
          <div className="container mx-auto px-6">
            <h2 className="text-4xl font-light text-center mb-16">
              The <span className="text-amber-200">Bespoke Process</span>
            </h2>

            <div className="relative">
              {/* Timeline Line */}
              <div className="absolute left-0 right-0 top-8 h-0.5 bg-gradient-to-r from-transparent via-amber-600/30 to-transparent" />

              <div className="grid md:grid-cols-2 lg:grid-cols-6 gap-8">
                {designProcess.map((step, index) => (
                  <motion.div
                    key={step.step}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="relative text-center"
                  >
                    {/* Step Circle */}
                    <div className={`w-16 h-16 rounded-full mx-auto mb-6 flex items-center justify-center ${activeStep >= step.step
                        ? 'bg-gradient-to-br from-amber-600 to-amber-800'
                        : 'bg-zinc-800 border border-zinc-700'
                      }`}>
                      <div className={`${activeStep >= step.step ? 'text-white' : 'text-zinc-400'}`}>
                        {step.icon}
                      </div>
                    </div>

                    <h3 className="font-light text-xl mb-3">{step.title}</h3>
                    <p className="text-sm text-zinc-400 mb-2">{step.description}</p>
                    <div className="text-xs text-amber-400">{step.duration}</div>

                    {/* Progress indicator */}
                    {step.step > 1 && (
                      <div className="hidden lg:block absolute top-8 -left-8 w-16 h-0.5 bg-gradient-to-r from-transparent to-amber-600/30" />
                    )}
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Design Studio */}
        <section className="py-20 bg-gradient-to-b from-black/50 to-zinc-950/50">
          <div className="container mx-auto px-6">
            <div className="flex items-center justify-between mb-12">
              <h2 className="text-4xl font-light">
                Design <span className="text-amber-200">Studio</span>
              </h2>

              <Tabs.Root value={activeTab} onValueChange={setActiveTab} className="w-auto">
                <Tabs.List className="flex space-x-2 bg-zinc-900/50 rounded-full p-1 border border-zinc-800">
                  <Tabs.Trigger
                    value="design"
                    className={`px-6 py-2 rounded-full text-sm font-light tracking-widest transition-all ${activeTab === 'design' ? 'bg-gradient-to-r from-amber-600 to-amber-800' : ''
                      }`}
                  >
                    Design
                  </Tabs.Trigger>
                  <Tabs.Trigger
                    value="materials"
                    className={`px-6 py-2 rounded-full text-sm font-light tracking-widest transition-all ${activeTab === 'materials' ? 'bg-gradient-to-r from-amber-600 to-amber-800' : ''
                      }`}
                  >
                    Materials
                  </Tabs.Trigger>
                  <Tabs.Trigger
                    value="features"
                    className={`px-6 py-2 rounded-full text-sm font-light tracking-widest transition-all ${activeTab === 'features' ? 'bg-gradient-to-r from-amber-600 to-amber-800' : ''
                      }`}
                  >
                    Features
                  </Tabs.Trigger>
                </Tabs.List>
              </Tabs.Root>
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
              {/* Category Selector */}
              <div className="lg:col-span-1">
                <div className="bg-gradient-to-br from-zinc-900 to-black border border-amber-800/30 rounded-3xl p-6 sticky top-32">
                  <h3 className="text-xl font-light mb-6">Select Category</h3>
                  <div className="grid grid-cols-2 gap-4">
                    {categories.map(category => (
                      <button
                        key={category.id}
                        onClick={() => setSelectedCategory(category.id)}
                        className={`p-4 rounded-xl border transition-all ${selectedCategory === category.id
                            ? 'border-amber-600 bg-amber-900/20'
                            : 'border-zinc-800 hover:border-amber-600/30'
                          }`}
                      >
                        <div className="text-2xl mb-2">{category.icon}</div>
                        <div className="text-sm font-light">{category.name}</div>
                        <div className="text-xs text-zinc-400">{category.description}</div>
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Customization Panel */}
              <div className="lg:col-span-2">
                <div className="bg-gradient-to-br from-zinc-900 to-black border border-amber-800/30 rounded-3xl overflow-hidden">
                  <DesignStudio
                    activeTab={activeTab}
                    customization={customization}
                    onCustomizationChange={handleCustomizationChange}
                    materials={materials}
                    features={features}
                    onMaterialSelect={handleMaterialSelect}
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Saved Designs */}
        {savedDesigns.length > 0 && (
          <section className="py-20">
            <div className="container mx-auto px-6">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-4xl font-light">
                  Your <span className="text-amber-200">Designs</span>
                </h2>
                <button className="px-6 py-2 border border-amber-600/30 rounded-full hover:bg-amber-900/20 transition-all">
                  View All
                </button>
              </div>

              <div className="grid md:grid-cols-3 gap-6">
                {savedDesigns.slice(0, 3).map(design => (
                  <motion.div
                    key={design.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="bg-gradient-to-br from-zinc-900 to-black border border-amber-800/30 rounded-2xl overflow-hidden group"
                  >
                    <div className="aspect-video relative">
                      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/60" />
                      <div className="absolute bottom-4 left-4">
                        <div className="text-sm text-amber-400">Saved Design</div>
                        <div className="text-lg font-light">{design.name}</div>
                      </div>
                    </div>
                    <div className="p-4">
                      <div className="flex items-center justify-between mb-4">
                        <div className="text-sm text-zinc-400">
                          {new Date(design.timestamp).toLocaleDateString()}
                        </div>
                        <div className="flex items-center space-x-2">
                          <button className="p-2 hover:bg-zinc-800 rounded-lg">
                            <Share2 className="w-4 h-4" />
                          </button>
                          <button className="p-2 hover:bg-zinc-800 rounded-lg">
                            <Download className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                      <button className="w-full py-2 bg-gradient-to-r from-amber-600 to-amber-800 rounded-lg text-sm font-light tracking-widest hover:shadow-lg hover:shadow-amber-500/20 transition-all">
                        CONTINUE DESIGN
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Consultation CTA */}
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
                  Ready to Create Your <span className="text-amber-200">Masterpiece?</span>
                </h2>
                <p className="text-xl text-zinc-400 mb-10 max-w-2xl mx-auto">
                  Schedule a consultation with our lead artisans to begin your bespoke journey
                </p>

                <div className="grid md:grid-cols-3 gap-8 mb-10">
                  <div className="text-center">
                    <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-amber-900/20 to-amber-800/10 border border-amber-800/30 flex items-center justify-center">
                      <Users className="w-8 h-8 text-amber-400" />
                    </div>
                    <div className="font-light mb-2">1:1 Design Session</div>
                    <div className="text-sm text-zinc-400">With master artisans</div>
                  </div>
                  <div className="text-center">
                    <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-amber-900/20 to-amber-800/10 border border-amber-800/30 flex items-center justify-center">
                      <Clock className="w-8 h-8 text-amber-400" />
                    </div>
                    <div className="font-light mb-2">Flexible Timeline</div>
                    <div className="text-sm text-zinc-400">3-12 month production</div>
                  </div>
                  <div className="text-center">
                    <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-amber-900/20 to-amber-800/10 border border-amber-800/30 flex items-center justify-center">
                      <Award className="w-8 h-8 text-amber-400" />
                    </div>
                    <div className="font-light mb-2">Certificate of Authenticity</div>
                    <div className="text-sm text-zinc-400">Signed by the artisan</div>
                  </div>
                </div>

                <button
                  onClick={() => setShowConsultationModal(true)}
                  className="px-12 py-4 bg-gradient-to-r from-amber-600 to-amber-800 rounded-full text-lg font-light tracking-widest hover:shadow-2xl hover:shadow-amber-500/30 transition-all duration-300 group"
                >
                  SCHEDULE CONSULTATION
                  <ArrowRight className="w-5 h-5 inline ml-2 group-hover:translate-x-2 transition-transform" />
                </button>
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      {/* Material Preview Modal */}
      <AnimatePresence>
        {showMaterialPreview && selectedMaterial && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/80 backdrop-blur-xl"
            onClick={() => setShowMaterialPreview(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-4xl bg-gradient-to-br from-zinc-900 to-black border border-amber-800/30 rounded-3xl overflow-hidden"
            >
              <button
                onClick={() => setShowMaterialPreview(false)}
                className="absolute top-6 right-6 z-10 w-10 h-10 rounded-full bg-black/60 backdrop-blur-sm border border-amber-600/30 flex items-center justify-center hover:bg-amber-900/30 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="p-8">
                <div className="grid md:grid-cols-2 gap-8">
                  {/* Material Image */}
                  <div className="relative h-[400px] rounded-2xl overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-amber-900/20 to-black/50" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center">
                        <div className="text-6xl mb-4">💎</div>
                        <div className="text-amber-400">Material Sample</div>
                      </div>
                    </div>
                  </div>

                  {/* Material Details */}
                  <div>
                    <div className="inline-block px-4 py-1 bg-amber-900/30 rounded-full text-sm mb-4">
                      {selectedMaterial.type}
                    </div>
                    <h3 className="text-3xl font-light mb-4">{selectedMaterial.name}</h3>
                    <p className="text-zinc-400 mb-6">{selectedMaterial.description}</p>

                    <div className="space-y-6">
                      <div>
                        <div className="text-sm text-zinc-400 mb-2">AVAILABLE COLORS</div>
                        <div className="flex space-x-2">
                          {selectedMaterial.colors.map((color, i) => (
                            <div
                              key={i}
                              className="w-8 h-8 rounded-full border border-zinc-700"
                              style={{ backgroundColor: color }}
                            />
                          ))}
                        </div>
                      </div>

                      <div>
                        <div className="text-sm text-zinc-400 mb-2">PROPERTIES</div>
                        <div className="space-y-2">
                          {selectedMaterial.properties.map((prop, i) => (
                            <div key={i} className="flex items-center space-x-2">
                              <CheckCircle className="w-4 h-4 text-amber-400" />
                              <span className="text-sm">{prop}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="text-3xl font-light text-amber-400">
                        {selectedMaterial.price}
                      </div>

                      <button
                        onClick={() => {
                          handleCustomizationChange('material', selectedMaterial.id);
                          setShowMaterialPreview(false);
                        }}
                        className="w-full py-3 bg-gradient-to-r from-amber-600 to-amber-800 rounded-xl text-lg font-light tracking-widest hover:shadow-xl hover:shadow-amber-500/20 transition-all"
                      >
                        SELECT THIS MATERIAL
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Consultation Modal */}
      <AnimatePresence>
        {showConsultationModal && (
          <ConsultationModal
            isOpen={showConsultationModal}
            onClose={() => setShowConsultationModal(false)}
            data={consultationData}
            onChange={setConsultationData}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

// Consultation Modal Component
function ConsultationModal({ isOpen, onClose, data, onChange }) {
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
        className="relative w-full max-w-2xl bg-gradient-to-br from-zinc-900 to-black border border-amber-800/30 rounded-3xl overflow-hidden"
      >
        <button
          onClick={onClose}
          className="absolute top-6 right-6 z-10 w-10 h-10 rounded-full bg-black/60 backdrop-blur-sm border border-amber-600/30 flex items-center justify-center hover:bg-amber-900/30 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="p-8">
          <h3 className="text-3xl font-light mb-2">Bespoke Consultation Request</h3>
          <p className="text-zinc-400 mb-8">Tell us about your project and preferences</p>

          <div className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-light tracking-widest mb-2">PROJECT TIMELINE</label>
                <Select.Root value={data.timeline} onValueChange={(value) => onChange({ ...data, timeline: value })}>
                  <Select.Trigger className="w-full bg-zinc-900/50 border border-zinc-800 rounded-xl px-6 py-4 flex items-center justify-between hover:border-amber-600/50 transition-colors">
                    <Select.Value />
                    <Select.Icon>
                      <ChevronDown className="w-4 h-4" />
                    </Select.Icon>
                  </Select.Trigger>
                  <Select.Portal>
                    <Select.Content className="bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden">
                      <Select.Viewport className="p-2">
                        <Select.Item value="1-3 months" className="px-6 py-3 rounded-lg hover:bg-zinc-800 cursor-pointer">
                          <Select.ItemText>1-3 months (Urgent)</Select.ItemText>
                        </Select.Item>
                        <Select.Item value="3-6 months" className="px-6 py-3 rounded-lg hover:bg-zinc-800 cursor-pointer">
                          <Select.ItemText>3-6 months (Standard)</Select.ItemText>
                        </Select.Item>
                        <Select.Item value="6-12 months" className="px-6 py-3 rounded-lg hover:bg-zinc-800 cursor-pointer">
                          <Select.ItemText>6-12 months (Flexible)</Select.ItemText>
                        </Select.Item>
                      </Select.Viewport>
                    </Select.Content>
                  </Select.Portal>
                </Select.Root>
              </div>

              <div>
                <label className="block text-sm font-light tracking-widest mb-2">BUDGET RANGE</label>
                <Select.Root value={data.budget} onValueChange={(value) => onChange({ ...data, budget: value })}>
                  <Select.Trigger className="w-full bg-zinc-900/50 border border-zinc-800 rounded-xl px-6 py-4 flex items-center justify-between hover:border-amber-600/50 transition-colors">
                    <Select.Value />
                    <Select.Icon>
                      <ChevronDown className="w-4 h-4" />
                    </Select.Icon>
                  </Select.Trigger>
                  <Select.Portal>
                    <Select.Content className="bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden">
                      <Select.Viewport className="p-2">
                        <Select.Item value="$100,000 - $250,000" className="px-6 py-3 rounded-lg hover:bg-zinc-800 cursor-pointer">
                          <Select.ItemText>$100k - $250k</Select.ItemText>
                        </Select.Item>
                        <Select.Item value="$250,000 - $500,000" className="px-6 py-3 rounded-lg hover:bg-zinc-800 cursor-pointer">
                          <Select.ItemText>$250k - $500k</Select.ItemText>
                        </Select.Item>
                        <Select.Item value="$500,000+" className="px-6 py-3 rounded-lg hover:bg-zinc-800 cursor-pointer">
                          <Select.ItemText>$500k+</Select.ItemText>
                        </Select.Item>
                      </Select.Viewport>
                    </Select.Content>
                  </Select.Portal>
                </Select.Root>
              </div>
            </div>

            <div>
              <label className="block text-sm font-light tracking-widest mb-2">PROJECT DESCRIPTION</label>
              <textarea
                rows="4"
                placeholder="Describe your vision, preferred styles, and any specific requirements..."
                className="w-full bg-zinc-900/50 border border-zinc-800 rounded-xl px-6 py-4 focus:outline-none focus:border-amber-600 transition-colors"
              />
            </div>

            <div>
              <label className="block text-sm font-light tracking-widest mb-2">UPLOAD INSPIRATION (Optional)</label>
              <div className="border-2 border-dashed border-zinc-800 rounded-xl p-8 text-center hover:border-amber-600/50 transition-colors cursor-pointer">
                <Upload className="w-12 h-12 mx-auto mb-4 text-zinc-600" />
                <div className="text-zinc-400">Drop images here or click to browse</div>
                <div className="text-sm text-zinc-500 mt-2">PNG, JPG up to 10MB each</div>
              </div>
            </div>

            <button className="w-full py-4 bg-gradient-to-r from-amber-600 to-amber-800 rounded-xl text-lg font-light tracking-widest hover:shadow-xl hover:shadow-amber-500/20 transition-all">
              REQUEST CONSULTATION
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

// Helper Upload Icon
function Upload(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="17 8 12 3 7 8" />
      <line x1="12" y1="3" x2="12" y2="15" />
    </svg>
  );
}

export default BespokePage;

