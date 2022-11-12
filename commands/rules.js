const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');
const RuleManager = require('../ruleManager')

module.exports = {
	data: new SlashCommandBuilder()
		.setName('rules')
		.setDescription('Displays the server rules'),
	async execute(interaction) {
		const server = interaction.guild.id
		const serverRules = RuleManager.Get(server)
		await interaction.reply("Rules for server: ");
	},
};
