const play = require("play-dl");
const {
  joinVoiceChannel,
  createAudioPlayer,
  AudioPlayerStatus
} = require("@discordjs/voice");
const { queues, playSong } = require("../music/player");

module.exports = {
  name: "play",
  async execute(client, msg, args) {
    const query = args.join(" ");
    if (!query) return msg.reply("❌ Informe o nome ou link.");

    const channel = msg.member.voice.channel;
    if (!channel) return msg.reply("🎧 Entre num canal de voz.");

    let song;
    const search = await play.search(query, { limit: 1 });
    song = search[0];

    let queue = queues.get(msg.guild.id);

    if (!queue) {
      const player = createAudioPlayer();
      const connection = joinVoiceChannel({
        channelId: channel.id,
        guildId: msg.guild.id,
        adapterCreator: msg.guild.voiceAdapterCreator
      });

      queue = {
        text: msg.channel,
        voice: channel,
        connection,
        player,
        songs: [],
        volume: 0.5,
        loop: "off"
      };

      queues.set(msg.guild.id, queue);

      player.on(AudioPlayerStatus.Idle, () => {
        if (queue.loop === "song") {
          playSong(msg.guild, queue.songs[0]);
        } else {
          if (queue.loop !== "queue") queue.songs.shift();
          playSong(msg.guild, queue.songs[0]);
        }
      });

      connection.subscribe(player);
    }

    queue.songs.push({
      title: song.title,
      url: song.url
    });

    msg.channel.send(`➕ Adicionado: **${song.title}**`);

    if (queue.songs.length === 1)
      playSong(msg.guild, queue.songs[0]);
  }
};
