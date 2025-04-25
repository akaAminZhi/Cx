import Panelboard from "./Panelboard";

function PanelboardGroup({ panelboards = [], devices = new Map() }) {
  return panelboards.map((item) => {
    const device = devices?.get(item.name);

    return (
      <Panelboard
        key={item.name}
        name={item.name}
        x={item.x}
        y={item.y}
        energized={device?.energized ?? false}
      />
    );
  });
}

export default PanelboardGroup;
