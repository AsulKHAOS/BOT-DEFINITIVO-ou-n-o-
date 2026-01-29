const { PermissionsBitField } = require("discord.js");

module.exports = {
  name: "unban",
  execute: async (client, msg, args) => {
    if (!msg.member.permissions.has(PermissionsBitField.Flags.BanMembers))
      return msg.reply("❌ Sem permissão.");

    const id = args[0];
    if (!id) return msg.reply("❌ Informe o ID.");

    await msg.guild.members.unban(id);
    msg.channel.send(`♻️ Usuário ${id} desbanido.`);
  }
};
