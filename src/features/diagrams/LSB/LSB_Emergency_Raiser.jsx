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

const X_Emergency_ER_East0 = 2900;
const X_Emergency_ER_East = 1800;
const Y_Emergency_ER_East = 330 * 8;
const X_Emergency_ER_East2 = 1200;

const X_Emergency_ER_West = -100;
const X_Emergency_ER_West2 = X_Level_Start + 300;

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

const X_PanelGroup_Penthouse = X_PanelGroup1 + 1000;
const Y_PanelGroup_Penthouse = Y_Level_8 + 50;
const fixedPanelList_Level_Penthouse = [
  { name: "VIV2P27M", x: X_PanelGroup_Penthouse, y: Y_PanelGroup_Penthouse },
  {
    name: "VIV2P47M",
    x: X_PanelGroup_Penthouse - 100,
    y: Y_PanelGroup_Penthouse,
  },
  {
    name: "VIV1P27M",
    x: X_PanelGroup_Penthouse - 200,
    y: Y_PanelGroup_Penthouse,
  },
  {
    name: "VIV1P47M",
    x: X_PanelGroup_Penthouse - 300,
    y: Y_PanelGroup_Penthouse,
  },
  {
    name: "OS1P4P5",
    x: X_PanelGroup_Penthouse - 400,
    y: Y_PanelGroup_Penthouse,
  },
  {
    name: "OS1P4P4",
    x: X_PanelGroup_Penthouse - 500,
    y: Y_PanelGroup_Penthouse,
  },
  {
    name: "OS1P2PB",
    x: X_PanelGroup_Penthouse - 600,
    y: Y_PanelGroup_Penthouse,
  },
  {
    name: "OS1P4P2",
    x: X_PanelGroup_Penthouse - 700,
    y: Y_PanelGroup_Penthouse,
  },
  {
    name: "OS1P4P3",
    x: X_PanelGroup_Penthouse - 800,
    y: Y_PanelGroup_Penthouse,
  },
  {
    name: "OS2P4P2",
    x: X_PanelGroup_Penthouse - 900,
    y: Y_PanelGroup_Penthouse,
  },
  {
    name: "OS2P2PB",
    x: X_PanelGroup_Penthouse - 1000,
    y: Y_PanelGroup_Penthouse,
  },
  {
    name: "OS2P4P3",
    x: X_PanelGroup_Penthouse - 1100,
    y: Y_PanelGroup_Penthouse,
  },
  {
    name: "OS2P4P4",
    x: X_PanelGroup_Penthouse - 1200,
    y: Y_PanelGroup_Penthouse,
  },
  {
    name: "OS2P4P5",
    x: X_PanelGroup_Penthouse - 1300,
    y: Y_PanelGroup_Penthouse,
  },
  {
    name: "OS2P4P6",
    x: X_PanelGroup_Penthouse - 1400,
    y: Y_PanelGroup_Penthouse,
  },
];
const X_PanelGroup_Level_6 = X_PanelGroup_Penthouse + 200;
const Y_PanelGroup_Level_6 = Y_Level_7 + 50;
const fixedPanelList_Level_6 = [
  { name: "OS2P26M", x: X_PanelGroup_Level_6, y: Y_PanelGroup_Level_6 },
  { name: "OS2P46M", x: X_PanelGroup_Level_6 - 80, y: Y_PanelGroup_Level_6 },
  {
    name: "OS1P26M",
    x: X_PanelGroup_Level_6 - 80 * 2,
    y: Y_PanelGroup_Level_6,
  },
  {
    name: "OS1P46M",
    x: X_PanelGroup_Level_6 - 80 * 3,
    y: Y_PanelGroup_Level_6,
  },
  { name: "VIV2DP46E", x: X_PanelGroup_Level_6 - 400, y: Y_PanelGroup_Level_6 },
  { name: "VIV2P26E4", x: X_PanelGroup_Level_6 - 500, y: Y_PanelGroup_Level_6 },
  { name: "VIV2P26E3", x: X_PanelGroup_Level_6 - 600, y: Y_PanelGroup_Level_6 },
  {
    name: "VIV2P26E2",
    x: X_PanelGroup_Level_6 - 500,
    y: Y_PanelGroup_Level_6 + 150,
  },
  {
    name: "VIV2P26E1",
    x: X_PanelGroup_Level_6 - 600,
    y: Y_PanelGroup_Level_6 + 150,
  },
];
const X_East_ER = X_PanelGroup_Level_6 - 800;
const X_East_ITR = X_East_ER - 800;
const X_Wast_ER = X_East_ITR - 1000;
const X_West_ITR = X_Wast_ER - 1200;

const fixedPanelList_Level_6_EastER = [
  { name: "VIV2DP26E", x: X_East_ER, y: Y_PanelGroup_Level_6 },
  { name: "VIV2P46E", x: X_East_ER - 100, y: Y_PanelGroup_Level_6 },
  { name: "OS3P26E1", x: X_East_ER - 200, y: Y_PanelGroup_Level_6 },
  { name: "OS3P46E", x: X_East_ER - 400, y: Y_PanelGroup_Level_6 },
];
const fixedPanelList_Level_6_EastITR = [
  { name: "IT1P26E", x: X_East_ITR, y: Y_PanelGroup_Level_6 },
];
const fixedPanelList_Level_6_WestER = [
  { name: "VIV1DP26W4", x: X_Wast_ER + 600, y: Y_PanelGroup_Level_6 },
  { name: "VIV1DP26W3", x: X_Wast_ER + 500, y: Y_PanelGroup_Level_6 },
  { name: "VIV1DP26W2", x: X_Wast_ER + 400, y: Y_PanelGroup_Level_6 },
  { name: "VIV1DP26W1", x: X_Wast_ER + 300, y: Y_PanelGroup_Level_6 },
  { name: "VIV1DP26W", x: X_Wast_ER, y: Y_PanelGroup_Level_6 },
  { name: "VIV1DP46W", x: X_Wast_ER - 100, y: Y_PanelGroup_Level_6 },
  { name: "OS4P26W1", x: X_Wast_ER - 300, y: Y_PanelGroup_Level_6 },
  { name: "OS4P46W", x: X_Wast_ER - 500, y: Y_PanelGroup_Level_6 },
];
const fixedPanelList_Level_6_WestITR = [
  { name: "IT1P26W", x: X_West_ITR, y: Y_PanelGroup_Level_6 },
];

const X_PanelGroup_Level_5 = X_PanelGroup_Penthouse - 300;
const Y_PanelGroup_Level_5 = Y_Level_6 + 50;
const fixedPanelList_Level_5 = [
  { name: "OS3P25E3", x: X_PanelGroup_Level_5, y: Y_PanelGroup_Level_5 },
  { name: "OS3P25E2", x: X_PanelGroup_Level_5 - 100, y: Y_PanelGroup_Level_5 },
];
const fixedPanelList_Level_5_EastER = [
  { name: "OS3P25E1", x: X_East_ER, y: Y_PanelGroup_Level_5 },
  { name: "OS3DP25E", x: X_East_ER - 100, y: Y_PanelGroup_Level_5 },
  { name: "OS3P45E", x: X_East_ER - 400, y: Y_PanelGroup_Level_5 },
  { name: "EM1P25E", x: X_East_ER - 600, y: Y_PanelGroup_Level_5 },
];
const fixedPanelList_Level_5_EastITR = [
  { name: "IT1P25E", x: X_East_ITR, y: Y_PanelGroup_Level_5 },
];
const fixedPanelList_Level_5_WestER = [
  { name: "OS4P25W3", x: X_Wast_ER + 500, y: Y_PanelGroup_Level_5 },
  { name: "OS4P25W2", x: X_Wast_ER + 400, y: Y_PanelGroup_Level_5 },
  { name: "OS4P25W1", x: X_Wast_ER, y: Y_PanelGroup_Level_5 },
  { name: "OS4DP25W", x: X_Wast_ER - 100, y: Y_PanelGroup_Level_5 },
  { name: "OS4P45W", x: X_Wast_ER - 500, y: Y_PanelGroup_Level_5 },
  { name: "EM1P25W", x: X_Wast_ER - 600, y: Y_PanelGroup_Level_5 },
  { name: "EM1P45W", x: X_Wast_ER - 800, y: Y_PanelGroup_Level_5 },
];
const fixedPanelList_Level_5_WestITR = [
  { name: "IT1P25W", x: X_West_ITR, y: Y_PanelGroup_Level_5 },
];

const X_PanelGroup_Level_4 = X_PanelGroup_Level_5;
const Y_PanelGroup_Level_4 = Y_Level_5 + 50;
const fixedPanelList_Level_4 = [
  { name: "OS3P24E3", x: X_PanelGroup_Level_4, y: Y_PanelGroup_Level_4 },
  { name: "OS3P24E2", x: X_PanelGroup_Level_4 - 100, y: Y_PanelGroup_Level_4 },
];
const fixedPanelList_Level_4_EastER = [
  { name: "OS3P24E1", x: X_East_ER, y: Y_PanelGroup_Level_4 },
  { name: "OS3DP24E", x: X_East_ER - 100, y: Y_PanelGroup_Level_4 },
  { name: "OS3P44E", x: X_East_ER - 400, y: Y_PanelGroup_Level_4 },
  { name: "EM1P24E", x: X_East_ER - 600, y: Y_PanelGroup_Level_4 },
];
const fixedPanelList_Level_4_EastITR = [
  { name: "IT1P24E", x: X_East_ITR, y: Y_PanelGroup_Level_4 },
];
const fixedPanelList_Level_4_WestER = [
  { name: "OS4P24W3", x: X_Wast_ER + 500, y: Y_PanelGroup_Level_4 },
  { name: "OS4P24W2", x: X_Wast_ER + 400, y: Y_PanelGroup_Level_4 },
  { name: "OS4P24W1", x: X_Wast_ER, y: Y_PanelGroup_Level_4 },
  { name: "OS4DP24W", x: X_Wast_ER - 100, y: Y_PanelGroup_Level_4 },
  { name: "OS4P44W", x: X_Wast_ER - 500, y: Y_PanelGroup_Level_4 },
  { name: "EM1P44W", x: X_Wast_ER - 800, y: Y_PanelGroup_Level_4 },
];
const fixedPanelList_Level_4_WestITR = [
  { name: "IT1P24W", x: X_West_ITR, y: Y_PanelGroup_Level_4 },
];

const X_PanelGroup_Level_3 = X_PanelGroup_Penthouse - 300;
const Y_PanelGroup_Level_3 = Y_Level_4 + 50;
const fixedPanelList_Level_3 = [
  { name: "OS3P23E3", x: X_PanelGroup_Level_3, y: Y_PanelGroup_Level_3 },
  { name: "OS3P23E2", x: X_PanelGroup_Level_3 - 100, y: Y_PanelGroup_Level_3 },
];
const fixedPanelList_Level_3_EastER = [
  { name: "OS3P23E1", x: X_East_ER, y: Y_PanelGroup_Level_3 },
  { name: "OS3DP23E", x: X_East_ER - 100, y: Y_PanelGroup_Level_3 },
  { name: "OS3P43E", x: X_East_ER - 400, y: Y_PanelGroup_Level_3 },
  { name: "EM1P23E", x: X_East_ER - 600, y: Y_PanelGroup_Level_3 },
];
const fixedPanelList_Level_3_EastITR = [
  { name: "IT1P23E", x: X_East_ITR, y: Y_PanelGroup_Level_3 },
];
const fixedPanelList_Level_3_WestER = [
  { name: "OS4P23W3", x: X_Wast_ER + 500, y: Y_PanelGroup_Level_3 },
  { name: "OS4P23W2", x: X_Wast_ER + 400, y: Y_PanelGroup_Level_3 },
  { name: "OS4P23W1", x: X_Wast_ER, y: Y_PanelGroup_Level_3 },
  { name: "OS4DP23W", x: X_Wast_ER - 100, y: Y_PanelGroup_Level_3 },
  { name: "OS4P43W", x: X_Wast_ER - 500, y: Y_PanelGroup_Level_3 },
  { name: "EM1P23W", x: X_Wast_ER - 600, y: Y_PanelGroup_Level_3 },
  { name: "EM1P43W", x: X_Wast_ER - 800, y: Y_PanelGroup_Level_3 },
];
const fixedPanelList_Level_3_WestITR = [
  { name: "IT1P23W", x: X_West_ITR, y: Y_PanelGroup_Level_3 },
];

const X_PanelGroup_Level_2 = X_PanelGroup_Penthouse - 300;
const Y_PanelGroup_Level_2 = Y_Level_3 + 50;
const fixedPanelList_Level_2 = [
  { name: "OS3P22E3", x: X_PanelGroup_Level_2, y: Y_PanelGroup_Level_2 },
  { name: "OS3P22E2", x: X_PanelGroup_Level_2 - 100, y: Y_PanelGroup_Level_2 },
];
const fixedPanelList_Level_2_EastER = [
  { name: "OS3P22E1", x: X_East_ER, y: Y_PanelGroup_Level_2 },
  { name: "OS3DP22E", x: X_East_ER - 100, y: Y_PanelGroup_Level_2 },
  { name: "OS3P42E", x: X_East_ER - 400, y: Y_PanelGroup_Level_2 },
  { name: "EM1P22E", x: X_East_ER - 600, y: Y_PanelGroup_Level_2 },
];
const fixedPanelList_Level_2_EastITR = [
  { name: "IT1P22E", x: X_East_ITR, y: Y_PanelGroup_Level_2 },
];
const fixedPanelList_Level_2_WestER = [
  { name: "OS4P22W4", x: X_Wast_ER + 600, y: Y_PanelGroup_Level_2 },
  { name: "OS4P22W3", x: X_Wast_ER + 500, y: Y_PanelGroup_Level_2 },
  { name: "OS4P22W2", x: X_Wast_ER + 400, y: Y_PanelGroup_Level_2 },
  { name: "OS4P22W1", x: X_Wast_ER, y: Y_PanelGroup_Level_2 },
  { name: "OS4DP22W", x: X_Wast_ER - 100, y: Y_PanelGroup_Level_2 },
  { name: "OS4P42W", x: X_Wast_ER - 500, y: Y_PanelGroup_Level_2 },
  { name: "EM1P22W", x: X_Wast_ER - 600, y: Y_PanelGroup_Level_2 },
  { name: "EM1P42W", x: X_Wast_ER - 800, y: Y_PanelGroup_Level_2 },
];
const fixedPanelList_Level_2_WestITR = [
  { name: "IT1P22W", x: X_West_ITR, y: Y_PanelGroup_Level_2 },
];

const X_PanelGroup_Level_1 = X_PanelGroup_Penthouse;
const Y_PanelGroup_Level_1 = Y_Level_2 + 50;
const fixedPanelList_Level_1 = [
  { name: "OSKP4PE1", x: X_PanelGroup_Level_1, y: Y_PanelGroup_Level_1 },
  { name: "OSKP2PE1", x: X_PanelGroup_Level_1 - 100, y: Y_PanelGroup_Level_1 },
];
const fixedPanelList_Level_1_EastITR = [
  { name: "IT1P21E", x: X_East_ITR, y: Y_PanelGroup_Level_1 },
];
const fixedPanelList_Level_1_WestER = [
  { name: "OS4P21W2", x: X_Wast_ER + 400, y: Y_PanelGroup_Level_1 },
  { name: "LR1P21W", x: X_Wast_ER + 100, y: Y_PanelGroup_Level_1 },

  { name: "OS4P21W1", x: X_Wast_ER, y: Y_PanelGroup_Level_1 },
  { name: "OS4DP21W", x: X_Wast_ER - 100, y: Y_PanelGroup_Level_1 },
  { name: "OS4P41W", x: X_Wast_ER - 500, y: Y_PanelGroup_Level_1 },
];
const fixedPanelList_Level_1_WestITR = [
  { name: "IT1P12W", x: X_West_ITR, y: Y_PanelGroup_Level_1 },
];

const X_PanelGroup_Level_0 = X_PanelGroup_Penthouse + 200;
const Y_PanelGroup_Level_0 = Y_Level_1 + 50;
const fixedPanelList_Level_0 = [
  { name: "OS3P2BE3", x: X_PanelGroup_Level_0, y: Y_PanelGroup_Level_0 },
  { name: "OS3P2BE2", x: X_PanelGroup_Level_0 - 100, y: Y_PanelGroup_Level_0 },
];

const fixedPanelList_Level_0_NormalER = [
  { name: "OS3P2BE1", x: X_PanelGroup_Level_0 - 250, y: Y_PanelGroup_Level_0 },
  { name: "OS3DP2BE", x: X_PanelGroup_Level_0 - 350, y: Y_PanelGroup_Level_0 },
  { name: "OS1P2B", x: X_PanelGroup_Level_0 - 450, y: Y_PanelGroup_Level_0 },
  { name: "OS1DP4B", x: X_PanelGroup_Level_0 - 550, y: Y_PanelGroup_Level_0 },
  { name: "OS1P4B", x: X_PanelGroup_Level_0 - 650, y: Y_PanelGroup_Level_0 },
  { name: "OS2P2B", x: X_PanelGroup_Level_0 - 750, y: Y_PanelGroup_Level_0 },
  { name: "OS2DP4B", x: X_PanelGroup_Level_0 - 850, y: Y_PanelGroup_Level_0 },
  { name: "OS2P4B", x: X_PanelGroup_Level_0 - 950, y: Y_PanelGroup_Level_0 },
  { name: "LR1P2B", x: X_PanelGroup_Level_0 - 1050, y: Y_PanelGroup_Level_0 },
  { name: "LR1DP4B", x: X_PanelGroup_Level_0 - 1150, y: Y_PanelGroup_Level_0 },
  { name: "LR1P4B", x: X_PanelGroup_Level_0 - 1250, y: Y_PanelGroup_Level_0 },
  { name: "EM1P2B", x: X_PanelGroup_Level_0 - 1350, y: Y_PanelGroup_Level_0 },
  { name: "EM1P4B", x: X_PanelGroup_Level_0 - 1450, y: Y_PanelGroup_Level_0 },
];

const fixedPanelList_Level_0_IT = [
  { name: "IT2P2B3", x: X_East_ITR, y: Y_PanelGroup_Level_0 },
  { name: "IT2P2B2", x: X_East_ITR - 100, y: Y_PanelGroup_Level_0 },
  { name: "IT2P2B1", x: X_East_ITR, y: Y_PanelGroup_Level_0 + 150 },
  { name: "IT2DP2B", x: X_East_ITR - 300, y: Y_PanelGroup_Level_0 },
  { name: "IT1DP2B", x: X_East_ITR - 400, y: Y_PanelGroup_Level_0 },
  { name: "IT2PBW", x: X_West_ITR, y: Y_PanelGroup_Level_0 },
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
      <g
        transform={`translate(${X_Emergency_ER_East}, ${Y_Emergency_ER_East})`}
      >
        <line
          x1={0}
          y1={330 * 2 - Y_Emergency_ER_East}
          x2={0}
          y2={0}
          stroke="#555"
          strokeWidth={8}
          strokeDasharray="10,5"
        />
      </g>
      <g
        transform={`translate(${X_Emergency_ER_East2}, ${Y_Emergency_ER_East})`}
      >
        <line
          x1={0}
          y1={330 * 2 - Y_Emergency_ER_East}
          x2={0}
          y2={0}
          stroke="#555"
          strokeWidth={8}
          strokeDasharray="10,5"
        />
      </g>
      <g
        transform={`translate(${X_Emergency_ER_East + 300}, ${Y_Emergency_ER_East})`}
      >
        <line
          x1={0}
          y1={330 * 2 - Y_Emergency_ER_East}
          x2={0}
          y2={0}
          stroke="#555"
          strokeWidth={8}
          strokeDasharray="10,5"
        />
      </g>
      <Arrow_line
        x1={X_Emergency_ER_East + 300}
        y1={680}
        x2={X_Emergency_ER_East}
        y2={680}
        label="EAST IT ROOM"
      />
      <g
        transform={`translate(${X_Emergency_ER_West}, ${Y_Emergency_ER_East})`}
      >
        <line
          x1={0}
          y1={330 * 2 - Y_Emergency_ER_East}
          x2={0}
          y2={330}
          stroke="#555"
          strokeWidth={8}
          strokeDasharray="10,5"
        />
      </g>
      <g
        transform={`translate(${X_Emergency_ER_West2}, ${Y_Emergency_ER_East})`}
      >
        <line
          x1={0}
          y1={330 * 2 - Y_Emergency_ER_East}
          x2={0}
          y2={330}
          stroke="#555"
          strokeWidth={8}
          strokeDasharray="10,5"
        />
      </g>

      <g
        transform={`translate(${X_Emergency_ER_East0}, ${Y_Emergency_ER_East})`}
      >
        <line
          x1={0}
          y1={330 * 2 - Y_Emergency_ER_East}
          x2={0}
          y2={-330}
          stroke="#555"
          strokeWidth={8}
          strokeDasharray="10,5"
        />
      </g>
      <Arrow_line
        x1={X_Emergency_ER_East0}
        y1={680}
        x2={X_Emergency_ER_East}
        y2={680}
        label="East EMERGENCY ELECTRICAL ROOM"
      />
      <Arrow_line
        x1={X_Emergency_ER_West}
        y1={680}
        x2={X_Emergency_ER_East2}
        y2={680}
        label="West EMERGENCY ELECTRICAL ROOM"
      />
      <Arrow_line
        x1={X_Emergency_ER_West}
        y1={680}
        x2={X_Emergency_ER_West2}
        y2={680}
        label="West IT ROOM"
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
              {level === 8
                ? "MEZZANINE"
                : level === 7
                  ? "PENTHOUSE"
                  : `Level ${level}`}
            </text>
          </g>
        );
      })}
      {/*---------------------------------- Level MEZZANINE -------------------------------------------------------*/}
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

      {/*---------------------------------- Level PENTEHOUSE -------------------------------------------------------*/}
      <PanelboardGroup
        devices={deviceMap}
        panelboards={fixedPanelList_Level_Penthouse}
      />
      <Transformer
        x={X_PanelGroup_Penthouse - 50}
        y={Y_PanelGroup_Penthouse + 180}
        name={"T3"}
      />
      <Transformer
        x={X_PanelGroup_Penthouse - 250}
        y={Y_PanelGroup_Penthouse + 180}
        name={"T3"}
      />
      <Transformer
        x={X_PanelGroup_Penthouse - 650}
        y={Y_PanelGroup_Penthouse + 180}
        name={"T4"}
      />
      <Transformer
        x={X_PanelGroup_Penthouse - 1050}
        y={Y_PanelGroup_Penthouse + 180}
        name={"T4"}
      />

      {/*---------------------------------- Level 6 -------------------------------------------------------*/}
      <PanelboardGroup
        devices={deviceMap}
        panelboards={fixedPanelList_Level_6}
      />
      <Transformer
        x={X_PanelGroup_Level_6 - 50}
        y={Y_PanelGroup_Level_6 + 180}
        name={"T3"}
      />
      <Transformer
        x={X_PanelGroup_Level_6 - 180}
        y={Y_PanelGroup_Level_6 + 180}
        name={"T3"}
      />
      <PanelboardGroup
        devices={deviceMap}
        panelboards={fixedPanelList_Level_6_EastER}
      />
      <Transformer
        x={X_East_ER - 100}
        y={Y_PanelGroup_Level_6 + 180}
        name={"T6"}
      />
      <Transformer
        x={X_East_ER - 300}
        y={Y_PanelGroup_Level_6 + 180}
        name={"T4"}
      />
      <PanelboardGroup
        devices={deviceMap}
        panelboards={fixedPanelList_Level_6_EastITR}
      />
      <PanelboardGroup
        devices={deviceMap}
        panelboards={fixedPanelList_Level_6_WestER}
      />
      <PanelboardGroup
        devices={deviceMap}
        panelboards={fixedPanelList_Level_6_WestITR}
      />
      <Transformer
        x={X_Wast_ER - 100}
        y={Y_PanelGroup_Level_6 + 180}
        name={"T6"}
      />
      <Transformer
        x={X_Wast_ER - 400}
        y={Y_PanelGroup_Level_6 + 180}
        name={"T4"}
      />
      {/*---------------------------------- Level 5 -------------------------------------------------------*/}
      <PanelboardGroup
        devices={deviceMap}
        panelboards={fixedPanelList_Level_5}
      />
      <PanelboardGroup
        devices={deviceMap}
        panelboards={fixedPanelList_Level_5_EastER}
      />
      <PanelboardGroup
        devices={deviceMap}
        panelboards={fixedPanelList_Level_5_EastITR}
      />
      <PanelboardGroup
        devices={deviceMap}
        panelboards={fixedPanelList_Level_5_WestER}
      />
      <PanelboardGroup
        devices={deviceMap}
        panelboards={fixedPanelList_Level_5_WestITR}
      />
      <Transformer
        x={X_East_ER - 100}
        y={Y_PanelGroup_Level_5 + 180}
        name={"T6"}
      />
      <Transformer
        x={X_East_ER - 600}
        y={Y_PanelGroup_Level_5 + 180}
        name={"T3"}
      />
      <Transformer
        x={X_Wast_ER - 100}
        y={Y_PanelGroup_Level_5 + 180}
        name={"T6"}
      />
      <Transformer
        x={X_Wast_ER - 650}
        y={Y_PanelGroup_Level_5 + 180}
        name={"T3"}
      />

      {/*---------------------------------- Level 4 -------------------------------------------------------*/}
      <PanelboardGroup
        devices={deviceMap}
        panelboards={fixedPanelList_Level_4}
      />
      <PanelboardGroup
        devices={deviceMap}
        panelboards={fixedPanelList_Level_4_EastER}
      />
      <PanelboardGroup
        devices={deviceMap}
        panelboards={fixedPanelList_Level_4_EastITR}
      />
      <PanelboardGroup
        devices={deviceMap}
        panelboards={fixedPanelList_Level_4_WestER}
      />
      <PanelboardGroup
        devices={deviceMap}
        panelboards={fixedPanelList_Level_4_WestITR}
      />
      <Transformer
        x={X_East_ER - 100}
        y={Y_PanelGroup_Level_4 + 180}
        name={"T6"}
      />
      <Transformer
        x={X_East_ER - 600}
        y={Y_PanelGroup_Level_4 + 180}
        name={"T3"}
      />
      <Transformer
        x={X_Wast_ER - 100}
        y={Y_PanelGroup_Level_4 + 180}
        name={"T6"}
      />

      {/*---------------------------------- Level 3 -------------------------------------------------------*/}
      <PanelboardGroup
        devices={deviceMap}
        panelboards={fixedPanelList_Level_3}
      />
      <PanelboardGroup
        devices={deviceMap}
        panelboards={fixedPanelList_Level_3_EastER}
      />
      <PanelboardGroup
        devices={deviceMap}
        panelboards={fixedPanelList_Level_3_EastITR}
      />
      <PanelboardGroup
        devices={deviceMap}
        panelboards={fixedPanelList_Level_3_WestER}
      />
      <PanelboardGroup
        devices={deviceMap}
        panelboards={fixedPanelList_Level_3_WestITR}
      />
      <Transformer
        x={X_East_ER - 100}
        y={Y_PanelGroup_Level_3 + 180}
        name={"T6"}
      />
      <Transformer
        x={X_East_ER - 600}
        y={Y_PanelGroup_Level_3 + 180}
        name={"T3"}
      />
      <Transformer
        x={X_Wast_ER - 100}
        y={Y_PanelGroup_Level_3 + 180}
        name={"T6"}
      />
      <Transformer
        x={X_Wast_ER - 650}
        y={Y_PanelGroup_Level_3 + 180}
        name={"T3"}
      />

      {/*---------------------------------- Level 2 -------------------------------------------------------*/}
      <PanelboardGroup
        devices={deviceMap}
        panelboards={fixedPanelList_Level_2}
      />
      <PanelboardGroup
        devices={deviceMap}
        panelboards={fixedPanelList_Level_2_EastER}
      />
      <PanelboardGroup
        devices={deviceMap}
        panelboards={fixedPanelList_Level_2_EastITR}
      />
      <PanelboardGroup
        devices={deviceMap}
        panelboards={fixedPanelList_Level_2_WestER}
      />
      <PanelboardGroup
        devices={deviceMap}
        panelboards={fixedPanelList_Level_2_WestITR}
      />
      <Transformer
        x={X_East_ER - 100}
        y={Y_PanelGroup_Level_2 + 180}
        name={"T6"}
      />
      <Transformer
        x={X_East_ER - 600}
        y={Y_PanelGroup_Level_2 + 180}
        name={"T3"}
      />
      <Transformer
        x={X_Wast_ER - 100}
        y={Y_PanelGroup_Level_2 + 180}
        name={"T6"}
      />
      <Transformer
        x={X_Wast_ER - 650}
        y={Y_PanelGroup_Level_2 + 180}
        name={"T3"}
      />

      {/*---------------------------------- Level 1 -------------------------------------------------------*/}
      <PanelboardGroup
        devices={deviceMap}
        panelboards={fixedPanelList_Level_1}
      />
      <Transformer
        x={X_East_ER + 500}
        y={Y_PanelGroup_Level_1 + 180}
        name={"T4"}
      />
      <PanelboardGroup
        devices={deviceMap}
        panelboards={fixedPanelList_Level_1_EastITR}
      />
      <PanelboardGroup
        devices={deviceMap}
        panelboards={fixedPanelList_Level_1_WestER}
      />
      <PanelboardGroup
        devices={deviceMap}
        panelboards={fixedPanelList_Level_1_WestITR}
      />
      <Transformer
        x={X_Wast_ER - 100}
        y={Y_PanelGroup_Level_1 + 180}
        name={"T6"}
      />

      {/*---------------------------------- Level 0 -------------------------------------------------------*/}
      <PanelboardGroup
        devices={deviceMap}
        panelboards={fixedPanelList_Level_0}
      />
      <PanelboardGroup
        devices={deviceMap}
        panelboards={fixedPanelList_Level_0_NormalER}
      />
      <Transformer
        x={X_East_ER + 400}
        y={Y_PanelGroup_Level_0 + 180}
        name={"T7"}
      />
      <Transformer
        x={X_East_ER + 250}
        y={Y_PanelGroup_Level_0 + 180}
        name={"T4"}
      />
      <Transformer x={X_East_ER} y={Y_PanelGroup_Level_0 + 180} name={"T4"} />
      <Transformer
        x={X_East_ER - 400}
        y={Y_PanelGroup_Level_0 + 180}
        name={"T4"}
      />
      <Transformer
        x={X_East_ER - 600}
        y={Y_PanelGroup_Level_0 + 180}
        name={"T3"}
      />
      <PanelboardGroup
        devices={deviceMap}
        panelboards={fixedPanelList_Level_0_IT}
      />
      <Transformer
        x={X_East_ITR - 350}
        y={Y_PanelGroup_Level_0 + 180}
        name={"T8"}
      />
      <Transformer
        x={X_East_ITR - 480}
        y={Y_PanelGroup_Level_0 + 180}
        name={"T8"}
      />
    </>
  );
}

export default React.memo(LSB_Emergency_Raiser);
