const express = require('express');
const http = require('http');
const WebSocket = require('ws');
const path = require('path');

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

app.use(express.static(path.join(__dirname, 'public')));

const rooms = {}; // Store users by room
const users = {}; // Store users with their WebSocket connections

wss.on('connection', ws => {
    let currentUser = null;
    let currentRoom = null;

    ws.on('message', message => {
        const data = JSON.parse(message);

        switch (data.type) {
            case 'login':
                currentUser = data.username;
                users[currentUser] = ws;
                break;

            case 'join':
                currentRoom = data.room;
                if (!rooms[currentRoom]) {
                    rooms[currentRoom] = [];
                }
                rooms[currentRoom].push(currentUser);
                broadcastRoomUpdate(currentRoom);
                break;

            case 'chat':
                if (currentRoom) {
                    broadcastMessage(currentRoom, currentUser, data.message);
                }
                break;

            case 'getUsers':
                if (currentRoom) {
                    const roomUsers = rooms[currentRoom] || [];
                    ws.send(JSON.stringify({ type: 'user', users: roomUsers }));
                }
                break;

            case 'disconnect':
                if (currentRoom && currentUser) {
                    const index = rooms[currentRoom].indexOf(currentUser);
                    if (index !== -1) {
                        rooms[currentRoom].splice(index, 1);
                        broadcastRoomUpdate(currentRoom);
                    }
                }
                if (currentUser) {
                    delete users[currentUser];
                }
                break;
        }
    });

    ws.on('close', () => {
        if (currentRoom && currentUser) {
            const index = rooms[currentRoom].indexOf(currentUser);
            if (index !== -1) {
                rooms[currentRoom].splice(index, 1);
                broadcastRoomUpdate(currentRoom);
            }
        }
        if (currentUser) {
            delete users[currentUser];
        }
    });
});

function broadcastMessage(room, username, message) {
    const roomUsers = rooms[room] || [];
    roomUsers.forEach(user => {
        if (users[user]) {
            users[user].send(JSON.stringify({ type: 'chat', username, message }));
        }
    });
}

function broadcastRoomUpdate(room) {
    const roomUsers = rooms[room] || [];
    roomUsers.forEach(user => {
        if (users[user]) {
            users[user].send(JSON.stringify({ type: 'user', users: roomUsers }));
        }
    });
}

server.listen(8080, () => {
    console.log('Server is listening on port 8080');
});

