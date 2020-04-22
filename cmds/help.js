const figlet = require('figlet');
const chalk = require('chalk');

const menus = {
  main: `
    pandaa [command] <options>

    name ............... show my name
    version ............ show package version
    help ............... show help menu for a command`,

  name: `
    outside name <options>

    --location, -l ..... the location to use`,
}

module.exports = (args) => {
  const subCmd = args._[0] === 'help'
    ? args._[1]
    : args._[0];

  console.log(
    chalk.yellow(
      figlet.textSync('Pandaa Cli !!!', { horizontalLayout: 'full' })
    )
  );

  console.log(menus[subCmd] || menus.main);
}