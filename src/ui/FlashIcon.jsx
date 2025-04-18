import React from "react";

const styles = `
  @keyframes pulse-glow {
    0%, 100% {
      opacity: 1;
      transform: scale(1);
    }
    50% {
      opacity: 0.6;
      transform: scale(1.5);
    }
  }

  .flash-icon {
    animation: pulse-glow 1.2s infinite ease-in-out;
    transform-origin: center;
    transform-box: fill-box;
  }
`;

export default function FlashIcon({
  x = 0,
  y = 0,
  size = 50,
  color = "orange",
  glow = true,
}) {
  return (
    <>
      <style>{styles}</style>

      <g>
        {glow && (
          <defs>
            <filter
              id="flash-glow"
              x="-50%"
              y="-50%"
              width="200%"
              height="200%"
            >
              <feGaussianBlur stdDeviation="4" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>
        )}

        <text
          x={x}
          y={y}
          textAnchor="middle"
          fontSize={size}
          fill={color}
          filter={glow ? "url(#flash-glow)" : ""}
          className={glow ? "flash-icon" : ""}
        >
          ⚡
        </text>
      </g>
    </>
  );
}
