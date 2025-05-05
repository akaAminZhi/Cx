import React, { useRef, useState, useEffect, useCallback } from "react";
import PropTypes from "prop-types";

const PanZoomSVG = ({
  width = "100%",
  height = "100%",
  minScale = 0.1,
  maxScale = 3,
  children,
  ...props
}) => {
  const containerRef = useRef(null);

  const [scale, setScale] = useState(0.3);
  const [translate, setTranslate] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [lastPos, setLastPos] = useState({ x: 0, y: 0 });

  /** ----------  Zoom handling ---------------------------------------------------- */
  const handleWheel = useCallback(
    (e) => {
      e.preventDefault();

      // 1. Basic zoom direction & factor
      const zoomFactor = 0.1;
      const direction = e.deltaY < 0 ? 1 : -1;
      const nextScale = Math.min(
        maxScale,
        Math.max(minScale, scale * (1 + zoomFactor * direction))
      );

      if (nextScale === scale) return; // hit min/max limits

      // 2. Get mouse coords relative to the container
      const rect = containerRef.current.getBoundingClientRect();
      const offsetX = e.clientX - rect.left;
      const offsetY = e.clientY - rect.top;

      // 3. Find the logical SVG point currently under the cursor
      const svgX = (offsetX - translate.x) / scale;
      const svgY = (offsetY - translate.y) / scale;

      // 4. Compute new translate so that svgX/svgY stays under the cursor
      const newTranslate = {
        x: offsetX - svgX * nextScale,
        y: offsetY - svgY * nextScale,
      };

      setScale(nextScale);
      setTranslate(newTranslate);
    },
    [scale, translate, minScale, maxScale]
  );

  /** Throttle wheel events with requestAnimationFrame */
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    let rafId = null;

    const wheelListener = (e) => {
      if (rafId) return; // already scheduled
      rafId = requestAnimationFrame(() => {
        handleWheel(e);
        rafId = null;
      });
    };

    container.addEventListener("wheel", wheelListener, { passive: false });
    return () => container.removeEventListener("wheel", wheelListener);
  }, [handleWheel]);

  /** ----------  Drag handling ---------------------------------------------------- */
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
  minScale: PropTypes.number,
  maxScale: PropTypes.number,
  children: PropTypes.node,
};

export default PanZoomSVG;
