import { useEffect, useState } from "react";
import VideoPlayer from "../components/VideoPlayer";
import OverlayLayer from "../components/OverlayLayer";
import OverlayControls from "../components/OverlayControls";
import { getOverlays } from "../api/overlayApi";
import axios from "axios";

export default function Home() {
  const [overlays, setOverlays] = useState([]);
  const [rtspUrl, setRtspUrl] = useState("");
  const [playUrl, setPlayUrl] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => { loadOverlays(); }, []);

  const loadOverlays = async () => {
    const data = await getOverlays();
    setOverlays(data);
  };

  const handlePlay = async () => {
    if (!rtspUrl) {
      alert("Enter RTSP URL");
      return;
    }

    setLoading(true);

    try {
      const res = await axios.post("http://localhost:5000/start-stream", {
        rtspUrl
      });

      setPlayUrl(res.data.playUrl);
    } catch (err) {
      alert("Failed to start RTSP stream");
    }

    setLoading(false);
  };

  return (
    <div className="container">
      <h2>RTSP Livestream Overlay App</h2>

      <div style={{ textAlign: "center", marginBottom: 12 }}>
        <input
          placeholder="Enter RTSP URL"
          value={rtspUrl}
          onChange={(e) => setRtspUrl(e.target.value)}
          style={{ width: "60%", padding: 10, borderRadius: 6, marginRight: 8 }}
        />
        <button onClick={handlePlay}>
          {loading ? "Starting..." : "Play Livestream"}
        </button>
      </div>

      <div className="video-wrapper">
        {playUrl && <VideoPlayer streamUrl={playUrl} />}
        <OverlayLayer overlays={overlays} setOverlays={setOverlays} />
      </div>

      <OverlayControls setOverlays={setOverlays} />
    </div>
  );
}
