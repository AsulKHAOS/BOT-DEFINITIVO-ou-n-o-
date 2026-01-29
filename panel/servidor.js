const express = require("express");
const fs = require("fs");
const path = require("path");
const client = require("../client/bot");

const app = express();
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

const CONFIG = path.join(__dirname, "config.json");
const STATE = path.join(__dirname, "state.json");
const LOGS = path.join(__dirname, "logs.json");

const read = p => JSON.parse(fs.readFileSync(p));
const write = (p, d) => fs.writeFileSync(p, JSON.stringify(d, null, 2));

/* 🤖 BOT STATUS */
app.get("/api/bot", (req, res) => {
  res.json({
    online: client.isReady(),
    ping: client.ws.ping,
    guilds: client.guilds.cache.size,
    user: client.user?.tag || null
  });
});

/* ⚙️ CONFIG */
app.get("/api/config", (req, res) => {
  res.json(read(CONFIG));
});

app.post("/api/config", (req, res) => {
  write(CONFIG, req.body);
  res.json({ success: true });
});

/* 🎟️ TICKETS */
app.get("/api/tickets", (req, res) => {
  res.json(read(STATE).ticketsOpen);
});

app.post("/api/tickets/send-panel", async (req, res) => {
  const cfg = read(CONFIG);
  const channel = await client.channels.fetch(cfg.tickets.panelChannelId);

  const {
    ActionRowBuilder,
    ButtonBuilder,
    ButtonStyle
  } = require("discord.js");

  const row = new ActionRowBuilder().addComponents(
    new ButtonBuilder()
      .setCustomId("create_ticket")
      .setLabel("🎟️ Criar Ticket")
      .setStyle(ButtonStyle.Primary)
  );

  await channel.send({
    content: cfg.tickets.panelMessage,
    components: [row]
  });

  res.json({ success: true });
});

/* 🧾 LOGS */
app.get("/api/logs", (req, res) => {
  res.json(read(LOGS));
});

/* 🔄 RESTART */
app.post("/api/bot/restart", (req, res) => {
  res.json({ success: true });
  process.exit(0);
});

app.listen(3000, () => {
  console.log("🎛️ Dashboard em http://localhost:3000");
});
