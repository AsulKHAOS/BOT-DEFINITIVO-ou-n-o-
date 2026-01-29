const { queues } = require("../music/player");

module.exports = {
  name: "skip",
  execute(client, msg) {
    const queue = queues.get(msg.guild.id);
    if (!queue) return msg.reply("❌ Nada tocando.");

    queue.player.stop();
    msg.channel.send("⏭️ Música pulada.");
  }
};
