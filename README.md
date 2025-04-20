
#  Group Chat Server (Express + MongoDB)

A simple and scalable backend API for group-based messaging using **Node.js**, **Express**, and **MongoDB**. This server powers a real-time chat application that supports multiple groups, message history, and persistent data storage.

---

##  Features

- 🔐 JWT-based authentication
- 💬 Real-time group chat messaging (with `socket.io`)
- 🧠 In-memory + MongoDB-based group and message handling
- 📚 Message persistence per group
- 📡 RESTful API for groups and messages
- 🌐 CORS support for cross-platform frontend development

---

##  Tech Stack

| Layer         | Tech                    |
| ------------- | ------------------------ |
| Server        | Node.js, Express.js     |
| Real-time     | Socket.IO               |
| Database      | MongoDB + Mongoose      |
| Authentication| JWT (optional)          |
| Environment   | dotenv                  |
| Date Handling | Day.js (optional)       |

---

##  Folder Structure

```
.
├── models/
│   ├── Group.js        # Group schema (optional)
│   └── Message.js      # Message schema
├── routes/
│   └── groupRoutes.js  # Group + message APIs
├── socket/
│   └── socketHandler.js # Socket.IO logic
├── server.js           # Entry point
├── .env                # Environment variables
└── README.md           # This file
```

---

##  Installation

```bash
git clone https://github.com/your-username/group-chat-server.git
cd group-chat-server
npm install
```

###  Environment Variables

Create a `.env` file:

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/chatapp
```

---

### PAGE
![index.html]
(./public/assets/image.png)

## ▶ Run the Server

```bash
npm start
```

By default, server runs on: `http://localhost:5000`

---

##  API Endpoints

###  Fetch Group Messages

```
GET /api/groups
```

**Returns**:
```json
[
  {
    "name": "weebhub",
    "admin": "om",
    "members": ["om", "anotheruser"],
    "messages": [
      {
        "sender": "om",
        "message": "hii weebos",
        "createdAt": "2025-04-20T05:42:41.034Z"
      }
    ]
  }
]
```

---

##  Socket.IO Events

### Connect to socket
```js
socket.emit("join_room", "weebhub");
```

### Send a message
```js
socket.emit("send_message", {
  room: "weebhub",
  sender: "om",
  message: "yo what's up"
});
```

### Receive a message
```js
socket.on("receive_message", (data) => {
  console.log(data);
});
```

---

##  Notes

- The backend doesn't include user signup/login yet. Add JWT or session-based auth if needed.
- Group metadata (`name`, `admin`, `members`) is optional in DB. You can keep it fully in memory too.
- You can enhance this by adding file upload support, message reactions, online status, etc.

---

##  Future Improvements

- 🔐 Add authentication (JWT)
- 📌 Add pinned messages / mentions
- 🧪 Add unit + integration tests
- 🗂 Group avatars or profile images
- 📱 Companion Flutter frontend (if not already present)

---

##  Author

Built with **Om Jamnekar**  
[GitHub](https://github.com/your-username) | [Email](mailto:omjjamnekar@gmail.com)
