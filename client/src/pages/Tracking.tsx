import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { vesselsApi } from '../lib/api';
import { LoadingSpinner } from '../components/LoadingSpinner';
import { Vessel, VesselQuery, VesselListResponse } from '../lib/types';
import { Search, Ship, Calendar, Globe, Anchor, Truck, ChevronLeft, ChevronRight, ChevronUp, ChevronDown } from 'lucide-react';
import { format } from 'date-fns';

const Tracking: React.FC = () => {
  const [vessels, setVessels] = useState<Vessel[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [filters, setFilters] = useState<VesselQuery>({
    page: 1,
    limit: 10,
    sort: '-ETA',
  });
  const [pagination, setPagination] = useState<VesselListResponse['pagination']>({ 
    page: 1, limit: 10, total: 0, totalPages: 1, hasNextPage: false, hasPreviousPage: false 
  });

  // Function to determine vessel status based on ETA/ETD
  const getVesselStatus = (eta: string, etd: string): string => {
    const now = new Date();
    const etaDate = new Date(eta);
    const etdDate = new Date(etd);
    
    if (now > etdDate) {
      return 'DEPARTED';
    } else if (now >= etaDate && now <= etdDate) {
      return 'AT PORT';
    } else {
      return 'UPCOMING';
    }
  };

  // Function to format date like in reference (MM/DD/YYYY HH:MM:SS AM/PM)
  const formatDateTime = (dateString: string): string => {
    const date = new Date(dateString);
    return format(date, 'MM/dd/yyyy hh:mm:ss a');
  };

  const fetchVessels = useCallback(async () => {
    setLoading(true);
    try {
      const response = await vesselsApi.getVessels({
        ...filters,
        q: searchQuery,
      });
      setVessels(response.data);
      setPagination(response.pagination);
    } catch (error) {
      console.error('Failed to fetch vessels:', error);
      // Optionally show a toast error
    } finally {
      setLoading(false);
    }
  }, [filters, searchQuery]);

  useEffect(() => {
    fetchVessels();
  }, [fetchVessels]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFilters(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
      page: 1, // Reset to first page on filter change
    }));
  };

  const handlePageChange = (newPage: number) => {
    setFilters(prev => ({
      ...prev,
      page: newPage,
    }));
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFilters(prev => ({ ...prev, page: 1 })); // Reset to first page on search
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 flex items-center">
            <Ship className="w-8 h-8 mr-3 text-blue-600" />
            VESSEL SCHEDULE
          </h1>
          <div className="w-full h-px bg-gray-300 mt-4"></div>
        </div>

        {/* Table Controls */}
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center">
            <span className="text-sm text-gray-700 mr-2">Show</span>
            <select
              value={filters.limit}
              onChange={(e) => setFilters(prev => ({ ...prev, limit: parseInt(e.target.value), page: 1 }))}
              className="border border-gray-300 rounded px-2 py-1 text-sm"
            >
              <option value={10}>10</option>
              <option value={25}>25</option>
              <option value={50}>50</option>
              <option value={100}>100</option>
            </select>
            <span className="text-sm text-gray-700 ml-2">entries</span>
          </div>
          
          <div className="flex items-center">
            <span className="text-sm text-gray-700 mr-2">Search:</span>
            <input
              type="text"
              value={searchQuery}
              onChange={handleSearchChange}
              className="border border-gray-300 rounded px-3 py-1 text-sm"
              placeholder="Search vessels..."
            />
          </div>
        </div>

        {/* Vessel Table */}
        <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
          {loading ? (
            <div className="p-8 text-center">
              <LoadingSpinner message="Loading vessels..." />
            </div>
          ) : vessels.length === 0 ? (
            <div className="p-8 text-center text-gray-600">
              No vessels found matching your criteria.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      <div className="flex items-center">
                        VESSEL NAME
                        <div className="ml-1 flex flex-col">
                          <ChevronUp className="w-3 h-3 text-gray-400" />
                          <ChevronDown className="w-3 h-3 text-gray-400 -mt-1" />
                        </div>
                      </div>
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      <div className="flex items-center">
                        VOYAGE
                        <div className="ml-1 flex flex-col">
                          <ChevronUp className="w-3 h-3 text-gray-400" />
                          <ChevronDown className="w-3 h-3 text-gray-400 -mt-1" />
                        </div>
                      </div>
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      <div className="flex items-center">
                        ETA
                        <div className="ml-1 flex flex-col">
                          <ChevronUp className="w-3 h-3 text-gray-400" />
                          <ChevronDown className="w-3 h-3 text-gray-400 -mt-1" />
                        </div>
                      </div>
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      <div className="flex items-center">
                        ETD
                        <div className="ml-1 flex flex-col">
                          <ChevronUp className="w-3 h-3 text-gray-400" />
                          <ChevronDown className="w-3 h-3 text-gray-400 -mt-1" />
                        </div>
                      </div>
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      <div className="flex items-center">
                        STATUS
                        <div className="ml-1 flex flex-col">
                          <ChevronUp className="w-3 h-3 text-gray-400" />
                          <ChevronDown className="w-3 h-3 text-gray-400 -mt-1" />
                        </div>
                      </div>
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {vessels.map((vessel) => {
                    const status = getVesselStatus(vessel.ETA, vessel.ETD);
                    return (
                      <tr key={vessel._id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {vessel.vesselName}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {vessel.voyageNo}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {formatDateTime(vessel.ETA)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {formatDateTime(vessel.ETD)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                            status === 'UPCOMING' 
                              ? 'bg-blue-100 text-blue-800' 
                              : status === 'AT PORT'
                              ? 'bg-yellow-100 text-yellow-800'
                              : 'bg-gray-100 text-gray-800'
                          }`}>
                            {status}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}

          {/* Pagination */}
          {pagination.totalPages > 1 && (
            <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
              <div className="flex-1 flex justify-between sm:justify-end">
                <button
                  onClick={() => handlePageChange(pagination.page - 1)}
                  disabled={!pagination.hasPreviousPage}
                  className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <ChevronLeft className="w-5 h-5 mr-2" /> Previous
                </button>
                <button
                  onClick={() => handlePageChange(pagination.page + 1)}
                  disabled={!pagination.hasNextPage}
                  className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Next <ChevronRight className="w-5 h-5 ml-2" />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Tracking;
