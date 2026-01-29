const { queues } = require("../music/player");

module.exports = {
  name: "nowplaying",
  execute(client, msg) {
    const queue = queues.get(msg.guild.id);
    if (!queue) return msg.reply("❌ Nada tocando.");

    msg.channel.send(`🎶 Tocando agora: **${queue.songs[0].title}**`);
  }
};
