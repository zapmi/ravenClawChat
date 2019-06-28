const express = require('express');
const app = express();
// const http = require('http').Server(app);
const io = require('socket.io')(app);

var PORT = process.env.PORT || 8080;

app.get('/', function (req, res) {
    res.render('chat.ejs');
});

io.sockets.on('connection', function (socket) {
    socket.on('username', function (username) {
        socket.username = username;
        io.emit('is_online', '🔵 <i>' + socket.username + ' joined the chat..</i>');
    });
    socket.on('disconnect', function (username) {
        io.emit('is_online', '🔴 <i>' + socket.username + ' left the chat..</i>');
    })

    socket.on('chat_message', function (message) {
        setInterval(() => io.emit('time', new Date().toTimeString()), 1000);
        io.emit('chat_message', '<strong>' + socket.username + '</strong>: ' + message);
    });
});



const server = http.listen(PORT, function () {
    console.log('listening on *:8080');
});