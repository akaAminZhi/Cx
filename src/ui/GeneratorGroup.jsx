/**
 * GeneratorIconGroup.jsx  -- 修正版：更漂亮的闪电符号
 */
import FlashIcon from "./FlashIcon";
import PropTypes from "prop-types";

export default function GeneratorGroup({
  x = 0,
  y = 0,
  stroke = "currentColor",
  strokeWidth = 5,
  energized = false,
  name = "G1",
  ...rest
}) {
  return (
    <g
      transform={`translate(${x} ${y}) scale(.7)`}
      stroke={stroke}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={energized ? "fill-yellow-300" : "fill-none"}
      {...rest}
    >
      {energized && <FlashIcon x={40} y={-20} />}
      {/* Name label above */}
      <text
        x={130}
        y={0}
        textAnchor="middle"
        fontSize="14"
        fill="#333"
        strokeWidth={1}
        className="text-4xl"
      >
        {name}
      </text>
      {/* ── 机壳外框 ───────────────────────────── */}
      <path d="M32 48 H228 a16 16 0 0 1 16 16 V176 H72 a24 24 0 0 1 -24 -24 V48 Z" />

      {/* ── 顶部把手 ───────────────────────────── */}
      <path d="M32 48 V32 H228 V48" />
      <rect x="168" y="8" width="44" height="24" rx="4" />

      {/* ── 操作面板 ───────────────────────────── */}
      <rect x="92" y="76" width="68" height="32" rx="4" />
      <circle cx="186" cy="92" r="12" />
      <circle cx="218" cy="92" r="12" />

      {/* ── 分隔线 + 指示灯 ──────────────────── */}
      <line x1="105" y1="132" x2="228" y2="132" />
      <circle cx="244" cy="132" r="4" />

      {/* ── 闪电符号 (新版) ───────────────────── */}
      {/* 折线：72,132 → 104,92 → 104,116 → 132,116 → 104,156 */}
      <polyline
        transform={"translate(-20 0)"}
        points="72 132 104 92 104 120 132 120 104 158 104 132 72 132"
      />

      {/* ── 散热栅 ───────────────────────────── */}
      {[148, 164, 170].map((yPos) => (
        <line key={yPos} x1="108" y1={yPos} x2="172" y2={yPos} />
      ))}

      {/* ── 底座脚 ───────────────────────────── */}
      <rect x="72" y="176" width="56" height="24" rx="4" />

      {/* ── 车轮 ───────────────────────────────── */}
      <circle cx="228" cy="176" r="36" />
      <circle cx="228" cy="176" r="14" />
    </g>
  );
}

GeneratorGroup.propTypes = {
  name: PropTypes.string,
  stroke: PropTypes.string,
  strokeWidth: PropTypes.string,

  x: PropTypes.number,
  y: PropTypes.number,
  energized: PropTypes.bool,
};
