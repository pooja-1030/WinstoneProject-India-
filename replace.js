import fs from 'fs';
import path from 'path';

function walkDir(dir, callback) {
  fs.readdirSync(dir).forEach(f => {
    let dirPath = path.join(dir, f);
    let isDirectory = fs.statSync(dirPath).isDirectory();
    isDirectory ? 
      walkDir(dirPath, callback) : callback(path.join(dir, f));
  });
}

walkDir('./src', function(filePath) {
  if (filePath.endsWith('.js') || filePath.endsWith('.jsx')) {
    let content = fs.readFileSync(filePath, 'utf8');
    let newContent = content
      .replace(/UAE/g, 'India')
      .replace(/Dubai/g, 'Bangalore')
      .replace(/Abu Dhabi/g, 'Karnataka')
      .replace(/\+971XXXXXXXXX/g, '+91XXXXXXXXXX')
      .replace(/winstoneprojectsuae/g, 'winstoneprojectsindia')
      .replace(/United Arab Emirates/g, 'India')
      .replace(/Emirates Hills/g, 'Whitefield')
      .replace(/Downtown Bangalore/g, 'CBD Bangalore')
      .replace(/Bangalore Marina/g, 'Indiranagar')
      .replace(/Palm Jumeirah/g, 'Koramangala')
      .replace(/Business Bay/g, 'UB City');
    if (content !== newContent) {
      fs.writeFileSync(filePath, newContent);
    }
  }
});
