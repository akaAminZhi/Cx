import { useLocation, useParams } from "react-router";
import LSB_Diagrams from "./LSB/LSB_Diagrams";
import PageNotFound from "../../pages/PageNotFound";

function DiagramDetail() {
  const { projectId } = useParams();
  const location = useLocation();
  const { projectName } = location.state || {};

  const diagramComponents = {
    1: LSB_Diagrams,

    // 可继续添加更多
  };
  const SelectedDiagram = diagramComponents[projectId];
  if (!SelectedDiagram) {
    return <PageNotFound />;
  }

  return <SelectedDiagram />;
}

export default DiagramDetail;
