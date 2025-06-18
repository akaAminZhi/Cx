import { useEffect, useState, useRef } from "react";
import PropTypes from "prop-types";

function RoomPlateOverlay({ imageSrc, jsonPath }) {
  const [boxes, setBoxes] = useState([]);

  const rectRefs = useRef({}); // 用来存储每个 rect 的 DOM 引用

  useEffect(() => {
    fetch(jsonPath)
      .then((res) => res.json())
      .then((data) => {
        setBoxes(data);
      });
  }, [jsonPath]);

  return (
    <>
      <image href={imageSrc} x="0" y="0" />
      {boxes.map((box, index) => (
        <rect
          key={index}
          ref={(el) => (rectRefs.current[box.room_plate] = el)}
          x={box.x1}
          y={box.y1}
          width={box.x2 - box.x1}
          height={box.y2 - box.y1}
          stroke="red"
          strokeWidth="10"
          fill="transparent"
          className="hover:fill-yellow-300 hover:opacity-50 cursor-pointer transition-all duration-300"
        >
          <title>{box.room_plate}</title>
        </rect>
      ))}
    </>
  );
}
RoomPlateOverlay.propTypes = {
  imageSrc: PropTypes.string,
  jsonPath: PropTypes.string,
};
export default RoomPlateOverlay;
