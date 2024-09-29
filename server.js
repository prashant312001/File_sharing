const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const path = require("path");
const cors = require("cors");

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// Setup EJS as view engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(
  cors({
    origin: "*",
  }));

// Serve static files from public folder
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.render("index"); // Render the EJS template
});

app.get("/about", (req, res) => {
  res.render("about"); // Render the EJS template
  
});

app.get("/project", (req, res) => {
  res.render("project"); // Render the EJS template
  
});

io.on("connection", (socket) => {
  console.log("New client connected");
  socket.emit("connected", { message: "Connected to the server!" });

  socket.on("send_file", (data) => {
    console.log("File received: ", data.filename);
    io.emit("receive_file", data); // Broadcast to all clients
  });

  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, "0.0.0.0", () =>
  console.log(`Server running on port ${PORT}`)
);

// 192.168.29.29
// 192.168.88.249