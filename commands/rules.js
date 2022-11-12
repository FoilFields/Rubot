const { SlashCommandBuilder } = require('discord.js');
const RuleManager = require('../ruleManager')

module.exports = {
	data: new SlashCommandBuilder()
		.setName('rules')
		.setDescription('Displays the server rules'),
	async execute(interaction) {
		const server = interaction.guild.id;
		try {
			await interaction.reply(RuleManager.Get(server, interaction.channel_id));
		} catch (error) {
			await interaction.reply(`Couldn't show rules,\n${error}`);
		}
	},
};
