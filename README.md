🎵 Media Music Player (Full Stack)

A full-stack Media-style music player application where users can listen to songs and artists can upload and analyze their music. The application includes authentication, role-based access control, music upload functionality, and analytics for artists.

---

🚀 Features

👤 User

- Register and Login
- Listen to uploaded songs
- Access user dashboard

🎤 Artist

- Register and Login as Artist
- Upload songs
- Listen to songs
- View song analytics
- Track how many times a song has been played

📊 Analytics

- Artists can track total plays of their songs
- Monitor listener engagement
- View performance insights

---

🛠 Tech Stack

Frontend

- React.js
- Vite
- Tailwind CSS

Backend

- Node.js
- Express.js

Database

- MongoDB

---

🔐 Security & Authentication

This project implements several security and authentication mechanisms:

- JWT Authentication
- Bcrypt Password Hashing
- Role-Based Authorization (User / Artist)
- Protected Routes Middleware
- CORS Security
- Environment Variables (.env) Security

---

📂 File Upload Handling

- Multer is used for handling audio file uploads from artists.
- Uploaded songs are stored and served through backend APIs.

---

📁 Project Structure

Spotify Music Player
│
├── Backend
│   ├── server.js
│   ├── routes
│   ├── controllers
│   ├── middleware
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

---

2️⃣ Backend Setup

cd Backend
npm install
node server.js

---

3️⃣ Frontend Setup

cd Frontend/spotify-music-player
npm install
npm run dev

---

🔑 Role Based Access

User

- Can listen to songs

Artist

- Can upload songs
- Can listen to songs
- Can view analytics

---

📌 Future Improvements

- Playlist creation
- Song search feature
- Like / favorite songs
- Music recommendation system
- Improved UI/UX

---

👨‍💻 Author
Shivam

Full Stack Developer
Focused on building scalable and secure web applications.
