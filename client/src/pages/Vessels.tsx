import React from 'react';
import { useRequireAuth } from '../lib/auth';
import { LoadingSpinner } from '../components/LoadingSpinner';

const Vessels: React.FC = () => {
  const auth = useRequireAuth();

  if (auth.isLoading) {
    return <LoadingSpinner size="lg" message="Loading vessels..." />;
  }

  return (
    <div className="px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Vessels</h1>
        <p className="text-gray-600">Manage your fleet and vessel schedules</p>
      </div>
      
      <div className="card">
        <div className="card-body">
          <p className="text-gray-600">Vessel management interface coming soon...</p>
          <p className="text-sm text-gray-500 mt-2">
            This will include vessel listing, search, filtering, CRUD operations, and real-time tracking.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Vessels;
