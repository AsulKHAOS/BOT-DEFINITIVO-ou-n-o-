const express = require("express");
const fs = require("fs");
const app = express();

app.use(express.json());
app.use(express.static("panel/public"));

app.get("/config", (req, res) => {
  const config = require("./config.json");
  res.json(config);
});

app.post("/config", (req, res) => {
  fs.writeFileSync(
    "./panel/config.json",
    JSON.stringify(req.body, null, 2)
  );
  res.send("Configuração salva!");
});

app.listen(3000, () => {
  console.log("🎛️ Painel online");
});
