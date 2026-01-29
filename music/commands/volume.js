const { queues } = require("../music/player");

module.exports = {
  name: "volume",
  execute(client, msg, args) {
    const queue = queues.get(msg.guild.id);
    const vol = parseInt(args[0]);

    if (!queue) return msg.reply("❌ Nada tocando.");
    if (isNaN(vol) || vol < 0 || vol > 100)
      return msg.reply("❌ Use 0–100.");

    queue.volume = vol / 100;
    msg.channel.send(`🔊 Volume: ${vol}%`);
  }
};
