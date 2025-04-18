import PropTypes from "prop-types";
import FlashIcon from "./FlashIcon";

function Transformer({ x, y, name, energized }) {
  const bodyColor = energized ? "#7ec8e3" : "#ccc";
  const strokeColor = "#000";

  return (
    <g transform={`translate(${x}, ${y})`}>
      {/* Transformer body */}
      <rect
        width={100}
        height={80}
        fill={bodyColor}
        stroke={strokeColor}
        strokeWidth={2}
        rx={8}
      />
      {energized && <FlashIcon x={50} y={0 - 20} />}
      {/* Name label */}
      <text x={50} y={-10} textAnchor="middle" fontSize="14" fontWeight="bold">
        {name}
      </text>

      {/* Coil fins (left and right) */}
      <line x1={-10} y1={10} x2={-10} y2={70} stroke="#555" strokeWidth={4} />
      <line x1={-16} y1={10} x2={-16} y2={70} stroke="#555" strokeWidth={4} />
      <line x1={110} y1={10} x2={110} y2={70} stroke="#555" strokeWidth={4} />
      <line x1={116} y1={10} x2={116} y2={70} stroke="#555" strokeWidth={4} />

      {/* Ground symbol below the transformer */}
      <line
        x1={50}
        y1={80}
        x2={50}
        y2={90}
        stroke={strokeColor}
        strokeWidth={2}
      />
      <line
        x1={40}
        y1={90}
        x2={60}
        y2={90}
        stroke={strokeColor}
        strokeWidth={2}
      />
      <line
        x1={43}
        y1={94}
        x2={57}
        y2={94}
        stroke={strokeColor}
        strokeWidth={2}
      />
      <line
        x1={46}
        y1={98}
        x2={54}
        y2={98}
        stroke={strokeColor}
        strokeWidth={2}
      />
    </g>
  );
}

Transformer.propTypes = {
  name: PropTypes.string,
  x: PropTypes.number,
  y: PropTypes.number,
  energized: PropTypes.bool,
};

export default Transformer;
