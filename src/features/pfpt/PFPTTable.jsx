import { useLocation, useParams } from "react-router";
import { usePFPT } from "./usePFPT";
import Spinner from "../../ui/Spinner";

import StepsTable from "../../ui/StepsTable";

function PFPTTable() {
  const { deviceId } = useParams();
  const location = useLocation();
  const { projectName, deviceName } = location.state || {};

  if (deviceName.toLowerCase() === "lighting control") {
    const { isPending, PFPTSteps } = usePFPT(deviceId);

    if (isPending) return <Spinner></Spinner>;

    return (
      <StepsTable testSteps={PFPTSteps}>
        <StepsTable.TableHeading
          headingContent={`haha ${projectName} ${deviceName}`}
        />
        <StepsTable.SubdevicesSelect />
        <StepsTable.TestSteps />
        <StepsTable.ResultOptions />
        <StepsTable.PreviousAndNextButton />
      </StepsTable>
    );
  }
  const { isPending, PFPTSteps } = usePFPT(deviceId);

  if (isPending) return <Spinner></Spinner>;

  return (
    <StepsTable testSteps={PFPTSteps}>
      <StepsTable.TableHeading
        headingContent={`${projectName} ${deviceName}`}
      />
      <StepsTable.TestSteps />
      <StepsTable.ResultOptions />
      <StepsTable.PreviousAndNextButton />
    </StepsTable>
  );
}

export default PFPTTable;
