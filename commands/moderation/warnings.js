const warnCmd = require("./warn");

module.exports = {
  name: "warnings",
  execute(client, msg, args) {
    const user = msg.mentions.members.first();
    if (!user) return msg.reply("❌ Mencione alguém.");

    const lista = warnCmd.warns.get(user.id) || [];
    msg.channel.send(`📄 ${user.user.tag} tem ${lista.length} avisos.`);
  }
};
