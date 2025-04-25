import Switchgear from "./Switchgear";
import Panelboard from "./Panelboard";
import Transformer from "./Transformer";
import Arrow_line from "./Arrow_line";
import PanelboardGroup from "./PanelboardGroup";
import React from "react";
import { useDevicesByProjectId } from "../features/devices/useDevices";
import GeneratorGroup from "./GeneratorGroup";

const X_Level_Start = -800;
const X_Level_End = 4500;

const Y_Level_8 = 330;
const Y_Level_7 = 330 * 2;
const Y_Level_6 = 330 * 3;
const Y_Level_5 = 330 * 4;
const Y_Level_4 = 330 * 5;
const Y_Level_3 = 330 * 6;
const Y_Level_2 = 330 * 7;
const Y_Level_1 = 330 * 8;
const Y_Level_0 = 330 * 9;

const X_Normal_ER_East = 2300;
const Y_Normal_ER_East = 330 * 8;
const X_Normal_ER_East2 = 1600;

const X_Normal_ER_West = 250;
const X_Normal_ER_West2 = X_Level_Start + 50;

const fixedSwitchgearList = [{ name: "MSWGA-1", x: 2400, y: 0 }];
const X_PanelGroup1 = 2400;
const fixedPanelList = [
  { name: "P2PC1", x: X_PanelGroup1, y: 0 },
  { name: "DP2PC1", x: X_PanelGroup1 - 100, y: 0 },
  { name: "DP4PC1", x: X_PanelGroup1 - 200, y: 0 },
  { name: "P4PC1", x: X_PanelGroup1 - 300, y: 0 },
];

const switchgearData = [
  { name: "EMSWGR1", energized: true },
  { name: "USS-LSB-2", energized: true },
  { name: "MSWGA-1", energized: true },
];
function LSB_Emergency_Raiser() {
  const { isPending, devicesByProjectId } = useDevicesByProjectId(1);
  if (isPending) return null;
  const deviceMap = new Map(
    devicesByProjectId.map((item) => [item.name, item])
  );
  // console.log(deviceMap);
  const level_of_building = Array.from({ length: 9 }, (_, i) => i).reverse();
  return (
    <>
      <g transform={`translate(${X_Normal_ER_East}, ${Y_Normal_ER_East})`}>
        <line
          x1={0}
          y1={330 - Y_Normal_ER_East}
          x2={0}
          y2={0}
          stroke="#555"
          strokeWidth={8}
          strokeDasharray="10,5"
        />
      </g>
      <g transform={`translate(${X_Normal_ER_East2}, ${Y_Normal_ER_East})`}>
        <line
          x1={0}
          y1={330 - Y_Normal_ER_East}
          x2={0}
          y2={0}
          stroke="#555"
          strokeWidth={8}
          strokeDasharray="10,5"
        />
      </g>
      <Arrow_line
        x1={X_Normal_ER_East2}
        y1={360}
        x2={X_Normal_ER_East}
        y2={360}
        label="EAST NORMAL ELECTRICAL ROOM"
      />
      <g transform={`translate(${X_Normal_ER_West}, ${Y_Normal_ER_East})`}>
        <line
          x1={0}
          y1={330 - Y_Normal_ER_East}
          x2={0}
          y2={0}
          stroke="#555"
          strokeWidth={8}
          strokeDasharray="10,5"
        />
      </g>
      <g transform={`translate(${X_Normal_ER_West2}, ${Y_Normal_ER_East})`}>
        <line
          x1={0}
          y1={330 - Y_Normal_ER_East}
          x2={0}
          y2={0}
          stroke="#555"
          strokeWidth={8}
          strokeDasharray="10,5"
        />
      </g>
      <Arrow_line
        x1={X_Normal_ER_West}
        y1={360}
        x2={X_Normal_ER_West2}
        y2={360}
        label="West NORMAL ELECTRICAL ROOM"
      />
      {/* ****************************** Draw level line ******************************* */}
      {level_of_building.map((level, index) => {
        // console.log(level, index);
        return (
          <g
            key={index}
            transform={`translate(${X_Level_Start}, ${Y_Level_8 * (index + 1)})`}
          >
            <line
              x1={0}
              y1={0}
              x2={X_Level_End}
              y2={0}
              stroke="#555"
              strokeWidth={4}
            />
            <text
              x={X_Level_End}
              y={0 - 10}
              textAnchor="middle"
              fontSize="14"
              fontWeight="bold"
            >
              {`Level ${level}`}
            </text>
          </g>
        );
      })}
      {/*---------------------------------- Level 8 -------------------------------------------------------*/}

      {fixedSwitchgearList.map((item) => {
        const device = deviceMap?.get(item.name);
        return (
          <Switchgear
            key={item.name}
            name={item.name}
            x={item.x}
            y={item.y}
            energized={device?.energized ?? false}
          />
        );
      })}
      <GeneratorGroup />
      {/* <PanelboardGroup devices={deviceMap} panelboards={fixedPanelList} />

      <Transformer x={X_PanelGroup1 - 150} y={230} name={"T6"} /> */}
    </>
  );
}

export default React.memo(LSB_Emergency_Raiser);
