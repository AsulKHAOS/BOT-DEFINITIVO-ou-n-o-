const { PermissionsBitField } = require("discord.js");

module.exports = {
  name: "mute",
  execute: async (client, msg, args) => {
    if (!msg.member.permissions.has(PermissionsBitField.Flags.ModerateMembers))
      return msg.reply("❌ Sem permissão.");

    const user = msg.mentions.members.first();
    const tempo = args[1];
    if (!user || !tempo)
      return msg.reply("❌ Use: `!mute @user 10m motivo`");

    let ms = 0;
    if (tempo.endsWith("m")) ms = tempo.replace("m", "") * 60000;
    if (tempo.endsWith("h")) ms = tempo.replace("h", "") * 3600000;

    const motivo = args.slice(2).join(" ") || "Sem motivo";
    await user.timeout(ms, motivo);

    msg.channel.send(`🔇 ${user.user.tag} mutado por ${tempo}.`);
  }
};
