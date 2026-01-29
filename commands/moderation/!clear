const { PermissionsBitField } = require("discord.js");

module.exports = {
  name: "clear",
  execute: async (client, msg, args) => {
    if (!msg.member.permissions.has(PermissionsBitField.Flags.ManageMessages))
      return msg.reply("❌ Sem permissão.");

    const qtd = parseInt(args[0]);
    if (!qtd || qtd > 100) return msg.reply("❌ Máx 100.");

    await msg.channel.bulkDelete(qtd, true);
    msg.channel.send(`🧹 ${qtd} mensagens apagadas.`)
      .then(m => setTimeout(() => m.delete(), 3000));
  }
};
