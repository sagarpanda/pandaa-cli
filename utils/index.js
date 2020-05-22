const fs = require('fs');
const path = require('path');
const mustache = require('mustache');

const excludeList = ['.git', '.next', '.DS_Store', 'yarn.lock'];

module.exports = {
  getCurrentDirectoryBase: () => {
    return path.basename(process.cwd());
  },

  directoryExists: (filePath) => {
    return fs.existsSync(filePath);
  },

  getAllFiles: (dir, lvl = 0) => {
    const getFiles = (srcDir, level) => {
      let files = [];
      if(level < 0) { return [] }
      fs.readdirSync(srcDir).map(name => {
        const fullpath = `${srcDir}/${name}`;
        const isDir = fs.statSync(fullpath).isDirectory();
        if(!excludeList.includes(name)) {
          if(isDir) {
            const temp = getFiles(fullpath, level - 1);
            files = files.concat(temp);
          } else {
            const relPath = fullpath.replace(dir, '');
            files.push(relPath);
          }
        }
      });
      return files;
    }
    return getFiles(dir, lvl);
  },

  parseAndCopyFile: (srcFile, destFile, data) => {
    const isExist = fs.existsSync(destFile);
    if (isExist) {
      console.log(`Error!!! ${srcFile} already exist.`)
    } else {
      const tpl = fs.readFileSync(srcFile, { encoding:'utf8', flag:'r' }); 
      const rendered = mustache.render(tpl, data);
      const dir = path.dirname(destFile);
      fs.promises.mkdir(dir, { recursive: true })
        .then(x => fs.promises.writeFile(destFile, rendered))
    }
  }
};