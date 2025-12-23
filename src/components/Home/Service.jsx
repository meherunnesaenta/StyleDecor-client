import { useState, useMemo } from 'react';
import Card from './Card';
import Container from '../Shared/Container';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import Heading from '../Shared/Heading';
import Loading from '../Loading/Loading';
import { FiSearch, FiFilter, FiX } from 'react-icons/fi';

const Service = () => {
  const axiosSecure = useAxiosSecure();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('all');
  const [minBudget, setMinBudget] = useState('');
  const [maxBudget, setMaxBudget] = useState('');
  const [showFilters, setShowFilters] = useState(false);

  const { data: services = [], isLoading, error } = useQuery({
    queryKey: ['services'],
    queryFn: async () => {
      const { data } = await axiosSecure.get('/service');
      return data;
    },
  });

  // Unique service types (serviceMode বা category থেকে)
  const serviceTypes = useMemo(() => {
    const types = ['all'];
    services.forEach(service => {
      const type = service?.serviceMode || service?.category;
      if (type && !types.includes(type)) {
        types.push(type);
      }
    });
    return types;
  }, [services]);

  // Filtered services
  const filteredServices = useMemo(() => {
    if (!Array.isArray(services)) return [];

    return services.filter(service => {
      if (!service) return false;

      // Search by service_name
      const serviceName = (service.service_name || '').toLowerCase();
      const matchesSearch = searchTerm
        ? serviceName.includes(searchTerm.toLowerCase())
        : true;

      // Filter by type
      const serviceType = service.serviceMode || service.category || '';
      const matchesType = selectedType === 'all' || serviceType === selectedType;

      // Filter by cost
      let matchesBudget = true;
      const servicePrice = Number(service.cost) || 0;

      if (minBudget) {
        const min = Number(minBudget);
        if (!isNaN(min) && servicePrice < min) {
          matchesBudget = false;
        }
      }

      if (maxBudget) {
        const max = Number(maxBudget);
        if (!isNaN(max) && servicePrice > max) {
          matchesBudget = false;
        }
      }

      return matchesSearch && matchesType && matchesBudget;
    });
  }, [services, searchTerm, selectedType, minBudget, maxBudget]);

  // Reset all filters
  const resetFilters = () => {
    setSearchTerm('');
    setSelectedType('all');
    setMinBudget('');
    setMaxBudget('');
  };

  if (error) {
    return (
      <Container>
        <div className='pt-20 pb-8 text-center'>
          <Heading
            title='Error Loading Services'
            subtitle='Unable to load services at the moment'
            center={true}
          />
          <p className='text-red-500 mt-4'>Error: {error.message}</p>
          <button
            onClick={() => window.location.reload()}
            className='mt-6 px-6 py-2 bg-primary text-white rounded-lg hover:bg-blue-700 transition-colors'
          >
            Try Again
          </button>
        </div>
      </Container>
    );
  }

  if (isLoading) return <Loading />;

  return (
    <Container>
      <div className='pt-20 pb-8'>
        <Heading text-primary
          title='Our Decoration Services'
          subtitle='Choose from a wide range of professional decoration services for any occasion'
          center={true}
        />
      </div>

      {/* Search and Filter Bar */}
      <div className='mb-8 space-y-4'>
        {/* Search Input */}
        <div className='relative max-w-2xl mx-auto'>
          <FiSearch className='absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400' />
          <input
            type='text'
            placeholder='Search services by name...'
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className='w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all'
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm('')}
              className='absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600'
            >
              <FiX size={20} />
            </button>
          )}
        </div>

        {/* Filter Toggle */}
        <div className='text-center text-secondary'>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className='inline-flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors'
          >
            <FiFilter />
            {showFilters ? 'Hide Filters' : 'Show Filters'}
          </button>
        </div>

        {/* Filter Panel */}
        {showFilters && (
          <div className='max-w-4xl mx-auto p-6 bg-white border border-gray-200 rounded-xl shadow-sm'>
            <div className='flex justify-between items-center mb-4'>
              <h3 className='text-lg font-semibold text-gray-800'>Filter Services</h3>
              <button
                onClick={resetFilters}
                className='text-sm text-blue-600 hover:text-blue-800 flex items-center gap-1'
              >
                <FiX /> Reset All
              </button>
            </div>

            <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
              {/* Service Type Filter */}
              <div>
                <label className='block text-sm font-medium text-gray-700 mb-2'>
                  Service Type
                </label>
                <select
                  value={selectedType}
                  onChange={(e) => setSelectedType(e.target.value)}
                  className='w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none'
                >
                  {serviceTypes.map((type) => (
                    <option key={type} value={type}>
                      {type === 'all' 
                        ? 'All Types' 
                        : type.charAt(0).toUpperCase() + type.slice(1).replace('-', ' ')}
                    </option>
                  ))}
                </select>
              </div>

              {/* Min Budget */}
              <div>
                <label className='block text-sm font-medium text-gray-700 mb-2 flex items-center gap-1'>
                  <span className="text-lg">৳</span> Min Budget
                </label>
                <input
                  type='number'
                  placeholder='Minimum'
                  value={minBudget}
                  onChange={(e) => setMinBudget(e.target.value)}
                  className='w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none'
                  min='0'
                />
              </div>

              {/* Max Budget */}
              <div>
                <label className='block text-sm font-medium text-gray-700 mb-2 flex items-center gap-1'>
                  <span className="text-lg">৳</span> Max Budget
                </label>
                <input
                  type='number'
                  placeholder='Maximum'
                  value={maxBudget}
                  onChange={(e) => setMaxBudget(e.target.value)}
                  className='w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none'
                  min={minBudget || '0'}
                />
              </div>
            </div>

            {/* Active Filters Chips */}
            {(searchTerm || selectedType !== 'all' || minBudget || maxBudget) && (
              <div className='mt-6 pt-4 border-t border-gray-200'>
                <p className='text-sm text-gray-600 mb-2'>Active Filters:</p>
                <div className='flex flex-wrap gap-2'>
                  {searchTerm && (
                    <span className='px-3 py-1 bg-orange-100 text-orange-800 text-sm rounded-full flex items-center gap-1'>
                      Search: "{searchTerm}"
                      <button onClick={() => setSearchTerm('')} className='ml-1'>
                        <FiX size={14} />
                      </button>
                    </span>
                  )}
                  {selectedType !== 'all' && (
                    <span className='px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full flex items-center gap-1'>
                      Type: {selectedType.charAt(0).toUpperCase() + selectedType.slice(1).replace('-', ' ')}
                      <button onClick={() => setSelectedType('all')} className='ml-1'>
                        <FiX size={14} />
                      </button>
                    </span>
                  )}
                  {minBudget && (
                    <span className='px-3 py-1 bg-green-100 text-green-800 text-sm rounded-full flex items-center gap-1'>
                      Min: ৳{minBudget}
                      <button onClick={() => setMinBudget('')} className='ml-1'>
                        <FiX size={14} />
                      </button>
                    </span>
                  )}
                  {maxBudget && (
                    <span className='px-3 py-1 bg-purple-100 text-purple-800 text-sm rounded-full flex items-center gap-1'>
                      Max: ৳{maxBudget}
                      <button onClick={() => setMaxBudget('')} className='ml-1'>
                        <FiX size={14} />
                      </button>
                    </span>
                  )}
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Results Count */}
      <div className='mb-6 text-center'>
        <p className='text-gray-600'>
          Showing {filteredServices.length} of {services.length} services
          {(searchTerm || selectedType !== 'all' || minBudget || maxBudget) && ' (filtered)'}
        </p>
      </div>

      {/* Services Grid or Empty State */}
      {filteredServices.length > 0 ? (
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 2xl:grid-cols-5 gap-8 pb-20'>
          {filteredServices.map(service => (
            <Card key={service._id} service={service} />
          ))}
        </div>
      ) : (
        <div className='pt-10 pb-32 text-center'>
          <p className='text-gray-500 text-xl'>
            {(services.length === 0)
              ? 'No services available at the moment.'
              : 'No services match your search criteria.'}
          </p>
          <p className='text-gray-400 mt-2'>
            {(services.length === 0)
              ? 'Please check back later!'
              : 'Try adjusting your filters or search term.'}
          </p>
          {(searchTerm || selectedType !== 'all' || minBudget || maxBudget) && (
            <button
              onClick={resetFilters}
              className='mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors'
            >
              Clear All Filters
            </button>
          )}
        </div>
      )}
    </Container>
  );
};

export default Service;