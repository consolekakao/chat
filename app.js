// REQUIRE
const express = require("express");
const socket = require("socket.io");
const http = require("http");
const { write, fstat } = require("fs");
const app = express();
const server = http.createServer(app);
const io = socket(server);
const fs = require("fs");

// USE
app.use("/css", express.static("./static/css"));
app.use("/js", express.static("./static/js"));

//GET
app.get("/", function (request, response) {
  fs.readFile("./static/index.html", function (err, data) {
    if (err) {
      console.log("ERROR in fsreadfile");
      response.send("ERROR");
    } else {
      response.writeHead(200, { "Content-Type": "text/html" });
      response.write(data);
      response.end();
    }
  });
});

io.sockets.on("connect", function (socket) {
  console.log("유저 접속");
  socket.on("send", function (data) {
    console.log("전달된 메시지: ", data.msg);
  });

  socket.on("disconnect", function () {
    console.log("접속종료");
  });
});

//SERVER
server.listen(2629, function () {
  console.log("server start..");
});
