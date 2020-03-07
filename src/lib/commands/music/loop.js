module.exports = {
  name: 'loop',
  guildOnly: true,
  alias: ['repetir', 'repeat'],
  exec: ({ bot, msg }) => {
    const { voiceChannel } = msg.member;
    const player = bot.music.players.get(msg.guild.id);
    if (!player) return msg.reply('**nenhuma** música esta **tocando** no momento!');
    if (voiceChannel && voiceChannel.id !== player.voiceChannel.id) return msg.reply('você **não** estamos conectados no mesmo canal de voz!');

    if (!player.queueRepeat) {
      player.setQueueRepeat(true);
      return msg.reply('agora a `fila` está em looping!');
    }
    if (player.queueRepeat) {
      player.setQueueRepeat(false);
      player.setTrackRepeat(true);
      return msg.reply('agora a `música` está em looping!');
    }
    if (player.trackRepeat) {
      player.setTrackRepeat(false);
      return msg.reply('looping desativado!');
    }
  },
};
