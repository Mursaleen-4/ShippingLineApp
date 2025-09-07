import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Ship, Users, Award, TrendingUp, MapPin, Phone, Mail } from 'lucide-react';
import HeroCarousel from '../components/HeroCarousel';
import Navigation from '../components/Navigation';
import Testimonials from '../components/Testimonials';
import SocialMedia from '../components/SocialMedia';

const Home: React.FC = () => {
  const stats = [
    {
      icon: Ship,
      value: '70+',
      label: 'Years of Excellence',
      description: 'Serving the maritime industry since 1951'
    },
    {
      icon: Users,
      value: '500+',
      label: 'Satisfied Clients',
      description: 'Trusted by leading companies worldwide'
    },
    {
      icon: Award,
      value: '4',
      label: 'Major Cities',
      description: 'Offices across Pakistan for better service'
    },
    {
      icon: TrendingUp,
      value: '24/7',
      label: 'Customer Support',
      description: 'Round-the-clock assistance and monitoring'
    }
  ];

  const quickServices = [
    {
      title: 'Liner Shipping',
      description: 'Regular scheduled services with OOCL partnership',
      color: 'from-blue-500 to-blue-600',
      link: '/eservices'
    },
    {
      title: 'Freight Forwarding',
      description: 'Complete logistics solutions and documentation',
      color: 'from-green-500 to-green-600',
      link: '/eservices'
    },
    {
      title: 'Container Services',
      description: 'FCL/LCL services with empty container depots',
      color: 'from-purple-500 to-purple-600',
      link: '/eservices'
    },
    {
      title: 'Ship Husbandry',
      description: 'Vessel handling and port coordination services',
      color: 'from-orange-500 to-orange-600',
      link: '/eservices'
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      {/* Hero Carousel */}
      <HeroCarousel />
      
      {/* Company Stats */}
      <section className="py-20 bg-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-gray-50 to-white" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
              Trusted Maritime Partner
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Seven decades of excellence in maritime services, connecting Pakistan to global trade routes
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={stat.label}
                  className="text-center p-6 bg-white rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 * index }}
                  whileHover={{ y: -5, scale: 1.02 }}
                >
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-100 text-primary-600 rounded-full mb-4">
                    <Icon className="w-8 h-8" />
                  </div>
                  <div className="text-3xl font-bold text-primary-600 mb-2">
                    {stat.value}
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {stat.label}
                  </h3>
                  <p className="text-sm text-gray-600">
                    {stat.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Quick Services */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
              Quick Service Access
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Fast access to our most popular shipping and logistics services
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {quickServices.map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 * index }}
                whileHover={{ y: -5, scale: 1.02 }}
              >
                <Link to={service.link} className="group block p-6 bg-white rounded-2xl shadow-lg border border-gray-100 hover:shadow-2xl transition-all duration-300 overflow-hidden relative">
                  <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${service.color}`} />
                  <h3 className="text-lg font-bold text-gray-900 mb-3 group-hover:text-primary-600 transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {service.description}
                  </p>
                  <div className="mt-4 text-primary-600 font-semibold text-sm group-hover:text-primary-700 transition-colors">
                    Learn More →
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      
      
      {/* Testimonials */}
      <Testimonials />
      
      {/* Social Media */}
      <SocialMedia />
      
      {/* Contact CTA */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-primary-600 via-primary-700 to-blue-800 rounded-3xl p-8 lg:p-16 text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full -mr-48 -mt-48" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/5 rounded-full -ml-32 -mb-32" />
            
            <div className="relative z-10">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div>
                  <h2 className="text-3xl lg:text-4xl font-bold mb-6">
                    Start Your Maritime Journey Today
                  </h2>
                  <p className="text-xl text-blue-100 mb-8 leading-relaxed">
                    Ready to experience world-class maritime services? Contact our experts for personalized shipping solutions.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                      <Link to="/contact" className="btn bg-white text-primary-600 hover:bg-gray-100 btn-lg px-8 py-4 font-bold">
                        Get In Touch
                      </Link>
                    </motion.div>
                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                      <Link to="/about" className="btn border-2 border-white text-white hover:bg-white hover:text-primary-600 btn-lg px-8 py-4 font-bold">
                        Learn More
                      </Link>
                    </motion.div>
                  </div>
                </div>
                
                <div className="space-y-6">
                  <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                    <div className="flex items-center mb-4">
                      <MapPin className="w-6 h-6 text-yellow-400 mr-3" />
                      <span className="font-semibold">Head Office</span>
                    </div>
                    <p className="text-blue-100">
                      10th Floor, Sheikh Sultan Trust Bldg,<br />
                      Beaumont Road, Karachi, Pakistan
                    </p>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                      <Phone className="w-5 h-5 text-yellow-400 mb-2" />
                      <div className="text-sm text-blue-100">
                        +92-21-35688057
                      </div>
                    </div>
                    <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                      <Mail className="w-5 h-5 text-yellow-400 mb-2" />
                      <div className="text-sm text-blue-100">
                        info@yslpk.com
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
