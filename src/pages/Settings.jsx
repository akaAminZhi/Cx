import LSB_Emergency_Raiser from "../ui/LSB_Emergency_Raiser";
import LSB_Normal_Raiser from "../ui/LSB_Normal_Raiser";
import PanZoomSVG from "../ui/PanZoomSVG";

function Settings() {
  return (
    <>
      <PanZoomSVG height="800px">
        {/* <LSB_Normal_Raiser /> */}
        <LSB_Emergency_Raiser />
      </PanZoomSVG>
    </>
  );
}

export default Settings;
