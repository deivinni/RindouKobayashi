module.exports = {
  name: 'return',
  guildOnly: true,
  alias: ['retomar'],
  manu: true,
  exec: ({ bot, msg }) => {
    const { voiceChannel } = msg.member;
    const player = bot.music.players.get(msg.guild.id);
    if (!player) return msg.reply('**nenhuma** música está **tocando** no momento!');
    if (voiceChannel && voiceChannel.id !== player.voiceChannel.id) return msg.reply('**não** estamos conectados no **mesmo** canal de voz!');
    if (player.playing) return msg.react('❌');

    player.play();
    return msg.react('647565493670117377');
  },
};
