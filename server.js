const express = require('express');
const path = require('path');

const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);

app.use(express.static(path.join(__dirname, '/dist')));

const users = {};

io.on('connection', (socket) => {
  socket.on('new-user', (name) => {
    users[socket.id] = name || 'user';
    io.sockets.emit('players', users);
    socket.broadcast.emit('user-connected', name || 'user');
  });
  socket.on('send-chat-message', (message) => {
    socket.broadcast.emit('chat-message', { name: users[socket.id], message });
  });
  socket.on('disconnect', () => {
    socket.broadcast.emit('user-disconnected', users[socket.id]);
    delete users[socket.id];
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT);
