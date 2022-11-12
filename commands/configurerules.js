const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');
const RuleManager = require('../ruleManager')

module.exports = {
	data: new SlashCommandBuilder()
		.setName('configurerules')
		.setDescription('Configure the rules')
		.setDefaultMemberPermissions(PermissionFlagsBits.BanMembers)
		.addSubcommand(subcommand =>
			subcommand
				.setName("add")
				.setDescription("Add a new command to the rules")
				.addStringOption(option =>
					option
						.setName("rule")
						.setRequired(true)
						.setDescription("The name of this rule")
						.setMaxLength(2000)
					)
				.addStringOption(option =>
					option
						.setName("content")
						.setRequired(true)
						.setDescription("The actual rule itself")
						.setMaxLength(2000)
					)
			)
		.addSubcommand(subcommand =>
			subcommand
				.setName("delete")
				.setDescription("Deletes the specified rule")
				.addStringOption(option =>
					option
						.setName("rule")
						.setRequired(true)
						.setDescription("The name of the rule to delete")
						.setMaxLength(2000)
					)
			),
	async execute(interaction) {		
		const subcommand = interaction.options.getSubcommand()
		const rule = interaction.options.getString('rule') ?? ''
		const server = interaction.guild.id

		if (subcommand === 'add') {
			const description = interaction.options.getString('content') ?? 'You diddn\'t set the content dumbass';

			try {
				RuleManager.Add(server, rule, description)
				await interaction.reply(`Created rule ${rule}`);
			} catch (error) {
				await interaction.reply(`Couldn't create rule ${rule},\n${error}`);
			}

		} else if (subcommand === 'delete') {
			try {
				RuleManager.Remove(server, rule)
				await interaction.reply(`Deleted rule ${rule}`);
			} catch (error) {
				await interaction.reply(`Couldn't delete rule ${rule},\n${error}`);
			}
		}
	},
};
