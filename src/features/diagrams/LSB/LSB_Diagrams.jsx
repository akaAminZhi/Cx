import { useState } from "react";
import Button from "../../../ui/Button";
import PanZoomSVG from "../../../ui/PanZoomSVG";
import LSB_Emergency_Raiser from "./LSB_Emergency_Raiser";
import LSB_Normal_Raiser from "./LSB_Normal_Raiser";

function LSB_Diagrams() {
  const [showDiagram, setShowDiagram] = useState("Normal");
  function handleClick(e) {
    // console.log(e.currentTarget.textContent.trim());
    setShowDiagram(e.currentTarget.textContent.trim());
  }
  return (
    <>
      <div className="flex gap-x-1">
        <Button onClick={handleClick} disabled={showDiagram === "Normal"}>
          Normal
        </Button>
        <Button onClick={handleClick} disabled={showDiagram === "Emergency"}>
          Emergency
        </Button>
      </div>

      <PanZoomSVG
        height="800px"
        className={`m-2 ${showDiagram === "Normal" && "hidden"}`}
      >
        {/* <LSB_Normal_Raiser /> */}
        <LSB_Emergency_Raiser />
      </PanZoomSVG>
      <PanZoomSVG
        height="800px"
        className={`m-2 ${showDiagram === "Emergency" && "hidden"}`}
      >
        <LSB_Normal_Raiser />
      </PanZoomSVG>
    </>
  );
}

export default LSB_Diagrams;
