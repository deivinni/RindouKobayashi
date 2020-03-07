module.exports = {
  name: 'remove',
  guildOnly: true,
  alias: ['r', 'remover'],
  exec: ({ bot, msg, args }) => {
    const { voiceChannel } = msg.member;
    const player = bot.music.players.get(msg.guild.id);
    if (!player) return msg.reply('**nenhuma** música está **tocando** no momento!');
    if (voiceChannel && voiceChannel.id !== player.voiceChannel.id) return msg.reply('**não** estamos conectados no mesmo canal de voz!');
    if (!args[0] || Number.isNaN(args[0])) return msg.reply('você **não** me informou um **número** válido!');

    player.queue.remove(Number(args[0])).catch(msg.react('❌'));
    return msg.react('647565493670117377');
  },
};
