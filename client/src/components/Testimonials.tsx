import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Quote, Star, ChevronLeft, ChevronRight, Building2, MapPin } from 'lucide-react';

interface Testimonial {
  id: number;
  content: string;
  author: string;
  company: string;
  position: string;
  location: string;
  rating: number;
  image?: string;
  companyLogo?: string;
}

const Testimonials: React.FC = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  const testimonials: Testimonial[] = [
    {
      id: 1,
      content: "We wish to convey our sincere thanks to your organization which has been working with Al Rana Equipment & Machinery Trading (Pvt.) Ltd. since 2003. We would like to take this opportunity to thank everyone of your team for the exceptional support and help you provided us during the past times and gave us workable solutions and ideas to reach our business objectives.",
      author: "Management Team",
      company: "Al Rana Equipment & Machinery Trading",
      position: "Director",
      location: "Karachi, Pakistan",
      rating: 5,
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
    },
    {
      id: 2,
      content: "Yaaseen Shipping Lines has been our trusted logistics partner for over a decade. Their commitment to excellence and professional service delivery has helped us streamline our supply chain operations across multiple routes.",
      author: "Ahmed Hassan",
      company: "Global Trade Solutions",
      position: "Supply Chain Manager",
      location: "Lahore, Pakistan",
      rating: 5,
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
    },
    {
      id: 3,
      content: "The OOCL joint venture with UOSL has transformed our container operations. Their efficient handling and reliable scheduling have significantly improved our import-export operations. Highly recommended!",
      author: "Sarah Khan",
      company: "Textile Exporters Association",
      position: "Operations Director",
      location: "Faisalabad, Pakistan",
      rating: 5,
      image: "https://images.unsplash.com/photo-1494790108755-2616c9975280?w=150&h=150&fit=crop&crop=face",
    },
    {
      id: 4,
      content: "Outstanding freight forwarding services with transparent pricing and timely deliveries. Their team's expertise in handling complex shipments has made them our go-to logistics partner for international trade.",
      author: "Mohammad Ali",
      company: "Industrial Solutions Inc.",
      position: "CEO",
      location: "Multan, Pakistan",
      rating: 5,
      image: "https://images.unsplash.com/photo-1556157382-97eda2f9e2bf?w=150&h=150&fit=crop&crop=face",
    }
  ];

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const goToTestimonial = (index: number) => {
    setCurrentTestimonial(index);
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star
        key={index}
        className={`w-5 h-5 ${index < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
      />
    ));
  };

  return (
    <section className="py-20 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-full h-full bg-repeat" 
             style={{
               backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000' fill-opacity='1'%3E%3Ccircle cx='30' cy='30' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
               backgroundSize: '60px 60px'
             }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="flex justify-center mb-6">
            <div className="bg-primary-100 p-4 rounded-full">
              <Quote className="w-8 h-8 text-primary-600" />
            </div>
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Client Testimonials
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Hear from our valued clients about their experience with our maritime and logistics services
          </p>
        </motion.div>

        <div className="relative max-w-5xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentTestimonial}
              className="bg-white rounded-2xl shadow-2xl p-8 lg:p-12 relative overflow-hidden"
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
            >
              {/* Decorative Elements */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-primary-100 to-blue-100 rounded-bl-full opacity-50" />
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-yellow-100 to-orange-100 rounded-tr-full opacity-50" />
              
              {/* Large Quote Icon */}
              <Quote className="w-16 h-16 text-primary-200 absolute top-8 left-8 transform rotate-180" />
              
              <div className="relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
                  {/* Testimonial Content */}
                  <div className="lg:col-span-2 order-2 lg:order-1">
                    <div className="flex items-center mb-6">
                      {renderStars(testimonials[currentTestimonial].rating)}
                      <span className="ml-3 text-gray-600 font-medium">
                        {testimonials[currentTestimonial].rating}.0 out of 5
                      </span>
                    </div>
                    
                    <blockquote className="text-lg lg:text-xl text-gray-700 leading-relaxed mb-8 font-medium italic">
                      "{testimonials[currentTestimonial].content}"
                    </blockquote>

                    <div className="border-t border-gray-200 pt-6">
                      <div className="flex items-center">
                        <div className="flex-shrink-0">
                          <img
                            src={testimonials[currentTestimonial].image}
                            alt={testimonials[currentTestimonial].author}
                            className="w-12 h-12 rounded-full object-cover border-2 border-primary-200"
                          />
                        </div>
                        <div className="ml-4">
                          <div className="font-bold text-gray-900 text-lg">
                            {testimonials[currentTestimonial].author}
                          </div>
                          <div className="text-primary-600 font-medium">
                            {testimonials[currentTestimonial].position}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Company Info */}
                  <div className="order-1 lg:order-2 text-center lg:text-left">
                    <div className="bg-gradient-to-br from-primary-50 to-blue-50 p-6 rounded-xl border border-primary-100">
                      <div className="flex justify-center lg:justify-start mb-4">
                        <div className="bg-white p-3 rounded-lg shadow-sm">
                          <Building2 className="w-8 h-8 text-primary-600" />
                        </div>
                      </div>
                      <h3 className="font-bold text-gray-900 text-lg mb-2">
                        {testimonials[currentTestimonial].company}
                      </h3>
                      <div className="flex items-center justify-center lg:justify-start text-gray-600">
                        <MapPin className="w-4 h-4 mr-1" />
                        <span className="text-sm">{testimonials[currentTestimonial].location}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation Arrows */}
          <button
            onClick={prevTestimonial}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 -translate-x-4 bg-white shadow-lg hover:shadow-xl text-primary-600 p-3 rounded-full transition-all duration-300 group border border-gray-200"
          >
            <ChevronLeft className="w-6 h-6 group-hover:scale-110 transition-transform" />
          </button>
          
          <button
            onClick={nextTestimonial}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 translate-x-4 bg-white shadow-lg hover:shadow-xl text-primary-600 p-3 rounded-full transition-all duration-300 group border border-gray-200"
          >
            <ChevronRight className="w-6 h-6 group-hover:scale-110 transition-transform" />
          </button>
        </div>

        {/* Testimonial Indicators */}
        <div className="flex justify-center mt-12 space-x-3">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => goToTestimonial(index)}
              className={`h-3 rounded-full transition-all duration-300 ${
                index === currentTestimonial
                  ? 'bg-primary-600 w-8'
                  : 'bg-gray-300 hover:bg-gray-400 w-3'
              }`}
            />
          ))}
        </div>

        {/* Call to Action */}
        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <p className="text-lg text-gray-600 mb-6">
            Ready to experience our exceptional service?
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.a
              href="/contact"
              className="btn btn-primary btn-lg px-8 py-3 inline-flex items-center justify-center"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Get Started Today
            </motion.a>
            <motion.a
              href="/services"
              className="btn btn-secondary btn-lg px-8 py-3 inline-flex items-center justify-center"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              View Our Services
            </motion.a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Testimonials;
