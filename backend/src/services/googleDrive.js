'use strict';

const { google } = require('googleapis');
const { Readable } = require('stream');

// Initialize Google Drive API client using OAuth2
const getDriveClient = () => {
  try {
    // Get OAuth2 credentials from environment variables
    const clientId = process.env.GOOGLE_CLIENT_ID;
    const clientSecret = process.env.GOOGLE_CLIENT_SECRET;
    const redirectUri = process.env.GOOGLE_REDIRECT_URI || 'https://developers.google.com/oauthplayground';
    const refreshToken = process.env.GOOGLE_REFRESH_TOKEN;

    if (!clientId || !clientSecret || !refreshToken) {
      throw new Error('Missing OAuth2 credentials. Please set GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, and GOOGLE_REFRESH_TOKEN in .env file');
    }

    // Create OAuth2 client
    const oauth2Client = new google.auth.OAuth2(
      clientId,
      clientSecret,
      redirectUri
    );

    // Set the refresh token
    oauth2Client.setCredentials({
      refresh_token: refreshToken
    });

    // Create and return Drive client
    const drive = google.drive({ version: 'v3', auth: oauth2Client });
    
    return drive;
  } catch (error) {
    console.error('❌ Error initializing Google Drive OAuth2 client:', error);
    throw new Error(`Failed to initialize Google Drive client: ${error.message}`);
  }
};

/**
 * Upload a PDF file to Google Drive
 * @param {Buffer} fileBuffer - The file buffer to upload
 * @param {string} fileName - The name of the file
 * @param {string} folderId - Optional folder ID in Google Drive (if not provided, will use root or env variable)
 * @returns {Promise<{fileId: string, webViewLink: string, webContentLink: string, downloadLink: string}>}
 */
const uploadPDF = async (fileBuffer, fileName, folderId = null) => {
  try {
    const drive = getDriveClient();
    
    // Get folder ID from environment variable or use provided folderId
    const targetFolderId = folderId || process.env.GOOGLE_DRIVE_FOLDER_ID || null;
    
    // Convert buffer to stream for Google Drive API
    const bufferStream = Readable.from(fileBuffer);
    
    const media = {
      mimeType: 'application/pdf',
      body: bufferStream,
    };
    
    // Try uploading with folder first, then without if it fails
    let response;
    let uploadAttempted = false;
    
    if (targetFolderId) {
      try {
        console.log('📤 Uploading PDF to Google Drive with folder:', fileName, 'Folder ID:', targetFolderId);
        
        const fileMetadata = {
          name: fileName,
          mimeType: 'application/pdf',
          parents: [targetFolderId],
        };
        
        response = await drive.files.create({
          requestBody: fileMetadata,
          media: media,
          fields: 'id, name, webViewLink, webContentLink',
        });
        
        uploadAttempted = true;
        console.log('✅ PDF uploaded successfully to folder:', response.data.id);
      } catch (folderError) {
        // If folder permission fails, try uploading to root
        if (folderError.code === 403 || folderError.message?.includes('permissions') || folderError.message?.includes('Insufficient permissions') || folderError.message?.includes('File not found')) {
          console.warn('⚠️ Folder permission denied or folder not found, uploading to root instead:', folderError.message);
        } else {
          throw folderError;
        }
      }
    }
    
    // Upload to root if folder upload failed or no folder specified
    if (!uploadAttempted && !response) {
      console.log('📤 Uploading PDF to Google Drive (root):', fileName);
      
      const fileMetadata = {
        name: fileName,
        mimeType: 'application/pdf',
      };
      
      // Create a new stream for retry (streams can only be read once)
      const retryBufferStream = Readable.from(fileBuffer);
      
      const retryMedia = {
        mimeType: 'application/pdf',
        body: retryBufferStream,
      };
      
      response = await drive.files.create({
        requestBody: fileMetadata,
        media: retryMedia,
        fields: 'id, name, webViewLink, webContentLink',
      });
      
      console.log('✅ PDF uploaded successfully to root:', response.data.id);
    }
    
    if (!response || !response.data || !response.data.id) {
      throw new Error('Failed to upload PDF: No response from Google Drive');
    }
    
    // Make the file publicly viewable
    try {
      await drive.permissions.create({
        fileId: response.data.id,
        requestBody: {
          role: 'reader',
          type: 'anyone',
        },
      });
      console.log('✅ File permissions set to public');
    } catch (permError) {
      console.warn('⚠️ Could not set public permissions (file may still be accessible):', permError.message);
    }
    
    // Generate a direct download link
    const downloadLink = `https://drive.google.com/uc?export=download&id=${response.data.id}`;
    
    return {
      fileId: response.data.id,
      webViewLink: response.data.webViewLink || `https://drive.google.com/file/d/${response.data.id}/view`,
      webContentLink: response.data.webContentLink || downloadLink,
      downloadLink: downloadLink,
    };
  } catch (error) {
    console.error('❌ Error uploading PDF to Google Drive:', error);
    throw new Error(`Failed to upload PDF to Google Drive: ${error.message}`);
  }
};

/**
 * Delete a file from Google Drive
 * @param {string} fileId - The Google Drive file ID
 */
const deletePDF = async (fileId) => {
  try {
    const drive = getDriveClient();
    await drive.files.delete({ fileId });
    console.log('✅ PDF deleted from Google Drive:', fileId);
  } catch (error) {
    console.error('❌ Error deleting PDF from Google Drive:', error);
    throw new Error(`Failed to delete PDF from Google Drive: ${error.message}`);
  }
};

module.exports = {
  uploadPDF,
  deletePDF,
};
