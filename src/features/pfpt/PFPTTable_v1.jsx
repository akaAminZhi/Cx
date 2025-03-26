import { useLocation, useParams } from "react-router";
import Heading from "../../ui/Heading";
import { usePFPT } from "./usePFPT";
import Spinner from "../../ui/Spinner";
import { useState } from "react";
import Button from "../../ui/Button";

import {
  HiChevronLeft,
  HiChevronRight,
  HiOutlineArrowSmallUp,
} from "react-icons/hi2";
function PFPTTable() {
  const { deviceId } = useParams();
  const [pfptStep, setPfptStep] = useState(0);
  const [selected, setSelected] = useState("");
  const [records, setRecords] = useState([]);
  const location = useLocation();
  const { projectName, deviceName } = location.state || {};

  const hoverAcition =
    "hover:scale-103 hover:cursor-pointer hover:font-bold  hover:shadow-lg hover:rounded-xl hover:ring-3 hover:ring-gray-500 hover:bg-gray-200 ";
  const activeAction =
    "active:scale-103 active:cursor-pointer active:font-bold  active:shadow-lg active:rounded-xl active:ring-3 active:ring-gray-500 ";
  // const selectedAction =
  //   "scale-103 cursor-pointer font-bold  shadow-lg rounded-xl ring-3 ring-gray-500 bg-gray-200 ";
  const selectedAction =
    "has-checked:scale-103 has-checked:bg-indigo-50 has-checked:font-bold has-checked:text-indigo-900 has-checked:ring-indigo-200";

  const { isPending, PFPTSteps } = usePFPT(deviceId);

  if (isPending) return <Spinner></Spinner>;
  const numStep = PFPTSteps.length;
  const handleRadioChange = (e) => {
    setSelected(e.target.value);
  };

  const handleNext = () => {
    // 保存当前步骤的数据
    const currentRecord = {
      pfptStep,
      description: PFPTSteps.at(pfptStep)["description"],
      selectedValue: selected,
    };
    // 更新记录，如果当前步骤已存在记录则替换
    setRecords((prevRecords) => {
      const newRecords = [...prevRecords];
      newRecords[pfptStep] = currentRecord;
      return newRecords;
    });
    // 前进到下一步（如果未到最后一步）
    if (pfptStep + 1 < numStep) {
      const nextStep = pfptStep + 1;
      setPfptStep(nextStep);

      // 如果下一步已有记录，恢复选中值；否则清空
      if (records[nextStep]) {
        setSelected(records[nextStep].selectedValue);
      } else {
        setSelected("");
      }
    }
  };

  const handlePrevious = () => {
    if (pfptStep > 0) {
      const newStep = pfptStep - 1;
      setPfptStep(newStep);
      // 恢复上一步保存的选中值（如果有记录的话）
      if (records[newStep]) {
        setSelected(records[newStep].selectedValue);
      } else {
        setSelected("");
      }
    }
  };
  return (
    <>
      <div className="mb-16 grid justify-between gap-[1.2rem] grid-cols-[auto_auto] text-[1.8rem] ]">
        <Heading>{`${projectName} ${deviceName}`}</Heading>
        <div>
          {pfptStep + 1}/{numStep}
        </div>
        <progress
          className="progress-bar appearance-none w-full h-3 col-span-full"
          max={numStep}
          value={pfptStep + 1}
        ></progress>
      </div>

      <div className="flex justify-center items-center text-4xl mb-2 bg-white p-2 rounded-2xl min-h-40 ">
        {PFPTSteps.at(pfptStep)["description"]}
      </div>

      <div className="grid grid-rows-3 gap-4 mt-10 bg-white rounded-3xl p-4 ">
        <label
          className={
            `flex justify-between items-center w-full p-2 border-2 border-gray-200 rounded-2xl text-5xl cursor-pointer   transition-colors duration-200  ` +
            hoverAcition +
            activeAction +
            selectedAction
          }
        >
          <span>Yes</span>
          <input
            className="w-10 h-10 mr-4"
            type="radio"
            name="answer"
            value="Yes"
            onChange={handleRadioChange}
            checked={selected === "Yes"}
          />
        </label>

        <label
          className={
            `flex justify-between items-center w-full p-2 border-2 border-gray-200 rounded-2xl text-5xl cursor-pointer   transition-colors duration-200  ` +
            hoverAcition +
            activeAction +
            selectedAction
          }
        >
          <span>No</span>
          <input
            className="w-10 h-10 mr-4"
            type="radio"
            name="answer"
            value="No"
            checked={selected === "No"}
            onChange={handleRadioChange}
          />
        </label>

        <label
          className={
            `flex justify-between items-center w-full p-2 border-2 border-gray-200 rounded-2xl text-5xl cursor-pointer   transition-colors duration-200  ` +
            hoverAcition +
            activeAction +
            selectedAction
          }
        >
          <span>N/A</span>
          <input
            className="w-10 h-10 mr-4"
            type="radio"
            name="answer"
            value="NA"
            checked={selected === "NA"}
            onChange={handleRadioChange}
          />
        </label>
      </div>
      <div className="mt-2 flex justify-between">
        <Button size="large" onClick={handlePrevious} disabled={pfptStep === 0}>
          <HiChevronLeft></HiChevronLeft>
          <span>Previous</span>
        </Button>
        {pfptStep !== numStep - 1 ? (
          <Button
            size="large"
            onClick={handleNext}
            disabled={pfptStep + 1 === numStep}
          >
            <span>Next</span> <HiChevronRight></HiChevronRight>
          </Button>
        ) : (
          <Button size="large" variation="submitte">
            <span>Submit</span> <HiOutlineArrowSmallUp></HiOutlineArrowSmallUp>
          </Button>
        )}
      </div>
    </>
  );
}

export default PFPTTable;
