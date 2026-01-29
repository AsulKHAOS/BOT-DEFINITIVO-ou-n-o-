const { queues } = require("../music/player");

module.exports = {
  name: "pause",
  execute(client, msg) {
    const queue = queues.get(msg.guild.id);
    if (!queue) return msg.reply("❌ Nada tocando.");

    queue.player.pause();
    msg.channel.send("⏸️ Música pausada.");
  }
};
