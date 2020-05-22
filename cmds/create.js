const path = require('path');
const chalk = require('chalk');
const inquirer = require('inquirer');
const utils = require('../utils');

const questions = [
  {
    type: 'list',
    name: 'appType',
    choices: ['react', 'react-lib'],
    message: "What type of app do you want to create?"
  }
];

const create = (args) => {
  const targetDir = args._[1];

  if (targetDir) {
    inquirer.prompt(questions).then(answers => {
      const trgDir = path.resolve(process.cwd(), targetDir);
      const trgDirName = path.parse(trgDir).base || 'sample';
      const tplDir = path.resolve(__dirname, '../tpl', answers.appType);
  
      const fileList = utils.getAllFiles(tplDir, 5);
      fileList.forEach(value => {
        utils.parseAndCopyFile(tplDir + value, trgDir + value, { name: trgDirName });
      });
      console.log(chalk.green(`Success!!! ${trgDirName} is created`));
    });
  } else {
    console.log(chalk.red('Error!!! Missing target directory'));
  }
  
};

module.exports = create;