# RTSP Livestream Overlay Web Application

This project is a web application that plays a **livestream from an RTSP source** and allows users to **add, move, resize, update, and delete overlays** (text and images) on top of the video in real time.

The application uses **FFmpeg** to convert RTSP streams into HLS, which can be played in modern browsers.

---

## 🚀 Features

### 🎥 Livestream Playback
* Play livestream from a **user‑provided RTSP URL**.
* RTSP → HLS conversion using **FFmpeg**.
* Video playback in browser using **HLS.js**.
* **Basic controls:** Play, Pause, Volume.

### 🧩 Overlay System
* **Add Text overlays.**
* **Add Image overlays** (via image URL).
* **Drag and drop** overlays anywhere on the video.
* **Resize** overlays dynamically.
* **Edit** text overlays.
* **Delete** overlays.
* Real‑time display on video.

### 🗄️ Data Persistence
* All overlays are stored in **MongoDB**.
* Overlays are automatically loaded on page refresh.

---

## 🛠️ Tech Stack

### Frontend
* **Framework:** React (Vite)
* **Streaming:** hls.js
* **Interactivity:** react-rnd
* **HTTP Client:** axios

### Backend
* **Framework:** Python (Flask)
* **Middleware:** Flask‑CORS
* **Database Integration:** Flask‑PyMongo

### Database
* **Service:** MongoDB Atlas

### Streaming
* **Tool:** FFmpeg (RTSP → HLS conversion)

---

## 📁 Project Structure

```text
project-root/
│
├── backend/
│   ├── app.py
│   ├── stream/             # HLS segments storage
│   └── requirements.txt
│
└── frontend/
    ├── src/
    ├── public/
    └── package.json


```
How to Run the Project
1️⃣ Backend Setup
cd backend
pip install flask flask-cors flask-pymongo dnspython
python app.py
Backend runs at:

http://localhost:5000
2️⃣ Frontend Setup
cd frontend
npm install
npm install axios hls.js react-rnd
npm run dev
Frontend runs at:

http://localhost:5173
3️⃣ Using the Application
Open http://localhost:5173

Paste an RTSP URL

Click Play Livestream

Livestream starts

Add text or images

Drag, resize, edit, or delete overlays

Refresh page → overlays remain (MongoDB)

🔁 RTSP Support Explanation
Browsers cannot directly play RTSP streams.

This system uses the following pipeline:

RTSP Camera / Stream
        ↓
     FFmpeg
        ↓
   HLS (.m3u8)
        ↓
     Flask
        ↓
     React (Browser)
The backend dynamically starts FFmpeg using the RTSP URL provided by the user and converts it into HLS, which is then played in the browser.

🔗 API Endpoints
Method	Endpoint	Description
GET	/overlays	Fetch all overlays
POST	/overlays	Create new overlay
PUT	/overlays/:id	Update overlay
DELETE	/overlays/:id	Delete overlay
POST	/start-stream	Start RTSP livestream
🧪 Example RTSP Command (used internally)
ffmpeg -rtsp_transport tcp -i rtsp://<camera-url> \
-f hls -hls_time 2 -hls_list_size 5 -hls_flags delete_segments \
stream/stream.m3u8
This command is automatically triggered by the backend when the user submits an RTSP URL.

🎥 Demo Video Checklist
The demo video demonstrates:

Starting backend and frontend

Entering RTSP URL

Playing livestream

Adding text overlay

Adding image overlay

Dragging and resizing overlays

Updating and deleting overlays

Refreshing page and showing persistence

📌 Notes
MongoDB is used for persistent overlay storage

FFmpeg must be installed and available in system PATH

RTSP streams are dynamically started from the UI

HLS is used for browser compatibility

👨‍💻 Author
RTSP Livestream Overlay Web Application
Built using Flask, MongoDB, and React.
