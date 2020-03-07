const { ErelaClient, Utils: { formatTime } } = require('erela.js');
const {
  emojis, prefix, nodes, func: { Embed, shortenerText },
} = require('../../../config');

const images = ['https://cdn.discordapp.com/emojis/654751220233142272.gif', 'https://cdn.discordapp.com/emojis/654751220791246848.gif', 'https://cdn.discordapp.com/emojis/654751224633098250.gif', 'https://cdn.discordapp.com/emojis/654751226097041428.gif', 'https://cdn.discordapp.com/emojis/654751230295539733.gif', 'https://cdn.discordapp.com/emojis/654751230987468800.gif', 'https://cdn.discordapp.com/emojis/654751237832704033.gif', 'https://cdn.discordapp.com/emojis/654751238902120448.gif', 'https://cdn.discordapp.com/emojis/654751239006846997.gif', 'https://cdn.discordapp.com/emojis/654751240865054720.gif', 'https://cdn.discordapp.com/emojis/654751240944746546.gif', 'https://cdn.discordapp.com/emojis/654751241972482050.gif', 'https://cdn.discordapp.com/emojis/654751245789036554.gif', 'https://cdn.discordapp.com/emojis/654751245864534026.gif', 'https://cdn.discordapp.com/emojis/654751246284095498.gif', 'https://cdn.discordapp.com/emojis/654751249639669832.gif', 'https://cdn.discordapp.com/emojis/654751251317391360.gif', 'https://cdn.discordapp.com/emojis/654751254261661707.gif', 'https://cdn.discordapp.com/emojis/654751257751322624.gif', 'https://cdn.discordapp.com/emojis/654751257885671434.gif', 'https://cdn.discordapp.com/emojis/654751258795573269.gif', 'https://cdn.discordapp.com/emojis/654751259777040386.gif', 'https://cdn.discordapp.com/emojis/654751259869446156.gif', 'https://cdn.discordapp.com/emojis/654751261106896936.gif', 'https://cdn.discordapp.com/emojis/654751261148577823.gif', 'https://cdn.discordapp.com/emojis/654751262411194368.gif'];

/* eslint-disable no-param-reassign */

module.exports = (bot) => {
  bot.user.setPresence({
    status: 'idle',
    game: {
      name: `${prefix[0]}help | ${bot.users.filter((x) => !x.bot).size}`,
      type: 'STREAMING',
      url: 'https://www.twitch.tv/deivinni_',
    },
  });

  bot.music = new ErelaClient(bot, nodes)
    .on('nodeError', (e) => console.error(e))
    .on('nodeConnect', () => console.log('[Erela]: Novo node foi carregado com sucesso!'))
    .on('queueEnd', ({ textChannel, guild }) => {
      textChannel.send(new Embed().setDescription('<:Wave:656829704950775808> | A fila de reprodução acabou, estou desconectando!'));
      bot.music.players.destroy(guild.id);
    })
    .on('trackStart', console.log)
    .on('trackStart', ({ textChannel }, {
      title, duration, author, requester, uri, identifier, isStream,
    }) => {
      textChannel.send({
        embed: new Embed().setAuthor('Tocando agora!', 'https://cdn.discordapp.com/emojis/654300278186835969.gif?v=1')
          .setDescriptionArray([
            [
              `Música: [\`${shortenerText(title, 38)}\`](${uri})`,
              `Live: ${isStream ? emojis.discord.enable.enable : emojis.discord.enable.disable}`,
              `Autor: **${author}**`,
              `Duração: \`${isStream ? '🔴 Live' : formatTime(duration, true)}\``,
              `Solicitado por: ${requester}`,
            ],
          ]).setImage(`http://img.youtube.com/vi/${identifier}/maxresdefault.jpg` || null)
          .setThumbnail(images[Math.floor(Math.random() * images.length)]),
      });
    });
  bot.level = new Map().set('none', 0.0).set('low', 0.10).set('medium', 0.15)
    .set('high', 0.25);
  console.log('Sáporra ta pegando!');
};
