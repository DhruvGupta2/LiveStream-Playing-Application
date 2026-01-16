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
## ⚙️ Requirements

Ensure you have the following installed on your system:

- Node.js (for Frontend)
- Python 3 (for Backend)
- FFmpeg (must be added to your system PATH)
- MongoDB Atlas account (connection string required)

Check if FFmpeg is installed:

```
ffmpeg -version
▶️ How to Run the Project
1️⃣ Backend Setup
Navigate to the backend folder, install dependencies, and start the server:

cd backend
pip install flask flask-cors flask-pymongo dnspython
python app.py
Backend runs on:
👉 http://localhost:5000

2️⃣ Frontend Setup
Navigate to the frontend folder, install dependencies, and start the development server:

cd frontend
npm install
npm install axios hls.js react-rnd
npm run dev
Frontend runs on:
👉 http://localhost:5173
```
3️⃣ Using the Application
Open your browser and go to: http://localhost:5173

Paste a valid RTSP URL in the input field

Click Play Livestream

The stream should start after a brief buffering period

Manage Overlays:
Add text or images using the controls

Drag, resize, edit, or delete overlays directly on the video player

Refresh the page to see that your overlays remain saved (fetched from MongoDB)

🔁 RTSP Support Explanation
Modern browsers do not support RTSP directly. This system uses the following pipeline:

mermaid
Copy code
graph LR
A[RTSP Camera / Stream] -->|Input| B[FFmpeg]
B -->|Convert| C[HLS (.m3u8)]
C -->|Serve| D[Flask Backend]
D -->|Play| E[React Browser App]
Process:
The backend dynamically starts an FFmpeg process using the RTSP URL provided by the user. This converts the stream into HLS segments, which are then served to the React application via HLS.js.

🔗 API Endpoints
Method	Endpoint	Description
GET	/overlays	Get all saved overlays
POST	/overlays	Create a new overlay
PUT	/overlays/:id	Update an existing overlay
DELETE	/overlays/:id	Delete an overlay
POST	/start-stream	Start the RTSP → HLS conversion

🎥 Demo Video
The demo video demonstrates:

Starting the application

Entering an RTSP URL

Playing the livestream

Adding, updating, and deleting overlays

Real‑time overlay behavior

📌 Notes
MongoDB is used for persistent storage. Ensure your connection string in app.py is correct.

FFmpeg must be installed and available in your system's global PATH.

There may be slight latency in the video feed due to the HLS conversion process.

👨‍💻 Author
RTSP Livestream Overlay Web Application
Built using Flask, MongoDB, and React.
