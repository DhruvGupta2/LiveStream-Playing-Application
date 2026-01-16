import OverlayItem from "./OverlayItem";

export default function OverlayLayer({ overlays, setOverlays }) {
  return (
    <div className="overlay-layer">
      {overlays.map((o) => (
        <OverlayItem
          key={o._id}
          overlay={o}
          setOverlays={setOverlays}
        />
      ))}
    </div>
  );
}
