const { prefix, owner, emojis } = require('../../../config');

module.exports = (bot, [msg]) => {
  if (msg.author.bot) { return; }
  if (msg.channel.type === 'dm') { return; }
  prefix.find((p) => { // eslint-disable-line array-callback-return
    if (!msg.content.toLowerCase().startsWith(p)) { return; }
    const args = msg.content.slice(p.length).trim().split(/\s+/g);
    const comando = args.shift().toLowerCase();
    const cmd = bot.commands.get(comando) || bot.commands.get(bot.aliases.get(comando));

    if (cmd) {
      try {
        if (cmd.ownerOnly && !owner.some((x) => msg.author.id === x)) return msg.react(emojis.ids.discord.owner);
        if (cmd.guildOnly && msg.channel.type === 'dm') return msg.react('🔒');
        if (cmd.nsfw && !msg.channel.nsfw) return msg.react('🔞');
        if (cmd.manu && !owner.some((x) => msg.author.id === x)) return msg.react(emojis.ids.bot.manutenção);
        cmd.exec({ bot, msg, args });
      } catch (e) {
        console.error(e.stack);
      }
    } else if (!prefix.some((x) => msg.content.toLowerCase() === x)) msg.react('❌');
  });
};
