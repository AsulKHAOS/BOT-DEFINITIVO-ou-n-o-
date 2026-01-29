const { queues } = require("../music/player");

module.exports = {
  name: "loop",
  execute(client, msg) {
    const queue = queues.get(msg.guild.id);
    if (!queue) return msg.reply("❌ Nada tocando.");

    queue.loop =
      queue.loop === "off"
        ? "song"
        : queue.loop === "song"
        ? "queue"
        : "off";

    msg.channel.send(`🔁 Loop: **${queue.loop}**`);
  }
};
