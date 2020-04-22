const ora = require('ora');

module.exports = () => {
  const spinner = ora('unicorns Loading...').start();
  setTimeout(() => {
    // spinner.color = 'yellow';
    // spinner.stop();
    // spinner.text = 'unicorns done';
    spinner.succeed('unicorns done');
}, 3000);
};