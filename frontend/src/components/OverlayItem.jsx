import { Rnd } from "react-rnd";
import { useState } from "react";
import { updateOverlay, deleteOverlay } from "../api/overlayApi";

export default function OverlayItem({ overlay, setOverlays }) {
  const [isEditing, setIsEditing] = useState(false);
  const [text, setText] = useState(overlay.content);

  const onDragStop = async (e, d) => {
    const updated = { ...overlay, x: d.x, y: d.y };
    await updateOverlay(updated);
    setOverlays((p) => p.map(o => o._id === overlay._id ? updated : o));
  };

  const onResizeStop = async (e, dir, ref, delta, pos) => {
    const updated = {
      ...overlay,
      width: ref.offsetWidth,
      height: ref.offsetHeight,
      x: pos.x,
      y: pos.y,
    };
    await updateOverlay(updated);
    setOverlays((p) => p.map(o => o._id === overlay._id ? updated : o));
  };

  const saveText = async () => {
    const updated = { ...overlay, content: text };
    await updateOverlay(updated);
    setOverlays((p) => p.map(o => o._id === overlay._id ? updated : o));
    setIsEditing(false);
  };

  const handleDelete = async () => {
    await deleteOverlay(overlay._id);
    setOverlays((p) => p.filter(o => o._id !== overlay._id));
  };

  return (
    <Rnd
      size={{ width: overlay.width, height: overlay.height }}
      position={{ x: overlay.x, y: overlay.y }}
      onDragStop={onDragStop}
      onResizeStop={onResizeStop}
      bounds="parent"
      dragHandleClassName="drag-handle"
    >
      <div className="overlay-box drag-handle">

        <div className="delete-btn" onClick={handleDelete}>✕</div>

        {overlay.type === "text" ? (
          isEditing ? (
            <input
              autoFocus
              value={text}
              onChange={(e) => setText(e.target.value)}
              onBlur={saveText}
              onKeyDown={(e) => e.key === "Enter" && saveText()}
              className="text-input"
            />
          ) : (
            <div
              className="overlay-text"
              onDoubleClick={() => setIsEditing(true)}
            >
              {overlay.content}
            </div>
          )
        ) : (
          <img
            src={overlay.content}
            className="overlay-img"
            draggable={false}
          />
        )}
      </div>
    </Rnd>
  );
}
