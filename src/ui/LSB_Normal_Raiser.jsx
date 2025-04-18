import Switchgear from "../ui/Switchgear";
import ATS from "../ui/ATS";
import Panelboard from "../ui/Panelboard";
import Transformer from "../ui/Transformer";

const fixedSwitchgearList = [
  { name: "USS-LSB-1", x: 0, y: 0 },
  { name: "USS-LSB-2", x: 600, y: 0 },
];
const switchgearData = [
  { name: "USS-LSB-1", energized: true },
  { name: "USS-LSB-2", energized: true },
];
function LSB_Normal_Raiser() {
  const deviceMap = new Map(switchgearData.map((item) => [item.name, item]));
  return (
    <>
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
    </>
  );
}

export default LSB_Normal_Raiser;
