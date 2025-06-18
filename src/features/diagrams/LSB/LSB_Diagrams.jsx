import { useState, lazy, Suspense, useRef } from "react";
import Button from "../../../ui/Button";
import PanZoomSVG from "../../../ui/PanZoomSVG";
import Spinner from "../../../ui/Spinner";
import preloadImages from "../../../data/preloadImages";

const LSB_Normal_Raiser = lazy(() => import("./LSB_Normal_Raiser"));
const LSB_Emergency_Raiser = lazy(() => import("./LSB_Emergency_Raiser"));
const LSB_Level_B_Part_A = lazy(() => import("./LSB_Level_B_Part_A"));
const LSB_Level_4_Part_B = lazy(() => import("./LSB_Level_4_Part_B"));

const DIAGRAMS = ["Normal", "Emergency", "Level_B_A", "Level_4_B"];

function LSB_Diagrams() {
  const [active, setActive] = useState("Normal");
  const diagramRef = useRef(null); // ✅ 单一 ref

  // GPU 预热
  const WarmupImages = () => (
    <div style={{ position: "absolute", top: -9999, left: -9999 }}>
      {preloadImages.map((src) => (
        <img
          key={src}
          src={src}
          width={50}
          height={50}
          style={{ opacity: 0 }}
          alt="prewarm"
        />
      ))}
    </div>
  );
  const handlePrint = () => {
    const container = diagramRef.current;
    if (!container) return;

    const svg = container.querySelector("svg");
    if (!svg) {
      alert("SVG element not found");
      return;
    }

    const win = window.open("", "_blank");
    win.document.write(`
      <html>
        <head><title>Print SVG</title></head>
        <body>
          ${svg.outerHTML}
          <script>
            window.onload = () => {
              window.print();
              window.onafterprint = window.close;
            };
          </script>
        </body>
      </html>
    `);
    win.document.close();
  };

  const renderDiagram = () => {
    switch (active) {
      case "Normal":
        return (
          <div ref={diagramRef}>
            <PanZoomSVG height="800px">
              <LSB_Normal_Raiser />
            </PanZoomSVG>
          </div>
        );
      case "Emergency":
        return (
          <div ref={diagramRef}>
            <PanZoomSVG height="800px">
              <LSB_Emergency_Raiser />
            </PanZoomSVG>
          </div>
        );
      case "Level_B_A":
        return (
          <div ref={diagramRef}>
            <PanZoomSVG height="800px">
              <LSB_Level_B_Part_A />
            </PanZoomSVG>
          </div>
        );
      case "Level_4_B":
        return (
          <div ref={diagramRef}>
            <PanZoomSVG height="800px">
              <LSB_Level_4_Part_B />
            </PanZoomSVG>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <>
      {/* ⏱️ GPU warmup，在后台强制浏览器 composite */}
      <WarmupImages />
      <div className="flex gap-x-1 mb-2">
        <Button onClick={handlePrint}>Print</Button>
        {DIAGRAMS.map((label) => (
          <Button
            key={label}
            onClick={() => setActive(label)}
            disabled={active === label}
            selected={active === label}
          >
            {label}
          </Button>
        ))}
      </div>

      <div className="m-2">
        <Suspense fallback={<Spinner />}>{renderDiagram()}</Suspense>
      </div>
    </>
  );
}

export default LSB_Diagrams;
