import { createOverlay } from "../api/overlayApi";

export default function OverlayControls({ setOverlays }) {

  // ADD TEXT
  const addText = async () => {
    const newOverlay = await createOverlay({
      type: "text",
      content: "New Text",
      x: 50,
      y: 50,
      width: 160,
      height: 50,
    });
    setOverlays((p) => [...p, newOverlay]);
  };

  // ADD IMAGE BY FILE
  const addImageUpload = async () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";

    input.onchange = async (e) => {
      const file = e.target.files[0];
      if (!file) return;

      const imageUrl = URL.createObjectURL(file);

      const newOverlay = await createOverlay({
        type: "image",
        content: imageUrl,
        x: 80,
        y: 80,
        width: 140,
        height: 140,
      });

      setOverlays((p) => [...p, newOverlay]);
    };

    input.click();
  };

  // ADD IMAGE BY URL (assignment requirement)
  const addImageByUrl = async () => {
    const url = prompt("Enter Image URL");
    if (!url) return;

    const newOverlay = await createOverlay({
      type: "image",
      content: url,
      x: 100,
      y: 100,
      width: 150,
      height: 150,
    });

    setOverlays((p) => [...p, newOverlay]);
  };

  return (
    <div className="overlay-controls">
      <button onClick={addText}>Add Text</button>
      <button onClick={addImageUpload}>Upload Image</button>
      <button onClick={addImageByUrl}>Image via URL</button>
    </div>
  );
}
