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
  if (!address) return null;
  try {
    const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}&limit=1`;
    const res = await fetch(url, {
      headers: {
        'User-Agent': 'CBM-Backend/1.0 (contact@cbm360tiv.com)'
      }
    });
    if (!res.ok) return null;
    const data = await res.json();
    if (Array.isArray(data) && data.length > 0) {
      const first = data[0];
      const lat = parseFloat(first.lat);
      const lon = parseFloat(first.lon);
      if (Number.isFinite(lat) && Number.isFinite(lon)) {
        return { latitude: lat, longitude: lon };
      }
    }
    return null;
  } catch (err) {
    return null;
  }
}

// Auto-geocode on create/save when address provided and coords missing or address changed
ContactOfficeSchema.pre('save', async function(next) {
  try {
    if (!this.isModified('address') && this.latitude != null && this.longitude != null) return next();
    const result = await geocodeAddress(this.address);
    if (result) {
      this.latitude = result.latitude;
      this.longitude = result.longitude;
    }
    next();
  } catch (e) {
    next();
  }
});

// Auto-geocode on findOneAndUpdate when address changes or coords are not provided
ContactOfficeSchema.pre('findOneAndUpdate', async function(next) {
  try {
    const update = this.getUpdate() || {};
    const address = update.address || (update.$set && update.$set.address);
    const latitude = update.latitude ?? (update.$set && update.$set.latitude);
    const longitude = update.longitude ?? (update.$set && update.$set.longitude);
    if (address && (latitude == null || longitude == null)) {
      const result = await geocodeAddress(address);
      if (result) {
        if (!update.$set) update.$set = {};
        update.$set.latitude = result.latitude;
        update.$set.longitude = result.longitude;
        this.setUpdate(update);
      }
    }
    next();
  } catch (e) {
    next();
  }
});

module.exports = mongoose.model('ContactOffice', ContactOfficeSchema);


