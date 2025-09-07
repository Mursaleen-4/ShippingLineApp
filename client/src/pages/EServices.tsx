import React, { useState, ChangeEvent, FC, ReactElement } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Newspaper,
  Container,
  FileText,
  Calendar,
  Search,
  Calculator,
  ArrowRight
} from "lucide-react";

import { Link } from 'react-router-dom';
import { LucideIcon } from "lucide-react";

interface IService {
  id: string;
  title: string;
  icon: LucideIcon;
  description: string;
}

const services: IService[] = [
  {
    id: "tracking",
    title: "Cargo Tracking",
    icon: Search,
    description: "Track your shipment in real-time with our advanced cargo tracking system."
  },
  {
    id: "schedules",
    title: "Shipping Schedules",
    icon: Calendar,
    description: "Access up-to-date shipping schedules for better planning and logistics."
  },
  {
    id: "calculator",
    title: "Freight Calculator",
    icon: Calculator,
    description: "Easily calculate shipping costs based on cargo details and destination."
  },
  {
    id: "documents",
    title: "Document Management",
    icon: FileText,
    description: "Upload, manage, and access your shipping documents securely online."
  },
  {
    id: "news",
    title: "Industry News",
    icon: Newspaper,
    description: "Stay informed with the latest updates and insights from the shipping industry."
  },
  {
    id: "containers",
    title: "Container Management",
    icon: Container,
    description: "Manage and monitor your containers efficiently with our tools."
  }
];

const EServices: FC = (): ReactElement => {
  const [searchTerm, setSearchTerm] = useState<string>("");

  const handleSearch = (e: ChangeEvent<HTMLInputElement>): void => {
    setSearchTerm(e.target.value.toLowerCase());
  };

  const filteredServices = services.filter(service =>
    service.title.toLowerCase().includes(searchTerm) ||
    service.description.toLowerCase().includes(searchTerm)
  );

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">E-Services</h1>
        <p className="text-lg text-gray-600">
          Access our digital services for seamless shipping and logistics experience
        </p>
      </div>

      <div className="max-w-xl mx-auto mb-12">
        <div className="relative">
          <Search className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search services..."
            value={searchTerm}
            onChange={handleSearch}
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          />
        </div>
      </div>

      <AnimatePresence>
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {filteredServices.map((service) => (
            <motion.div
              key={service.id}
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 p-6"
            >
              <div className="flex items-center mb-4">
                <service.icon className="w-10 h-10 text-primary-600 mr-3" />
                <h3 className="text-xl font-semibold">{service.title}</h3>
              </div>
              <p className="text-gray-600 mb-6">{service.description}</p>
              <Link
                to={`/eservices/${service.id}`}
                className="inline-flex items-center text-primary-600 hover:text-primary-700 font-medium"
              >
                Learn more
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default EServices;
