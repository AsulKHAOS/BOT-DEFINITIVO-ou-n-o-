const {
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle
} = require("discord.js");
const fs = require("fs");

module.exports = {
  name: "ticketpanel",
  async execute(client, msg) {
    if (!msg.member.permissions.has("Administrator"))
      return msg.reply("❌ Apenas administradores.");

    const config = JSON.parse(
      fs.readFileSync("./panel/config.json")
    );

    const button = new ButtonBuilder()
      .setCustomId("create_ticket")
      .setLabel("🎟️ Criar Ticket")
      .setStyle(ButtonStyle.Primary);

    const row = new ActionRowBuilder().addComponents(button);

    msg.channel.send({
      content: config.ticketMessage,
      components: [row]
    });
  }
};
