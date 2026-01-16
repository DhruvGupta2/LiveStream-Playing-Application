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

⚙️ RequirementsEnsure you have the following installed on your system:Node.js (for Frontend)Python 3 (for Backend)FFmpeg (Must be added to your system PATH)MongoDB Atlas Account (Connection string required)Check if FFmpeg is installed:Bashffmpeg -version
▶️ How to Run the Project1️⃣ Backend SetupNavigate to the backend folder, install dependencies, and start the server.Bashcd backend
pip install flask flask-cors flask-pymongo dnspython
python app.py
Backend runs on: http://localhost:50002️⃣ Frontend SetupNavigate to the frontend folder, install dependencies, and start the development server.Bashcd frontend
npm install
npm install axios hls.js react-rnd
npm run dev
Frontend runs on: http://localhost:51733️⃣ Using the ApplicationOpen your browser and go to http://localhost:5173.Paste a valid RTSP URL in the input field.Click Play Livestream. The stream should start after a brief buffering period.Manage Overlays:Add text or images using the controls.Drag, resize, edit, or delete overlays directly on the video player.Refresh the page to see that your overlays remain saved (fetched from MongoDB).🔁 RTSP Support ExplanationModern browsers do not support RTSP directly. This system uses the following pipeline to enable playback:Code snippetgraph LR
    A[RTSP Camera/Stream] -->|Input| B[FFmpeg]
    B -->|Convert| C[HLS .m3u8]
    C -->|Serve| D[Flask Backend]
    D -->|Play| E[React Browser App]
Process:The backend dynamically starts an FFmpeg process using the RTSP URL provided by the user. This converts the stream into HLS segments, which are then served to the React application via HLS.js.🔗 API EndpointsMethodEndpointDescriptionGET/overlaysGet all saved overlaysPOST/overlaysCreate a new overlayPUT/overlays/:idUpdate an existing overlayDELETE/overlays/:idDelete an overlayPOST/start-streamStart the RTSP → HLS conversion🎥 Demo VideoThe demo video (if available) demonstrates:Starting the application.Entering an RTSP URL.Playing the livestream.Adding, updating, and deleting overlays.Real‑time overlay behavior.📌 NotesMongoDB is used for persistent storage. Ensure your connection string in app.py is correct.FFmpeg must be installed and available in your system's global PATH for the streaming to work.There is a slight latency in the video feed due to the HLS conversion process.👨‍💻 AuthorRTSP Livestream Overlay Web ApplicationBuilt using Flask, MongoDB, and React.
### Would you like me to...

1.  Create a `requirements.txt` file for the Python backend based on the imports mentioned?
2.  Write a sample `app.py` script to handle the FFmpeg subprocess and MongoDB connections?
3.  Create a `package.json` configuration for the frontend?
