const PORT = process.env.PORT || 8003;
const ENV = require("./environment");

const app = require("./application")(ENV);
const server = require("http").Server(app);

const WebSocket = require("ws");
const ws = new WebSocket.Server({ server });
   

server.listen(PORT, () => {
  console.log(`Listening on port ${PORT} in ${ENV} mode.`);
})
