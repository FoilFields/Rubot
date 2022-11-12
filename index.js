const Discord = require('discord.js');
const Config = require('./config.json');

const client = new Discord.Client();

client.once('ready', () => {
    console.log("Robit bot ready!")
});

client.login(Config.BOT_TOKEN);