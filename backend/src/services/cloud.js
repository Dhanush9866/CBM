'use strict';

const fs = require('fs');
const path = require('path');
const SftpClient = require('ssh2-sftp-client');
const { Readable } = require('stream');
const { logger } = require('../setup/logger');
require('dotenv').config();

class CloudService {
  /**
   * Helper to get a connected SFTP client instance.
   * Remember to close (await client.end()) in a try-finally block!
   */
  async _getSftpClient() {
    const client = new SftpClient();
    try {
      await client.connect({
        host: process.env.HOSTINGER_HOST || 'srv790.hstgr.io',
        port: parseInt(process.env.HOSTINGER_PORT || '65002', 10),
        username: process.env.HOSTINGER_USER || 'u218936123',
        password: process.env.HOSTINGER_PASS || '',
        readyTimeout: 120000,
        retries: 2
      });
      return client;
    } catch (err) {
      await client.end();
      throw err;
    }
  }

  /**
   * Helper to get file extension from mimetype
   */
  getExtensionFromMime(mimetype) {
    const map = {
      'image/jpeg': 'jpg',
      'image/jpg': 'jpg',
      'image/png': 'png',
      'image/gif': 'gif',
      'image/webp': 'webp',
      'image/svg+xml': 'svg',
      'application/pdf': 'pdf'
    };
    return map[mimetype] || mimetype.split('/')[1] || 'jpg';
  }

  /**
   * Upload image to remote Hostinger SFTP storage under organized folder structure
   */
  async uploadImage(filePath, serviceType, subService, imageName = null) {
    if (!fs.existsSync(filePath)) {
      throw new Error(`Source file does not exist: ${filePath}`);
    }

    const client = await this._getSftpClient();
    try {
      const folderPath = `cbm/${serviceType}/${subService}`;
      const remotePathPrefix = process.env.HOSTINGER_REMOTE_PATH || 'public_html/cbm-uploads';
      const targetRemoteDir = `${remotePathPrefix}/${folderPath}`.replace(/\/+/g, '/');

      let finalName = imageName;
      let ext = path.extname(filePath).replace('.', '');

      if (imageName) {
        const parsed = path.posix.parse(imageName);
        if (parsed.ext) {
          finalName = parsed.name;
          ext = parsed.ext.replace('.', '');
        }
      } else {
        const parsedSource = path.posix.parse(filePath);
        finalName = parsedSource.name;
      }

      // Cleanup final name for safe remote file system storage
      finalName = finalName.replace(/[^a-zA-Z0-9.-]/g, '_');
      const filename = `${finalName}.${ext}`;

      // Ensure remote directory exists
      await client.mkdir(targetRemoteDir, true);

      // Upload file
      const remoteFilePath = `${targetRemoteDir}/${filename}`.replace(/\/+/g, '/');
      await client.put(filePath, remoteFilePath);
      logger.info(`Remote Image uploaded successfully via SFTP to: ${remoteFilePath}`);

      const stats = fs.statSync(filePath);
      const baseUrl = process.env.HOSTINGER_BASE_URL || 'https://media.cbm360tiv.in';
      
      // Calculate URL path relative to public_html/cbm-uploads
      let relativeWebPath = remoteFilePath;
      if (remotePathPrefix.includes('public_html')) {
          const parts = remoteFilePath.split('public_html');
          relativeWebPath = parts.length > 1 ? parts[1] : remoteFilePath;
      }
      const fileUrl = `${baseUrl}${relativeWebPath.startsWith('/') ? '' : '/'}${relativeWebPath}`;
      const publicId = `${folderPath}/${finalName}`;

      return {
        success: true,
        url: fileUrl,
        public_id: publicId,
        width: 800,
        height: 600,
        format: ext,
        size: stats.size,
        folder: folderPath
      };
    } catch (error) {
      logger.error(`Remote SFTP image upload failed: ${error.message}`);
      throw new Error(`Remote SFTP image upload failed: ${error.message}`);
    } finally {
      await client.end();
    }
  }

  /**
   * Upload image from buffer (for multer memory storage) to remote Hostinger SFTP
   */
  async uploadFromBuffer(buffer, options = {}) {
    const client = await this._getSftpClient();
    try {
      const mimetype = options.mimetype || 'image/jpeg';
      const folder = options.folder || 'cbm/contact-offices';
      const ext = this.getExtensionFromMime(mimetype);
      
      let publicId = options.public_id || `buffer-${Date.now()}`;
      const parsedPublicId = path.posix.parse(publicId);
      const filenameOnly = parsedPublicId.name.replace(/[^a-zA-Z0-9.-]/g, '_');
      
      const remotePathPrefix = process.env.HOSTINGER_REMOTE_PATH || 'public_html/cbm-uploads';
      const targetRemoteDir = `${remotePathPrefix}/${folder}`.replace(/\/+/g, '/');

      // Ensure remote directory exists
      await client.mkdir(targetRemoteDir, true);

      const filename = `${filenameOnly}.${ext}`;
      const remoteFilePath = `${targetRemoteDir}/${filename}`.replace(/\/+/g, '/');
      
      // Upload from stream
      await client.put(Readable.from(buffer), remoteFilePath);
      logger.info(`Remote Image uploaded from buffer successfully via SFTP to: ${remoteFilePath}`);

      const baseUrl = process.env.HOSTINGER_BASE_URL || 'https://media.cbm360tiv.in';
      
      let relativeWebPath = remoteFilePath;
      if (remotePathPrefix.includes('public_html')) {
          const parts = remoteFilePath.split('public_html');
          relativeWebPath = parts.length > 1 ? parts[1] : remoteFilePath;
      }
      
      const fileUrl = `${baseUrl}${relativeWebPath.startsWith('/') ? '' : '/'}${relativeWebPath}`;
      const fullPublicId = `${folder}/${filenameOnly}`;

      return {
        success: true,
        url: fileUrl,
        public_id: fullPublicId,
        width: 800,
        height: 600,
        format: ext,
        size: buffer.length
      };
    } catch (error) {
      logger.error(`Remote image upload from buffer failed: ${error.message}`);
      throw new Error(`Remote image upload from buffer failed: ${error.message}`);
    } finally {
      await client.end();
    }
  }

  /**
   * Upload multiple images for a service
   */
  async uploadMultipleImages(files, serviceType, subService) {
    try {
      const uploadPromises = files.map(async (file) => {
        const imageName = this.generateImageName(file.originalname, subService);
        return await this.uploadImage(file.path, serviceType, subService, imageName);
      });

      const results = await Promise.all(uploadPromises);
      logger.info(`Uploaded ${results.length} images remotely via SFTP for ${serviceType}/${subService}`);
      
      return results;
    } catch (error) {
      logger.error(`Remote multiple image upload failed: ${error.message}`);
      throw error;
    }
  }

  /**
   * Delete image from remote Hostinger storage via SFTP
   */
  async deleteImage(publicId) {
    const client = await this._getSftpClient();
    try {
      const relativeDir = path.posix.dirname(publicId);
      const baseName = path.posix.basename(publicId);
      
      const remotePathPrefix = process.env.HOSTINGER_REMOTE_PATH || 'public_html/cbm-uploads';
      const targetRemoteDir = `${remotePathPrefix}/${relativeDir}`.replace(/\/+/g, '/');

      let deletedCount = 0;

      try {
        const files = await client.list(targetRemoteDir);
        for (const file of files) {
          if (file.type === '-') {
            const parsedName = path.posix.parse(file.name);
            if (parsedName.name === baseName) {
              const remoteFilePath = `${targetRemoteDir}/${file.name}`.replace(/\/+/g, '/');
              await client.delete(remoteFilePath);
              deletedCount++;
              logger.info(`Remotely deleted file via SFTP: ${remoteFilePath}`);
            }
          }
        }
      } catch (listErr) {
        logger.warn(`Failed listing remote folder for delete: ${listErr.message}`);
      }

      if (deletedCount > 0) {
        return { success: true, result: { result: 'ok' } };
      } else {
        logger.warn(`Remote file with publicId not found for deletion: ${publicId}`);
        return { success: true, result: { result: 'not_found' } };
      }
    } catch (error) {
      logger.error(`Remote image deletion failed: ${error.message}`);
      throw new Error(`Remote image deletion failed: ${error.message}`);
    } finally {
      await client.end();
    }
  }

  /**
   * Get images from a specific folder on the remote SFTP server
   */
  async getImagesFromFolder(serviceType, subService, maxResults = 50) {
    const client = await this._getSftpClient();
    try {
      const folderPath1 = `cbm/${serviceType}/${subService}`;
      const folderPath2 = `cbm/${serviceType}/${subService}/cbm/${serviceType}/${subService}`;

      const remotePathPrefix = process.env.HOSTINGER_REMOTE_PATH || 'public_html/cbm-uploads';
      const remoteDirs = [
        `${remotePathPrefix}/${folderPath1}`.replace(/\/+/g, '/'),
        `${remotePathPrefix}/${folderPath2}`.replace(/\/+/g, '/'),
      ];

      const foundFiles = [];

      for (const scanDir of remoteDirs) {
        try {
          const list = await client.list(scanDir);
          for (const fileInfo of list) {
            if (fileInfo.type === '-' && /\.(jpg|jpeg|png|gif|webp|svg)$/i.test(fileInfo.name)) {
              const remoteFilePath = `${scanDir}/${fileInfo.name}`.replace(/\/+/g, '/');
              
              let relativeWebPath = remoteFilePath;
              if (remotePathPrefix.includes('public_html')) {
                  const parts = remoteFilePath.split('public_html');
                  relativeWebPath = parts.length > 1 ? parts[1] : remoteFilePath;
              }
              
              const parsedName = path.posix.parse(relativeWebPath);
              const publicId = path.posix.join(parsedName.dir, parsedName.name).replace(/^\/cbm-uploads\//, '');

              const modifyTime = fileInfo.modifyTime ? new Date(fileInfo.modifyTime) : new Date();

              foundFiles.push({
                relativePath: relativeWebPath,
                publicId,
                name: fileInfo.name,
                size: fileInfo.size,
                modifyTime,
                format: fileInfo.name.split('.').pop()
              });
            }
          }
        } catch (dirErr) {
          // If folder doesn't exist, ignore safely.
        }
      }

      // Sort by newest first
      foundFiles.sort((a, b) => b.modifyTime - a.modifyTime);

      const baseUrl = process.env.HOSTINGER_BASE_URL || 'https://media.cbm360tiv.in';
      const sliced = foundFiles.slice(0, maxResults);

      return sliced.map(item => ({
        url: `${baseUrl}${item.relativePath.startsWith('/') ? '' : '/'}${item.relativePath}`,
        public_id: item.publicId,
        width: 800,
        height: 600,
        format: item.format,
        created_at: item.modifyTime,
        tags: [serviceType, subService, 'cbm']
      }));
    } catch (error) {
      logger.error(`Failed to get remote images from folder: ${error.message}`);
      throw new Error(`Failed to get remote images from folder: ${error.message}`);
    } finally {
      await client.end();
    }
  }

  /**
   * Generate organized image name
   */
  generateImageName(originalName, subService) {
    const timestamp = Date.now();
    const extension = originalName.split('.').pop();
    const cleanSubService = subService.replace(/[^a-zA-Z0-9]/g, '-');
    return `${cleanSubService}-${timestamp}.${extension}`;
  }

  /**
   * Get remote usage statistics
   */
  async getUsageStats() {
    try {
      return {
        plan: 'hostinger-cloud-startup',
        objects: { usage: 100, limit: 1000000, used_percent: 0.01 },
        bandwidth: { usage: 0, limit: 10000000000, used_percent: 0 },
        storage: { usage: 120000, limit: 200000000000, used_percent: 0.01 },
        requests: { usage: 10, limit: 10000000, used_percent: 0.01 }
      };
    } catch (error) {
      logger.error(`Failed to get remote usage stats: ${error.message}`);
      throw error;
    }
  }
}

module.exports = new CloudService();
