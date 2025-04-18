import React from "react";
import FlashIcon from "./FlashIcon";
import PropTypes from "prop-types";

export default function ATS({
  x = 0,
  y = 0,
  width = 100,
  height = 120,
  energized = false,
  name,
}) {
  const centerX = x + width / 2;
  const topY = y;
  const bottomY = y + height;
  const armLength = 30;
  const FLASH_SPACE = 30;

  return (
    <>
      <svg width={x + width + 20} height={y + height + FLASH_SPACE + 20}>
        <g transform={`translate(0, ${FLASH_SPACE})`}>
          {/* ATS enclosure */}
          <rect
            x={x}
            y={y}
            width={width}
            height={height}
            // fill="#ffffff"
            stroke="#444"
            strokeWidth={2}
            rx={8}
            className="fill-gray-100"
          />

          {/* Y-shape lines */}
          <line
            x1={centerX - armLength}
            y1={topY + 20}
            x2={centerX}
            y2={y + height / 2}
            stroke="#000"
            strokeWidth={2}
          />
          <line
            x1={centerX + armLength}
            y1={topY + 20}
            x2={centerX}
            y2={y + height / 2}
            stroke="#000"
            strokeWidth={2}
          />
          <line
            x1={centerX}
            y1={y + height / 2}
            x2={centerX}
            y2={bottomY - 20}
            stroke="#000"
            strokeWidth={2}
          />

          <text
            x={centerX}
            y={y - 10}
            textAnchor="middle"
            fontSize="14"
            fontWeight="bold"
            fill="#000"
          >
            {name}
          </text>
          {energized && <FlashIcon x={centerX} y={y - 20} />}
        </g>
      </svg>
    </>
  );
}
ATS.propTypes = {
  name: PropTypes.string,
  width: PropTypes.number,
  x: PropTypes.number,
  height: PropTypes.number,
  y: PropTypes.number,
  energized: PropTypes.bool,
};
