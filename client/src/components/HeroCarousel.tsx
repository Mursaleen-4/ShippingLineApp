import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Ship, Anchor, Truck } from 'lucide-react';

interface Slide {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  cta: string;
  ctaLink: string;
  icon: React.ComponentType<any>;
  stats?: { value: string; label: string }[];
}

const HeroCarousel: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides: Slide[] = [
    {
      id: 1,
      title: "Global Maritime Excellence",
      subtitle: "United Oriental Steamship Co. (UOSL)",
      description: "70+ years of dedicated maritime services connecting Pakistan to the world through professional shipping solutions.",
      image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?q=80&w=2070",
      cta: "Explore Services",
      ctaLink: "/eservices",
      icon: Ship,
      stats: [
        { value: "70+", label: "Years Experience" },
        { value: "4", label: "Major Cities" },
        { value: "Global", label: "Network" }
      ]
    },
    {
      id: 2,
      title: "Comprehensive Logistics Solutions",
      subtitle: "From Port to Destination",
      description: "Complete freight forwarding, container handling, and logistics services with state-of-the-art facilities.",
      image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=2070",
      cta: "Track Shipment",
      ctaLink: "/tracking",
      icon: Truck,
      stats: [
        { value: "24/7", label: "Operations" },
        { value: "FCL/LCL", label: "Services" },
        { value: "Nationwide", label: "Coverage" }
      ]
    },
    {
      id: 3,
      title: "Strategic Port Operations",
      subtitle: "Advanced Container Handling",
      description: "Premier port services with OOCL joint venture, empty container depots in Karachi and Lahore.",
      image: "https://images.unsplash.com/photo-1494412685616-a5d310fbb07d?q=80&w=2070",
      cta: "Port Information",
      ctaLink: "/about",
      icon: Anchor,
      stats: [
        { value: "OOCL", label: "Partnership" },
        { value: "2", label: "Container Depots" },
        { value: "Premium", label: "Handling" }
      ]
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [slides.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  // Make sure slides exist and currentSlide is valid
  if (!slides || slides.length === 0) {
    return <div className="h-screen flex items-center justify-center">No slides available</div>;
  }

  // Ensure currentSlide is within bounds
  const safeCurrentSlideIndex = Math.min(Math.max(0, currentSlide), slides.length - 1);
  const currentSlideData: Slide = slides[safeCurrentSlideIndex]!;
  
  return (
    <div className="relative h-screen overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={safeCurrentSlideIndex}
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url('${currentSlideData.image}')` }}
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{ duration: 1.2, ease: "easeInOut" }}
        >
          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-primary-900/90 via-primary-800/75 to-blue-900/60" />
          
          {/* Content */}
          <div className="relative z-10 flex items-center justify-center h-full px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto w-full">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                {/* Left Content */}
                <motion.div
                  className="text-left text-white"
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                >
                  <div className="flex items-center mb-4">
                    {React.createElement(currentSlideData.icon, { 
                      className: "w-12 h-12 text-yellow-400 mr-4" 
                    })}
                    <span className="text-yellow-400 font-semibold text-lg">
                      {currentSlideData.subtitle}
                    </span>
                  </div>
                  
                  <h1 className="text-5xl lg:text-7xl font-bold mb-6 leading-tight">
                    {currentSlideData.title}
                  </h1>
                  
                  <p className="text-xl lg:text-2xl mb-8 text-blue-100 leading-relaxed max-w-2xl">
                    {currentSlideData.description}
                  </p>
                  
                  <div className="flex flex-col sm:flex-row gap-4 mb-12">
                    <motion.a
                      href={currentSlideData.ctaLink}
                      className="btn btn-primary btn-lg px-8 py-4 text-lg inline-flex items-center justify-center bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-black font-bold shadow-xl transform hover:scale-105 transition-all duration-300"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {currentSlideData.cta}
                    </motion.a>
                    
                    <motion.a
                      href="/contact"
                      className="btn btn-secondary btn-lg px-8 py-4 text-lg inline-flex items-center justify-center border-2 border-white text-white bg-primary-700 hover:bg-white hover:text-primary-900 font-semibold shadow-xl transform hover:scale-105 transition-all duration-300"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Contact Us
                    </motion.a>
                  </div>
                </motion.div>

                {/* Right Stats */}
                <motion.div
                  className="lg:text-right"
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                >
                  {currentSlideData.stats && (
                    <div className="grid grid-cols-3 gap-6 lg:gap-8">
                      {currentSlideData.stats!.map((stat, index) => (
                        <motion.div
                          key={stat.label}
                          className="text-center lg:text-right"
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
                        >
                          <div className="text-4xl lg:text-5xl font-bold text-yellow-400 mb-2">
                            {stat.value}
                          </div>
                          <div className="text-lg text-blue-100 font-medium">
                            {stat.label}
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  )}
                </motion.div>
              </div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 z-20 bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white p-3 rounded-full transition-all duration-300 group"
      >
        <ChevronLeft className="w-6 h-6 group-hover:scale-110 transition-transform" />
      </button>
      
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 z-20 bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white p-3 rounded-full transition-all duration-300 group"
      >
        <ChevronRight className="w-6 h-6 group-hover:scale-110 transition-transform" />
      </button>

      {/* Slide Indicators */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 flex space-x-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === safeCurrentSlideIndex 
                ? 'bg-yellow-400 scale-125' 
                : 'bg-white/50 hover:bg-white/75'
            }`}
          />
        ))}
      </div>

      {/* Scroll Down Indicator */}
      <motion.div
        className="absolute bottom-8 right-8 z-20 text-white"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div className="flex flex-col items-center">
          <span className="text-sm mb-2">Scroll Down</span>
          <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
            <motion.div
              className="w-1 h-3 bg-white rounded-full mt-2"
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default HeroCarousel;
