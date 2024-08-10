document.addEventListener('DOMContentLoaded', () => {
    const ws = new WebSocket('ws://localhost:8080');
    const chatDiv = document.getElementById('chat');
    const loginDiv = document.getElementById('login');
    const usernameInput = document.getElementById('username');
    const roomInput = document.getElementById('room');
    const loginBtn = document.getElementById('login-btn');
    const messagesDiv = document.getElementById('messages');
    const messageInput = document.getElementById('message');
    const usersDiv = document.getElementById('users');
    const roomNameSpan = document.getElementById('room-name');
    let currentUsername = ''; // Initialize empty string for username

    // Load messages from local storage
    function loadMessages() {
        const storedMessages = JSON.parse(localStorage.getItem('messages')) || [];
        storedMessages.forEach(message => {
            const messageDiv = document.createElement('div');
            const isSent = message.username === currentUsername; // Determine if the message is sent by the current user

            messageDiv.className = `message ${isSent ? 'sent' : 'received'}`;
            messageDiv.innerHTML = `
                <span class="message-username">${message.username}:</span>
                <div class="message-content">${message.message}</div>
            `;
            messagesDiv.appendChild(messageDiv);
            messagesDiv.scrollTop = messagesDiv.scrollHeight;
        });
    }

    // Save messages to local storage
    function saveMessage(username, message) {
        const storedMessages = JSON.parse(localStorage.getItem('messages')) || [];
        storedMessages.push({ username, message });
        localStorage.setItem('messages', JSON.stringify(storedMessages));
    }

    // Handle login
    loginBtn.addEventListener('click', () => {
        const username = usernameInput.value.trim();
        const room = roomInput.value.trim();
        if (username && room) {
            currentUsername = username; // Set the current username
            ws.send(JSON.stringify({ type: 'login', username }));
            ws.send(JSON.stringify({ type: 'join', room }));
            loginDiv.style.display = 'none';
            chatDiv.style.display = 'flex';
            roomNameSpan.textContent = room;
            loadMessages(); // Load messages when joining a room
        }
    });

    // Handle WebSocket messages
    ws.onmessage = event => {
        const data = JSON.parse(event.data);

        if (data.type === 'chat') {
            const messageDiv = document.createElement('div');
            const isSent = data.username === currentUsername; // Determine if the message is sent by the current user

            messageDiv.className = `message ${isSent ? 'sent' : 'received'}`;
            messageDiv.innerHTML = `
                <span class="message-username">${data.username}:</span>
                <div class="message-content">${data.message}</div>
            `;
            messagesDiv.appendChild(messageDiv);
            messagesDiv.scrollTop = messagesDiv.scrollHeight;
            saveMessage(data.username, data.message); // Save message to local storage
        } else if (data.type === 'user') {
            // Update users list, preserving the heading and icon
            const userHeading = document.querySelector('#users h3').innerHTML;
            usersDiv.innerHTML = `<h3>${userHeading}</h3>`;
            data.users.forEach(user => {
                const userDiv = document.createElement('div');
                userDiv.textContent = user;
                userDiv.className = 'user';
                usersDiv.appendChild(userDiv);
            });
        } else if (data.type === 'joined') {
            console.log(`Joined room ${data.room}`);
        }
    };

    // Send message function
    function sendMessage() {
        const message = messageInput.value.trim();
        if (message) {
            ws.send(JSON.stringify({ type: 'chat', username: currentUsername, message }));
            messageInput.value = '';
        }
    }

    // Handle sending messages with Enter key
    messageInput.addEventListener('keypress', event => {
        if (event.key === 'Enter') {
            sendMessage();
        }
    });

    // Handle sending messages with Send button
    document.getElementById('send-btn').addEventListener('click', sendMessage);
});

document.getElementById('send-btn').addEventListener('click', function() {
    const messageInput = document.getElementById('message');
    const messagesContainer = document.getElementById('messages');

    if (messageInput.value.trim() !== '') {
        // Create a new message element
        const newMessage = document.createElement('div');
        newMessage.classList.add('message', 'sent');

        // Add the message content
        newMessage.innerHTML = `<div class="message-username">You</div>
                                <div class="message-content">${messageInput.value}</div>`;

        // Append the new message to the messages container
        messagesContainer.appendChild(newMessage);

        // Scroll to the bottom of the messages container
        messagesContainer.scrollTop = messagesContainer.scrollHeight;

        // Clear the input
        messageInput.value = '';
    }
});

document.getElementById('toggle-users').addEventListener('click', function() {
    var usersList = document.getElementById('users');
    if (usersList.classList.contains('show')) {
        usersList.classList.remove('show');
    } else {
        usersList.classList.add('show');
    }
});

document.addEventListener("DOMContentLoaded", function () {
    const balls = Array.from({ length: 4 }, (_, i) => document.getElementById(`ball${i + 1}`));

    // Speed settings for the balls
    const ballProps = balls.map((ball, i) => ({
        element: ball,
        x: (i + 1) * 150, // Initial positions
        y: (i + 1) * 150,
        vx: (i % 2 === 0 ? 1 : -1) * (1 + 0.5 * i), // Random initial velocities
        vy: (i % 2 === 0 ? 1 : -1) * (1 + 0.5 * i)
    }));

    function updateBallPosition(ball, props) {
        ball.style.left = props.x + 'px';
        ball.style.top = props.y + 'px';
    }

    function detectCollision(props1, props2) {
        const dx = props1.x - props2.x;
        const dy = props1.y - props2.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        return distance < 150; 
    }

    function bounceBalls() {
        for (let i = 0; i < ballProps.length; i++) {
            for (let j = i + 1; j < ballProps.length; j++) {
                if (detectCollision(ballProps[i], ballProps[j])) {
                    [ballProps[i].vx, ballProps[j].vx] = [ballProps[j].vx, ballProps[i].vx];
                    [ballProps[i].vy, ballProps[j].vy] = [ballProps[j].vy, ballProps[i].vy];
                }
            }
        }
    }

    function update() {
        ballProps.forEach(props => {
            props.x += props.vx;
            props.y += props.vy;

            // Bounce off edges
            if (props.x <= 0 || props.x >= window.innerWidth - 150) props.vx *= -1;
            if (props.y <= 0 || props.y >= window.innerHeight - 150) props.vy *= -1;

            updateBallPosition(props.element, props);
        });

        bounceBalls();

        requestAnimationFrame(update);
    }

    update();
});
