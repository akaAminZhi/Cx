import React, { useState, lazy, Suspense, useRef, useEffect } from "react";
import Fuse from "fuse.js";
import Button from "../../../ui/Button";
import PanZoomSVG from "../../../ui/PanZoomSVG";
import Spinner from "../../../ui/Spinner";
import preloadImages from "../../../data/preloadImages";
import DiagramSearchBox from "../../../ui/DiagramSearchBox";

// 配置对象：统一管理图层行为
const DIAGRAM_CONFIG = {
  Normal: {
    label: "Normal",
    Component: lazy(() => import("./LSB_Normal_Raiser")),
    enableSearch: false,
    jsonPath: null,
  },
  Emergency: {
    label: "Emergency",
    Component: lazy(() => import("./LSB_Emergency_Raiser")),
    enableSearch: false,
    jsonPath: null,
  },
  Level_B_A: {
    label: "Level_B_A",
    Component: lazy(() => import("./LSB_Level_B_Part_A")),
    enableSearch: true,
    jsonPath: "/LSB_Level_B_Part_A.json",
  },
  Level_B_B: {
    label: "Level_B_B",
    Component: lazy(() => import("./LSB_Level_B_Part_B")),
    enableSearch: true,
    jsonPath: "/LSB_Level_B_Part_B.json",
  },
  Level_4_B: {
    label: "Level_4_B",
    Component: lazy(() => import("./LSB_Level_4_Part_B")),
    enableSearch: true,
    jsonPath: "/LSB_Level_4_Part_B.json",
  },
};

const DIAGRAMS = Object.keys(DIAGRAM_CONFIG);

function LSB_Diagrams() {
  const [active, setActive] = useState("Normal");
  const diagramRef = useRef(null);
  const [searchText, setSearchText] = useState("");
  const [matchedRooms, setMatchedRooms] = useState([]);
  const [dummyRefresh, setDummyRefresh] = useState(0);
  const [roomData, setRoomData] = useState([]);

  const panZoomRefs = useRef({});
  const panZoomStateRefs = useRef({});
  const highlightedRoomsMap = useRef({});

  DIAGRAMS.forEach((key) => {
    if (!panZoomRefs.current[key]) panZoomRefs.current[key] = React.createRef();
    if (!panZoomStateRefs.current[key])
      panZoomStateRefs.current[key] = { scale: 0.3, translate: { x: 0, y: 0 } };
    if (!highlightedRoomsMap.current[key])
      highlightedRoomsMap.current[key] = new Set();
  });

  const currentHighlightSet = highlightedRoomsMap.current[active];

  useEffect(() => {
    const config = DIAGRAM_CONFIG[active];
    if (config?.jsonPath) {
      fetch(config.jsonPath)
        .then((res) => res.json())
        .then(setRoomData);
    } else {
      setRoomData([]);
    }
    setSearchText("");
    setMatchedRooms([]);
  }, [active]);

  const fuse = new Fuse(roomData, {
    keys: ["room_plate"],
    threshold: 0.4,
  });

  const handleSearch = (text) => {
    setSearchText(text);
    if (text.trim()) {
      const results = fuse.search(text);
      setMatchedRooms(results.map((r) => r.item));
    } else {
      setMatchedRooms([]);
    }
  };

  const handleResetSearch = () => {
    setSearchText("");
    setMatchedRooms([]);
  };

  const handleSelect = (room) => {
    setSearchText(room.room_plate);
    setMatchedRooms([]);
    currentHighlightSet.add(room.room_plate);
    setDummyRefresh((v) => v + 1);

    const x = (room.x1 + room.x2) / 2;
    const y = (room.y1 + room.y2) / 2;
    panZoomRefs.current[active].current?.zoomToPoint?.(x, y);
  };

  const toggleHighlight = (room_plate) => {
    if (currentHighlightSet.has(room_plate)) {
      currentHighlightSet.delete(room_plate);
    } else {
      currentHighlightSet.add(room_plate);
    }
    setDummyRefresh((v) => v + 1);
  };

  const handlePrint = () => {
    const container = diagramRef.current;
    if (!container) return;
    const svg = container.querySelector("svg");
    if (!svg) return alert("SVG not found");
    const win = window.open("", "_blank");
    win.document.write(`
      <html><head><title>Print</title></head><body>
      ${svg.outerHTML}
      <script>window.onload = () => { window.print(); window.onafterprint = window.close; };</script>
      </body></html>
    `);
    win.document.close();
  };

  const renderDiagram = () => {
    const { Component, enableSearch } = DIAGRAM_CONFIG[active];
    const panZoomRef = panZoomRefs.current[active];
    const panZoomStateRef = panZoomStateRefs.current[active];

    const commonProps = {
      ref: panZoomRef,
      stateRef: { current: panZoomStateRef },
      height: "800px",
    };

    const diagramProps = enableSearch
      ? {
          highlightedRooms: currentHighlightSet,
          onRoomClick: toggleHighlight,
        }
      : {};

    return (
      <div ref={diagramRef}>
        <PanZoomSVG key={active} {...commonProps}>
          <Component {...diagramProps} />
        </PanZoomSVG>
      </div>
    );
  };

  const WarmupImages = () => (
    <div style={{ position: "absolute", top: -9999, left: -9999 }}>
      {preloadImages.map((src) => (
        <img
          key={src}
          src={src}
          width={50}
          height={50}
          style={{ opacity: 0 }}
          alt="warmup"
        />
      ))}
    </div>
  );

  return (
    <>
      <WarmupImages />

      <div className="flex gap-x-2 mb-3">
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

      {DIAGRAM_CONFIG[active].enableSearch && (
        <DiagramSearchBox
          searchText={searchText}
          matchedRooms={matchedRooms}
          handleSearch={handleSearch}
          handleResetSearch={handleResetSearch}
          handleSelect={handleSelect}
        />
      )}

      <div className="m-2">
        <Suspense fallback={<Spinner />}>{renderDiagram()}</Suspense>
      </div>
    </>
  );
}

export default LSB_Diagrams;
