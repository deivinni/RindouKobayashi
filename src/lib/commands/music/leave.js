module.exports = {
  name: 'leave',
  guildOnly: true,
  alias: ['sair'],
  exec: ({ bot, msg }) => {
    const { voiceChannel } = msg.member;
    const player = bot.music.players.get(msg.guild.id);
    if (!player) return msg.reply('**nenhuma** música esta **tocando** no momento!');
    if (voiceChannel && voiceChannel.id !== player.voiceChannel.id) return msg.reply('você **não** estamos conectados no mesmo canal de voz!');

    bot.music.players.destroy(msg.guild.id);
    return msg.react('656829704950775808');
  },
};
