const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('rules')
		.setDescription('Displays the server rules'),
	async execute(interaction) {
		await interaction.reply('Do not feed this bot!');
	},
};
