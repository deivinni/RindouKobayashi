module.exports = {
  name: 'shuffle',
  guildOnly: true,
  alias: ['shuf', 'aleatória'],
  exec: ({ bot, msg }) => {
    const { voiceChannel } = msg.member;
    const player = bot.music.players.get(msg.guild.id);
    if (!player) return msg.reply('**nenhuma** música está **tocando** no momento!');
    if (voiceChannel && voiceChannel.id !== player.voiceChannel.id) return msg.reply('você **não** estamos conectados no mesmo canal de voz!');

    player.queue.shuffle();
    return msg.react('🔀');
  },
};
