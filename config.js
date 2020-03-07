module.exports = {
  token: process.env.TOKEN,
  prefix: [';', 'rindou '],
  owner: [process.env.OWNER1, process.env.OWNER2],
  server: process.env.SERVER,
  invite: process.env.INVITE,
  colors: require('./src/assets/').colors,
  emojis: require('./src/assets/').emojis,
  perms: require('./src/assets/').perms,
  nodes: [
    { host: 'localhost', port: 2333, password: 'youshallnotpass' },
  ],
  func: require('./src/functions/index'),
};
