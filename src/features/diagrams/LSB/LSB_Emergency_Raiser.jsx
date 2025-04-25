import Switchgear from "../../../ui/Switchgear";
import Transformer from "../../../ui/Transformer";
import Arrow_line from "../../../ui/Arrow_line";
import PanelboardGroup from "../../../ui/PanelboardGroup";
import React from "react";
import { useDevicesByProjectId } from "../../devices/useDevices";
import GeneratorGroup from "../../../ui/GeneratorGroup";
import UPS from "../../../ui/UPS";
import ATSGroup from "../../../ui/ATSGroup";

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
const Generator_x = 3000;
const fixedGeneratorList = [
  { name: "G1", x: Generator_x, y: 180 },
  { name: "G2", x: Generator_x + 200, y: 180 },
];
const UPS_x = -200;
const fixedUPSList = [
  { name: "UPS-IT1", x: UPS_x, y: 180 },
  { name: "UPS-IT2", x: UPS_x - 400, y: 180 },
];
const X_PanelGroup1 = 2400;
const Y_PanelGroup1 = -100;

const fixedPanelList = [
  { name: "IT2DP4P1", x: X_PanelGroup1, y: Y_PanelGroup1 },
  { name: "IT1DP4P1", x: X_PanelGroup1 - 200, y: Y_PanelGroup1 },
  { name: "EL1SB4P", x: X_PanelGroup1 - 400, y: Y_PanelGroup1 },
  { name: "OS3SB4P", x: X_PanelGroup1 - 600, y: Y_PanelGroup1 },
  { name: "EM1P2P", x: X_PanelGroup1 - 900, y: Y_PanelGroup1 },
  { name: "EM1DP4P", x: X_PanelGroup1 - 990, y: Y_PanelGroup1 },
  { name: "VIV2SB4P", x: X_PanelGroup1 - 1190, y: Y_PanelGroup1 },
  { name: "VIV1SB4P", x: X_PanelGroup1 - 1390, y: Y_PanelGroup1 },
  { name: "EL1P2P", x: X_PanelGroup1 - 200, y: Y_PanelGroup1 + 180 },
  { name: "EL1P4P", x: X_PanelGroup1 - 300, y: Y_PanelGroup1 + 180 },
  { name: "OS3P2P", x: X_PanelGroup1 - 400, y: Y_PanelGroup1 + 180 },
  { name: "OS3P4P1", x: X_PanelGroup1 - 500, y: Y_PanelGroup1 + 180 },
  { name: "EM1P4P", x: X_PanelGroup1 - 600, y: Y_PanelGroup1 + 180 },
  { name: "VIV2P2P", x: X_PanelGroup1 - 1190, y: Y_PanelGroup1 + 180 },
  { name: "VIV2P4P", x: X_PanelGroup1 - 1290, y: Y_PanelGroup1 + 180 },
  { name: "VIV1P2P", x: X_PanelGroup1 - 1390, y: Y_PanelGroup1 + 180 },
  { name: "VIV1P4P", x: X_PanelGroup1 - 1490, y: Y_PanelGroup1 + 180 },
];
const fixedATS1List = [
  { name: "ATS-IT2", x: X_PanelGroup1 - 100, y: Y_PanelGroup1 },
  { name: "ATS-IT1", x: X_PanelGroup1 - 300, y: Y_PanelGroup1 },
  { name: "ATS-EL1", x: X_PanelGroup1 - 500, y: Y_PanelGroup1 },
  { name: "ATS-OS3", x: X_PanelGroup1 - 700, y: Y_PanelGroup1 },
  { name: "ATS-EM1", x: X_PanelGroup1 - 1100, y: Y_PanelGroup1 },
  { name: "ATS-VIV2", x: X_PanelGroup1 - 1300, y: Y_PanelGroup1 },
  { name: "ATS-VIV1", x: X_PanelGroup1 - 1500, y: Y_PanelGroup1 },
];

const X_PanelGroup2 = X_PanelGroup1 - 1600;
const fixedPanel2List = [
  { name: "OS4SB4P", x: X_PanelGroup2 + 10, y: Y_PanelGroup1 },
  { name: "OS1SB4P", x: X_PanelGroup2 - 190, y: Y_PanelGroup1 },
  { name: "OS2SB4P", x: X_PanelGroup2 - 390, y: Y_PanelGroup1 },
  { name: "LR1DP4P", x: X_PanelGroup2 - 590, y: Y_PanelGroup1 },

  { name: "OS4P2P", x: X_PanelGroup2, y: Y_PanelGroup1 + 180 },
  { name: "OS4P4P1", x: X_PanelGroup2 - 100, y: Y_PanelGroup1 + 180 },
  { name: "OS1P2PA", x: X_PanelGroup2 - 200, y: Y_PanelGroup1 + 180 },
  { name: "OS1P4P1", x: X_PanelGroup2 - 300, y: Y_PanelGroup1 + 180 },
  { name: "OS2P2PA", x: X_PanelGroup2 - 400, y: Y_PanelGroup1 + 180 },
  { name: "OS2P4P1", x: X_PanelGroup2 - 500, y: Y_PanelGroup1 + 180 },
  { name: "LR1P2P", x: X_PanelGroup2 - 600, y: Y_PanelGroup1 + 180 },
  { name: "LR1P4P", x: X_PanelGroup2 - 700, y: Y_PanelGroup1 + 180 },
];
const fixedATS2List = [
  { name: "ATS-OS4", x: X_PanelGroup2 - 100, y: Y_PanelGroup1 },
  { name: "ATS-OS1", x: X_PanelGroup2 - 300, y: Y_PanelGroup1 },
  { name: "ATS-OS2", x: X_PanelGroup2 - 500, y: Y_PanelGroup1 },
  { name: "ATS-LR1", x: X_PanelGroup2 - 700, y: Y_PanelGroup1 },
];
const X_PanelGroup3 = X_PanelGroup2 - 1000;
const fixedPanel3List = [
  { name: "IT1P2P", x: X_PanelGroup3, y: Y_PanelGroup1 },
  { name: "IT1DP2P", x: X_PanelGroup3 - 100, y: Y_PanelGroup1 },
  { name: "IT1DP4P2", x: X_PanelGroup3 - 200, y: Y_PanelGroup1 },
  { name: "IT2P2P", x: X_PanelGroup3 - 300, y: Y_PanelGroup1 },
  { name: "IT2DP2P", x: X_PanelGroup3 - 400, y: Y_PanelGroup1 },
  { name: "IT2DP4P2", x: X_PanelGroup3 - 500, y: Y_PanelGroup1 },
];
const switchgearData = [
  { name: "EMSWGR1", energized: true },
  { name: "USS-LSB-2", energized: true },
  { name: "MSWGA-1", energized: true },
];
function LSB_Emergency_Raiser({ ...props }) {
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
      <Arrow_line
        x1={Generator_x}
        y1={-300}
        x2={Generator_x + 500}
        y2={-300}
        label="GENERATOR ROOM"
      />
      <g transform={`translate(${Generator_x}, -400)`}>
        <line
          x1={0}
          y1={725}
          x2={0}
          y2={0}
          stroke="#555"
          strokeWidth={8}
          strokeDasharray="10,5"
        />
      </g>
      <g transform={`translate(${Generator_x + 500}, -400)`}>
        <line
          x1={0}
          y1={725}
          x2={0}
          y2={0}
          stroke="#555"
          strokeWidth={8}
          strokeDasharray="10,5"
        />
      </g>
      <Arrow_line
        x1={UPS_x + 250}
        y1={-300}
        x2={Generator_x}
        y2={-300}
        label="EMERGENCY ELECTRICAL ROOM"
      />
      <g transform={`translate(${UPS_x + 250}, -400)`}>
        <line
          x1={0}
          y1={725}
          x2={0}
          y2={0}
          stroke="#555"
          strokeWidth={8}
          strokeDasharray="10,5"
        />
      </g>
      <Arrow_line
        x1={UPS_x + 250}
        y1={-300}
        x2={UPS_x - 550}
        y2={-300}
        label="UPS ROOM"
      />
      <g transform={`translate(${UPS_x - 550}, -400)`}>
        <line
          x1={0}
          y1={725}
          x2={0}
          y2={0}
          stroke="#555"
          strokeWidth={8}
          strokeDasharray="10,5"
        />
      </g>
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
      {fixedGeneratorList.map((item) => {
        const device = deviceMap?.get(item.name);
        return (
          <GeneratorGroup
            key={item.name}
            name={item.name}
            x={item.x}
            y={item.y}
            energized={device?.energized ?? false}
          />
        );
      })}
      {fixedUPSList.map((item) => {
        const device = deviceMap?.get(item.name);
        return (
          <UPS
            key={item.name}
            name={item.name}
            x={item.x}
            y={item.y}
            energized={device?.energized ?? false}
          />
        );
      })}
      <PanelboardGroup devices={deviceMap} panelboards={fixedPanelList} />
      <ATSGroup devices={deviceMap} ATSs={fixedATS1List} />
      <Transformer x={X_PanelGroup1 - 950} y={50} name={"T5"} />
      <Transformer x={X_PanelGroup1 - 300} y={230} name={"T4"} />
      <Transformer x={X_PanelGroup1 - 500} y={230} name={"T4"} />
      <Transformer x={X_PanelGroup1 - 1250} y={230} name={"T4"} />
      <Transformer x={X_PanelGroup1 - 1450} y={230} name={"T4"} />
      <PanelboardGroup devices={deviceMap} panelboards={fixedPanel2List} />
      <ATSGroup devices={deviceMap} ATSs={fixedATS2List} />
      <Transformer x={X_PanelGroup2 - 50} y={230} name={"T4"} />
      <Transformer x={X_PanelGroup2 - 250} y={230} name={"T4"} />
      <Transformer x={X_PanelGroup2 - 450} y={230} name={"T4"} />
      <Transformer x={X_PanelGroup2 - 650} y={230} name={"T4"} />
      <PanelboardGroup devices={deviceMap} panelboards={fixedPanel3List} />
      <Transformer x={X_PanelGroup3 - 150} y={50} name={"T7"} />
      <Transformer x={X_PanelGroup3 - 450} y={50} name={"T7"} />
    </>
  );
}

export default React.memo(LSB_Emergency_Raiser);
