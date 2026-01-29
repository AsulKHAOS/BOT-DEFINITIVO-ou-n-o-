const { PermissionsBitField } = require("discord.js");

module.exports = {
  name: "unmute",
  execute: async (client, msg, args) => {
    if (!msg.member.permissions.has(PermissionsBitField.Flags.ModerateMembers))
      return msg.reply("❌ Sem permissão.");

    const user = msg.mentions.members.first();
    if (!user) return msg.reply("❌ Mencione alguém.");

    await user.timeout(null);
    msg.channel.send(`🔊 ${user.user.tag} desmutado.`);
  }
};
