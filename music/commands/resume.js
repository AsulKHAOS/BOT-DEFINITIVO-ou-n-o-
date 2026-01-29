const { queues } = require("../music/player");

module.exports = {
  name: "resume",
  execute(client, msg) {
    const queue = queues.get(msg.guild.id);
    if (!queue) return msg.reply("❌ Nada tocando.");

    queue.player.unpause();
    msg.channel.send("▶️ Música retomada.");
  }
};
