'use strict';

const ContactOffice = require('../models/ContactOffice');
const { ApiError } = require('../utils/error');
const cloudinaryService = require('../services/cloudinary');
const { translateText, SUPPORTED, translateArraySafely } = require('../services/translation');

function parseEmails(emails) {
  if (!emails) return [];
  if (Array.isArray(emails)) return emails;
  return emails.split(',').map(e => e.trim()).filter(e => e);
}

async function createContactOffice(req, res, next) {
  try {
    console.log('🔹 Create contact office request received:', req.body);

    const {
      region_name,
      region,
      country,
      office_name,
      address,
      phone,
      emails,
      is_lab_facility = false,
      notes = '',
      image_url = '',
      region_order = 0,
      office_order = 0,
      latitude,
      longitude
    } = req.body;

    // Validate required fields
    if (!region_name || !region || !country || !office_name || !address || !phone) {
      throw new ApiError(400, 'region_name, region, country, office_name, address, and phone are required');
    }

    // Handle image upload if provided
    let finalImageUrl = image_url;
    if (req.file) {
      try {
        const publicId = `${region.toLowerCase().replace(/\s+/g, '-')}-${country.toLowerCase().replace(/\s+/g, '-')}-${office_name.toLowerCase().replace(/\s+/g, '-')}`;
        console.log(`🔹 Uploading image to Cloudinary with publicId: ${publicId}`);
        const uploadResult = await cloudinaryService.uploadFromBuffer(req.file.buffer, {
          folder: 'cbm/contact-offices',
          public_id: publicId,
          transformation: [{ width: 400, height: 300, crop: 'fit', quality: 'auto' }]
        });
        finalImageUrl = uploadResult.url;
        console.log(`✅ Featured image uploaded: ${finalImageUrl}`);
      } catch (uploadError) {
        console.warn('❌ Cloudinary upload failed, using provided image_url or empty:', uploadError);
      }
    }

    // Prepare initial office data
    const officeData = {
      region_name,
      region,
      country,
      office_name,
      address,
      phone,
      emails: parseEmails(emails),
      is_lab_facility,
      notes,
      image_url: finalImageUrl,
      region_order,
      office_order,
      translations: {}
    };

    // Handle manual coordinates if provided
    if (latitude !== undefined && latitude !== '' && latitude !== null) {
      officeData.latitude = parseFloat(latitude);
    }
    if (longitude !== undefined && longitude !== '' && longitude !== null) {
      officeData.longitude = parseFloat(longitude);
    }

    // Translate fields into other languages
    const TARGET_LANGUAGES = SUPPORTED.filter(l => l !== 'en');
    for (const lang of TARGET_LANGUAGES) {
      try {
        const [regionT, regionNameT, countryT, officeT, addressT, notesT] = await Promise.all([
          translateText(region, lang),
          translateText(region_name, lang),
          translateText(country, lang),
          translateText(office_name, lang),
          translateText(address, lang),
          translateText(notes, lang)
        ]);

        officeData.translations[lang] = {
          region_name: regionNameT,
          region: regionT,
          country: countryT,
          office_name: officeT,
          address: addressT,
          notes: notesT
        };

        console.log(`✅ Translated contact office to ${lang}`);
      } catch (e) {
        console.warn(`❌ Failed to translate contact office to ${lang}: ${e.message}`);
      }
    }

    const contactOffice = await ContactOffice.create(officeData);
    console.log(`✅ Contact office created successfully: ID ${contactOffice._id}`);
    console.log(`📍 Coordinates: [${contactOffice.latitude}, ${contactOffice.longitude}]`);

    res.status(201).json({ success: true, data: contactOffice });

  } catch (err) {
    console.error('❌ Error creating contact office:', err);
    next(err);
  }
}



async function getContactOffices(req, res, next) {
  try {
    const { region_name, region, country, is_lab_facility } = req.query;
    
    const filter = {};
    if (region_name) filter.region_name = region_name;
    if (region) filter.region = region;
    if (country) filter.country = country;
    if (is_lab_facility !== undefined) filter.is_lab_facility = is_lab_facility === 'true';

    const offices = await ContactOffice.find(filter)
      .sort({ region_order: 1, office_order: 1, createdAt: -1 })
      .lean();

    res.json({ success: true, data: offices });
  } catch (err) {
    next(err);
  }
}

async function getContactOfficeById(req, res, next) {
  try {
    const { id } = req.params;
    const office = await ContactOffice.findById(id);
    
    if (!office) {
      throw new ApiError(404, 'Contact office not found');
    }

    res.json({ success: true, data: office });
  } catch (err) {
    next(err);
  }
}

async function updateContactOffice(req, res, next) {
  try {
    const { id } = req.params;
    console.log(`🔹 Update contact office request received for ID: ${id}`, req.body);

    const existingOffice = await ContactOffice.findById(id);
    if (!existingOffice) throw new ApiError(404, 'Contact office not found');

    const {
      region_name,
      region,
      country,
      office_name,
      address,
      phone,
      emails,
      is_lab_facility,
      notes,
      image_url,
      region_order,
      office_order,
      latitude,
      longitude
    } = req.body;

    if (!region_name || !region || !country || !office_name || !address || !phone) {
      throw new ApiError(400, 'region_name, region, country, office_name, address, and phone are required');
    }

    const updates = {
      region_name,
      region,
      country,
      office_name,
      address,
      phone,
      emails: parseEmails(emails),
      is_lab_facility,
      notes,
      region_order,
      office_order,
      translations: existingOffice.translations || {}
    };

    // Handle manual coordinates if provided (allow null to clear coordinates)
    if (latitude !== undefined) {
      updates.latitude = latitude === '' || latitude === null ? null : parseFloat(latitude);
    }
    if (longitude !== undefined) {
      updates.longitude = longitude === '' || longitude === null ? null : parseFloat(longitude);
    }

    // Handle image upload
    if (req.file) {
      try {
        const publicId = `${region.toLowerCase().replace(/\s+/g, '-')}-${country.toLowerCase().replace(/\s+/g, '-')}-${office_name.toLowerCase().replace(/\s+/g, '-')}`;
        console.log(`🔹 Uploading updated image to Cloudinary with publicId: ${publicId}`);
        const uploadResult = await cloudinaryService.uploadFromBuffer(req.file.buffer, {
          folder: 'cbm/contact-offices',
          public_id: publicId,
          transformation: [{ width: 400, height: 300, crop: 'fit', quality: 'auto' }]
        });
        updates.image_url = uploadResult.url;
        console.log(`✅ Updated featured image: ${updates.image_url}`);
      } catch (uploadError) {
        console.warn('❌ Cloudinary upload failed, keeping existing image:', uploadError);
      }
    } else if (image_url !== undefined) {
      updates.image_url = image_url;
    }

    // Translate updated fields
    const TARGET_LANGUAGES = SUPPORTED.filter(l => l !== 'en');
    for (const lang of TARGET_LANGUAGES) {
      try {
        const [regionT, regionNameT, countryT, officeT, addressT, notesT] = await Promise.all([
          translateText(region, lang),
          translateText(region_name, lang),
          translateText(country, lang),
          translateText(office_name, lang),
          translateText(address, lang),
          translateText(notes, lang)
        ]);

        updates.translations[lang] = {
          region_name: regionNameT,
          region: regionT,
          country: countryT,
          office_name: officeT,
          address: addressT,
          notes: notesT
        };

        console.log(`✅ Translated updated contact office to ${lang}`);
      } catch (e) {
        console.warn(`❌ Failed to translate updated contact office to ${lang}: ${e.message}`);
      }
    }

    // Use $set to ensure geocoding hook runs properly
    const updatePayload = { $set: updates };
    
    const updatedOffice = await ContactOffice.findByIdAndUpdate(id, updatePayload, { 
      new: true, 
      runValidators: true 
    });
    
    console.log(`✅ Contact office updated successfully: ID ${updatedOffice._id}`);
    console.log(`📍 Coordinates: [${updatedOffice.latitude}, ${updatedOffice.longitude}]`);

    res.json({ success: true, data: updatedOffice });

  } catch (err) {
    console.error('❌ Error updating contact office:', err);
    next(err);
  }
}

/**
 * Manually trigger geocoding for an existing office
 */
async function geocodeContactOffice(req, res, next) {
  try {
    const { id } = req.params;
    const office = await ContactOffice.findById(id);
    
    if (!office) {
      throw new ApiError(404, 'Contact office not found');
    }

    if (!office.address) {
      throw new ApiError(400, 'Office address is required for geocoding');
    }

    console.log(`🔍 Manually geocoding office: ${office.office_name} (${office.address})`);
    
    // Use the same geocoding logic as the model
    const fetch = require('node-fetch');
    
    const geocodeAddressWithFallback = async (address) => {
      if (!address) return null;
      
      // Generate alternative address formats for fallback
      const addressVariants = [];
      
      // 1. Original address
      addressVariants.push(address);
      
      // 2. Remove Plus Codes (format: G9RP+PGF or similar patterns)
      const withoutPlusCode = address.replace(/[A-Z0-9]{2,}\+[A-Z0-9]{2,}/gi, '').trim();
      if (withoutPlusCode !== address && withoutPlusCode) {
        addressVariants.push(withoutPlusCode);
      }
      
      // 3. Extract city and country
      const parts = address.split(',').map(p => p.trim()).filter(p => p);
      if (parts.length >= 2) {
        const cityAndCountry = parts.slice(0, -1).join(', ');
        if (cityAndCountry !== address && cityAndCountry !== withoutPlusCode) {
          addressVariants.push(cityAndCountry);
        }
        // Just city (first part)
        const justCity = parts[0];
        if (justCity && justCity.length > 2 && justCity !== address) {
          addressVariants.push(justCity);
        }
      }
      
      // Try each variant
      for (let i = 0; i < addressVariants.length; i++) {
        const variant = addressVariants[i].replace(/\s+/g, ' ').trim();
        if (!variant) continue;
        
        try {
          if (i > 0) {
            await new Promise(resolve => setTimeout(resolve, 1100));
          }
          
          const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(variant)}&limit=1&addressdetails=1`;
          const res = await fetch(url, {
            headers: {
              'User-Agent': 'CBM-Backend/1.0 (contact@cbm360tiv.com)'
            }
          });
          
          if (!res.ok) continue;
          
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
        } catch (err) {
          console.error(`Geocoding error for variant ${i + 1}: ${err.message}`);
          continue;
        }
      }
      
      return null;
    };

    const result = await geocodeAddressWithFallback(office.address);
    
    if (result) {
      office.latitude = result.latitude;
      office.longitude = result.longitude;
      await office.save();
      
      console.log(`✅ Coordinates set: [${result.latitude}, ${result.longitude}]`);
      res.json({ 
        success: true, 
        data: office,
        message: 'Coordinates geocoded successfully'
      });
    } else {
      res.status(400).json({ 
        success: false, 
        message: 'Geocoding failed. Please check the address format.' 
      });
    }
  } catch (err) {
    next(err);
  }
}

async function deleteContactOffice(req, res, next) {
  try {
    const { id } = req.params;
    const office = await ContactOffice.findByIdAndDelete(id);
    
    if (!office) {
      throw new ApiError(404, 'Contact office not found');
    }

    res.json({ success: true, data: { id } });
  } catch (err) {
    next(err);
  }
}

async function getContactOfficesGrouped(req, res, next) {
  try {
    const offices = await ContactOffice.find()
      .sort({ region_order: 1, office_order: 1 })
      .lean();
    
    const grouped = offices.reduce((acc, o) => {
      if (!acc[o.region_name]) acc[o.region_name] = [];
      acc[o.region_name].push(o);
      return acc;
    }, {});
    
    const response = Object.entries(grouped).map(([region_name, offices]) => ({ region_name, offices }));
    res.json(response);
  } catch (err) {
    next(err);
  }
}

module.exports = {
  createContactOffice,
  getContactOffices,
  getContactOfficeById,
  updateContactOffice,
  deleteContactOffice,
  getContactOfficesGrouped,
  geocodeContactOffice
};
