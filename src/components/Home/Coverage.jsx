import React, { useRef } from 'react';
import { MapContainer, Marker, Popup, TileLayer, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';


// Fix default marker icon issue in Vite/React-Leaflet
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';
import markerRetina from 'leaflet/dist/images/marker-icon-2x.png';
import { useLoaderData } from 'react-router';
import Heading from '../Shared/Heading';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerRetina,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

const Coverage = () => {
  const serviceCenters = useLoaderData() || [];
  const mapRef = useRef(null);
  console.log('Loaded service centers:', serviceCenters);
  const FlyToLocation = ({ latLng, zoom }) => {
    const map = useMap();
    if (latLng) {
      map.flyTo(latLng, zoom, { duration: 1.8 });
    }
    return null;
  };

  const handleSearch = (e) => {
    e.preventDefault();
    const query = e.target.location.value.trim().toLowerCase();
    if (!query || !mapRef.current) return;

    let target = null;
    let zoom = 12;

    for (const center of serviceCenters) {
      // District match
      if (center.district.toLowerCase().includes(query)) {
        target = [center.latitude, center.longitude];
        zoom = 11;
        break;
      }

      // Covered area match
      const areaMatch = center.covered_area.some(area =>
        area.toLowerCase().includes(query)
      );
      if (areaMatch) {
        target = [center.latitude, center.longitude];
        zoom = 14;
        break;
      }

      // City match
      if (center.city?.toLowerCase().includes(query)) {
        target = [center.latitude, center.longitude];
        zoom = 13;
        break;
      }
    }

    if (target) {
      mapRef.current.flyTo(target, zoom);
      e.target.location.value = '';
    } else {
      Swal.fire({
        icon: 'info',
        title: 'Not Found',
        text: 'Sorry, we do not serve this location yet!',
        timer: 3000,
      });
    }
  };


  return (
    <div className="min-h-screen bg-gradient-to-b from-base-200 to-base-100">
      <Heading
        title="Decoration Services Across Bangladesh"
        subtitle="Available in 6 districts — expanding every month"
        center={true}
      />
      {/* Hero Section */}
      <div className="hero bg-base-100 border-b border-base-300">

        <div className="hero-content text-center">

          <div className="max-w-4xl">




            {/* Search Bar */}
            <form onSubmit={handleSearch} className="max-w-7xl mx-auto px-4 sm:px-6">
              <div className="relative group">
                {/* Subtle glow background on focus/hover */}
                <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-full blur-xl opacity-0 group-focus-within:opacity-100 group-hover:opacity-75 transition-opacity duration-500" />

                <div className="join w-full bg-white/80 backdrop-blur-xl border border-gray-200/50 rounded-2xl shadow-xl overflow-hidden">
                  {/* Search Input */}
                  <input
                    type="search"
                    name="location"
                    placeholder="Search district, city or area (e.g. Dhaka, Gulshan, Chattogram)"
                    className="
          input input-bordered join-item w-full 
          bg-transparent border-0 
          text-lg md:text-xl py-6 px-6 
          placeholder:text-gray-500 placeholder:opacity-70
          focus:outline-none focus:ring-0
          text-gray-900
        "
                  />

                  {/* Search Button */}
                  <button
                    type="submit"
                    className="
          btn btn-primary join-item 
          px-8 md:px-12 py-7 
          text-lg md:text-xl font-semibold 
          rounded-none 
          transition-all duration-300
          hover:bg-secondary hover:scale-105 active:scale-95
          shadow-md hover:shadow-lg
        "
                  >
                    <svg
                      className="w-6 h-6 mr-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                      />
                    </svg>
                    Search
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Map Section */}
      <div className="container mx-auto px-4 py-12">
        <div className="card bg-base-100 shadow-2xl border border-base-300 rounded-3xl overflow-hidden">
          <div className="card-body p-0">
            <MapContainer
              center={[23.6850, 90.3563]}
              zoom={7}
              scrollWheelZoom={true}
              className="h-[70vh] md:h-[80vh] w-full"
              ref={mapRef}
            >
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />

              {serviceCenters.map((center, idx) =>
                center.covered_area.map((area, areaIdx) => {
                  const offset = areaIdx * 0.008; // small offset to avoid overlap
                  return (
                    <Marker
                      key={`${idx}-${areaIdx}`}
                      position={[center.latitude + offset, center.longitude + offset]}
                      eventHandlers={{
                        click: () => {
                          mapRef.current?.flyTo(
                            [center.latitude, center.longitude],
                            13,
                            { duration: 1.5 }
                          );
                        }
                      }}
                    >
                      <Popup className="custom-popup">
                        <div className="p-3 min-w-[220px]">
                          <h3 className="font-bold text-lg text-primary mb-2">{area}</h3>
                          <p className="text-sm">
                            <strong>District:</strong> {center.district}
                          </p>
                          <p className="text-sm">
                            <strong>City:</strong> {center.city || 'N/A'}
                          </p>
                          <div className="mt-3 badge badge-outline badge-lg">
                            {center.status === 'active' ? (
                              <span className="text-success">Active ✓</span>
                            ) : (
                              <span className="text-warning">Coming Soon</span>
                            )}
                          </div>
                        </div>
                      </Popup>
                    </Marker>
                  );
                })
              )}
            </MapContainer>
          </div>
        </div>

        {/* Legend */}
        <div className="flex flex-wrap justify-center gap-8 mt-10">
          <div className="flex items-center gap-3 bg-base-100 px-6 py-4 rounded-2xl shadow-md">
            <div className="w-5 h-5 bg-success rounded-full ring-2 ring-success/30"></div>
            <span className="font-medium">Active Service Area</span>
          </div>
          <div className="flex items-center gap-3 bg-base-100 px-6 py-4 rounded-2xl shadow-md">
            <div className="w-5 h-5 bg-warning rounded-full ring-2 ring-warning/30"></div>
            <span className="font-medium">Coming Soon</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Coverage;