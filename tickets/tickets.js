const { PermissionsBitField, ChannelType } = require("discord.js");

async function createTicket(interaction) {
  const guild = interaction.guild;
  const member = interaction.member;

  const existing = guild.channels.cache.find(
    c => c.name === `ticket-${member.id}`
  );
  if (existing)
    return interaction.reply({
      content: "❌ Você já tem um ticket.",
      ephemeral: true
    });

  let category = guild.channels.cache.find(
    c => c.name === "Tickets" && c.type === ChannelType.GuildCategory
  );

  if (!category) {
    category = await guild.channels.create({
      name: "Tickets",
      type: ChannelType.GuildCategory
    });
  }

  const channel = await guild.channels.create({
    name: `ticket-${member.id}`,
    type: ChannelType.GuildText,
    parent: category.id,
    permissionOverwrites: [
      {
        id: guild.roles.everyone,
        deny: [PermissionsBitField.Flags.ViewChannel]
      },
      {
        id: member.id,
        allow: [
          PermissionsBitField.Flags.ViewChannel,
          PermissionsBitField.Flags.SendMessages
        ]
      }
    ]
  });

  channel.send(`🎟️ Ticket aberto por ${member}`);
  interaction.reply({
    content: "✅ Ticket criado!",
    ephemeral: true
  });
}

module.exports = { createTicket };
