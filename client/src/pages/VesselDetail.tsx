import React from 'react';
import { useRequireAuth } from '../lib/auth';
import { LoadingSpinner } from '../components/LoadingSpinner';

const VesselDetail: React.FC = () => {
  const auth = useRequireAuth();

  if (auth.isLoading) {
    return <LoadingSpinner size="lg" message="Loading vessel details..." />;
  }

  return (
    <div className="px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Vessel Details</h1>
        <p className="text-gray-600">View and manage individual vessel information</p>
      </div>
      
      <div className="card">
        <div className="card-body">
          <p className="text-gray-600">Vessel detail view coming soon...</p>
        </div>
      </div>
    </div>
  );
};

export default VesselDetail;
