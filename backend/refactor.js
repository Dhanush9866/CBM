const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, 'src');

function walkDir(dir, callback) {
  fs.readdirSync(dir).forEach(f => {
    let dirPath = path.join(dir, f);
    let isDirectory = fs.statSync(dirPath).isDirectory();
    isDirectory ? walkDir(dirPath, callback) : callback(path.join(dir, f));
  });
}

walkDir(srcDir, function(filePath) {
  if (filePath.endsWith('.js')) {
    let content = fs.readFileSync(filePath, 'utf8');
    let original = content;
    
    // Replace require paths
    content = content.replace(/require\(['"]\.\.\/services\/cloudinary['"]\)/g, "require('../services/cloud')");
    content = content.replace(/require\(['"]\.\/src\/services\/cloudinary['"]\)/g, "require('./src/services/cloud')");
    
    // Replace variable name
    content = content.replace(/cloudinaryService/g, 'cloudService');
    
    if (content !== original) {
      fs.writeFileSync(filePath, content, 'utf8');
      console.log('Updated', filePath);
    }
  }
});
