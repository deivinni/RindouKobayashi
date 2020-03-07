const { readdir } = require('fs');

module.exports = (bot) => {
  readdir('./src/lib/events/', (e, f) => {
    if (e) return console.error(e.stack);
    f.filter((x) => x.endsWith('.js')).forEach((file) => {
      const event = require(`../lib/events/${file}`);
      bot.on(file.split('.')[0], (...params) => event(bot, params));
    });
  });
};
