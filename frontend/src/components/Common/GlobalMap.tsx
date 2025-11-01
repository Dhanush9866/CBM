import React, { useMemo, useState } from 'react';
import { ComposableMap, Geographies, Geography, Marker, ZoomableGroup } from 'react-simple-maps';
import { MapPin, Phone, Mail, X, Globe, Plus, Minus } from 'lucide-react';
import { fetchContactOffices, OfficeData as RemoteOfficeData } from '@/services/contactOffices';
import { useTranslation } from '@/contexts/TranslationContext';

// World map topology data - using a reliable source
const geoUrl = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

// Exact coordinates by office_name (approximate to address city-level)
const officeNameToCoords: Record<string, { lat: number; lon: number }> = {
  "CBM 360 TIV – UK": { lat: 51.4928, lon: -0.1639 },
  "CBM 360 TIV - Germany GmbH & Co. KG": { lat: 53.8069, lon: 10.6869 },
  "CBM 360 TIV - France SARL": { lat: 48.8006, lon: 2.4236 },
  "CBM 360 TIV - Portugal Lda": { lat: 38.7578, lon: -9.2323 },
  "CBM 360 TIV - Spain S. L": { lat: 40.384, lon: -3.739 },
  "CBM 360 TIV – Russia Ltd OOO": { lat: 55.7646, lon: 37.5838 },
  "CBM 360 TIV – Ukraine LLC/TOV": { lat: 49.658, lon: 28.752 },
  "CBM 360 TIV Emirates - Dubai – UAE": { lat: 25.129, lon: 55.219 },
  "CBM 360 TIV Arabia LLD": { lat: 24.7136, lon: 46.6753 }, // Riyadh, Saudi Arabia
  "CBM 360 TIV - South Africa Pty Ltd": { lat: -25.98, lon: 28.127 },
  "CBM 360 TIV - Namibia Pty Ltd": { lat: -22.559, lon: 17.057 },
  "CBM 360 TIV - Botswana Pty Ltd": { lat: -24.639, lon: 25.901 },
  "CBM 360 TIV - Zimbabwe LLC": { lat: -20.157, lon: 28.588 },
  "CBM 360 TIV - Angola SA": { lat: -8.838, lon: 13.234 },
  "CBM 360 TIV - DR Congo SARL": { lat: -4.331, lon: 15.322 },
  "CBM 360 TIV - Madagascar SARL": { lat: -18.879, lon: 47.507 },
  "CBM 360 TIV - Mozambique SA": { lat: -15.116, lon: 39.266 },
  "CBM 360 TIV - Zambia PVT LTD": { lat: -15.416, lon: 28.282 },
  "CBM 360 TIV - Malawi PVT LTD": { lat: -13.963, lon: 33.787 },
  "CBM 360 TIV - Tanzania LLC": { lat: -2.516, lon: 32.918 },
  "CBM 360 TIV - Rwanda LLC": { lat: -1.944, lon: 30.061 },
  "CBM 360 TIV - Republic of Congo SARL": { lat: -4.263, lon: 15.242 },
  "CBM 360 TIV - Gabon SARL": { lat: 0.39, lon: 9.453 },
  "CBM 360 TIV - Uganda LTD": { lat: 0.315, lon: 32.582 },
  "CBM 360 TIV - Kenya LTD": { lat: -1.292, lon: 36.822 },
  "CBM 360 TIV - Ethiopia PLC": { lat: 9.01, lon: 38.761 },
  "CBM 360 TIV - Eritrea LLC": { lat: 15.322, lon: 38.925 },
  "CBM 360 TIV - South Sudan LLC": { lat: 4.852, lon: 31.582 },
  "CBM 360 TIV - Chad SARL": { lat: 12.134, lon: 15.055 },
  "CBM 360 TIV - Cameroon SARL": { lat: 3.848, lon: 11.502 },
  "CBM 360 TIV - Equatorial Guinea SARL": { lat: 1.863, lon: 9.767 },
  "CBM 360 TIV - Nigeria LLC": { lat: 9.06, lon: 7.492 },
  "CBM 360 TIV - Niger PVT": { lat: 13.511, lon: 2.125 },
  "CBM 360 TIV - Ghana LTD": { lat: 5.56, lon: -0.205 },
  "CBM 360 TIV - Burkina Faso SARL": { lat: 12.371, lon: -1.519 },
  "CBM 360 TIV - Benin SARL LLC": { lat: 6.37, lon: 2.433 },
  "CBM 360 TIV - Togo SARL": { lat: 6.137, lon: 1.212 },
  "CBM 360 TIV - Côte d'Ivoire SARL": { lat: 5.345, lon: -4.024 },
  "CBM 360 TIV - Mali SARL": { lat: 12.639, lon: -7.999 },
  "CBM 360 TIV - Sierra Leone PVT LTD": { lat: 8.465, lon: -13.231 },
  "CBM 360 TIV - Guinea SARL": { lat: 9.641, lon: -13.578 },
  "CBM 360 TIV - Senegal SARL": { lat: 14.716, lon: -17.467 },
  "CBM 360 TIV – Mauritania SARL": { lat: 18.079, lon: -15.965 },
  "CBM 360 TIV - Hong Kong": { lat: 22.281, lon: 114.155 },
  "CBM 360 TIV - China LLC": { lat: 31.162, lon: 121.436 },
  "CBM 360 TIV - Kazakhstan LLP": { lat: 51.169, lon: 71.449 },
  "CBM 360 TIV - Mongolia LLC": { lat: 47.921, lon: 106.918 },
  "CBM 360 TIV - India PVT LTD": { lat: 18.957, lon: 72.842 },
  "CBM 360 TIV - South Korea LLC": { lat: 37.533, lon: 126.978 },
  "CBM 360 TIV - Myanmar PLC": { lat: 17.336, lon: 96.481 },
  "CBM 360 TIV - Malaysia PLC": { lat: 3.155, lon: 101.714 },
  "CBM 360 TIV - Thailand PLC": { lat: 13.752, lon: 100.494 },
  "CBM 360 TIV - Indonesia PT": { lat: -6.244, lon: 106.799 },
  "CBM 360 TIV - Philippines LLC": { lat: 14.602, lon: 121.004 },
  "CBM 360 TIV - Australia Pty LTD": { lat: -27.488, lon: 153.089 },
  "CBM 360 TIV - Papua New Guinea LLC": { lat: -9.443, lon: 147.18 },
  "CBM 360 TIV – Brazil Ltda": { lat: -22.926, lon: -43.249 },
  "CBM 360 TIV - USA LLC": { lat: 38.878, lon: -77.113 },
  "CBM 360 TIV – Canada Inc": { lat: 45.514, lon: -73.682 },
  "CBM 360 TIV - México S. de R. L": { lat: 19.432, lon: -99.133 },
  "CBM 360 TIV – Dominican Republic SRL": { lat: 18.486, lon: -69.931 },
  "CBM 360 TIV - Venezuela PLC (S.A.)": { lat: 10.488, lon: -66.879 },
  "CBM 360 TIV – Trinidad & Tobago (Ltd.)": { lat: 10.66, lon: -61.51 },
  "CBM 360 TIV - French Guiana SARL": { lat: 4.922, lon: -52.326 },
  "CBM 360 TIV – Suriname NV": { lat: 5.852, lon: -55.167 },
  "CBM 360 TIV - Guyana (PLLC)": { lat: 6.801, lon: -58.155 },
  "CBM 360 TIV – Colombia (SAS)": { lat: 4.692, lon: -74.064 },
  "CBM 360 TIV - Peru (S.R.L.)": { lat: -12.046, lon: -77.042 },
  "CBM 360 TIV – Bolivia (SRL)": { lat: -16.5, lon: -68.15 },
  "CBM 360 TIV - Ecuador (Cia. Ltda.)": { lat: -0.18, lon: -78.467 },
  "CBM 360 TIV – Chile SRL": { lat: -33.448, lon: -70.669 },
  "CBM 360 TIV - Argentina SA": { lat: -34.608, lon: -58.561 },
  "CBM 360 TIV – Paraguay SRL": { lat: -25.296, lon: -57.668 }
};

interface OfficeMarkerProps {
  office: RemoteOfficeData;
  onClick: (office: RemoteOfficeData) => void;
  colorScheme: any;
  isRegionalHQ?: boolean;
}

const OfficeMarker: React.FC<OfficeMarkerProps> = ({ office, onClick, colorScheme, isRegionalHQ }) => {
  const getMarkerColor = (colorScheme: any) => {
    if (isRegionalHQ) return colorScheme.pins.regionalHQ;
    if (office.region === "Corporate Office") return colorScheme.pins.corporate;
    if (office.is_lab_facility) return colorScheme.pins.lab;
    return colorScheme.pins.regional;
  };

  const getMarkerSize = () => {
    if (office.region === "Corporate Office") return 2;
    if (office.is_lab_facility) return 2;
    return 2;
  };

  const getStrokeColor = (colorScheme: any) => {
    if (isRegionalHQ) return colorScheme.pins.regionalHQStroke;
    if (office.region === "Corporate Office") return colorScheme.pins.corporateStroke;
    if (office.is_lab_facility) return colorScheme.pins.labStroke;
    return colorScheme.pins.regionalStroke;
  };

  return (
    <Marker
      coordinates={(() => {
        // Priority 1: Hardcoded coordinates by exact office name match
        const exact = officeNameToCoords[office.office_name];
        if (exact) {
          return [exact.lon, exact.lat] as [number, number];
        }
        
        // Priority 2: Database coordinates (from auto-geocoding)
        if (office.longitude != null && office.latitude != null && 
            office.longitude !== 0 && office.latitude !== 0) {
          return [office.longitude, office.latitude] as [number, number];
        }
        
        // Priority 3: Country-level fallback coordinates
        const countryLon = getLongitudeForCountry(office.country);
        const countryLat = getLatitudeForCountry(office.country);
        if (countryLon !== 0 && countryLat !== 0) {
          console.warn(`⚠️ Using country-level coordinates for ${office.office_name} in ${office.country}. Address: ${office.address}`);
          return [countryLon, countryLat] as [number, number];
        }
        
        // Priority 4: Default to [0, 0] (shouldn't happen, but log it)
        console.error(`❌ No coordinates found for office: ${office.office_name} (${office.country})`);
        return [0, 0] as [number, number];
      })()}
      onClick={() => onClick(office)}
      style={{ cursor: 'pointer' }}
    >
      <g>
        {/* Outer glow effect */}
        <circle
          r={getMarkerSize() + 2}
          fill="rgba(0, 0, 0, 0.1)"
          opacity="0.3"
        />
        {/* Main marker */}
        <circle
          r={getMarkerSize()}
          fill={getMarkerColor(colorScheme)}
          stroke={getStrokeColor(colorScheme)}
          strokeWidth={1.5}
          className="hover:scale-110 transition-transform duration-200"
        />
        {/* Inner highlight */}
        <circle
          r={getMarkerSize() - 1}
          fill="rgba(255, 255, 255, 0.3)"
        />
      </g>
    </Marker>
  );
};

interface OfficePopupProps {
  office: RemoteOfficeData;
  onClose: () => void;
}

const OfficePopup: React.FC<OfficePopupProps> = ({ office, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-2 sm:p-4">
      <div className="bg-white rounded-xl sm:rounded-2xl shadow-2xl max-w-md w-full max-h-[90vh] sm:max-h-[80vh] overflow-y-auto border border-gray-200/50">
        <div className="flex items-center justify-between p-4 sm:p-6 border-b border-gray-200 bg-gradient-to-r from-red-50 to-red-100 rounded-t-xl sm:rounded-t-2xl">
          <h3 className="text-lg sm:text-xl font-bold text-gray-900">{office.office_name}</h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors p-2 hover:bg-gray-100 rounded-lg"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        
        <div className="p-4 sm:p-6 space-y-4 sm:space-y-6">
          <div className="flex items-start gap-4">
            <div className="p-2 bg-red-100 rounded-lg">
              <MapPin className="h-5 w-5 text-red-600" />
            </div>
            <div>
              <p className="text-sm font-bold text-gray-900 mb-1">{office.country}</p>
              <p className="text-sm text-gray-600 leading-relaxed">{office.address}</p>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="p-2 bg-green-100 rounded-lg">
              <Phone className="h-5 w-5 text-green-600" />
            </div>
            <p className="text-sm text-gray-600 font-semibold">{office.phone}</p>
          </div>
          
          <div className="flex items-start gap-4">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Mail className="h-5 w-5 text-blue-600" />
            </div>
            <div className="space-y-1">
              {office.emails.map((email, index) => (
                <p key={index} className="text-sm text-gray-600 font-medium">{email}</p>
              ))}
            </div>
          </div>
          
          {office.notes && (
            <div className="pt-4 border-t border-gray-200">
              <p className="text-sm text-gray-500 italic bg-gray-50 p-3 rounded-lg">{office.notes}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

interface GlobalMapProps {
  className?: string;
}

const GlobalMap: React.FC<GlobalMapProps> = ({ className = "" }) => {
  const { translations } = useTranslation();
  const legend = (translations as any)?.pages?.services?.globalNetwork?.legend;
  const [selectedOffice, setSelectedOffice] = useState<RemoteOfficeData | null>(null);
  const [officeGroups, setOfficeGroups] = useState<Array<{ region_name: string; offices: RemoteOfficeData[] }>>([]);
  const [zoom, setZoom] = useState(1);
  const [center, setCenter] = useState<[number, number]>([0, 0]);
  const [hoveredCountry, setHoveredCountry] = useState<string | null>(null);
  const [mousePosition, setMousePosition] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  // Elegant Purple Color Scheme
  const colorScheme = {
    map: {
      background: "from-purple-50 via-violet-100 to-indigo-200",
      border: "border-purple-300/50",
      land: "#6b21a8",
      landHover: "#8b5cf6",
      landPressed: "#a855f7",
      landStroke: "#4c1d95"
    },
    pins: {
      corporate: "#1f2937",
      lab: "#8b5cf6",
      regional: "#ffffff",
      regionalHQ: "#f59e0b", // yellow
      corporateStroke: "#111827",
      labStroke: "#7c3aed",
      regionalStroke: "#6b7280",
      regionalHQStroke: "#b45309"
    }
  };

  // Fetch offices from backend
  React.useEffect(() => {
    let isMounted = true;
    (async () => {
      try {
        const groups = await fetchContactOffices();
        if (isMounted) setOfficeGroups(groups || []);
      } catch (e) {
        // swallow - map can still render without pins
      }
    })();
    return () => { isMounted = false; };
  }, []);

  // Get all offices from fetched groups
  const allOffices = officeGroups.flatMap(group => group.offices);

  // Helper function to get coordinates for an office (same logic as OfficeMarker)
  const getOfficeCoordinates = (office: RemoteOfficeData): { coords: [number, number] | null; source: string } => {
    // Priority 1: Hardcoded coordinates
    const exact = officeNameToCoords[office.office_name];
    if (exact) {
      return { coords: [exact.lon, exact.lat], source: 'hardcoded' };
    }
    
    // Priority 2: Database coordinates
    if (office.longitude != null && office.latitude != null && 
        office.longitude !== 0 && office.latitude !== 0) {
      return { coords: [office.longitude, office.latitude], source: 'database' };
    }
    
    // Priority 3: Country-level fallback
    const countryLon = getLongitudeForCountry(office.country);
    const countryLat = getLatitudeForCountry(office.country);
    if (countryLon !== 0 && countryLat !== 0) {
      return { coords: [countryLon, countryLat], source: 'country-fallback' };
    }
    
    return { coords: null, source: 'none' };
  };

  // Identify offices with missing or invalid coordinates
  const officesWithInvalidCoords = useMemo(() => {
    return allOffices.filter(office => {
      const { coords } = getOfficeCoordinates(office);
      return coords === null || (coords[0] === 0 && coords[1] === 0);
    });
  }, [allOffices]);

  // Offices with only country-level coordinates (less accurate)
  const officesWithCountryFallback = useMemo(() => {
    return allOffices.filter(office => {
      const { source } = getOfficeCoordinates(office);
      return source === 'country-fallback';
    });
  }, [allOffices]);

  // Log missing offices for debugging
  React.useEffect(() => {
    if (officesWithInvalidCoords.length > 0) {
      console.warn('⚠️ Offices without valid map markers:', officesWithInvalidCoords.map(o => ({
        office_name: o.office_name,
        country: o.country,
        address: o.address
      })));
    }
    if (officesWithCountryFallback.length > 0) {
      console.info('ℹ️ Offices using country-level coordinates (may need better geocoding):', 
        officesWithCountryFallback.map(o => ({
          office_name: o.office_name,
          country: o.country,
          address: o.address
        }))
      );
    }
  }, [officesWithInvalidCoords, officesWithCountryFallback]);

  // Identify Regional Head Office entries (three HQs)
  const regionalHQOfficeNames = useMemo(() => {
    const hqGroups = officeGroups.filter(group => group.region_name?.toLowerCase().includes('regional head office'));
    const names = new Set<string>();
    hqGroups.forEach(group => {
      group.offices.forEach(o => names.add(o.office_name));
    });
    return names;
  }, [officeGroups]);

  // Counts for legend
  const {
    corporateCount,
    labCount,
    branchCount,
    regionalHQCount
  } = useMemo(() => {
    const corporate = allOffices.filter(o => o.region === "Corporate Office").length;
    const labs = allOffices.filter(o => o.is_lab_facility).length;
    const branches = allOffices.filter(o => o.region !== "Corporate Office" && !o.is_lab_facility).length;
    const regionalHQs = officeGroups.filter(group => group.region_name?.toLowerCase().includes('regional head office')).length;
    return {
      corporateCount: corporate,
      labCount: labs,
      branchCount: branches,
      regionalHQCount: regionalHQs
    };
  }, [allOffices, officeGroups]);

  const handleOfficeClick = (office: RemoteOfficeData) => {
    setSelectedOffice(office);
  };

  const handleClosePopup = () => {
    setSelectedOffice(null);
  };

  const handleCountryMouseEnter = (countryName: string, event: React.MouseEvent) => {
    setHoveredCountry(countryName);
    setMousePosition({ x: event.clientX, y: event.clientY });
  };

  const handleCountryMouseLeave = () => {
    setHoveredCountry(null);
  };

  const handleMouseMove = (event: React.MouseEvent) => {
    if (hoveredCountry) {
      setMousePosition({ x: event.clientX, y: event.clientY });
    }
  };

  return (
    <div className={`relative ${className}`}>
      {/* Missing Offices Warning */}
      {(officesWithInvalidCoords.length > 0 || officesWithCountryFallback.length > 0) && (
        <div className="absolute top-2 right-2 sm:top-6 sm:right-6 z-20 bg-yellow-50 border border-yellow-200 rounded-lg sm:rounded-xl p-3 sm:p-4 shadow-lg max-w-xs sm:max-w-sm">
          <div className="flex items-start gap-2 sm:gap-3">
            <div className="flex-shrink-0 mt-0.5">
              <div className="w-5 h-5 sm:w-6 sm:h-6 bg-yellow-400 rounded-full flex items-center justify-center">
                <span className="text-yellow-900 text-xs sm:text-sm font-bold">
                  {officesWithInvalidCoords.length + officesWithCountryFallback.length}
                </span>
              </div>
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="text-xs sm:text-sm font-semibold text-yellow-900 mb-1">
                Map Coverage Notice
              </h4>
              {officesWithInvalidCoords.length > 0 && (
                <p className="text-xs text-yellow-800 mb-1">
                  {officesWithInvalidCoords.length} {officesWithInvalidCoords.length === 1 ? 'office' : 'offices'} missing from map
                </p>
              )}
              {officesWithCountryFallback.length > 0 && (
                <p className="text-xs text-yellow-800">
                  {officesWithCountryFallback.length} {officesWithCountryFallback.length === 1 ? 'office' : 'offices'} using approximate location
                </p>
              )}
              <details className="mt-2 text-xs">
                <summary className="cursor-pointer text-yellow-700 hover:text-yellow-900 font-medium">
                  View Details
                </summary>
                <div className="mt-2 space-y-1 max-h-32 overflow-y-auto">
                  {officesWithInvalidCoords.map((office, idx) => (
                    <div key={idx} className="text-yellow-700 bg-yellow-100/50 p-1.5 rounded">
                      <div className="font-medium">{office.office_name}</div>
                      <div className="text-xs opacity-75">{office.country}</div>
                    </div>
                  ))}
                  {officesWithCountryFallback.map((office, idx) => (
                    <div key={idx} className="text-yellow-700 bg-yellow-100/50 p-1.5 rounded">
                      <div className="font-medium">{office.office_name}</div>
                      <div className="text-xs opacity-75">{office.country} • Approximate</div>
                    </div>
                  ))}
                </div>
              </details>
            </div>
          </div>
        </div>
      )}

      {/* Legend */}
      <div className="absolute top-2 left-2 sm:top-6 sm:left-6 z-10 bg-white/95 backdrop-blur-sm rounded-lg sm:rounded-2xl p-3 sm:p-6 shadow-2xl border border-gray-200/50 max-w-[calc(100vw-1rem)] sm:max-w-none">
        <h3 className="text-sm sm:text-xl font-bold text-gray-900 mb-2 sm:mb-5 flex items-center gap-1 sm:gap-2">
          <Globe className="h-3 w-3 sm:h-5 sm:w-5 text-blue-600" />
          <span className="hidden sm:inline">{legend?.title || 'Our Global Network'}</span>
          <span className="sm:hidden">{legend?.titleShort || 'Network'}</span>
        </h3>
        <div className="space-y-2 sm:space-y-4">
          <div className="flex items-center gap-2 sm:gap-3 group">
            <div className="w-3 h-3 sm:w-5 sm:h-5 bg-gradient-to-br from-gray-800 to-gray-900 rounded-full border border-gray-300 sm:border-2 shadow-lg group-hover:scale-110 transition-transform"></div>
            <span className="text-xs sm:text-sm font-semibold text-gray-800">{`${legend?.corporate || 'Corporate'} (${corporateCount})`}</span>
          </div>
          <div className="flex items-center gap-2 sm:gap-3 group">
  <div className="w-3 h-3 sm:w-5 sm:h-5 bg-yellow-400 border border-gray-400 sm:border-2 rounded-full shadow-lg group-hover:scale-110 transition-transform"></div>
  <span className="text-xs sm:text-sm font-semibold text-gray-800">{`${legend?.regional || 'Regional'} (${regionalHQCount})`}</span>
</div>

          <div className="flex items-center gap-2 sm:gap-3 group">
            <div className="w-3 h-3 sm:w-5 sm:h-5 bg-gradient-to-br from-white to-gray-100 border border-gray-400 sm:border-2 rounded-full shadow-lg group-hover:scale-110 transition-transform"></div>
            <span className="text-xs sm:text-sm font-semibold text-gray-800">{`${legend?.branch || 'Branch offices'} (${branchCount})`}</span>
          </div>
          <div className="flex items-center gap-2 sm:gap-3 group">
            <div className="w-3 h-3 sm:w-5 sm:h-5 bg-gradient-to-br from-purple-500 to-purple-600 rounded-full border border-purple-300 sm:border-2 shadow-lg group-hover:scale-110 transition-transform"></div>
            <span className="text-xs sm:text-sm font-semibold text-gray-800">{`${legend?.labs || 'Branch offices withLaboratories'} (${labCount})`}</span>
          </div>
          
          
        </div>
      </div>

      {/* Map */}
      <div 
        className={`w-full h-[400px] sm:h-[600px] bg-gradient-to-br ${colorScheme.map.background} rounded-lg sm:rounded-2xl overflow-hidden border-2 ${colorScheme.map.border} shadow-2xl`}
        onMouseMove={handleMouseMove}
      >
        <ComposableMap
          projection="geoMercator"
          projectionConfig={{
            scale: 100,
            center: center
          }}
          width={800}
          height={600}
          style={{
            width: "100%",
            height: "100%"
          }}
        >
          <ZoomableGroup zoom={zoom} center={center} onMove={({ zoom, center }) => {
            setZoom(zoom);
            setCenter(center);
          }}>
            <Geographies geography={geoUrl}>
              {({ geographies }) => {
                if (!geographies || geographies.length === 0) {
                  return <text x={400} y={300} textAnchor="middle" fill="red">Loading map data...</text>;
                }
                return geographies.map((geo) => (
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    fill="#8B4513"
                    stroke="#000"
                    strokeWidth={0.5}
                    style={{
                      default: { 
                        fill: colorScheme.map.land,
                        stroke: colorScheme.map.landStroke,
                        strokeWidth: 0.5,
                        outline: "none"
                      },
                      hover: { 
                        fill: colorScheme.map.landHover,
                        stroke: colorScheme.map.landStroke,
                        strokeWidth: 1,
                        outline: "none",
                        cursor: "pointer"
                      },
                      pressed: { 
                        fill: colorScheme.map.landPressed,
                        stroke: colorScheme.map.landStroke,
                        strokeWidth: 1,
                        outline: "none"
                      }
                    }}
                    onMouseEnter={(event) => {
                      const countryName = getCountryName(geo.properties);
                      handleCountryMouseEnter(countryName, event);
                    }}
                    onMouseLeave={handleCountryMouseLeave}
                  />
                ));
              }}
            </Geographies>
            
            {allOffices
              .filter(office => {
                // Only show offices with valid coordinates (not [0, 0])
                const { coords } = getOfficeCoordinates(office);
                return coords !== null && !(coords[0] === 0 && coords[1] === 0);
              })
              .map((office, index) => (
              <OfficeMarker
                key={index}
                office={office}
                onClick={handleOfficeClick}
                colorScheme={colorScheme}
                isRegionalHQ={regionalHQOfficeNames.has(office.office_name)}
              />
            ))}
          </ZoomableGroup>
        </ComposableMap>
      </div>

      {/* Country Tooltip */}
      {hoveredCountry && (
        <div
          className="fixed z-50 bg-gradient-to-r from-gray-900 to-gray-800 text-white px-4 py-2 rounded-xl shadow-2xl text-sm font-semibold pointer-events-none border border-gray-700/50 backdrop-blur-sm"
          style={{
            left: mousePosition.x + 10,
            top: mousePosition.y - 35,
            transform: 'translateX(-50%)'
          }}
        >
          <div className="flex items-center gap-2">
            <MapPin className="h-3 w-3 text-red-400" />
            {hoveredCountry}
          </div>
        </div>
      )}

      {/* Zoom Controls */}
      <div className="absolute bottom-2 right-2 sm:bottom-6 sm:right-6 z-10 bg-white/95 backdrop-blur-sm rounded-lg sm:rounded-2xl p-2 sm:p-3 shadow-2xl border border-gray-200/50">
        <div className="flex flex-col gap-1 sm:gap-2">
          <button
            onClick={() => setZoom(zoom * 1.2)}
            className="w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center bg-gradient-to-br from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 rounded-lg sm:rounded-xl text-white font-bold text-sm sm:text-lg shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105"
          >
            <Plus className="h-4 w-4 sm:h-5 sm:w-5" />
          </button>
          <button
            onClick={() => setZoom(zoom / 1.2)}
            className="w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center bg-gradient-to-br from-gray-500 to-gray-600 hover:from-gray-600 hover:to-gray-700 rounded-lg sm:rounded-xl text-white font-bold text-sm sm:text-lg shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105"
          >
            <Minus className="h-4 w-4 sm:h-5 sm:w-5" />
          </button>
        </div>
      </div>

      {/* Office Popup */}
      {selectedOffice && (
        <OfficePopup
          office={selectedOffice}
          onClose={handleClosePopup}
        />
      )}
    </div>
  );
};

// Helper function to get country name from geography properties
function getCountryName(properties: any): string {
  
  // Try the most common property names first
  const commonNames = [
    properties.NAME,
    properties.NAME_EN,
    properties.ADMIN,
    properties.NAME_LONG,
    properties.NAME_SORT,
    properties.NAME_ALT,
    properties.SOVEREIGNT,
    properties.NAME_0,
    properties.NAME_1,
    properties.NAME_2,
    properties.ADMIN_0,
    properties.ADMIN_1,
    properties.ADMIN_2,
    properties.name,
    properties.admin,
    properties.country,
    properties.Country,
    properties.CountryName,
    properties.country_name,
    properties.NAME_ENGLISH,
    properties.NAME_ENG,
    properties.ENGLISH_NAME,
    properties.ENG_NAME
  ];

  // Find the first non-empty, non-undefined name
  for (const name of commonNames) {
    if (name && typeof name === 'string' && name.trim() !== '') {
      return name.trim();
    }
  }

  // Try all other properties that might contain country names
  for (const [key, value] of Object.entries(properties)) {
    if (value && typeof value === 'string' && value.trim() !== '' && 
        (key.includes('NAME') || key.includes('ADMIN') || key.includes('SOV') || key.includes('COUNTRY'))) {
      return value.trim();
    }
  }

  // If no name found, try to get a meaningful identifier using country code mapping
  const countryCode = properties.ISO_A3 || properties.ISO_A2 || properties.SOV_A3 || properties.ADM0_A3 || properties.ADM0_A3_IS;
  if (countryCode) {
    const countryName = getCountryNameFromCode(countryCode);
    if (countryName) {
      return countryName;
    }
    return countryCode; // Return the code if no mapping found
  }
  
  // Last resort - return a generic name
  return 'Country';
}

// Helper function to get country name from country code
function getCountryNameFromCode(code: string): string | null {
  const countryCodeMap: { [key: string]: string } = {
    'NLD': 'Netherlands',
    'GBR': 'United Kingdom',
    'USA': 'United States',
    'DEU': 'Germany',
    'FRA': 'France',
    'ESP': 'Spain',
    'ITA': 'Italy',
    'PRT': 'Portugal',
    'RUS': 'Russia',
    'UKR': 'Ukraine',
    'POL': 'Poland',
    'CZE': 'Czech Republic',
    'HUN': 'Hungary',
    'ROU': 'Romania',
    'BGR': 'Bulgaria',
    'HRV': 'Croatia',
    'SVK': 'Slovakia',
    'SVN': 'Slovenia',
    'EST': 'Estonia',
    'LVA': 'Latvia',
    'LTU': 'Lithuania',
    'GRC': 'Greece',
    'CYP2': 'Cyprus',
    'MLT': 'Malta',
    'LUX': 'Luxembourg',
    'BEL': 'Belgium',
    'DNK': 'Denmark',
    'SWE': 'Sweden',
    'NOR': 'Norway',
    'FIN': 'Finland',
    'ISL': 'Iceland',
    'IRL': 'Ireland',
    'CHE': 'Switzerland',
    'AUT': 'Austria',
    'LIE': 'Liechtenstein',
    'MCO': 'Monaco',
    'SMR': 'San Marino',
    'VAT': 'Vatican City',
    'AND': 'Andorra',
    'CHN': 'China',
    'JPN': 'Japan',
    'KOR': 'South Korea',
    'PRK': 'North Korea',
    'MNG': 'Mongolia',
    'KAZ': 'Kazakhstan',
    'UZB': 'Uzbekistan',
    'TKM': 'Turkmenistan',
    'TJK': 'Tajikistan',
    'KGZ': 'Kyrgyzstan',
    'AFG': 'Afghanistan',
    'PAK': 'Pakistan',
    'IND': 'India',
    'BGD': 'Bangladesh',
    'LKA': 'Sri Lanka',
    'MDV': 'Maldives',
    'BTN': 'Bhutan',
    'NPL': 'Nepal',
    'MMR': 'Myanmar',
    'THA': 'Thailand',
    'LAO': 'Laos',
    'VNM': 'Vietnam',
    'KHM': 'Cambodia',
    'MYS': 'Malaysia',
    'SGP': 'Singapore',
    'IDN': 'Indonesia',
    'BRN': 'Brunei',
    'PHL': 'Philippines',
    'TWN': 'Taiwan',
    'HKG': 'Hong Kong',
    'MAC': 'Macau',
    'AUS': 'Australia',
    'NZL': 'New Zealand',
    'PNG': 'Papua New Guinea',
    'FJI': 'Fiji',
    'VUT': 'Vanuatu',
    'SLB': 'Solomon Islands',
    'KIR': 'Kiribati',
    'TUV': 'Tuvalu',
    'WSM': 'Samoa',
    'TON': 'Tonga',
    'COK': 'Cook Islands',
    'NIU': 'Niue',
    'PYF': 'French Polynesia',
    'NCL': 'New Caledonia',
    'CAN': 'Canada',
    'MEX': 'Mexico',
    'GTM': 'Guatemala',
    'BLZ': 'Belize',
    'SLV': 'El Salvador',
    'HND': 'Honduras',
    'NIC': 'Nicaragua',
    'CRI': 'Costa Rica',
    'PAN': 'Panama',
    'CUB': 'Cuba',
    'JAM': 'Jamaica',
    'HTI': 'Haiti',
    'DOM': 'Dominican Republic',
    'PRI': 'Puerto Rico',
    'TTO': 'Trinidad and Tobago',
    'BRB': 'Barbados',
    'LCA': 'Saint Lucia',
    'VCT': 'Saint Vincent and the Grenadines',
    'GRD': 'Grenada',
    'ATG': 'Antigua and Barbuda',
    'DMA': 'Dominica',
    'KNA': 'Saint Kitts and Nevis',
    'BHS': 'Bahamas',
    'BRA': 'Brazil',
    'ARG': 'Argentina',
    'CHL': 'Chile',
    'PER': 'Peru',
    'BOL': 'Bolivia',
    'PRY': 'Paraguay',
    'URY': 'Uruguay',
    'COL': 'Colombia',
    'VEN': 'Venezuela',
    'GUY': 'Guyana',
    'SUR': 'Suriname',
    'ECU': 'Ecuador',
    'EGY': 'Egypt',
    'LBY': 'Libya',
    'TUN': 'Tunisia',
    'DZA': 'Algeria',
    'MAR': 'Morocco',
    'SDN': 'Sudan',
    'SSD': 'South Sudan',
    'ETH': 'Ethiopia',
    'ERI': 'Eritrea',
    'DJI': 'Djibouti',
    'SOM': 'Somalia',
    'KEN': 'Kenya',
    'UGA': 'Uganda',
    'TZA': 'Tanzania',
    'RWA': 'Rwanda',
    'BDI': 'Burundi',
    'COD': 'Democratic Republic of the Congo',
    'COG': 'Republic of the Congo',
    'CAF': 'Central African Republic',
    'CMR': 'Cameroon',
    'TCD': 'Chad',
    'NER': 'Niger',
    'NGA': 'Nigeria',
    'BEN': 'Benin',
    'TGO': 'Togo',
    'GHA': 'Ghana',
    'CIV': 'Côte d\'Ivoire',
    'LBR': 'Liberia',
    'SLE': 'Sierra Leone',
    'GIN': 'Guinea',
    'GNB': 'Guinea-Bissau',
    'SEN': 'Senegal',
    'GMB': 'Gambia',
    'MLI': 'Mali',
    'BFA': 'Burkina Faso',
    'MRT': 'Mauritania',
    'CPV': 'Cape Verde',
    'STP': 'São Tomé and Príncipe',
    'GAB': 'Gabon',
    'GNQ': 'Equatorial Guinea',
    'AGO': 'Angola',
    'ZMB': 'Zambia',
    'ZWE': 'Zimbabwe',
    'BWA': 'Botswana',
    'NAM': 'Namibia',
    'ZAF': 'South Africa',
    'LSO': 'Lesotho',
    'SWZ': 'Eswatini',
    'MDG': 'Madagascar',
    'MUS': 'Mauritius',
    'SYC': 'Seychelles',
    'COM': 'Comoros',
    'TUR': 'Turkey',
    'IRQ': 'Iraq',
    'IRN': 'Iran',
    'SAU': 'Saudi Arabia',
    'YEM': 'Yemen',
    'OMN': 'Oman',
    'ARE': 'United Arab Emirates',
    'QAT': 'Qatar',
    'BHR': 'Bahrain',
    'KWT': 'Kuwait',
    'ISR': 'Israel',
    'PSE': 'Palestine',
    'JOR': 'Jordan',
    'LBN': 'Lebanon',
    'SYR': 'Syria',
    'CYP': 'Cyprus',
    'GEO': 'Georgia',
    'ARM': 'Armenia',
    'AZE': 'Azerbaijan'
  };
  
  return countryCodeMap[code] || null;
}

// Helper function to get coordinates for countries
function getLatitudeForCountry(country: string): number {
  const coordinates: { [key: string]: number } = {
    "United Kingdom": 55.3781,
    "Germany": 51.1657,
    "France": 46.2276,
    "Portugal": 39.3999,
    "Spain": 40.4637,
    "Russia": 61.5240,
    "Ukraine": 48.3794,
    "United Arab Emirates": 23.4241,
    "South Africa": -30.5595,
    "Namibia": -22.9576,
    "Botswana": -22.3285,
    "Zimbabwe": -19.0154,
    "Angola": -11.2027,
    "Democratic Republic of the Congo": -4.0383,
    "Madagascar": -18.7669,
    "Mozambique": -18.6657,
    "Zambia": -13.1339,
    "Malawi": -13.2543,
    "Tanzania": -6.3690,
    "Rwanda": -1.9403,
    "Republic of the Congo": -0.2280,
    "Gabon": -0.8037,
    "Uganda": 1.3733,
    "Kenya": -0.0236,
    "Ethiopia": 9.1450,
    "Eritrea": 15.1794,
    "South Sudan": 12.8628,
    "Chad": 15.4542,
    "Cameroon": 7.3697,
    "Equatorial Guinea": 1.6508,
    "Nigeria": 9.0819,
    "Niger": 17.6078,
    "Ghana": 7.9465,
    "Burkina Faso": 12.2383,
    "Benin": 9.3077,
    "Togo": 8.6195,
    "Côte d'Ivoire": 7.5400,
    "Mali": 17.5707,
    "Sierra Leone": 8.4606,
    "Guinea": 9.6412,
    "Senegal": 14.4974,
    "Mauritania": 21.0079,
    "Hong Kong": 22.3193,
    "China": 35.8617,
    "Kazakhstan": 48.0196,
    "Mongolia": 46.8625,
    "India": 20.5937,
    "South Korea": 35.9078,
    "Myanmar": 21.9162,
    "Malaysia": 4.2105,
    "Thailand": 15.8700,
    "Indonesia": -0.7893,
    "Philippines": 12.8797,
    "Australia": -25.2744,
    "Papua New Guinea": -6.3150,
    "Brazil": -14.2350,
    "United States": 37.0902,
    "Canada": 56.1304,
    "Mexico": 23.6345,
    "Dominican Republic": 18.7357,
    "Venezuela": 6.4238,
    "Trinidad & Tobago": 10.6918,
    "French Guiana": 3.9339,
    "Suriname": 3.9193,
    "Guyana": 4.8604,
    "Colombia": 4.5709,
    "Peru": -9.1900,
    "Bolivia": -16.2902,
    "Ecuador": -1.8312,
    "Chile": -35.6751,
    "Argentina": -38.4161,
    "Paraguay": -23.4425
  };
  return coordinates[country] || 0;
}

function getLongitudeForCountry(country: string): number {
  const coordinates: { [key: string]: number } = {
    "United Kingdom": -3.4360,
    "Germany": 10.4515,
    "France": 2.2137,
    "Portugal": -8.2245,
    "Spain": -3.7492,
    "Russia": 105.3188,
    "Ukraine": 31.1656,
    "United Arab Emirates": 53.8478,
    "South Africa": 22.9375,
    "Namibia": 18.4904,
    "Botswana": 24.6849,
    "Zimbabwe": 29.1549,
    "Angola": 17.8739,
    "Democratic Republic of the Congo": 21.7587,
    "Madagascar": 46.8691,
    "Mozambique": 35.5296,
    "Zambia": 27.8493,
    "Malawi": 34.3015,
    "Tanzania": 34.8888,
    "Rwanda": 29.8739,
    "Republic of the Congo": 21.7587,
    "Gabon": 11.6094,
    "Uganda": 32.2903,
    "Kenya": 37.9062,
    "Ethiopia": 40.4897,
    "Eritrea": 39.7823,
    "South Sudan": 30.2176,
    "Chad": 18.7322,
    "Cameroon": 12.3547,
    "Equatorial Guinea": 10.2679,
    "Nigeria": 8.6753,
    "Niger": 8.0817,
    "Ghana": -1.0232,
    "Burkina Faso": -1.5616,
    "Benin": 2.3158,
    "Togo": 0.8248,
    "Côte d'Ivoire": -5.5471,
    "Mali": -3.9962,
    "Sierra Leone": -11.7799,
    "Guinea": -9.6966,
    "Senegal": -14.4524,
    "Mauritania": -10.9408,
    "Hong Kong": 114.1694,
    "China": 104.1954,
    "Kazakhstan": 66.9237,
    "Mongolia": 103.8467,
    "India": 78.9629,
    "South Korea": 127.7669,
    "Myanmar": 95.9560,
    "Malaysia": 101.9758,
    "Thailand": 100.9925,
    "Indonesia": 113.9213,
    "Philippines": 121.7740,
    "Australia": 133.7751,
    "Papua New Guinea": 143.9555,
    "Brazil": -51.9253,
    "United States": -95.7129,
    "Canada": -106.3468,
    "Mexico": -102.5528,
    "Dominican Republic": -70.1627,
    "Venezuela": -66.5897,
    "Trinidad & Tobago": -61.2225,
    "French Guiana": -53.1258,
    "Suriname": -56.0278,
    "Guyana": -58.9302,
    "Colombia": -74.2973,
    "Peru": -75.0152,
    "Bolivia": -63.5887,
    "Ecuador": -78.1834,
    "Chile": -71.5430,
    "Argentina": -63.6167,
    "Paraguay": -58.4438
  };
  return coordinates[country] || 0;
}

export default GlobalMap;
