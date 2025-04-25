import React, { useRef, useState, useEffect } from "react";
import PropTypes from "prop-types";

const PanZoomSVG = ({
  width = "100%",
  height = "100%",
  children,
  ...props
}) => {
  const containerRef = useRef(null);

  const [scale, setScale] = useState(0.3);
  const [translate, setTranslate] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [lastPos, setLastPos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleWheel = (e) => {
      e.preventDefault();
      const zoomFactor = 0.1;
      const direction = e.deltaY < 0 ? 1 : -1;
      setScale((prev) => Math.max(0.1, prev * (1 + zoomFactor * direction)));
    };

    container.addEventListener("wheel", handleWheel, { passive: false });
    return () => container.removeEventListener("wheel", handleWheel);
  }, []);

  const handleMouseDown = (e) => {
    setIsDragging(true);
    setLastPos({ x: e.clientX, y: e.clientY });
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    const dx = e.clientX - lastPos.x;
    const dy = e.clientY - lastPos.y;
    setTranslate((prev) => ({ x: prev.x + dx, y: prev.y + dy }));
    setLastPos({ x: e.clientX, y: e.clientY });
  };

  const endDrag = () => setIsDragging(false);

  return (
    <div
      ref={containerRef}
      style={{
        width,
        height,
        overflow: "hidden",
        border: "1px solid #ccc",
        cursor: isDragging ? "grabbing" : "grab",
        userSelect: "none",
      }}
      {...props}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={endDrag}
      onMouseLeave={endDrag}
    >
      <svg width="100%" height="100%">
        <g
          transform={`translate(${translate.x}, ${translate.y}) scale(${scale})`}
        >
          {children}
        </g>
      </svg>
    </div>
  );
};
PanZoomSVG.propTypes = {
  width: PropTypes.string,
  height: PropTypes.string,
  children: PropTypes.node,
};

export default PanZoomSVG;
