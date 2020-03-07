const { Utils: { formatTime } } = require('erela.js');
const { Embed, shortenerText } = require('../../../functions/');

/* eslint-disable no-plusplus */
/* eslint-disable no-case-declarations */

module.exports = {
  name: 'play',
  guildOnly: true,
  alias: ['p', 'tocar'],
  exec: async ({ bot, msg, args }) => {
    if (!args.join(' ')) return msg.reply('favor coloque o link da **música/playlist** ou o **nome** dela!');
    if (!msg.member.voiceChannel) return msg.reply('você precisa estar **conectado** em um canal de voz!');
    if (!msg.member.voiceChannel.permissionsFor(bot.user).has('CONNECT')) return msg.reply('eu **não** posso **conectar** neste canal de voz!');
    if (!msg.member.voiceChannel.permissionsFor(bot.user).has('SPEAK')) return msg.reply('eu **não** posso **falar** neste canal de voz!');
    const player = bot.music.players.spawn({
      guild: msg.guild,
      textChannel: msg.channel,
      voiceChannel: msg.member.voiceChannel,
      selfDeaf: true,
    });
    bot.music.search(args.join(' '), msg.author).then(async (res) => {
      switch (res.loadType) {
        case 'TRACK_LOADED':
          player.queue.add(res.tracks[0]);
          await msg.channel.send(new Embed().setDescription(`Adicionei a fila [\`${shortenerText(res.tracks[0].title, 38)}\`](${res.tracks[0].uri}) [\`${res.tracks[0].isStream ? '🔴 Live' : formatTime(res.tracks[0].duration, true)}\`]`));
          if (!player.playing) return player.play();
          break;
        case 'SEARCH_RESULT':
          let index = 1;
          const tracks = res.tracks.slice(0, 5);
          await msg.channel.send({
            embed: new Embed().setAuthor('Escolha uma das opições', 'https://discordemoji.com/assets/emoji/8340_Number_Select.gif')
              .setThumbnail(bot.user.displayAvatarURL)
              .setDescription(tracks.map((v) => `**${index++}-** [${shortenerText(v.title, 38)}](${v.uri}) [\`${res.tracks[0].isStream ? '🔴 Live' : formatTime(res.tracks[0].duration, true)}\`]`))
              .setFooter('Escolha uma música em 30s, ou use "cancel" para cancelar!', msg.author.displayAvatarURL),
          }).then((m) => {
            const collector = msg.channel.createMessageCollector((ms) => ms.author.id === msg.author.id && new RegExp('^([1-5]|cancel)$', 'i').test(ms.content), { time: 30000, max: 1 });
            collector.on('collect', async (r) => {
              if (/cancel/i.test(r.content.toLowerCase())) collector.stop('cancelado');
              const track = tracks[Number(r.content) - 1];
              r.delete();
              player.queue.add(track);
              await m.edit(new Embed().setDescription(`Adicionei a fila [\`${shortenerText(track.title, 38)}\`](${track.uri}) [\`${track.isStream ? '🔴 Live' : formatTime(track.duration, true)}\`]`));
              if (!player.playing) return player.play();
            });
            collector.on('end', (_, reason) => {
              if (['time', 'cancelado'].includes(reason)) return msg.channel.send(new Embed().setDescription('Pesquisa por nome cancelada!'));
            });
          });
          break;
        case 'PLAYLIST_LOADED':
          res.playlist.tracks.forEach((x) => player.queue.add(x));
          const duration = formatTime(res.playlist.tracks.reduce((a, b) => ({ duration: a.duration + b.duration })).duration, true);
          await msg.channel.send(new Embed().setDescription(`Adicionei \`${res.playlist.tracks.length}\` músicas da playlist [\`${shortenerText(res.playlist.info.name, 38)}\`](${res.playlist.info.uri})`).setFooter(`Duração da playlist: ${duration}`));
          if (!player.playing) return player.play();
          break;
        // no default
      }
    }).catch((e) => console.error(e.stack));
  },
};
