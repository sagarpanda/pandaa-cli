const fs = require('fs');
const path = require('path');
const Mustache = require('mustache');

const excludeList = ['.git', '.next', '.DS_Store', 'yarn.lock'];

module.exports = {
  getCurrentDirectoryBase: () => {
    return path.basename(process.cwd());
  },

  directoryExists: (filePath) => {
    return fs.existsSync(filePath);
  },

  getAllFiles: (srcDir, level = 0) => {
    let files = [];
    if(level < 0) { return [] }
    fs.readdirSync(srcDir).map(name => {
      const fullpath = `${srcDir}/${name}`;
      const isDir = fs.statSync(fullpath).isDirectory();
      if(!excludeList.includes(name)) {
        if(isDir) {
          const temp = getAllFiles(fullpath, level - 1);
          files = files.concat(temp);
        } else {
          files.push(fullpath);
        }
      }
    });
    return files;
  },

  generateFiles: () => {
    // console.log(process.cwd(), __dirname)
    const files = getAllFiles('/Users/sagarpanda/Projects/Misc/snoopy', 10);
    files.forEach(item => {
      const tpl = fs.readFileSync(
        '/Users/sagarpanda/Projects/Misc/ucinema/a.js',
        { encoding:'utf8', flag:'r' }
      ); 
      const rendered = Mustache.render(tpl, { name: 'Luke1' });
      console.log(rendered);
      //fs.writeFileSync("/Users/sagarpanda/Projects/Misc/ucinema/programming.txt", xxx); 
    });
  }
};