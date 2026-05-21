const fs = require('fs');

async function geocodeLocations() {
  const response = await fetch('http://localhost:8020/api/careers');
  const data = await response.json();
  const jobs = data.data;
  const uniqueLocations = [...new Set(jobs.map(j => j.location).filter(Boolean))];
  
  const coordsMap = {};
  
  for (let i = 0; i < uniqueLocations.length; i++) {
    const loc = uniqueLocations[i];
    console.log(`Geocoding: ${loc}`);
    try {
      // Small delay to respect rate limit somewhat, though it's still fast
      await new Promise(r => setTimeout(r, 1000));
      const res = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(loc)}`, {
        headers: { 'User-Agent': 'CBM-App/1.0' }
      });
      const results = await res.json();
      if (results && results.length > 0) {
        coordsMap[loc] = [parseFloat(results[0].lon), parseFloat(results[0].lat)];
      } else {
        console.log(`No results for ${loc}`);
      }
    } catch (e) {
      console.log(`Error geocoding ${loc}:`, e.message);
    }
  }
  
  fs.writeFileSync('e:/CBM/pro9/CBM/frontend/src/components/Careers/locationCoords.json', JSON.stringify(coordsMap, null, 2));
  console.log('Done!');
}

geocodeLocations();
