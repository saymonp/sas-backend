import app from "./app";

import * as http from "http";
import socketio from "socket.io";

const server = http.createServer(app).listen(process.env.PORT || 3333);

const io = socketio.listen(server, { origins: "*:*" });

app.set("io", io);
