🎵 Media Music Player (Full Stack)

A full-stack media music player application where users can listen to songs and artists can upload and analyze their music. This project demonstrates authentication, role-based access, music streaming, and analytics features.

🚀 Features

👤 User

- Register and Login
- Listen to uploaded songs
- Access user dashboard

🎤 Artist

- Register and Login as Artist
- Upload songs
- Listen to songs
- View analytics of songs
- Track how many times a song has been played

📊 Analytics

- Artists can see song play statistics
- Track listener engagement

---

🛠 Tech Stack

Frontend

- React.js
- Vite
- CSS

Backend

- Node.js
- Express.js

Database

- MongoDB

---

📁 Project Structure

Spotify Music Player
│
├── Backend
│   ├── server.js
│   ├── routes
│   ├── controllers
│   └── models
│
├── Frontend
│   └── spotify-music-player
│       ├── src
│       │   ├── components
│       │   │   ├── Auth
│       │   │   │   ├── Login.jsx
│       │   │   │   └── Register.jsx
│       │   │   ├── Dashboard
│       │   │   │   ├── ArtistDashboard.jsx
│       │   │   │   ├── UserDashboard.jsx
│       │   │   │   └── Analytics.jsx
│       │   │   └── Navbar.jsx
│       │   ├── services
│       │   │   └── api.js
│       │   ├── App.jsx
│       │   └── main.jsx
│       └── package.json

---

⚙️ Installation

1️⃣ Clone Repository

git clone https://github.com/Shivam092187/media-player-fullstack.git

2️⃣ Backend Setup

cd Backend
npm install
node server.js

3️⃣ Frontend Setup

cd Frontend/spotify-music-player
npm install
npm run dev

---

🔐 Authentication

The system supports role-based authentication:

- User Role → Can listen to songs
- Artist Role → Can upload songs, listen to songs, and view analytics

---

📊 Artist Analytics

Artists can monitor:

- Total plays of their songs
- Listener activity
- Performance insights

---

📌 Future Improvements

- Playlist feature
- Like / Favorite songs
- Search songs
- Music recommendation system
- Improved UI/UX

---

👨‍💻 Author

Shivam

Full Stack Developer
Passionate about building scalable web applications.
