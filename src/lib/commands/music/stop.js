module.exports = {
  name: 'stop',
  guildOnly: true,
  alias: ['parar'],
  exec: ({ bot, msg }) => {
    const { voiceChannel } = msg.member;
    const player = bot.music.players.get(msg.guild.id);
    if (!player) return msg.reply('**nenhuma** música está **tocando** no momento!');
    if (voiceChannel && voiceChannel.id !== player.voiceChannel.id) return msg.reply('**não** estamos conectados no mesmo canal de voz!');

    player.stop();
    return msg.react('647565493670117377');
  },
};
