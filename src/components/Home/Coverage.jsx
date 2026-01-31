import React, { useRef } from 'react';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix marker icon for Vite
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
import iconRetina from 'leaflet/dist/images/marker-icon-2x.png';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: iconRetina,
  iconUrl: icon,
  shadowUrl: iconShadow,
});

const Coverage = () => {
  const position = [23.6850, 90.3563];
  const mapRef = useRef(null);

  // তোমার data hardcode (public থেকে)
  const serviceCenters = [
    {
      region: "Dhaka Division",
      district: "Dhaka",
      city: "Dhaka",
      covered_area: ["Uttara", "Gulshan", "Banani", "Dhanmondi", "Mohammadpur", "Mirpur", "Bashundhara", "Baridhara", "Old Dhaka", "Motijheel"],
      status: "active",
      longitude: 90.4125,
      latitude: 23.8103
    },
    {
      region: "Dhaka Division",
      district: "Gazipur",
      city: "Gazipur",
      covered_area: ["Tong i", "Gazipur Sadar", "Kaliakair", "Sreepur"],
      status: "active",
      longitude: 90.3938,
      latitude: 23.9999
    },
    {
      region: "Chattogram Division",
      district: "Chattogram",
      city: "Chattogram",
      covered_area: ["Agrabad", "Halishahar", "Pahartali", "Khulshi", "Panchlaish"],
      status: "active",
      longitude: 91.8124,
      latitude: 22.3569
    },
    {
      region: "Rajshahi Division",
      district: "Rajshahi",
      city: "Rajshahi",
      covered_area: ["Rajshahi City Center", "Boalia", "Motihar"],
      status: "active",
      longitude: 88.6043,
      latitude: 24.3745
    },
    {
      region: "Khulna Division",
      district: "Khulna",
      city: "Khulna",
      covered_area: ["Khulna City", "Sonadanga", "Khalishpur"],
      status: "active",
      longitude: 89.5511,
      latitude: 22.8456
    },
    {
      region: "Sylhet Division",
      district: "Sylhet",
      city: "Sylhet",
      covered_area: ["Sylhet City", "Zindabazar", "Amberkhana"],
      status: "planned",
      longitude: 91.8721,
      latitude: 24.8949
    }
  ];

  const handleSearch = (e) => {
    e.preventDefault();
    const location = e.target.location.value.trim().toLowerCase();

    if (!location) return;

    const found = serviceCenters.find(center => 
      center.district.toLowerCase().includes(location) ||
      center.city.toLowerCase().includes(location) ||
      center.covered_area.some(area => area.toLowerCase().includes(location))
    );

    if (found && mapRef.current) {
      mapRef.current.flyTo([found.latitude, found.longitude], 12, {
        duration: 2
      });
      e.target.location.value = '';
    } else {
      alert('Sorry, this location is not in our service area yet!');
    }
  };

  return (
    <section className="py-16 bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            Our Service Coverage in Bangladesh
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We are expanding rapidly to bring professional decoration services to your doorstep
          </p>
        </div>

        <div className="max-w-3xl mx-auto mb-12">
          <form onSubmit={handleSearch} className="relative">
            <input
              type="search"
              name="location"
              placeholder="Search by city, district or area (e.g. Dhaka, Gulshan, Chattogram)"
              className="w-full pl-14 pr-32 py-5 text-lg border-2 border-gray-300 rounded-2xl focus:border-primary focus:outline-none transition-all shadow-lg"
            />
            <svg className="absolute left-5 top-1/2 transform -translate-y-1/2 text-gray-400 w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <button
              type="submit"
              className="absolute right-3 top-1/2 transform -translate-y-1/2 bg-primary text-white px-8 py-3 rounded-xl hover:bg-primary-dark transition font-semibold"
            >
              Search
            </button>
          </form>
        </div>

        <div className="rounded-3xl overflow-hidden shadow-2xl border-4 border-primary/10 relative z-10">  {/* Added relative z-10 */}
          <MapContainer
            center={position}
            zoom={7}
            scrollWheelZoom={false}
            className="h-[600px] md:h-[700px] lg:h-[800px] w-full"
            ref={mapRef}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            {serviceCenters.map((center, index) => (
              <Marker key={index} position={[center.latitude, center.longitude]}>
                <Popup>
                  <div className="p-4 text-center">
                    <h3 className="text-xl font-bold text-primary">{center.city}</h3>
                    <p className="text-sm text-gray-600 mt-1">District: {center.district}</p>
                    <p className="text-sm text-gray-700 mt-2">
                      Covered Areas: {center.covered_area.join(', ')}
                    </p>
                    <p className="text-sm font-semibold mt-3">
                      Status: <span className={center.status === 'active' ? 'text-green-600' : 'text-orange-600'}>
                        {center.status.charAt(0).toUpperCase() + center.status.slice(1)}
                      </span>
                    </p>
                  </div>
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        </div>

        <div className="text-center mt-12">
          <div className="inline-flex flex-wrap justify-center gap-8 bg-white px-10 py-6 rounded-3xl shadow-xl">
            <div className="flex items-center gap-3">
              <div className="w-5 h-5 bg-green-500 rounded-full"></div>
              <span className="text-gray-800 font-medium">Currently Active</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-5 h-5 bg-orange-500 rounded-full"></div>
              <span className="text-gray-800 font-medium">Coming Soon</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Coverage;