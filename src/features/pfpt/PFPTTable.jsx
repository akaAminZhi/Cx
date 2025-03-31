import { useLocation, useParams } from "react-router";
import { usePFPT } from "./usePFPT";
import Spinner from "../../ui/Spinner";

import StepsTable from "../../ui/StepsTable";
import Table from "../../ui/Table";
import Input from "../../ui/Input";
import { useState } from "react";
function PFPTTable() {
  const { deviceId } = useParams();
  const location = useLocation();
  const { projectName, deviceName } = location.state || {};

  if (deviceName.toLowerCase() === "lighting control") {
    const { isPending, PFPTSteps } = usePFPT(deviceId);
    const [showTable, setShowTable] = useState(true);
    if (isPending) return <Spinner></Spinner>;

    return (
      <StepsTable testSteps={PFPTSteps}>
        <StepsTable.TableHeading
          headingContent={`${projectName} ${deviceName}`}
        />

        <StepsTable.SubdevicesSelect />

        <Table columns={"6rem 1fr 1fr"} showTable={showTable}>
          <Table.Header>
            <div></div>
            <div>toggle</div>
            <div>dimming</div>
          </Table.Header>
          <Table.Row>
            <div>Setting</div>
            <Input type={"text"}></Input>
            <Input type={"text"}></Input>
          </Table.Row>
          <Table.Row>
            <div>Result</div>
            <Input type={"text"}></Input>
            <Input type={"text"}></Input>
          </Table.Row>

          <Table.Row>
            <div>Comments</div>
            <textarea className="border border-gray-300 bg-gray-50 rounded-md py-2 px-4 shadow-md col-span-2"></textarea>
          </Table.Row>
          <Table.Row>
            <div>Functions Correctly:</div>
            <div className=" items-center justify-center flex">
              <input
                id={"switchyes"}
                type="radio"
                name="answer2"
                value={"yes"}
                className="w-10 h-10 accent-green-500 bg-gray-100 border-green-500 rounded-sm "
              ></input>
              <label
                htmlFor={"switchyes"}
                className="w-full py-3 ms-2 text-4xl font-medium text-green-500"
              >
                Yes
              </label>
            </div>
            <div className="items-center justify-center flex">
              <input
                id={"switchno"}
                type="radio"
                name="answer2"
                value={"no"}
                className="w-10 h-10 accent-red-500 bg-gray-100 border-gray-300 rounded-sm "
              ></input>
              <label
                htmlFor={"switchno"}
                className="w-full py-3 ms-2 text-4xl text-red-500 font-medium"
              >
                No
              </label>
            </div>
          </Table.Row>
        </Table>

        <StepsTable.TestSteps />
        <StepsTable.ResultOptions />
        <StepsTable.PreviousAndNextButton />
        <button
          onClick={() => setShowTable(!showTable)}
          className="fixed bottom-4 left-4 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full shadow-lg"
        >
          {showTable ? "hidde table" : "show table"}
        </button>
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
