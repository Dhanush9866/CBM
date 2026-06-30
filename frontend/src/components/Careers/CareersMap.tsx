import React, { useEffect, useMemo } from 'react';
import { MapContainer, TileLayer, Marker, Tooltip, useMap } from 'react-leaflet';
import MarkerClusterGroup from 'react-leaflet-cluster';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { CareerDto } from '@/services/careersService';
import dynamicCoords from './locationCoords.json';
import { Plus, Minus, ArrowLeft, ArrowRight, ArrowUp, ArrowDown, X } from 'lucide-react';

interface CareersMapProps {
  jobs: CareerDto[];
  onSelectLocation: (location: string | null) => void;
  selectedLocation: string | null;
}

export const parseCountry = (location: string) => {
  if (!location) return '';
  const parts = location.split(',');
  let country = parts[parts.length - 1].trim();
  
  if (country === 'UK') return 'United Kingdom';
  if (country === 'USA' || country === 'US') return 'United States';
  if (country === 'UAE') return 'United Arab Emirates';
  if (country === 'South Korea') return 'South Korea';
  return country;
};

const locationCoordinates: Record<string, [number, number]> = {
  // Cities
  "Bangalore, India": [77.5946, 12.9716],
  "Bengaluru, India": [77.5946, 12.9716],
  "Hyderabad, India": [78.4867, 17.3850],
  "Mumbai, India": [72.8777, 19.0760],
  "Chennai, India": [80.2707, 13.0827],
  "Vizag, India": [83.2185, 17.6868],
  "Pune, India": [73.8567, 18.5204],
  "Delhi, India": [77.1025, 28.7041],
  "Nagpur, India": [79.0882, 21.1458],
  "Madhya Pradesh, India": [77.4126, 23.2599],
  "London, UK": [-0.1276, 51.5074],
  "New York, USA": [-74.0060, 40.7128],
  "Dubai, UAE": [55.2708, 25.2048],
  "Riyadh, Saudi Arabia": [46.6753, 24.7136],
  // Countries
  "Bahrain": [50.5577, 26.0667],
  "Oman": [55.9233, 21.4735],
  "United Kingdom": [-3.4360, 55.3781],
  "Germany": [10.4515, 51.1657],
  "France": [2.2137, 46.2276],
  "Portugal": [-8.2245, 39.3999],
  "Spain": [-3.7492, 40.4637],
  "Russia": [105.3188, 61.5240],
  "Ukraine": [31.1656, 48.3794],
  "United Arab Emirates": [53.8478, 23.4241],
  "South Africa": [22.9375, -30.5595],
  "India": [78.9629, 20.5937],
  "United States": [-95.7129, 37.0902],
  "Canada": [-106.3468, 56.1304],
  "Mexico": [-102.5528, 23.6345],
  "Brazil": [-51.9253, -14.2350],
  "Australia": [133.7751, -25.2744],
  "China": [104.1954, 35.8617],
  "Japan": [138.2529, 36.2048],
  "South Korea": [127.7669, 35.9078],
  "Singapore": [103.8198, 1.3521],
};

const allLocationCoordinates = { ...locationCoordinates, ...dynamicCoords };

const createCustomIcon = (count: number, isSelected: boolean) => {
  const bgColor = isSelected ? '#4F46E5' : '#000000';
  const html = `
    <div style="
      background-color: ${bgColor};
      color: white;
      width: 32px;
      height: 32px;
      border-radius: 50% 50% 50% 0;
      transform: rotate(-45deg);
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: bold;
      font-size: 14px;
      box-shadow: 2px 2px 5px rgba(0,0,0,0.3);
      border: 2px solid white;
    ">
      <span style="transform: rotate(45deg); display: inline-block;">${count}</span>
    </div>
  `;
  
  return L.divIcon({
    html,
    className: 'custom-pin-icon bg-transparent border-none',
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    tooltipAnchor: [0, -36]
  });
};

const createClusterCustomIcon = function (cluster: any) {
  return createCustomIcon(cluster.getChildCount(), false);
};

// Component for Map Controls
const MapControls = () => {
  const map = useMap();
  const [zoom, setZoom] = React.useState(map.getZoom());
  
  React.useEffect(() => {
    const handleZoom = () => setZoom(map.getZoom());
    map.on('zoomend', handleZoom);
    return () => {
      map.off('zoomend', handleZoom);
    };
  }, [map]);

  const PAN_AMOUNT = 100;
  const isMinZoom = zoom <= 2;

  return (
    <div className="absolute bottom-6 right-6 z-[1000] flex flex-col gap-2">
      <div className="flex justify-center mb-1">
        <button 
          onClick={() => map.panBy([0, -PAN_AMOUNT])} 
          className="p-2 bg-white rounded-md shadow hover:bg-gray-100 border border-gray-200"
          title="Pan Up"
        >
          <ArrowUp className="h-4 w-4 text-gray-700" />
        </button>
      </div>
      <div className="flex gap-2">
        <button 
          onClick={() => map.panBy([-PAN_AMOUNT, 0])} 
          className="p-2 bg-white rounded-md shadow hover:bg-gray-100 border border-gray-200"
          title="Pan Left"
        >
          <ArrowLeft className="h-4 w-4 text-gray-700" />
        </button>
        <button 
          onClick={() => map.panBy([0, PAN_AMOUNT])} 
          className="p-2 bg-white rounded-md shadow hover:bg-gray-100 border border-gray-200"
          title="Pan Down"
        >
          <ArrowDown className="h-4 w-4 text-gray-700" />
        </button>
        <button 
          onClick={() => map.panBy([PAN_AMOUNT, 0])} 
          className="p-2 bg-white rounded-md shadow hover:bg-gray-100 border border-gray-200"
          title="Pan Right"
        >
          <ArrowRight className="h-4 w-4 text-gray-700" />
        </button>
      </div>
      <div className="flex justify-center gap-2 mt-2">
        <button 
          onClick={() => map.setZoom(map.getZoom() + 1)} 
          className="p-2 bg-white rounded-md shadow hover:bg-gray-100 border border-gray-200"
          title="Zoom In"
        >
          <Plus className="h-4 w-4 text-gray-700" />
        </button>
        <button 
          onClick={() => !isMinZoom && map.setZoom(map.getZoom() - 1)} 
          disabled={isMinZoom}
          className={`p-2 rounded-md shadow border transition-colors ${isMinZoom ? 'bg-gray-100 border-gray-200 opacity-50 cursor-not-allowed' : 'bg-white hover:bg-gray-100 border-gray-200 cursor-pointer'}`}
          title="Zoom Out"
        >
          <Minus className={`h-4 w-4 ${isMinZoom ? 'text-gray-400' : 'text-gray-700'}`} />
        </button>
      </div>
    </div>
  );
};

// Component to handle auto-fitting bounds
const MapBounds = ({ markers }: { markers: any[] }) => {
  const map = useMap();
  
  useEffect(() => {
    if (markers.length > 0) {
      const bounds = L.latLngBounds(markers.map(m => m.coords));
      map.fitBounds(bounds, { padding: [50, 50] });
    }
  }, [markers, map]);

  return null;
};

export const CareersMap: React.FC<CareersMapProps> = ({ jobs, onSelectLocation, selectedLocation }) => {
  // Aggregate jobs to individual cities so they can cluster/spiderfy perfectly
  const markers = useMemo(() => {
    const jobMarkers: { job: CareerDto; location: string; coords: [number, number]; displayName: string }[] = [];

    jobs.forEach((job) => {
      const loc = job.location;
      if (!loc) return;

      // Handle multi-city strings like "Bangalore | Hyderabad | Mumbai, India"
      if (loc.includes('|')) {
        const countryParts = loc.split(',');
        const country = countryParts.length > 1 ? countryParts[countryParts.length - 1].trim() : '';
        const cities = countryParts[0].split('|').map(c => c.trim());

        cities.forEach(city => {
          const fullCityName = country ? `${city}, ${country}` : city;
          let coords = (allLocationCoordinates as any)[fullCityName];
          if (!coords) {
             coords = (allLocationCoordinates as any)[country]; // Fallback to country
          }
          if (coords) {
             // Leaflet uses [lat, lng]
             jobMarkers.push({ job, location: loc, coords: [coords[1], coords[0]], displayName: fullCityName });
          }
        });
      } else {
        // Single location
        let coords = (allLocationCoordinates as any)[loc];
        if (!coords) {
          const country = parseCountry(loc);
          coords = (allLocationCoordinates as any)[country];
        }
        if (coords) {
          jobMarkers.push({ job, location: loc, coords: [coords[1], coords[0]], displayName: loc });
        }
      }
    });

    // Group by coordinate so we only render ONE marker per unique city with a count
    // This allows react-leaflet-cluster to properly cluster them without overlapping infinite markers
    const groupedMarkers: Record<string, { location: string; coords: [number, number]; count: number; displayName: string }> = {};
    
    jobMarkers.forEach(jm => {
      const key = `${jm.coords[0]}-${jm.coords[1]}`;
      if (!groupedMarkers[key]) {
        groupedMarkers[key] = { location: jm.location, coords: jm.coords, count: 0, displayName: jm.displayName };
      }
      groupedMarkers[key].count += 1;
    });

    return Object.values(groupedMarkers);
  }, [jobs]);

  const initialCenter: [number, number] = [20, 0];

  return (
    <div className="w-full h-full relative z-10">
      <MapContainer 
        center={initialCenter} 
        zoom={2} 
        minZoom={2}
        maxBounds={[
          [-90, -180],
          [90, 180]
        ]}
        maxBoundsViscosity={1.0}
        style={{ width: "100%", height: "100%", zIndex: 1 }}
        zoomControl={false}
        attributionControl={false}
      >
        <TileLayer
          url="https://mt1.google.com/vt/lyrs=m&x={x}&y={y}&z={z}"
          attribution="&copy; Google Maps"
        />

        <MarkerClusterGroup
          chunkedLoading
          iconCreateFunction={createClusterCustomIcon}
          maxClusterRadius={50}
        >
          {markers.map(({ location, coords, count, displayName }, index) => {
            const isSelected = selectedLocation === location;
            return (
              <Marker 
                key={`${displayName}-${index}`} 
                position={coords}
                icon={createCustomIcon(count, isSelected)}
                eventHandlers={{
                  click: () => onSelectLocation(isSelected ? null : location)
                }}
              >
                <Tooltip direction="top" offset={[0, -32]} className="font-semibold bg-white text-gray-800">
                  {displayName}
                </Tooltip>
              </Marker>
            );
          })}
        </MarkerClusterGroup>
        
        <MapBounds markers={markers} />
        <MapControls />
      </MapContainer>
      
      {/* Reset selection button */}
      {selectedLocation && (
        <button 
          onClick={() => onSelectLocation(null)}
          className="absolute top-4 left-4 z-[1000] bg-white hover:bg-gray-50 text-gray-800 border border-gray-200 px-3 py-1.5 rounded-md shadow-md text-sm font-medium transition-all duration-200 flex items-center gap-1.5"
        >
          <X className="h-4 w-4 text-gray-500" />
          Clear Selection
        </button>
      )}
    </div>
  );
};
