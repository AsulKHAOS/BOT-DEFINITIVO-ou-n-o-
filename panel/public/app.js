async function load() {
  const bot = await fetch("/api/bot").then(r => r.json());
  document.getElementById("botStatus").innerText =
    bot.online
      ? `🟢 Online | ${bot.guilds} servidores | ${bot.ping}ms`
      : "🔴 Offline";

  const cfg = await fetch("/api/config").then(r => r.json());
  prefix.value = cfg.general.prefix;
  status.value = cfg.general.status;
  ticketChannel.value = cfg.tickets.panelChannelId;
  ticketMessage.value = cfg.tickets.panelMessage;
  volume.value = cfg.music.defaultVolume;
  loop.value = cfg.music.defaultLoop;
}

async function save() {
  const cfg = await fetch("/api/config").then(r => r.json());
  cfg.general.prefix = prefix.value;
  cfg.general.status = status.value;
  cfg.music.defaultVolume = volume.value;
  cfg.music.defaultLoop = loop.value;
  cfg.tickets.panelChannelId = ticketChannel.value;
  cfg.tickets.panelMessage = ticketMessage.value;

  await fetch("/api/config", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(cfg)
  });

  alert("Salvo!");
}

async function sendPanel() {
  await fetch("/api/tickets/send-panel", { method: "POST" });
  alert("Painel enviado!");
}

async function restart() {
  await fetch("/api/bot/restart", { method: "POST" });
}

load();
