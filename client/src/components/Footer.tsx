import React from 'react';
import { motion } from 'framer-motion';
import { 
  Ship, 
  MapPin, 
  Phone, 
  Mail, 
  Clock,
  Facebook,
  Linkedin,
  Instagram,
  Youtube,
  Twitter,
  ExternalLink,
  ChevronRight,
  Globe,
  FileText,
  Container,
  Anchor
} from 'lucide-react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { name: 'Home', href: '/' },
    { name: 'About Us', href: '/about' },
    { name: 'Services', href: '/services' },
    { name: 'E-Services', href: '/e-services' },
    { name: 'Contact Us', href: '/contact' },
    { name: 'Tracking', href: '/tracking' }
  ];

  const services = [
    { name: 'Liner Shipping', href: '/services#liner', icon: Ship },
    { name: 'Ocean Freight', href: '/services#ocean-freight', icon: Container },
    { name: 'Freight Forwarding', href: '/services#logistics', icon: Globe },
    { name: 'Ship Husbandry', href: '/services#specialized', icon: Anchor },
    { name: 'Container Services', href: '/services#container', icon: Container },
    { name: 'Project Cargo', href: '/services#project', icon: FileText }
  ];

  const eServices = [
    { name: 'Online Cargo Booking', href: '/e-services/booking' },
    { name: 'Shipment Tracking', href: '/tracking' },
    { name: 'PDA Form', href: '/e-services/pda' },
    { name: 'Rate Calculator', href: '/e-services/calculator' },
    { name: 'Schedule & News', href: '/e-services/schedule' },
    { name: 'Port Information', href: '/ports' }
  ];

  const companyInfo = [
    { name: 'Company History', href: '/about#history' },
    { name: 'Mission & Vision', href: '/about#mission' },
    { name: 'Core Values', href: '/about#values' },
    { name: 'Quality Policy', href: '/about#quality' },
    { name: 'Careers', href: '/careers' },
    { name: 'News & Updates', href: '/news' }
  ];

  const offices = [
    {
      city: 'Karachi',
      address: 'Sheikh Sultan Trust Bldg, Beaumont Road',
      phone: '+92-21-35688057',
      email: 'info@yslpk.com'
    },
    {
      city: 'Lahore',
      address: 'Grand Square Mall, Gulberg III',
      phone: '+92-42-35764134',
      email: 'lahore@yslpk.com'
    },
    {
      city: 'Multan',
      address: '21 U Business City Plaza',
      phone: '+92-61-6223356',
      email: 'multan@yslpk.com'
    },
    {
      city: 'Faisalabad',
      address: '22, Chenab Market',
      phone: '+92-41-8532256',
      email: 'faisalabad@yslpk.com'
    }
  ];

  const socialLinks = [
    { 
      name: 'Facebook', 
      href: 'https://facebook.com/yaaseenshippinglines', 
      icon: Facebook,
      color: 'hover:text-blue-600'
    },
    { 
      name: 'LinkedIn', 
      href: 'https://linkedin.com/company/yaaseen-shipping-lines', 
      icon: Linkedin,
      color: 'hover:text-blue-700'
    },
    { 
      name: 'Instagram', 
      href: 'https://instagram.com/yaaseenshippinglines', 
      icon: Instagram,
      color: 'hover:text-pink-600'
    },
    { 
      name: 'YouTube', 
      href: 'https://youtube.com/@yaaseenshippinglines', 
      icon: Youtube,
      color: 'hover:text-red-600'
    },
    { 
      name: 'Twitter', 
      href: 'https://twitter.com/yaaseen_shipping', 
      icon: Twitter,
      color: 'hover:text-sky-500'
    }
  ];

  return (
    <footer className="bg-gray-900 text-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" 
             style={{
               backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Ccircle cx='30' cy='30' r='1.5'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
               backgroundSize: '60px 60px'
             }}
        />
      </div>

      <div className="relative z-10">
        {/* Main Footer Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
            {/* Company Info */}
            <motion.div
              className="lg:col-span-1"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="flex items-center mb-6">
                <div className="bg-primary-600 p-3 rounded-lg mr-4">
                  <Ship className="h-8 w-8 text-white" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-white">Yaaseen Shipping Lines</div>
                  <div className="text-sm text-gray-400">United Oriental Steamship Co.</div>
                </div>
              </div>
              
              <p className="text-gray-300 mb-6 leading-relaxed">
                Since 1951, we've been Pakistan's leading maritime service provider, 
                connecting businesses to global trade routes with professionalism and excellence.
              </p>
              
              <div className="space-y-3">
                <div className="flex items-center text-gray-300">
                  <Clock className="w-4 h-4 mr-3 text-primary-400" />
                  <span className="text-sm">Mon-Sat: 9:00 AM - 6:00 PM</span>
                </div>
                <div className="flex items-center text-gray-300">
                  <Phone className="w-4 h-4 mr-3 text-primary-400" />
                  <a href="tel:+922135688057" className="text-sm hover:text-primary-400 transition-colors">
                    +92-21-35688057
                  </a>
                </div>
                <div className="flex items-center text-gray-300">
                  <Mail className="w-4 h-4 mr-3 text-primary-400" />
                  <a href="mailto:info@yslpk.com" className="text-sm hover:text-primary-400 transition-colors">
                    info@yslpk.com
                  </a>
                </div>
              </div>
            </motion.div>

            {/* Quick Links & Services */}
            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:col-span-2"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              {/* Quick Links */}
              <div>
                <h3 className="text-lg font-bold text-white mb-6">Quick Links</h3>
                <ul className="space-y-3">
                  {quickLinks.map((link) => (
                    <li key={link.name}>
                      <a
                        href={link.href}
                        className="flex items-center text-gray-300 hover:text-primary-400 transition-colors group"
                      >
                        <ChevronRight className="w-4 h-4 mr-2 transform group-hover:translate-x-1 transition-transform" />
                        {link.name}
                      </a>
                    </li>
                  ))}
                </ul>
                
                <h3 className="text-lg font-bold text-white mb-6 mt-8">E-Services</h3>
                <ul className="space-y-3">
                  {eServices.slice(0, 4).map((service) => (
                    <li key={service.name}>
                      <a
                        href={service.href}
                        className="flex items-center text-gray-300 hover:text-primary-400 transition-colors group"
                      >
                        <ChevronRight className="w-4 h-4 mr-2 transform group-hover:translate-x-1 transition-transform" />
                        {service.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Services */}
              <div>
                <h3 className="text-lg font-bold text-white mb-6">Our Services</h3>
                <ul className="space-y-3">
                  {services.map((service) => {
                    const Icon = service.icon;
                    return (
                      <li key={service.name}>
                        <a
                          href={service.href}
                          className="flex items-center text-gray-300 hover:text-primary-400 transition-colors group"
                        >
                          <Icon className="w-4 h-4 mr-3 text-primary-400" />
                          {service.name}
                        </a>
                      </li>
                    );
                  })}
                </ul>
                
                <h3 className="text-lg font-bold text-white mb-6 mt-8">Company</h3>
                <ul className="space-y-3">
                  {companyInfo.slice(0, 4).map((info) => (
                    <li key={info.name}>
                      <a
                        href={info.href}
                        className="flex items-center text-gray-300 hover:text-primary-400 transition-colors group"
                      >
                        <ChevronRight className="w-4 h-4 mr-2 transform group-hover:translate-x-1 transition-transform" />
                        {info.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>

            {/* Office Locations */}
            <motion.div
              className="lg:col-span-1"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <h3 className="text-lg font-bold text-white mb-6">Our Network</h3>
              <div className="space-y-6">
                {offices.map((office) => (
                  <div key={office.city} className="border-b border-gray-800 pb-4 last:border-b-0">
                    <h4 className="font-semibold text-white mb-2 flex items-center">
                      <MapPin className="w-4 h-4 mr-2 text-primary-400" />
                      {office.city}
                    </h4>
                    <p className="text-sm text-gray-400 mb-2">{office.address}</p>
                    <div className="space-y-1">
                      <a 
                        href={`tel:${office.phone}`} 
                        className="block text-sm text-gray-300 hover:text-primary-400 transition-colors"
                      >
                        {office.phone}
                      </a>
                      <a 
                        href={`mailto:${office.email}`} 
                        className="block text-sm text-gray-300 hover:text-primary-400 transition-colors"
                      >
                        {office.email}
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>

        {/* Social Media & Newsletter */}
        <div className="border-t border-gray-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              {/* Social Media */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
              >
                <h3 className="text-lg font-bold text-white mb-6">Connect With Us</h3>
                <div className="flex space-x-4">
                  {socialLinks.map((social) => {
                    const Icon = social.icon;
                    return (
                      <motion.a
                        key={social.name}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`bg-gray-800 p-3 rounded-full text-gray-300 ${social.color} transition-all duration-300 hover:bg-gray-700 hover:scale-110`}
                        whileHover={{ y: -3 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Icon className="w-5 h-5" />
                      </motion.a>
                    );
                  })}
                </div>
                <p className="text-gray-400 text-sm mt-4">
                  Follow us for the latest maritime industry news and company updates
                </p>
              </motion.div>

              {/* Newsletter */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.8 }}
              >
                <h3 className="text-lg font-bold text-white mb-4">Stay Updated</h3>
                <p className="text-gray-400 text-sm mb-6">
                  Subscribe to our newsletter for industry insights and service updates
                </p>
                <div className="flex flex-col sm:flex-row gap-3">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="flex-1 px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                  <motion.button
                    className="px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors font-medium"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Subscribe
                  </motion.button>
                </div>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 bg-gray-950">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
              <motion.div
                className="text-sm text-gray-400"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1 }}
              >
                <p>
                  &copy; {currentYear} Yaaseen Shipping Lines (United Oriental Steamship Co.). All rights reserved.
                </p>
              </motion.div>
              
              <motion.div
                className="flex flex-wrap items-center space-x-6 text-sm"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1.2 }}
              >
                <a href="/privacy" className="text-gray-400 hover:text-primary-400 transition-colors">
                  Privacy Policy
                </a>
                <a href="/terms" className="text-gray-400 hover:text-primary-400 transition-colors">
                  Terms & Conditions
                </a>
                <a href="/sitemap" className="text-gray-400 hover:text-primary-400 transition-colors">
                  Sitemap
                </a>
                <span className="text-gray-400">|</span>
                <div className="flex items-center text-gray-400">
                  <Globe className="w-4 h-4 mr-1" />
                  <span>Pakistan</span>
                </div>
              </motion.div>
            </div>
            
            <motion.div
              className="mt-6 pt-6 border-t border-gray-800 text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.4 }}
            >
              <p className="text-xs text-gray-500">
                Yaaseen Shipping Lines is a proud member of Pakistan Maritime Industry. 
                Operating under the regulatory framework of Pakistan Maritime Affairs.
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
