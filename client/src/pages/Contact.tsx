import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  Send,
  User,
  Building2,
  Globe,
  MessageCircle,
  CheckCircle,
  ExternalLink,
  Calendar
} from 'lucide-react';

const Contact: React.FC = () => {
  const [selectedOffice, setSelectedOffice] = useState('karachi');
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    subject: '',
    message: '',
    serviceType: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const offices = [
    {
      id: 'karachi',
      name: 'Karachi Office (Head Office)',
      address: '10th Floor, Sheikh Sultan Trust Bldg, Beaumont Road, Karachi, Pakistan',
      phone: '+92-21-35688057-9, 35693004, 6, 7',
      fax: '+92-21-35683051, 35687367',
      email: 'info@yslpk.com',
      hours: 'Monday - Saturday: 9:00 AM - 6:00 PM',
      coordinates: { lat: 24.8607, lng: 67.0011 },
      services: ['All Services', 'Head Office Operations', 'Management', 'OOCL Partnership'],
      manager: 'General Manager',
      departments: ['Operations', 'Sales', 'Documentation', 'Finance', 'Customer Service']
    },
    {
      id: 'lahore',
      name: 'Lahore Office',
      address: 'Grand Square Mall, Office no E9C/2, 9th Floor, Gulberg III Lahore',
      phone: '+92-42-35764134-5, 35772049',
      email: 'lahore@yslpk.com',
      hours: 'Monday - Saturday: 9:00 AM - 6:00 PM',
      coordinates: { lat: 31.5204, lng: 74.3587 },
      services: ['Freight Forwarding', 'Container Services', 'Documentation', 'Customer Support'],
      manager: 'Regional Manager - Punjab',
      departments: ['Operations', 'Sales', 'Documentation', 'Customer Service']
    },
    {
      id: 'multan',
      name: 'Multan Office',
      address: '21 U Business City Plaza Bosan Road Multan',
      phone: '+92-61-6223356, 6223357',
      email: 'multan@yslpk.com',
      hours: 'Monday - Saturday: 9:00 AM - 6:00 PM',
      coordinates: { lat: 30.1575, lng: 71.5249 },
      services: ['Local Operations', 'Customer Support', 'Documentation'],
      manager: 'Branch Manager',
      departments: ['Operations', 'Customer Service', 'Documentation']
    },
    {
      id: 'faisalabad',
      name: 'Faisalabad Office',
      address: '22, Chenab Market, Madina Town, Faisalabad, Pakistan',
      phone: '+92-41-8532256-7',
      email: 'faisalabad@yslpk.com',
      hours: 'Monday - Saturday: 9:00 AM - 6:00 PM',
      coordinates: { lat: 31.4504, lng: 73.1350 },
      services: ['Textile Industry Support', 'Export Services', 'Documentation'],
      manager: 'Branch Manager',
      departments: ['Operations', 'Sales', 'Documentation']
    }
  ];

  const serviceTypes = [
    'Liner Shipping Services',
    'Ocean Freight (FCL/LCL)',
    'Freight Forwarding',
    'Container Services',
    'Ship Husbandry',
    'Chartering & Brokerage',
    'Project Cargo',
    'General Inquiry',
    'Other'
  ];

  const currentOffice = offices.find(office => office.id === selectedOffice)!;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    // Handle form submission here
    setTimeout(() => {
      setIsSubmitted(false);
      setContactForm({
        name: '',
        email: '',
        phone: '',
        company: '',
        subject: '',
        message: '',
        serviceType: ''
      });
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <section className="bg-gradient-to-r from-primary-600 via-primary-700 to-blue-800 text-white py-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/20" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full -mr-48 -mt-48" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/5 rounded-full -ml-32 -mb-32" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex justify-center mb-6">
              <div className="bg-white/10 backdrop-blur-sm p-4 rounded-full">
                <MessageCircle className="w-12 h-12 text-white" />
              </div>
            </div>
            <h1 className="text-4xl lg:text-5xl font-bold mb-6">Contact Us</h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto leading-relaxed">
              Get in touch with our maritime experts across Pakistan. We're here to help with all your shipping and logistics needs.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
              <motion.div
                className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <Phone className="w-8 h-8 text-yellow-400 mx-auto mb-3" />
                <h3 className="font-semibold mb-2">24/7 Support</h3>
                <p className="text-blue-100 text-sm">Round-the-clock customer assistance</p>
              </motion.div>
              
              <motion.div
                className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                <MapPin className="w-8 h-8 text-yellow-400 mx-auto mb-3" />
                <h3 className="font-semibold mb-2">4 Locations</h3>
                <p className="text-blue-100 text-sm">Offices across Pakistan's major cities</p>
              </motion.div>
              
              <motion.div
                className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <Globe className="w-8 h-8 text-yellow-400 mx-auto mb-3" />
                <h3 className="font-semibold mb-2">Global Network</h3>
                <p className="text-blue-100 text-sm">Worldwide shipping connections</p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <div className="flex items-center mb-6">
                <Send className="w-8 h-8 text-primary-600 mr-3" />
                <h2 className="text-2xl font-bold text-gray-900">Send Us a Message</h2>
              </div>

              {isSubmitted ? (
                <motion.div
                  className="text-center py-12"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6 }}
                >
                  <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Message Sent!</h3>
                  <p className="text-gray-600">Thank you for contacting us. We'll get back to you within 24 hours.</p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className="form-label">Full Name *</label>
                      <input
                        id="name"
                        type="text"
                        required
                        className="input"
                        value={contactForm.name}
                        onChange={(e) => setContactForm({...contactForm, name: e.target.value})}
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="email" className="form-label">Email Address *</label>
                      <input
                        id="email"
                        type="email"
                        required
                        className="input"
                        value={contactForm.email}
                        onChange={(e) => setContactForm({...contactForm, email: e.target.value})}
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="phone" className="form-label">Phone Number</label>
                      <input
                        id="phone"
                        type="tel"
                        className="input"
                        value={contactForm.phone}
                        onChange={(e) => setContactForm({...contactForm, phone: e.target.value})}
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="company" className="form-label">Company</label>
                      <input
                        id="company"
                        type="text"
                        className="input"
                        value={contactForm.company}
                        onChange={(e) => setContactForm({...contactForm, company: e.target.value})}
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="serviceType" className="form-label">Service Interest</label>
                    <select
                      id="serviceType"
                      className="input"
                      value={contactForm.serviceType}
                      onChange={(e) => setContactForm({...contactForm, serviceType: e.target.value})}
                    >
                      <option value="">Select a service</option>
                      {serviceTypes.map((service) => (
                        <option key={service} value={service}>{service}</option>
                      ))}
                    </select>
                  </div>
                  
                  <div>
                    <label htmlFor="subject" className="form-label">Subject *</label>
                    <input
                      id="subject"
                      type="text"
                      required
                      className="input"
                      value={contactForm.subject}
                      onChange={(e) => setContactForm({...contactForm, subject: e.target.value})}
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="message" className="form-label">Message *</label>
                    <textarea
                      id="message"
                      rows={6}
                      required
                      className="input w-full"
                      placeholder="Please describe your requirements or inquiry in detail..."
                      value={contactForm.message}
                      onChange={(e) => setContactForm({...contactForm, message: e.target.value})}
                    />
                  </div>
                  
                  <motion.button
                    type="submit"
                    className="btn btn-primary btn-lg w-full"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Send Message
                  </motion.button>
                </form>
              )}
            </div>
          </motion.div>

          {/* Office Information */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <div className="flex items-center mb-6">
                <Building2 className="w-8 h-8 text-primary-600 mr-3" />
                <h2 className="text-2xl font-bold text-gray-900">Our Offices</h2>
              </div>

              {/* Office Selector */}
              <div className="grid grid-cols-2 gap-2 mb-8">
                {offices.map((office) => (
                  <button
                    key={office.id}
                    onClick={() => setSelectedOffice(office.id)}
                    className={`p-3 rounded-lg text-sm font-medium transition-all duration-200 ${
                      selectedOffice === office.id
                        ? 'bg-primary-100 text-primary-700 border border-primary-200'
                        : 'bg-gray-50 text-gray-700 hover:bg-gray-100 border border-transparent'
                    }`}
                  >
                    {office.name.split(' ')[0]}
                  </button>
                ))}
              </div>

              {/* Selected Office Details */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={selectedOffice}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="border border-gray-200 rounded-xl p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-4">
                      {currentOffice.name}
                    </h3>
                    
                    <div className="space-y-4">
                      <div className="flex items-start">
                        <MapPin className="w-5 h-5 text-gray-400 mr-3 mt-0.5 flex-shrink-0" />
                        <div>
                          <p className="text-gray-600">{currentOffice.address}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center">
                        <Phone className="w-5 h-5 text-gray-400 mr-3 flex-shrink-0" />
                        <a href={`tel:${currentOffice.phone.split(',')[0]}`} className="text-primary-600 hover:text-primary-700">
                          {currentOffice.phone}
                        </a>
                      </div>
                      
                      {currentOffice.fax && (
                        <div className="flex items-center">
                          <Phone className="w-5 h-5 text-gray-400 mr-3 flex-shrink-0" />
                          <span className="text-gray-600">Fax: {currentOffice.fax}</span>
                        </div>
                      )}
                      
                      <div className="flex items-center">
                        <Mail className="w-5 h-5 text-gray-400 mr-3 flex-shrink-0" />
                        <a href={`mailto:${currentOffice.email}`} className="text-primary-600 hover:text-primary-700">
                          {currentOffice.email}
                        </a>
                      </div>
                      
                      <div className="flex items-center">
                        <Clock className="w-5 h-5 text-gray-400 mr-3 flex-shrink-0" />
                        <span className="text-gray-600">{currentOffice.hours}</span>
                      </div>
                      
                      <div className="flex items-start">
                        <User className="w-5 h-5 text-gray-400 mr-3 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-600">{currentOffice.manager}</span>
                      </div>
                    </div>
                    
                    <div className="mt-6">
                      <h4 className="font-semibold text-gray-900 mb-3">Services Available</h4>
                      <div className="flex flex-wrap gap-2">
                        {currentOffice.services.map((service) => (
                          <span key={service} className="px-2 py-1 bg-primary-50 text-primary-700 text-xs rounded-md">
                            {service}
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    <div className="mt-6">
                      <h4 className="font-semibold text-gray-900 mb-3">Departments</h4>
                      <div className="flex flex-wrap gap-2">
                        {currentOffice.departments.map((dept) => (
                          <span key={dept} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-md">
                            {dept}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </motion.div>
        </div>

        {/* Quick Contact Options */}
        <motion.div
          className="mt-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <div className="bg-gradient-to-r from-primary-600 to-blue-700 rounded-3xl p-8 lg:p-12 text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-32 -mt-32" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full -ml-24 -mb-24" />
            
            <div className="relative z-10">
              <div className="text-center mb-12">
                <h2 className="text-3xl lg:text-4xl font-bold mb-6">
                  Need Immediate Assistance?
                </h2>
                <p className="text-xl text-blue-100">
                  Choose the best way to reach us for your specific needs
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <motion.div
                  className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center border border-white/20"
                  whileHover={{ scale: 1.05, y: -5 }}
                >
                  <Phone className="w-12 h-12 text-yellow-400 mx-auto mb-4" />
                  <h3 className="text-xl font-bold mb-3">Call Us</h3>
                  <p className="text-blue-100 mb-4 text-sm">
                    Speak directly with our experts for immediate assistance
                  </p>
                  <a
                    href="tel:+922135688057"
                    className="btn bg-white text-primary-600 hover:bg-gray-100 btn-sm w-full"
                  >
                    Call Now
                  </a>
                </motion.div>

                <motion.div
                  className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center border border-white/20"
                  whileHover={{ scale: 1.05, y: -5 }}
                >
                  <MessageCircle className="w-12 h-12 text-yellow-400 mx-auto mb-4" />
                  <h3 className="text-xl font-bold mb-3">WhatsApp</h3>
                  <p className="text-blue-100 mb-4 text-sm">
                    Quick responses and easy document sharing
                  </p>
                  <a
                    href="https://wa.me/923568805759"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn bg-white text-primary-600 hover:bg-gray-100 btn-sm w-full inline-flex items-center justify-center"
                  >
                    Chat on WhatsApp
                    <ExternalLink className="w-4 h-4 ml-2" />
                  </a>
                </motion.div>

                <motion.div
                  className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center border border-white/20"
                  whileHover={{ scale: 1.05, y: -5 }}
                >
                  <Calendar className="w-12 h-12 text-yellow-400 mx-auto mb-4" />
                  <h3 className="text-xl font-bold mb-3">Schedule Meeting</h3>
                  <p className="text-blue-100 mb-4 text-sm">
                    Book a consultation with our specialists
                  </p>
                  <button className="btn bg-white text-primary-600 hover:bg-gray-100 btn-sm w-full">
                    Schedule Now
                  </button>
                </motion.div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Emergency Contact */}
        <motion.div
          className="mt-8 bg-red-50 border border-red-200 rounded-xl p-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="bg-red-100 p-2 rounded-full mr-4">
                <Phone className="w-6 h-6 text-red-600" />
              </div>
              <div>
                <h3 className="font-bold text-red-800">24/7 Emergency Line</h3>
                <p className="text-red-600 text-sm">For urgent shipment issues and emergencies</p>
              </div>
            </div>
            <a
              href="tel:+922135688057"
              className="btn bg-red-600 text-white hover:bg-red-700 btn-sm"
            >
              Emergency Contact
            </a>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Contact;
