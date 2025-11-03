'use strict';

const mongoose = require('mongoose');
const fetch = require('node-fetch');

// Translation schema for contact office fields
const ContactOfficeTranslationSchema = new mongoose.Schema(
  {
    region_name: { type: String },
    region: { type: String },
    country: { type: String },
    office_name: { type: String },
    address: { type: String },
    notes: { type: String }
  },
  { _id: false }
);

const ContactOfficeSchema = new mongoose.Schema(
  {
    region_name: { type: String, required: true, index: true },
    region: { type: String, required: true },
    country: { type: String, required: true },
    office_name: { type: String, required: true },
    address: { type: String, required: true },
    phone: { type: String, required: true },
    emails: { type: [String], default: [] },
    is_lab_facility: { type: Boolean, default: false },
    notes: { type: String, default: '' },
    image_url: { type: String, default: '' },
    latitude: { type: Number, default: null },
    longitude: { type: Number, default: null },
    region_order: { type: Number, default: 0, index: true },
    office_order: { type: Number, default: 0, index: true },
    translations: {
      // Pre-stored translations for contact office content
      type: Map,
      of: ContactOfficeTranslationSchema,
      default: {},
    }
  },
  { timestamps: true }
);

async function geocodeAddress(address) {
  if (!address) {
    console.warn('⚠️ Geocoding skipped: address is empty');
    return null;
  }
  
  // Generate alternative address formats for fallback
  const addressVariants = [];
  
  // 1. Original address (try first)
  addressVariants.push(address);
  
  // 2. Remove Plus Codes (format: G9RP+PGF or similar patterns)
  const withoutPlusCode = address.replace(/[A-Z0-9]{2,}\+[A-Z0-9]{2,}/gi, '').trim();
  if (withoutPlusCode !== address) {
    addressVariants.push(withoutPlusCode);
  }
  
  // 3. Extract city and country (look for common patterns)
  const cityCountryMatch = address.match(/(.+?),\s*(.+?)(?:,\s*(.+?))?$/);
  if (cityCountryMatch) {
    // Extract parts after comma
    const parts = address.split(',').map(p => p.trim()).filter(p => p);
    if (parts.length >= 2) {
      // Last two parts are usually country and region
      const cityAndCountry = parts.slice(0, -1).join(', ');
      if (cityAndCountry !== address && cityAndCountry !== withoutPlusCode) {
        addressVariants.push(cityAndCountry);
      }
    }
    // Just city (first part before comma)
    const justCity = parts[0];
    if (justCity && justCity.length > 2 && justCity !== address) {
      addressVariants.push(justCity);
    }
  }
  
  // Try each variant until one succeeds
  for (let i = 0; i < addressVariants.length; i++) {
    const variant = addressVariants[i].replace(/\s+/g, ' ').trim(); // Normalize whitespace
    
    if (!variant) continue;
    
    try {
      // Add a small delay to respect rate limiting (Nominatim requires max 1 request per second)
      if (i > 0) {
        await new Promise(resolve => setTimeout(resolve, 1100));
      }
      
      const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(variant)}&limit=1&addressdetails=1`;
      const res = await fetch(url, {
        headers: {
          'User-Agent': 'CBM-Backend/1.0 (contact@cbm360tiv.com)'
        }
      });
      
      if (!res.ok) {
        console.warn(`⚠️ Geocoding failed: HTTP ${res.status} for variant ${i + 1}/${addressVariants.length}: ${variant}`);
        continue;
      }
      
      const data = await res.json();
      if (Array.isArray(data) && data.length > 0) {
        const first = data[0];
        const lat = parseFloat(first.lat);
        const lon = parseFloat(first.lon);
        if (Number.isFinite(lat) && Number.isFinite(lon)) {
          const usedVariant = i === 0 ? 'original' : `variant ${i + 1}`;
          console.log(`✅ Geocoded successfully using ${usedVariant}: "${variant}" → [${lat}, ${lon}]`);
          return { latitude: lat, longitude: lon };
        }
      }
      
      console.warn(`⚠️ Geocoding returned no results for variant ${i + 1}/${addressVariants.length}: ${variant}`);
    } catch (err) {
      console.error(`❌ Geocoding error for variant ${i + 1}/${addressVariants.length} "${variant}":`, err.message);
      continue;
    }
  }
  
  console.warn(`⚠️ All geocoding attempts failed for address: ${address}`);
  return null;
}

// Auto-geocode on create/save when address provided and coords missing or address changed
ContactOfficeSchema.pre('save', async function(next) {
  try {
    // Skip geocoding if coordinates are explicitly set (not null, not 0)
    // This respects manually provided coordinates
    if ((this.isModified('latitude') || this.isModified('longitude')) &&
        this.latitude != null && this.longitude != null && 
        this.latitude !== 0 && this.longitude !== 0) {
      console.log(`ℹ️ Manual coordinates provided, skipping geocoding: [${this.latitude}, ${this.longitude}]`);
      return next();
    }
    
    // Skip geocoding if address hasn't changed and coordinates already exist
    if (!this.isModified('address') && this.latitude != null && this.longitude != null) {
      return next();
    }
    
    // Always try to geocode if address exists and coordinates are missing
    if (this.address && (this.latitude == null || this.longitude == null || this.latitude === 0 || this.longitude === 0)) {
      console.log(`🔍 Attempting to geocode address: ${this.address}`);
      const result = await geocodeAddress(this.address);
      if (result) {
        this.latitude = result.latitude;
        this.longitude = result.longitude;
        console.log(`✅ Coordinates set: [${result.latitude}, ${result.longitude}]`);
      } else {
        console.warn(`⚠️ Geocoding failed or returned no results for: ${this.address}`);
      }
    }
    next();
  } catch (e) {
    console.error('❌ Error in pre-save geocoding hook:', e.message);
    next(); // Continue even if geocoding fails
  }
});

// Auto-geocode on findOneAndUpdate when address changes or coords are not provided
ContactOfficeSchema.pre('findOneAndUpdate', async function(next) {
  try {
    const update = this.getUpdate() || {};
    const updateSet = update.$set || {};
    
    // Get address from update or existing document
    const address = update.address || updateSet.address;
    
    // Check if coordinates are being explicitly set in update (even if null)
    const latitudeInUpdate = update.latitude !== undefined ? update.latitude : (updateSet.latitude !== undefined ? updateSet.latitude : undefined);
    const longitudeInUpdate = update.longitude !== undefined ? update.longitude : (updateSet.longitude !== undefined ? updateSet.longitude : undefined);
    
    // If coordinates are explicitly provided (even if null), respect them
    if (latitudeInUpdate !== undefined || longitudeInUpdate !== undefined) {
      const hasManualCoords = latitudeInUpdate != null && longitudeInUpdate != null && 
                              latitudeInUpdate !== 0 && longitudeInUpdate !== 0;
      if (hasManualCoords) {
        console.log(`ℹ️ Manual coordinates provided, skipping geocoding: [${latitudeInUpdate}, ${longitudeInUpdate}]`);
        return next();
      }
      // If coordinates are explicitly set to null/empty, trigger geocoding if address exists
      if ((latitudeInUpdate === null || latitudeInUpdate === '' || latitudeInUpdate === 0) ||
          (longitudeInUpdate === null || longitudeInUpdate === '' || longitudeInUpdate === 0)) {
        console.log(`🔄 Coordinates cleared, will geocode if address exists`);
        // Continue to geocoding logic below
      }
    }
    
    // If address exists and coordinates are not being explicitly set, check if they exist in DB
    if (address) {
      // If coordinates are not in update, check the existing document
      if (latitudeInUpdate === undefined && longitudeInUpdate === undefined) {
        const doc = await this.model.findOne(this.getQuery());
        if (doc) {
          // Check if existing doc has valid coordinates
          const hasValidCoords = doc.latitude != null && doc.longitude != null && 
                                doc.latitude !== 0 && doc.longitude !== 0;
          
          // Only geocode if coordinates are missing or invalid
          if (!hasValidCoords) {
            console.log(`🔍 Attempting to geocode address for update: ${address}`);
            const result = await geocodeAddress(address);
            if (result) {
              if (!update.$set) update.$set = {};
              update.$set.latitude = result.latitude;
              update.$set.longitude = result.longitude;
              this.setUpdate(update);
              console.log(`✅ Coordinates set in update: [${result.latitude}, ${result.longitude}]`);
            } else {
              console.warn(`⚠️ Geocoding failed for update address: ${address}`);
            }
          } else {
            console.log(`ℹ️ Coordinates already exist for address: ${address}`);
          }
        } else {
          // Document doesn't exist yet (create operation via update)
          console.log(`🔍 Attempting to geocode new address: ${address}`);
          const result = await geocodeAddress(address);
          if (result) {
            if (!update.$set) update.$set = {};
            update.$set.latitude = result.latitude;
            update.$set.longitude = result.longitude;
            this.setUpdate(update);
            console.log(`✅ Coordinates set for new address: [${result.latitude}, ${result.longitude}]`);
          }
        }
      } else {
        // Coordinates were explicitly set in update but are null/0/empty - geocode the address
        const shouldGeocode = (latitudeInUpdate === null || latitudeInUpdate === '' || latitudeInUpdate === 0 || 
                              longitudeInUpdate === null || longitudeInUpdate === '' || longitudeInUpdate === 0);
        if (shouldGeocode) {
          console.log(`🔍 Coordinates cleared or invalid, geocoding address: ${address}`);
          const result = await geocodeAddress(address);
          if (result) {
            if (!update.$set) update.$set = {};
            update.$set.latitude = result.latitude;
            update.$set.longitude = result.longitude;
            this.setUpdate(update);
            console.log(`✅ Coordinates geocoded: [${result.latitude}, ${result.longitude}]`);
          } else {
            console.warn(`⚠️ Geocoding failed for address: ${address}`);
          }
        }
      }
    }
    next();
  } catch (e) {
    console.error('❌ Error in pre-findOneAndUpdate geocoding hook:', e.message);
    next(); // Continue even if geocoding fails
  }
});

module.exports = mongoose.model('ContactOffice', ContactOfficeSchema);


