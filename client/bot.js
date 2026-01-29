const { Client, GatewayIntentBits, Collection } = require("discord.js");
const fs = require("fs");
const config = require("../config.json");

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildVoiceStates,
    GatewayIntentBits.MessageContent
  ]
});

client.commands = new Collection();

// carregar comandos
fs.readdirSync("./commands").forEach(file => {
  const command = require(`../commands/${file}`);
  client.commands.set(command.name, command);
});

client.once("ready", () => {
  console.log(`🔥 Bot ligado: ${client.user.tag}`);
  client.user.setActivity(config.status);
});

client.on("messageCreate", msg => {
  if (!msg.content.startsWith(config.prefix) || msg.author.bot) return;

  const args = msg.content.slice(config.prefix.length).trim().split(/ +/);
  const cmd = args.shift().toLowerCase();

  const command = client.commands.get(cmd);
  if (command) command.execute(client, msg, args);
});

module.exports = client;

require("../tickets/panelHandler")(client);

const config = require("../panel/config.json");

