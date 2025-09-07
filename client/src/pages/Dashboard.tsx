import React, { useEffect } from 'react';
import { useRequireAuth } from '../lib/auth';
import { LoadingSpinner } from '../components/LoadingSpinner';
import { useNavigate } from 'react-router-dom';

const Dashboard: React.FC = () => {
  const auth = useRequireAuth();
  const navigate = useNavigate();

  // Redirect to vessel data entry page after login
  useEffect(() => {
    if (!auth.isLoading && auth.isAuthenticated) {
      navigate('/vessel-data-entry');
    }
  }, [auth.isLoading, auth.isAuthenticated, navigate]);

  if (auth.isLoading) {
    return <LoadingSpinner size="lg" message="Loading dashboard..." />;
  }

  return (
    <div className="px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Vessel Data Management</h1>
        <p className="text-gray-600">Welcome back, {auth.user?.userId}!</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <div className="card cursor-pointer hover:shadow-lg transition-shadow" onClick={() => navigate('/vessel-data-entry')}>
          <div className="card-body text-center">
            <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Add New Vessel</h3>
            <p className="text-gray-600">Enter vessel schedule and tracking information</p>
          </div>
        </div>
        
        <div className="card cursor-pointer hover:shadow-lg transition-shadow" onClick={() => navigate('/vessels')}>
          <div className="card-body text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Manage Vessels</h3>
            <p className="text-gray-600">View and edit existing vessel records</p>
          </div>
        </div>
        
        <div className="card cursor-pointer hover:shadow-lg transition-shadow" onClick={() => navigate('/tracking')}>
          <div className="card-body text-center">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">View Tracking</h3>
            <p className="text-gray-600">Check public vessel tracking page</p>
          </div>
        </div>
      </div>

      <div className="card">
        <div className="card-header">
          <h2 className="text-xl font-semibold text-gray-900">Quick Actions</h2>
        </div>
        <div className="card-body">
          <div className="flex flex-wrap gap-4">
            <button 
              onClick={() => navigate('/vessel-data-entry')}
              className="btn btn-primary"
            >
              Add New Vessel
            </button>
            <button 
              onClick={() => navigate('/vessels')}
              className="btn btn-secondary"
            >
              View All Vessels
            </button>
            <button 
              onClick={() => navigate('/tracking')}
              className="btn btn-ghost"
            >
              Public Tracking
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
