const { Client, GatewayIntentBits, Collection } = require("discord.js");
const fs = require("fs");
const path = require("path");

// 🔧 CONFIG DO DASHBOARD
const config = require("../panel/config.json");

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildVoiceStates,
    GatewayIntentBits.MessageContent
  ]
});

client.commands = new Collection();

// 📂 CARREGAR COMANDOS (SÓ .js)
const commandsPath = path.join(__dirname, "../commands");
const commandFiles = fs
  .readdirSync(commandsPath)
  .filter(file => file.endsWith(".js"));

for (const file of commandFiles) {
  const command = require(path.join(commandsPath, file));
  client.commands.set(command.name, command);
}

// 🤖 BOT ONLINE
client.once("ready", () => {
  console.log(`🔥 Bot ligado: ${client.user.tag}`);
  client.user.setActivity(config.general.status);
});

// 💬 MENSAGENS
client.on("messageCreate", msg => {
  if (!msg.content.startsWith(config.general.prefix)) return;
  if (msg.author.bot) return;

  const args = msg.content
    .slice(config.general.prefix.length)
    .trim()
    .split(/ +/);

  const cmd = args.shift().toLowerCase();
  const command = client.commands.get(cmd);

  if (command) {
    command.execute(client, msg, args);
  }
});

// 🔑 LOGIN
client.login(process.env.DISCORD_TOKEN);

module.exports = client;

