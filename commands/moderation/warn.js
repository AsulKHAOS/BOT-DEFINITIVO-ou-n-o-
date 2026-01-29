const warns = new Map();

module.exports = {
  name: "warn",
  warns,
  execute(client, msg, args) {
    if (!msg.member.permissions.has("ManageMessages"))
      return msg.reply("❌ Sem permissão.");

    const user = msg.mentions.members.first();
    if (!user) return msg.reply("❌ Mencione alguém.");

    const motivo = args.slice(1).join(" ") || "Sem motivo";

    if (!warns.has(user.id)) warns.set(user.id, []);
    warns.get(user.id).push(motivo);

    msg.channel.send(`⚠️ ${user.user.tag} advertido.`);
  }
};
