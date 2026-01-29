const express = require("express");
const app = express();
const path = require("path");

const bot = require("../client/bot");
const config = require("./config.json");

app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

// 🌐 FRONTEND
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// 🤖 STATUS DO BOT (API)
app.get("/api/status", (req, res) => {
  res.json({
    online: bot.isReady(),
    ping: bot.ws.ping,
    servers: bot.guilds.cache.size,
    status: config.general.status
  });
});

// 🔄 REINICIAR BOT (API)
app.post("/api/restart", (req, res) => {
  res.json({ ok: true });
  process.exit(0); // Render reinicia automaticamente
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("🌐 Dashboard online na porta " + PORT);
});
