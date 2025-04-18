import { useState } from "react";
import { HiCog, HiBattery100, HiShieldCheck } from "react-icons/hi2";
import { FaBeer } from "react-icons/fa";
import Switchgear from "../ui/Switchgear";
import ATS from "../ui/ATS";
import PowerDiagram from "../ui/PowerDiagram";
import Panelboard from "../ui/Panelboard";
import Transformer from "../ui/Transformer";

const fixedATSList = [
  { name: "ATS-1", x: 400, y: 400 },
  { name: "ATS-2", x: 600, y: 400 },
  { name: "ATS-3", x: 800, y: 400 },
];
const data = [
  { name: "ATS-1", energized: true },
  { name: "ATS-2", energized: true },
  { name: "ATS-3", energized: false },
];
function Settings() {
  const deviceMap = new Map(data.map((item) => [item.name, item]));

  // 缩放状态
  const [scale, setScale] = useState(1);
  // 平移状态（x, y）
  const [translate, setTranslate] = useState({ x: 0, y: 0 });
  // 是否正在拖拽平移
  const [isDragging, setIsDragging] = useState(false);
  // 上一次鼠标位置
  const [lastPos, setLastPos] = useState({ x: 0, y: 0 });

  // 处理鼠标滚轮，调整缩放比例
  const handleWheel = (e) => {
    e.preventDefault();
    const zoomFactor = 0.1;
    if (e.deltaY < 0) {
      setScale((prev) => prev * (1 + zoomFactor));
    } else {
      setScale((prev) => Math.max(0.1, prev * (1 - zoomFactor)));
    }
  };

  // 鼠标按下时开始拖拽
  const handleMouseDown = (e) => {
    setIsDragging(true);
    setLastPos({ x: e.clientX, y: e.clientY });
  };

  // 鼠标移动时，如果拖拽状态则更新平移量
  const handleMouseMove = (e) => {
    if (!isDragging) return;
    const dx = e.clientX - lastPos.x;
    const dy = e.clientY - lastPos.y;
    setTranslate((prev) => ({ x: prev.x + dx, y: prev.y + dy }));
    setLastPos({ x: e.clientX, y: e.clientY });
  };

  // 鼠标松开，结束拖拽
  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // 鼠标离开区域时，结束拖拽
  const handleMouseLeave = () => {
    setIsDragging(false);
  };

  return (
    <>
      <div
        className="overflow-hidden border"
        style={{
          width: "100%",
          height: "500px",
          cursor: isDragging ? "grabbing" : "grab",
        }}
        onWheel={handleWheel}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseLeave}
      >
        <svg width="100%" height="100%" viewBox="0 0 400 400">
          {/* 同时应用平移和平移变换：先平移后缩放 */}
          <g
            transform={`translate(${translate.x}, ${translate.y}) scale(${scale})`}
          >
            {/* 示例图形 */}

            <Switchgear
              sections={[3, 3, 3, 3, 1, 1, 1, 1, 3, 3, 3, 3]}
              energized={true}
              x={0}
            />
            <Panelboard name="PANEL-1" x={-200} y={100} energized={true} />
            <Transformer name="T-1" x={-400} y={100} energized={true} />

            {/* <ATS x={400} y={400} name={"ATS-1"} energized={true} /> */}
            {fixedATSList.map((item) => {
              const device = deviceMap.get(item.name);
              return (
                <ATS
                  key={item.name}
                  name={item.name}
                  x={item.x}
                  y={item.y}
                  energized={device?.energized ?? false}
                />
              );
            })}
            {/* <PowerDiagram></PowerDiagram> */}
            {/* 其他 SVG 元素 */}
          </g>
        </svg>
      </div>
      <div>
        <HiCog
          x={50}
          y={150}
          size={50}
          className="hover:text-green-500"
        ></HiCog>
      </div>
    </>
  );
}

export default Settings;
