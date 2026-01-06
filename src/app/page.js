// src/app/page.js
"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronRight,
  ArrowRight,
  Sparkles,
  Shield,
  Truck,
  Award,
  Menu,
  X,
  Star,
  Search,
  ShoppingBag,
} from "lucide-react";
import Image from "next/image";

const LuxuryLandingPage = () => {
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [hoveredProduct, setHoveredProduct] = useState(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeCollection, setActiveCollection] = useState(0);
  const [floatingElements] = useState(() =>
    [...Array(20)].map((_, i) => ({
      id: i,
      randomX: Math.random() * 100 - 50,
      randomDuration: 3 + Math.random() * 2,
      left: Math.random() * 100,
      top: Math.random() * 100,
    }))
  );
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  const collections = [
    {
      id: 1,
      name: "Celestial Collection",
      category: "Limited Edition",
      description: "Handcrafted with meteorite inlays and 24k gold accents",
      startingPrice: "R420,000",
      image: "/api/placeholder/1200/800",
    },
    {
      id: 2,
      name: "Sapphire Series",
      category: "Ocean Inspired",
      description: "Deep blue lacquer with mother-of-pearl detailing",
      startingPrice: "R360,000",
      image: "/api/placeholder/1200/800",
    },
    {
      id: 3,
      name: "Onyx Noir",
      category: "Modern Minimalist",
      description: "Polished black marble with titanium framework",
      startingPrice: "R520,000",
      image: "/api/placeholder/1200/800",
    },
  ];

  const features = [
    {
      icon: <Award className="w-8 h-8" />,
      title: "Bespoke Craftsmanship",
      description: "Each piece individually handcrafted by master artisans",
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Lifetime Warranty",
      description: "Generational quality with comprehensive protection",
    },
    {
      icon: <Truck className="w-8 h-8" />,
      title: "White Glove Delivery",
      description: "Global installation by our expert team",
    },
    {
      icon: <Sparkles className="w-8 h-8" />,
      title: "Concierge Service",
      description: "24/7 dedicated client relationship manager",
    },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll =
        document.documentElement.scrollHeight - window.innerHeight;
      const currentScroll = window.scrollY;
      setScrollProgress((currentScroll / totalScroll) * 100);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-zinc-950 via-zinc-900 to-zinc-950 text-white overflow-hidden">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-black/80 backdrop-blur-xl border-b border-zinc-800">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center space-x-2"
            >
              <div className="w-10 h-10 bg-gradient-to-br from-amber-500 to-amber-800 rounded-full flex items-center justify-center">
                <span className="text-2xl font-bold">L</span>
              </div>
              <span className="text-2xl font-light tracking-widest">
                LUMINÈRE
              </span>
            </motion.div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-12">
              {[
                "Collections",
                "Bespoke",
                "Showrooms",
                "Artisans",
                "Clients",
              ].map((item) => {
                const href =
                  item === "Collections"
                    ? "/collections"
                    : item === "Showrooms"
                    ? "/showrooms"
                    : "#";
                return (
                  <motion.a
                    key={item}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                      if (href.startsWith("/")) {
                        router.push(href);
                      }
                    }}
                    className="text-sm font-light tracking-widest hover:text-amber-200 transition-colors cursor-pointer"
                  >
                    {item}
                  </motion.a>
                );
              })}
              <div className="flex items-center space-x-6">
                <Search className="w-5 h-5 cursor-pointer hover:text-amber-200 transition-colors" />
                <ShoppingBag className="w-5 h-5 cursor-pointer hover:text-amber-200 transition-colors" />
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-2 bg-gradient-to-r from-amber-600 to-amber-800 rounded-full text-sm font-light tracking-widest hover:shadow-2xl hover:shadow-amber-500/20 transition-all"
                >
                  CONCIERGE
                </motion.button>
              </div>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 bg-black/95 backdrop-blur-xl pt-24"
          >
            <div className="container mx-auto px-6 space-y-8">
              {[
                "Collections",
                "Bespoke",
                "Showrooms",
                "Artisans",
                "Clients",
              ].map((item) => {
                const href =
                  item === "Collections"
                    ? "/collections"
                    : item === "Showrooms"
                    ? "/showrooms"
                    : "#";
                return (
                  <div key={item} className="border-b border-zinc-800 py-4">
                    <a
                      onClick={() => {
                        if (href.startsWith("/")) {
                          router.push(href);
                          setIsMenuOpen(false);
                        }
                      }}
                      className="text-2xl font-light tracking-widest cursor-pointer hover:text-amber-400 transition-colors"
                    >
                      {item}
                    </a>
                  </div>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Scroll Progress */}
      <div
        className="fixed left-0 right-0 top-0 h-0.5 bg-gradient-to-r from-amber-500 to-amber-800 z-50"
        style={{ width: `${scrollProgress}%` }}
      />

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0">
          {mounted &&
            Array.from({ length: 20 }).map((_, i) => {
              // Generate random positions ONLY when mounted (client-side)
              const left = Math.random() * 100;
              const top = Math.random() * 100;
              const randomX = (Math.random() - 0.5) * 200;
              const randomDuration = 2 + Math.random() * 3;

              return (
                <motion.div
                  key={i}
                  className="absolute w-px h-px bg-amber-500/20 rounded-full"
                  animate={{
                    y: [0, -100, 0],
                    x: [0, randomX, 0],
                  }}
                  transition={{
                    duration: randomDuration,
                    repeat: Infinity,
                    delay: i * 0.1,
                  }}
                  style={{
                    left: `${left}%`,
                    top: `${top}%`,
                  }}
                />
              );
            })}
        </div>

        <div className="container mx-auto px-6 py-32 relative z-10">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            {/* Left Content */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1 }}
            >
              <div className="inline-flex items-center space-x-2 mb-6">
                <Sparkles className="w-5 h-5 text-amber-400" />
                <span className="text-sm tracking-[0.3em] text-amber-400">
                  EXCLUSIVELY CRAFTED
                </span>
              </div>

              <h1 className="text-7xl md:text-8xl font-light tracking-tight leading-none mb-8">
                <span className="block">ELEVATING</span>
                <span className="block text-amber-200">SPACES FOR</span>
                <span className="block">THE ELITE</span>
              </h1>

              <p className="text-xl text-zinc-400 font-light mb-12 max-w-xl">
                Where master craftsmanship meets unparalleled luxury. Each piece
                is a legacy, designed for those who value the extraordinary.
              </p>

              <div className="flex flex-col sm:flex-row gap-6">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => router.push("/collections")}
                  className="group px-12 py-4 bg-gradient-to-r from-amber-600 to-amber-800 rounded-full text-lg font-light tracking-widest hover:shadow-2xl hover:shadow-amber-500/30 transition-all duration-300 flex items-center justify-center space-x-3"
                >
                  <span>EXPLORE COLLECTIONS</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => router.push("/showrooms")}
                  className="px-12 py-4 border border-amber-600/30 rounded-full text-lg font-light tracking-widest hover:bg-amber-900/20 transition-all duration-300"
                >
                  BESPOKE CONSULTATION
                </motion.button>
              </div>
            </motion.div>

            {/* Right Content - 3D Rotating Preview */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8, rotateY: 180 }}
              animate={{ opacity: 1, scale: 1, rotateY: 0 }}
              transition={{ duration: 1.5, delay: 0.3 }}
              className="relative"
            >
              <div className="relative h-[600px] w-full rounded-3xl overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-amber-900/10 to-zinc-900/50 backdrop-blur-sm" />
                <div className="absolute inset-0">
                  <div className="h-full w-full bg-gradient-to-br from-amber-600/5 to-transparent animate-pulse" />
                </div>

                {/* Featured Product Card */}
                <motion.div
                  animate={{
                    y: [0, -20, 0],
                    rotate: [0, 1, -1, 0],
                  }}
                  transition={{
                    duration: 8,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="absolute inset-8 bg-gradient-to-br from-zinc-900 to-black rounded-2xl shadow-2xl shadow-amber-900/30 border border-amber-800/30 p-8"
                >
                  <div className="flex justify-between items-start mb-6">
                    <div>
                      <h3 className="text-2xl font-light mb-2">AURORA CHAIR</h3>
                      <p className="text-amber-400 text-sm">
                        LIMITED EDITION • 1/50
                      </p>
                    </div>
                    <div className="text-right">
                      <div className="text-3xl font-light">R200,000</div>
                      <div className="text-sm text-zinc-500">
                        FULL SET: R1.2M
                      </div>
                    </div>
                  </div>

                  <div className="relative h-64 mb-6 rounded-xl overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-amber-900/20 to-black" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-48 h-48 rounded-full bg-gradient-to-r from-amber-600/10 to-amber-800/10 border border-amber-700/30 animate-spin-slow" />
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className="w-5 h-5 fill-amber-400 text-amber-400"
                        />
                      ))}
                      <span className="text-sm ml-2">48 Reviews</span>
                    </div>
                    <button className="text-amber-400 hover:text-amber-300 transition-colors">
                      View Details →
                    </button>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <div className="text-center">
            <div className="text-sm tracking-widest text-zinc-500 mb-2">
              SCROLL TO DISCOVER
            </div>
            <ChevronRight className="w-6 h-6 text-amber-400 rotate-90 mx-auto" />
          </div>
        </motion.div>
      </section>

      {/* Collections Section */}
      <section className="py-32">
        <div className="container mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-6xl font-light mb-6">
              <span className="text-amber-200">CURATED</span> COLLECTIONS
            </h2>
            <p className="text-xl text-zinc-400 font-light max-w-2xl mx-auto">
              Each collection tells a story of exquisite materials and
              uncompromising quality
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {collections.map((collection, index) => (
              <motion.div
                key={collection.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                viewport={{ once: true }}
                onHoverStart={() => setHoveredProduct(collection.id)}
                onHoverEnd={() => setHoveredProduct(null)}
                className="group relative overflow-hidden rounded-3xl bg-gradient-to-b from-zinc-900 to-black border border-zinc-800 hover:border-amber-600/50 transition-all duration-500"
              >
                <div className="aspect-square relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-amber-900/20 to-black/50" />
                  <div className="p-8 relative z-10 h-full flex flex-col justify-between">
                    <div>
                      <div className="inline-block px-4 py-1.5 bg-amber-900/30 backdrop-blur-sm rounded-full mb-4">
                        <span className="text-sm tracking-widest">
                          {collection.category}
                        </span>
                      </div>
                      <h3 className="text-3xl font-light mb-3">
                        {collection.name}
                      </h3>
                      <p className="text-zinc-400 mb-6">
                        {collection.description}
                      </p>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="text-2xl font-light">
                        {collection.startingPrice}
                      </div>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => router.push("/collections")}
                        className="w-12 h-12 rounded-full bg-gradient-to-r from-amber-600 to-amber-800 flex items-center justify-center group-hover:scale-110 transition-transform duration-300"
                      >
                        <ArrowRight className="w-5 h-5" />
                      </motion.button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-32 bg-gradient-to-b from-black/50 to-zinc-950/50">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center group"
              >
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-amber-900/20 to-amber-800/10 border border-amber-800/30 flex items-center justify-center group-hover:shadow-xl group-hover:shadow-amber-500/20 transition-all duration-300"
                >
                  <div className="text-amber-400">{feature.icon}</div>
                </motion.div>
                <h3 className="text-xl font-light mb-3">{feature.title}</h3>
                <p className="text-zinc-400 text-sm">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-r from-amber-900/10 via-transparent to-amber-900/10" />
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full border border-amber-700/10 animate-pulse" />
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-5xl md:text-6xl font-light mb-8">
              READY TO ELEVATE YOUR{" "}
              <span className="text-amber-200">SPACE?</span>
            </h2>
            <p className="text-xl text-zinc-400 mb-12 max-w-2xl mx-auto">
              Schedule a private consultation with our luxury design specialists
            </p>

            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-zinc-900 to-black border border-amber-800/30 rounded-3xl p-12 shadow-2xl shadow-amber-900/10"
            >
              <div className="grid md:grid-cols-3 gap-8 mb-8">
                <input
                  type="text"
                  placeholder="Full Name"
                  className="bg-zinc-900/50 border border-zinc-800 rounded-xl px-6 py-4 text-lg focus:outline-none focus:border-amber-600 transition-colors"
                />
                <input
                  type="email"
                  placeholder="Email Address"
                  className="bg-zinc-900/50 border border-zinc-800 rounded-xl px-6 py-4 text-lg focus:outline-none focus:border-amber-600 transition-colors"
                />
                <input
                  type="tel"
                  placeholder="Phone Number"
                  className="bg-zinc-900/50 border border-zinc-800 rounded-xl px-6 py-4 text-lg focus:outline-none focus:border-amber-600 transition-colors"
                />
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full py-6 bg-gradient-to-r from-amber-600 to-amber-800 rounded-xl text-xl font-light tracking-widest hover:shadow-2xl hover:shadow-amber-500/30 transition-all duration-300"
              >
                SCHEDULE PRIVATE VIEWING
              </motion.button>

              <p className="text-zinc-500 text-sm mt-6">
                By submitting, you agree to our privacy policy. One of our
                consultants will contact you within 24 hours.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-zinc-800 pt-16 pb-8">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-8 md:mb-0">
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-br from-amber-500 to-amber-800 rounded-full" />
                <span className="text-2xl font-light tracking-widest">
                  LUMINÈRE
                </span>
              </div>
              <p className="text-zinc-500 text-sm">
                © 2024 LUMINÈRE. All rights reserved.
              </p>
            </div>

            <div className="flex items-center space-x-8">
              {["Privacy Policy", "Terms of Service", "Cookie Policy"].map(
                (item) => (
                  <a
                    key={item}
                    className="text-zinc-400 hover:text-amber-200 transition-colors text-sm tracking-widest"
                  >
                    {item}
                  </a>
                )
              )}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LuxuryLandingPage;
