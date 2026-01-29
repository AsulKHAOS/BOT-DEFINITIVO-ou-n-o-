const { queues } = require("../music/player");

module.exports = {
  name: "leave",
  execute(client, msg) {
    const queue = queues.get(msg.guild.id);
    if (!queue) return msg.reply("❌ Não estou em canal.");

    queue.connection.destroy();
    queues.delete(msg.guild.id);
    msg.channel.send("👋 Saí do canal de voz.");
  }
};
