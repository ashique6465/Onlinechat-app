const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors'); // Import the cors middleware
const app = express();
const server = http.createServer(app);
const io = socketIo(server);
const users = {};

// Enable CORS for all origins (for development)
app.use(cors());

io.on('connection', socket => {

    //If any new user joined ,let others users connected to the server know!
    socket.on('new-user-joined', name => {
        // console.log("New user", name)
        users[socket.id] = name;
        socket.broadcast.emit('user-joined', name);
    });
//if someone sends a message broadcast it to the others
    socket.on('send', message => {
        socket.broadcast.emit('receive', { message: message, name: users[socket.id] });
    });

    //if someone leaves the chat ,let others know
socket.on('disconnect', message => {
    socket.broadcast.emit('left',users[socket.id] );
    delete users[socket.id]
});

});
server.listen(8080, () => {
    console.log('Server is running on port 8080');
});
