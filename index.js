require('dotenv').config();
const { Client, Collection } = require('discord.js');

const bot = new Client();

['commands', 'aliases'].forEach((x) => bot[x] = new Collection()); // eslint-disable-line no-return-assign
['events', 'commands'].forEach((x) => require(`./src/modules/${x}`)(bot));

bot.login(process.env.TOKEN);
