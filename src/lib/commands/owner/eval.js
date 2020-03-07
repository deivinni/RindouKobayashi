const { inspect } = require('util');

module.exports = {
  name: 'eval',
  ownerOnly: true,
  alias: ['debug', 'exec'],
  exec: ({ bot, msg, args }) => { // eslint-disable-line no-unused-vars
    if (!args.join(' ')) return msg.channel.send('Que uma ajuda ou não?');
    if (['bot.token', 'msg.guild.leave()'].includes(args)) {
      return msg.channel.send({
        embed: {
          image: { url: 'https://cdn.discordapp.com/attachments/518452733662068748/545420508469133396/20190213_234508.jpg' },
          color: 0xff0000,
        },
      });
    }
    try {
      // eslint-disable-next-line no-eval
      msg.channel.send(inspect(eval(args.join(' '), { depth: 0 })), { code: 'js', maxLenght: 1500 });
    } catch (e) {
      msg.channel.send(e, { code: 'js', maxLenght: 1500 });
    }
  },
};
