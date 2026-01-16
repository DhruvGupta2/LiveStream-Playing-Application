import { useEffect, useRef } from "react";
import Hls from "hls.js";

export default function VideoPlayer({ streamUrl }) {
  const videoRef = useRef();

  useEffect(() => {
    if (!streamUrl) return;

    if (Hls.isSupported()) {
      const hls = new Hls();
      hls.loadSource(streamUrl); // this should be .m3u8
      hls.attachMedia(videoRef.current);
    } else {
      videoRef.current.src = streamUrl;
    }
  }, [streamUrl]);

  return (
    <video
      ref={videoRef}
      controls
      autoPlay
      className="video"
    />
  );
}
