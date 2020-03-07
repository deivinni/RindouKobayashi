const { readdir } = require('fs');

module.exports = (bot) => {
  ['music', 'owner'].forEach((p) => {
    readdir(`./src/lib/commands/${p}/`, (e, f) => {
      if (e) return console.error(e.stack);
      f.filter((x) => x.endsWith('.js')).forEach((file) => {
        const cmd = require(`../lib/commands/${p}/${file}`);
        bot.commands.set(cmd.name, cmd);
        if (cmd.alias) {
          cmd.alias.forEach((a) => bot.aliases.set(a, cmd.name));
        }
      });
    });
  });
};
