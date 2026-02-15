import React, { useRef } from 'react';
import { MapContainer, Marker, Popup, TileLayer, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { useLoaderData } from 'react-router';

// Fix default marker icon issue in Vite/React-Leaflet
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';
import markerRetina from 'leaflet/dist/images/marker-icon-2x.png';

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
      {/* Hero Section */}
      <div className="hero bg-base-100 py-16 md:py-24 border-b border-base-300">
        <div className="hero-content text-center">
          <div className="max-w-4xl">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Decoration Services Across Bangladesh
            </h1>
            <p className="text-xl md:text-2xl text-base-content/80 mb-10">
              Available in {serviceCenters.length} districts — expanding every month
            </p>

            {/* Search Bar */}
            <form onSubmit={handleSearch} className="max-w-2xl mx-auto">
              <div className="join w-full">
                <input
                  type="search"
                  name="location"
                  placeholder="Search district, city or area (e.g. Dhaka, Gulshan, Chattogram)"
                  className="input input-bordered join-item w-full text-lg py-7 focus:outline-none focus:ring-2 focus:ring-primary"
                />
                <button className="btn btn-primary join-item px-10 text-lg">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                  Search
                </button>
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