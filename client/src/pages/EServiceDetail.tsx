import React, { FC, ReactElement, useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { LucideIcon } from 'lucide-react';
import {
  Newspaper,
  Container,
  FileText,
  Calendar,
  Search,
  Calculator,
} from "lucide-react";

interface IService {
  id: string;
  title: string;
  icon: LucideIcon;
  description: string;
  longDescription?: string;
}

const services: IService[] = [
  {
    id: "tracking",
    title: "Cargo Tracking",
    icon: Search,
    description: "Track your shipment in real-time with our advanced cargo tracking system.",
    longDescription: "Our cargo tracking system provides real-time updates on your shipment's location, status, and estimated arrival time. With our user-friendly interface, you can easily track multiple shipments simultaneously and receive notifications about any changes or delays. This service is available 24/7 and accessible from any device with internet connection."
  },
  {
    id: "schedules",
    title: "Shipping Schedules",
    icon: Calendar,
    description: "Access up-to-date shipping schedules for better planning and logistics.",
    longDescription: "Stay informed about our vessel schedules with our comprehensive shipping schedule service. Plan your logistics operations efficiently with accurate departure and arrival times, port rotations, and vessel details. Our schedules are updated in real-time to reflect any changes due to weather conditions, port congestion, or other factors that might affect shipping timelines."
  },
  {
    id: "calculator",
    title: "Freight Calculator",
    icon: Calculator,
    description: "Easily calculate shipping costs based on cargo details and destination.",
    longDescription: "Our freight calculator helps you estimate shipping costs quickly and accurately. Simply enter your cargo details, origin, and destination, and our tool will provide you with a cost estimate. This service supports various cargo types, container sizes, and shipping routes, making it easier for you to budget and plan your shipments."
  },
  {
    id: "documents",
    title: "Document Management",
    icon: FileText,
    description: "Upload, manage, and access your shipping documents securely online.",
    longDescription: "Our document management system allows you to store, organize, and access all your shipping documents in one secure location. Upload bills of lading, commercial invoices, packing lists, and other important documents, and share them securely with authorized parties. This paperless solution streamlines your documentation process and ensures compliance with regulatory requirements."
  },
  {
    id: "news",
    title: "Industry News",
    icon: Newspaper,
    description: "Stay informed with the latest updates and insights from the shipping industry.",
    longDescription: "Keep up with the latest developments in the shipping and logistics industry through our curated news service. Our team of experts provides analysis and insights on market trends, regulatory changes, technological advancements, and other factors that might impact your shipping operations. Stay ahead of the curve with our timely and relevant industry updates."
  },
  {
    id: "containers",
    title: "Container Management",
    icon: Container,
    description: "Manage and monitor your containers efficiently with our tools.",
    longDescription: "Our container management service helps you track and manage your containers throughout their journey. Monitor container availability, location, and status in real-time, and receive alerts about any issues or delays. This service also provides insights into container utilization and helps you optimize your container fleet for maximum efficiency and cost-effectiveness."
  }
];

const EServiceDetail: FC = (): ReactElement => {
  const { id } = useParams<{ id: string }>();
  const [service, setService] = useState<IService | null>(null);

  useEffect(() => {
    const foundService = services.find(s => s.id === id);
    setService(foundService || null);
  }, [id]);

  if (!service) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <h1 className="text-2xl font-bold mb-4">Service not found</h1>
        <p className="mb-6">The service you're looking for doesn't exist or has been removed.</p>
        <Link to="/eservices" className="inline-flex items-center text-primary-600 hover:text-primary-700 font-medium">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to E-Services
        </Link>
      </div>
    );
  }

  const ServiceIcon = service.icon;

  return (
    <div className="container mx-auto px-4 py-12">
      <Link to="/eservices" className="inline-flex items-center text-primary-600 hover:text-primary-700 font-medium mb-8">
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to E-Services
      </Link>

      <div className="bg-white rounded-xl shadow-lg p-8">
        <div className="flex items-center mb-6">
          <ServiceIcon className="w-12 h-12 text-primary-600 mr-4" />
          <h1 className="text-3xl font-bold">{service.title}</h1>
        </div>

        <div className="prose prose-lg max-w-none">
          <p className="text-xl text-gray-600 mb-6">{service.description}</p>
          <p className="mb-6">{service.longDescription}</p>

          <div className="mt-8 p-6 bg-gray-50 rounded-lg border border-gray-100">
            <h2 className="text-xl font-semibold mb-4">How to use this service</h2>
            <p>
              To get started with our {service.title.toLowerCase()} service, please contact our customer service team or log in to your account. Our team will guide you through the process and provide any assistance you might need.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EServiceDetail;