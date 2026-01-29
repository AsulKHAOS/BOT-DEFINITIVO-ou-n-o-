const { queues } = require("../music/player");

module.exports = {
  name: "stop",
  execute(client, msg) {
    const queue = queues.get(msg.guild.id);
    if (!queue) return msg.reply("❌ Nada tocando.");

    queue.songs = [];
    queue.player.stop();
    queue.connection.destroy();
    queues.delete(msg.guild.id);

    msg.channel.send("⏹️ Música parada e fila limpa.");
  }
};
