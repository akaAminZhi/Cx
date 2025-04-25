import FlashIcon from "./FlashIcon";
import PropTypes from "prop-types";

function Panelboard({ x, y, name, energized }) {
  const strokeColor = "#000000";

  return (
    <g transform={`translate(${x}, ${y})`}>
      {energized && <FlashIcon x={40} y={-20} />}

      {/* Panelboard body */}
      <rect
        width={80}
        height={120}
        className={`fill-gray-50 ${energized && "fill-yellow-300"}`}
        stroke={strokeColor}
        strokeWidth={2}
        rx={10}
      />

      {/* Name label above */}
      <text x={40} y={-10} textAnchor="middle" fontSize="14" fill="#333">
        {name}
      </text>

      {/* Status indicator light */}
      <circle
        cx={40}
        cy={20}
        r={6}
        fill={energized ? "yellow" : "gray"}
        stroke="black"
        strokeWidth={1}
      />

      {/* Handle in the center */}
      <rect x={36} y={50} width={8} height={40} fill="#333" rx={2} />
    </g>
  );
}

Panelboard.propTypes = {
  name: PropTypes.string,
  x: PropTypes.number,
  y: PropTypes.number,
  energized: PropTypes.bool,
};
export default Panelboard;
