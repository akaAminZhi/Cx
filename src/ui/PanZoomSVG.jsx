import {
  useRef,
  useState,
  useEffect,
  useCallback,
  useImperativeHandle,
  forwardRef,
} from "react";
import PropTypes from "prop-types";

const PanZoomSVG = forwardRef(function PanZoomSVG(
  {
    width = "100%",
    height = "100%",
    minScale = 0.1,
    maxScale = 3,
    children,
    stateRef,
    ...props
  },
  ref
) {
  const containerRef = useRef(null);
  const [scale, setScale] = useState(0.3);
  const [translate, setTranslate] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [lastPos, setLastPos] = useState({ x: 0, y: 0 });

  // ⬇️ 暴露 zoomToPoint 方法
  useImperativeHandle(ref, () => ({
    zoomToPoint(x, y) {
      const container = containerRef.current;
      const rect = container.getBoundingClientRect();
      const cx = rect.width / 2;
      const cy = rect.height / 2;
      setTranslate({
        x: cx - x * scale,
        y: cy - y * scale,
      });
    },
  }));

  // ⬇️ 鼠标缩放
  const handleWheel = useCallback(
    (e) => {
      e.preventDefault();
      const zoomFactor = 0.1;
      const direction = e.deltaY < 0 ? 1 : -1;
      const nextScale = Math.min(
        maxScale,
        Math.max(minScale, scale * (1 + zoomFactor * direction))
      );
      if (nextScale === scale) return;

      const rect = containerRef.current.getBoundingClientRect();
      const offsetX = e.clientX - rect.left;
      const offsetY = e.clientY - rect.top;
      const svgX = (offsetX - translate.x) / scale;
      const svgY = (offsetY - translate.y) / scale;

      setTranslate({
        x: offsetX - svgX * nextScale,
        y: offsetY - svgY * nextScale,
      });
      setScale(nextScale);
    },
    [scale, translate, minScale, maxScale]
  );

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    container.addEventListener("wheel", handleWheel, { passive: false });
    return () => {
      container.removeEventListener("wheel", handleWheel);
    };
  }, [handleWheel]);

  useEffect(() => {
    if (stateRef?.current) {
      stateRef.current.scale = scale;
      stateRef.current.translate = translate;
    }
  }, [scale, translate]);

  return (
    <div
      ref={containerRef}
      style={{
        width,
        height,
        overflow: "hidden",
        position: "relative",
        border: "1px solid #ccc",
        cursor: isDragging ? "grabbing" : "grab",
        userSelect: "none",
      }}
      {...props}
      onMouseDown={(e) => {
        setIsDragging(true);
        setLastPos({ x: e.clientX, y: e.clientY });
      }}
      onMouseMove={(e) => {
        if (!isDragging) return;
        const dx = e.clientX - lastPos.x;
        const dy = e.clientY - lastPos.y;
        setTranslate((prev) => ({ x: prev.x + dx, y: prev.y + dy }));
        setLastPos({ x: e.clientX, y: e.clientY });
      }}
      onMouseUp={() => setIsDragging(false)}
      onMouseLeave={() => setIsDragging(false)}
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
});

PanZoomSVG.propTypes = {
  width: PropTypes.string,
  height: PropTypes.string,
  minScale: PropTypes.number,
  maxScale: PropTypes.number,
  children: PropTypes.node,
  stateRef: PropTypes.object,
};

export default PanZoomSVG;
