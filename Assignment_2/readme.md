# Real-Time Chat Application

## Overview

This is a real-time chat application where users can join chat rooms and exchange messages with others in the same room. It uses WebSocket for real-time communication and provides a simple interface for users to log in, join rooms, and send messages.

## Features

- Real-time chat using WebSocket
- User login and room selection
- Display online users in the room
- Persistent message storage in local storage
- Responsive design for various devices

## Project Structure

- `index.html`: The main HTML file for the chat interface.
- `style.css`: The stylesheet for styling the chat application.
- `script.js`: The JavaScript file handling the chat logic and WebSocket communication.
- `server.js`: The server-side code for handling WebSocket connections and serving static files.

## Getting Started

To get started with the Real-Time Chat application, follow these steps:

### Prerequisites

- Node.js and npm installed on your machine.

### Running the Application
1.Start the server:

node server.js

The server will start and listen on port 8080 by default.

2.Open the application in your browser:

Navigate to http://localhost:8080 to access the chat application.

### Usage
1.Login:

Enter a username and room name in the login form.
Click "Join Chat" to enter the chat room.


2.Chat:

Messages from users will appear in the chat area.
Type a message in the input box and press Enter or click the "Send" button to send it.


3.User List:

Click the user icon to toggle the list of users online in the chat room.


4.Development
Frontend: The frontend is built with HTML, CSS, and JavaScript. It handles the user interface and interactions.
Backend: The backend is built with Node.js, Express, and WebSocket. It manages WebSocket connections and serves static files.


5.Dependencies
express: Web framework for Node.js.
ws: WebSocket library for real-time communication.