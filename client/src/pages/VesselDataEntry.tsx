import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import toast from 'react-hot-toast';
import { vesselsApi } from '../lib/api';
import { LoadingSpinner } from '../components/LoadingSpinner';
import { Ship, Calendar, Globe, Anchor, Truck } from 'lucide-react';

// Zod schema for form validation
const vesselSchema = z.object({
  vesselName: z.string().min(2, 'Vessel name is required').max(100),
  voyageNo: z.string().min(2, 'Voyage number is required').max(50),
  country: z.string().min(2, 'Country is required').max(60),
  portName: z.string().min(2, 'Port name is required').max(80),
  ETA: z.string().min(1, 'ETA is required').refine((val) => !isNaN(new Date(val).getTime()), 'Invalid ETA date'),
  ETD: z.string().min(1, 'ETD is required').refine((val) => !isNaN(new Date(val).getTime()), 'Invalid ETD date'),
}).refine((data) => new Date(data.ETD) > new Date(data.ETA), {
  message: "ETD must be after ETA",
  path: ["ETD"],
});

type VesselFormInput = z.infer<typeof vesselSchema>;

const VesselDataEntry: React.FC = () => {
  const { register, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm<VesselFormInput>({
    resolver: zodResolver(vesselSchema),
  });

  const onSubmit = async (data: VesselFormInput) => {
    try {
      await vesselsApi.createVessel(data);
      toast.success('Vessel data added successfully!');
      reset(); // Clear form after successful submission
    } catch (error: any) {
      toast.error(error.message || 'Failed to add vessel data.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto bg-white p-8 rounded-xl shadow-lg border border-gray-100">
        <h2 className="text-3xl font-extrabold text-gray-900 text-center mb-6">
          <Ship className="inline-block w-8 h-8 mr-2 text-primary-600" />
          Add New Vessel Data
        </h2>
        <p className="text-center text-gray-600 mb-8">Enter the details for a new shipping vessel and its voyage.</p>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <label htmlFor="vesselName" className="form-label">Vessel Name</label>
            <div className="mt-1 relative rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Ship className="h-5 w-5 text-gray-400" aria-hidden="true" />
              </div>
              <input
                type="text"
                id="vesselName"
                {...register('vesselName')}
                className="input pl-10"
                placeholder="e.g., MSC Mediterranean"
              />
            </div>
            {errors.vesselName && <p className="text-red-500 text-sm mt-1">{errors.vesselName.message}</p>}
          </div>

          <div>
            <label htmlFor="voyageNo" className="form-label">Voyage Number</label>
            <div className="mt-1 relative rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Truck className="h-5 w-5 text-gray-400" aria-hidden="true" />
              </div>
              <input
                type="text"
                id="voyageNo"
                {...register('voyageNo')}
                className="input pl-10"
                placeholder="e.g., VOY00123"
              />
            </div>
            {errors.voyageNo && <p className="text-red-500 text-sm mt-1">{errors.voyageNo.message}</p>}
          </div>

          <div>
            <label htmlFor="country" className="form-label">Country</label>
            <div className="mt-1 relative rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Globe className="h-5 w-5 text-gray-400" aria-hidden="true" />
              </div>
              <input
                type="text"
                id="country"
                {...register('country')}
                className="input pl-10"
                placeholder="e.g., Pakistan"
              />
            </div>
            {errors.country && <p className="text-red-500 text-sm mt-1">{errors.country.message}</p>}
          </div>

          <div>
            <label htmlFor="portName" className="form-label">Port Name</label>
            <div className="mt-1 relative rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Anchor className="h-5 w-5 text-gray-400" aria-hidden="true" />
              </div>
              <input
                type="text"
                id="portName"
                {...register('portName')}
                className="input pl-10"
                placeholder="e.g., Karachi Port"
              />
            </div>
            {errors.portName && <p className="text-red-500 text-sm mt-1">{errors.portName.message}</p>}
          </div>

          <div>
            <label htmlFor="ETA" className="form-label">Estimated Time of Arrival (ETA)</label>
            <div className="mt-1 relative rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Calendar className="h-5 w-5 text-gray-400" aria-hidden="true" />
              </div>
              <input
                type="datetime-local"
                id="ETA"
                {...register('ETA')}
                className="input pl-10"
              />
            </div>
            {errors.ETA && <p className="text-red-500 text-sm mt-1">{errors.ETA.message}</p>}
          </div>

          <div>
            <label htmlFor="ETD" className="form-label">Estimated Time of Departure (ETD)</label>
            <div className="mt-1 relative rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Calendar className="h-5 w-5 text-gray-400" aria-hidden="true" />
              </div>
              <input
                type="datetime-local"
                id="ETD"
                {...register('ETD')}
                className="input pl-10"
              />
            </div>
            {errors.ETD && <p className="text-red-500 text-sm mt-1">{errors.ETD.message}</p>}
            {errors.root?.ETD && <p className="text-red-500 text-sm mt-1">{errors.root.ETD.message}</p>}
          </div>

          <div>
            <button
              type="submit"
              className="btn btn-primary w-full relative"
              disabled={isSubmitting}
            >
              {isSubmitting ? <LoadingSpinner size="sm" /> : 'Add Vessel'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default VesselDataEntry;