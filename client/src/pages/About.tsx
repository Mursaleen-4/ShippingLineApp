import React from 'react';
import { motion } from 'framer-motion';
import { Ship, Calendar, Target, Heart, Award, Globe, Users, Truck } from 'lucide-react';


const About: React.FC = () => {
  const coreValues = [
    { icon: Heart, title: 'Integrity', description: 'Honest and ethical business practices in all our dealings' },
    { icon: Award, title: 'Innovation', description: 'Embracing new technologies and creative solutions' },
    { icon: Users, title: 'Business Ethics', description: 'Maintaining highest standards of professional conduct' },
    { icon: Globe, title: 'Transparency', description: 'Open communication and clear business operations' },
    { icon: Target, title: 'Customer Focus', description: 'Prioritizing customer satisfaction and success' },
    { icon: Ship, title: 'Commitment', description: 'Dedicated to delivering on our promises since 1951' },
  ];

  const milestones = [
    { year: 1951, event: 'Established as United Oriental Steamship Co., offering liner services between East Pakistan and West Pakistan' },
    { year: 1967, event: 'Baksh Investment Ltd incorporated, expanding into stevedoring, terminal handling, and lighterage operations' },
    { year: 1981, event: 'Yaaseen Shipping Lines established to represent principals' },
    { year: 1984, event: 'Appointed as agents for Orient Overseas Container Line (OOCL)' },
    { year: 2006, event: 'Appointed as agents for STX Pan Ocean Co. Ltd. (now Pan Ocean)' },
    { year: 2007, event: 'Appointed as agents for Maldives National Shipping and formalized joint venture with OOCL' },
    { year: 2007, event: 'Launched dedicated freight forwarding division under UOSL Shipping and Logistics Pvt Ltd' },
    { year: 2011, event: 'Established off-dock empty container depots in Karachi and Lahore Port' },
  ];

  const services = [
    'Liner Shipping Services',
    'Shipping Agencies', 
    'Empty Container Park Facility',
    'Freight Forwarding',
    'Container Trading',
    'Ocean Freight (FCL, LCL, DRY, REEFER)',
    'Ship Husbandry & Vessel Handling',
    'Chartering and Stevedoring',
    'Logistics & Transportation',
    'Consolidated Cargo',
    'Break Bulk & Project Cargo'
  ];

  const offices = [
    {
      name: 'Karachi Office (Head Office)',
      address: '10th Floor, Sheikh Sultan Trust Bldg, Beaumont Road, Karachi, Pakistan',
      phone: '+92-21-35688057-9, 35693004, 6, 7',
      fax: '+92-21-35683051, 35687367',
      email: 'info@yslpk.com'
    },
    {
      name: 'Lahore Office',
      address: 'Grand Square Mall, Office no E9C/2, 9th Floor, Gulberg III Lahore',
      phone: '+92-42-35764134-5 / 35772049',
      email: 'lahore@yslpk.com'
    },
    {
      name: 'Multan Office',
      address: '21 U Business City Plaza Bosan Road Multan',
      phone: '+92-61-6223356 / 6223357',
      email: 'multan@yslpk.com'
    },
    {
      name: 'Faisalabad Office',
      address: '22, Chenab Market, Madina Town, Faisalabad, Pakistan',
      phone: '+92-41-8532256-7',
      email: 'faisalabad@yslpk.com'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary-600 to-blue-700 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex items-center justify-center mb-6">
              <Ship className="h-16 w-16 text-white mr-4" />
              <div className="text-left">
                <h1 className="text-5xl font-bold">Yaaseen Shipping Lines</h1>
                <p className="text-xl text-blue-100 mt-2">United Oriental Steamship Co. (UOSL)</p>
              </div>
            </div>
            <p className="text-2xl text-blue-100 italic">"Delivering promises since 1951"</p>
            <div className="flex items-center justify-center mt-8 space-x-8">
              <div className="text-center">
                <div className="text-4xl font-bold">70+</div>
                <div className="text-blue-100">Years of Excellence</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold">4</div>
                <div className="text-blue-100">Major Cities</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold">Global</div>
                <div className="text-blue-100">Network</div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Vision & Mission</h2>
              <div className="space-y-6">
                <div className="p-6 bg-primary-50 rounded-lg border border-primary-100">
                  <h3 className="text-xl font-semibold text-primary-900 mb-3">Vision</h3>
                  <p className="text-gray-700 leading-relaxed">
                    To provide Professional and dedicated quality service to all our Customers, Principals and stakeholders.
                  </p>
                </div>
                <div className="p-6 bg-blue-50 rounded-lg border border-blue-100">
                  <h3 className="text-xl font-semibold text-blue-900 mb-3">Ambition</h3>
                  <p className="text-gray-700 leading-relaxed">
                    To be recognized as the leading name in the industry, driven to meet customer objectives efficiently and effectively.
                  </p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Core Values</h2>
              <div className="grid grid-cols-2 gap-4">
                {coreValues.map((value, index) => {
                  const Icon = value.icon;
                  return (
                    <motion.div
                      key={value.title}
                      className="p-4 bg-gray-50 rounded-lg border border-gray-200 hover:shadow-md transition-shadow"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                    >
                      <Icon className="w-8 h-8 text-primary-600 mb-3" />
                      <h3 className="font-semibold text-gray-900 mb-2">{value.title}</h3>
                      <p className="text-sm text-gray-600">{value.description}</p>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Company History */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Journey Through Time</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              From humble beginnings in 1951 to becoming a leading maritime services provider in Pakistan and beyond.
            </p>
          </motion.div>

          <div className="relative">
            <div className="absolute left-1/2 transform -translate-x-px h-full w-0.5 bg-primary-200"></div>
            {milestones.map((milestone, index) => (
              <motion.div
                key={milestone.year}
                className={`relative flex items-center ${
                  index % 2 === 0 ? 'justify-start' : 'justify-end'
                } mb-8`}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
              >
                <div className={`w-5/12 ${index % 2 === 0 ? 'text-right pr-8' : 'text-left pl-8'}`}>
                  <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
                    <div className="flex items-center mb-3">
                      <Calendar className="w-5 h-5 text-primary-600 mr-2" />
                      <span className="text-2xl font-bold text-primary-600">{milestone.year}</span>
                    </div>
                    <p className="text-gray-700 leading-relaxed">{milestone.event}</p>
                  </div>
                </div>
                <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-primary-600 rounded-full border-4 border-white"></div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Services</h2>
            <p className="text-xl text-gray-600">Comprehensive maritime and logistics solutions</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, index) => (
              <motion.div
                key={service}
                className="p-6 bg-gray-50 rounded-lg border border-gray-200 hover:shadow-md transition-all duration-300 hover:border-primary-300"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
              >
                <Truck className="w-8 h-8 text-primary-600 mb-3" />
                <h3 className="font-semibold text-gray-900">{service}</h3>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Office Locations */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Network</h2>
            <p className="text-xl text-gray-600">Serving you across Pakistan's major commercial centers</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {offices.map((office, index) => (
              <motion.div
                key={office.name}
                className="bg-white p-6 rounded-lg shadow-md border border-gray-200"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
              >
                <h3 className="text-xl font-bold text-gray-900 mb-4">{office.name}</h3>
                <div className="space-y-3 text-gray-600">
                  <p><strong>Address:</strong> {office.address}</p>
                  <p><strong>Phone:</strong> {office.phone}</p>
                  {office.fax && <p><strong>Fax:</strong> {office.fax}</p>}
                  <p><strong>Email:</strong> 
                    <a href={`mailto:${office.email}`} className="text-primary-600 hover:text-primary-700 ml-1">
                      {office.email}
                    </a>
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pakistan Information */}
      <section className="py-16 bg-primary-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl font-bold text-center mb-12">Pakistan - Our Home</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h3 className="text-2xl font-bold mb-6">Islamic Republic of Pakistan</h3>
                <div className="space-y-4 text-primary-100">
                  <p><strong className="text-white">Population:</strong> Approximately 241 million</p>
                  <p><strong className="text-white">Currency:</strong> Pakistani Rupee (PKR)</p>
                  <p><strong className="text-white">Capital:</strong> Islamabad</p>
                  <p><strong className="text-white">Coastline:</strong> Arabian Sea access providing strategic maritime trade routes</p>
                  <p><strong className="text-white">Borders:</strong> Iran, Afghanistan, China, and India</p>
                  <p><strong className="text-white">Agricultural Area:</strong> 22.51 million hectares of cropped land</p>
                  <p><strong className="text-white">Coal Reserves:</strong> 175 billion tons (equivalent to ~618 billion barrels of crude oil)</p>
                </div>
              </div>
              <div>
                <h3 className="text-2xl font-bold mb-6">Key Trade Commodities</h3>
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <h4 className="text-lg font-semibold text-white mb-3">Major Exports</h4>
                    <ul className="text-primary-100 space-y-1 text-sm">
                      <li>• Cotton & Textile goods</li>
                      <li>• Grains & Animal feed</li>
                      <li>• Cement & Construction materials</li>
                      <li>• Leather items</li>
                      <li>• Fruits & Vegetables</li>
                      <li>• Seafood</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-white mb-3">Major Imports</h4>
                    <ul className="text-primary-100 space-y-1 text-sm">
                      <li>• Industrial Equipment</li>
                      <li>• Vehicles & Automobiles</li>
                      <li>• Iron ore & Steel</li>
                      <li>• Petroleum products</li>
                      <li>• Electronics</li>
                      <li>• Edible oils</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            
          </motion.div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Ready to Work With Us?</h2>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Experience seven decades of maritime excellence. Contact us today to discuss your shipping and logistics needs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="mailto:info@yslpk.com"
                className="btn btn-primary btn-lg inline-flex items-center"
              >
                Contact Us
              </a>
              <a
                href="https://wa.me/923568805759"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-secondary btn-lg inline-flex items-center"
              >
                WhatsApp Chat
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default About;
