const { PermissionsBitField } = require("discord.js");

module.exports = {
  name: "ban",
  execute: async (client, msg, args) => {
    if (!msg.member.permissions.has(PermissionsBitField.Flags.BanMembers))
      return msg.reply("❌ Sem permissão.");

    const user = msg.mentions.members.first();
    if (!user) return msg.reply("❌ Mencione alguém.");

    const motivo = args.slice(1).join(" ") || "Sem motivo";
    await user.ban({ reason: motivo });

    msg.channel.send(`🔨 ${user.user.tag} banido.`);
  }
};
