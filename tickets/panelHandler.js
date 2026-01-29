const { createTicket } = require("./tickets");

module.exports = client => {
  client.on("interactionCreate", async interaction => {
    if (!interaction.isButton()) return;

    if (interaction.customId === "create_ticket") {
      createTicket(interaction);
    }
  });
};
