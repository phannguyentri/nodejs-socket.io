var express = require("express");
var app     = express();
app.use(express.static("public"));
app.set("view engine", "ejs");
app.set("views", "./views");
var server  = require("http").Server(app);
var io      = require("socket.io")(server);
server.listen(3000);

io.on("connection", function(socket){
    console.log("Co nguoi ket noi" + socket.id);

    socket.on("disconnect", function(){
        console.log(socket.id + " vua ngat ket noi");
    });

    socket.on('Client-send-data', function(data){
        console.log(data.message);
        io.sockets.emit("Server-send-data", 'RETURN MESSAGE');
        // socket.emit("Server-send-data", "RETURN EMIT");
        // socket.broadcast.emit("Server-send-data", "RETURN BROADCAST");
    });

});

app.get("/", function(req, res){
    res.render("trangchu");
});