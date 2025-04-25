/**
 * TransformerGroup.jsx
 * 例子：
 * <svg viewBox="0 0 320 300">
 *   <TransformerGroup x={30} y={20} stroke="#000" strokeWidth={8} />
 * </svg>
 */
import FlashIcon from "./FlashIcon";
import PropTypes from "prop-types";

export default function Transformer({
  x = 0,
  y = 0,
  stroke = "currentColor",
  strokeWidth = 5,
  energized = false,
  name,
  ...rest
}) {
  /* 顶部 3 个套管 (bushings) 的中心 x 坐标 */
  const bushingXs = [86, 130, 174];
  /* 每个套管的水平“波纹”起始 y */
  const bushingLines = [30, 38, 46, 54, 62, 70];

  return (
    <g
      transform={`translate(${x} ${-20 + y}) scale(0.5)`}
      stroke={stroke}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
      {...rest}
    >
      {energized && <FlashIcon x={40} y={50} />}
      {/* ──────── 顶部横梁 ──────── */}
      <rect x="48" y="78" width="164" height="10" rx="3" />

      {/* ──────── 机体主箱 ──────── */}
      <rect x="48" y="88" width="164" height="120" rx="10" />

      {/* ──────── 两侧散热片 ────── */}
      <rect x="20" y="100" width="28" height="96" rx="6" />
      <rect x="212" y="100" width="28" height="96" rx="6" />

      {/* ──────── 机脚 ─────────── */}
      <rect x="72" y="208" width="40" height="24" rx="4" />
      <rect x="148" y="208" width="40" height="24" rx="4" />

      {/* ──────── 面板窗口 ─────── */}
      <rect x="72" y="118" width="120" height="64" rx="6" />

      <text
        x={130}
        y={150}
        textAnchor="middle"
        fontSize="14"
        fill="#333"
        strokeWidth={1}
        className="text-4xl"
      >
        {name}
      </text>

      {/* ──────── 三个高压套管 ── */}
      {bushingXs.map((cx) => (
        <g key={cx}>
          {/* 小帽 */}
          <circle cx={cx} cy={22} r={6} />
          {/* 多层波纹 (用平行线模拟) */}
          {bushingLines.map((y0) => (
            <line key={y0} x1={cx - 14} y1={y0} x2={cx + 14} y2={y0} />
          ))}
          {/* 立柱 */}
          <line x1={cx} y1={78} x2={cx} y2={74} />
        </g>
      ))}
    </g>
  );
}
Transformer.propTypes = {
  name: PropTypes.string,
  stroke: PropTypes.string,
  strokeWidth: PropTypes.string,

  x: PropTypes.number,
  y: PropTypes.number,
  energized: PropTypes.bool,
};
