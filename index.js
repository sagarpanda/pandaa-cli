const minimist = require('minimist');
const chalk = require('chalk');

module.exports = () => {
  // console.log('Welcome to pandaa-cli !!!');

  const args = minimist(process.argv.slice(2));
  const cmd = args._[0];
  
  // console.log('CWD', process.cwd());
  // console.log('args', args);
  // console.log('cmd', cmd);

  switch (cmd) {
    case 'create':
      require('./cmds/create')(args);
      break
    
    case 'help':
      require('./cmds/help')(args);
      break
    
    case 'fetch':
      require('./cmds/fetch')(args);
      break

    case 'questions':
      require('./cmds/questions')(args);
      break
    
    default:
      console.error(chalk.red(`"${cmd}" is not a valid command!`))
      break
  }

}