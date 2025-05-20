import { useLocation, useNavigate, useParams } from "react-router";
import {
  useDevicesByProjectIdAndPage,
  useDevicesByProjectId,
} from "../devices/useDevices";
import Spinner from "../../ui/Spinner";
import Table from "../../ui/Table";
import Row from "../../ui/Row";
import React from "react";

import {
  HiBattery100,
  HiBattery0,
  HiShieldCheck,
  HiShieldExclamation,
  HiEye,
} from "react-icons/hi2";

import { formatInTimeZone } from "date-fns-tz";
import { enUS } from "date-fns/locale";

import Menus from "../../ui/Menus";
import { useEnergized } from "../devices/useEnergized";
import { usePFPTDone } from "../devices/usePFPTDone";
import DeviceStats from "../dashboard/DeviceStats";
import Pagination from "../../ui/Pagination";
import DeviceTableOperation from "../devices/DeviceTableOperation";
import { useProjectDeviceStats } from "../devices/useProjectDeviceStats";
import SearchInput from "../../ui/SearchInput";

function ProjectDetail() {
  const { projectId } = useParams();
  // const location = useLocation();
  // const { projectName } = location.state || {};
  // const navigate = useNavigate();
  const { isPending, devicesByProjectIdAndPage, count } =
    useDevicesByProjectIdAndPage(Number(projectId));
  // const { isPending: getAllDevicesPending, devicesByProjectId } =
  //   useDevicesByProjectId(Number(projectId));
  const { isPending: getProjectDeviceStatsPending, projectDeviceStats } =
    useProjectDeviceStats();
  const { Energized, isEnergizing } = useEnergized();
  const { PFPTDone, isPFPTing } = usePFPTDone();

  if (isPending || getProjectDeviceStatsPending) return <Spinner></Spinner>;
  const currentProjectDeviceStats = projectDeviceStats.find(
    (projectStats) => projectStats.project_id === Number(projectId)
  );

  const timeZone = "America/New_York";
  // 定义格式化模式
  const pattern = "MMMM dd yyyy";
  function localDateString(utcDateString) {
    const localDate =
      utcDateString &&
      formatInTimeZone(new Date(utcDateString), timeZone, pattern, {
        locale: enUS,
      });
    return localDate;
  }
  return (
    <>
      <DeviceStats devices={currentProjectDeviceStats}></DeviceStats>
      <Row type="horizontal">
        <p>Devices</p>
        <SearchInput />
        <DeviceTableOperation></DeviceTableOperation>
      </Row>
      <Menus>
        <Table columns={"1fr 1fr 1fr 5rem"}>
          <Table.Header>
            <div>DeviceName</div>
            <div>Energized</div>
            <div>PFPT</div>
            <div></div>
          </Table.Header>
          {devicesByProjectIdAndPage.map((device) => {
            return (
              <Table.Row key={device.id}>
                <div>{device.name}</div>
                <div>
                  {device.energized ? (
                    <div className="relative  ">
                      <HiBattery100 className="w-10 h-10 text-green-500 " />
                      <span className="text-lg text-green-500">
                        {localDateString(device.actual_finish_time_energized)}
                      </span>
                    </div>
                  ) : (
                    <>
                      <HiBattery0 className="w-10 h-10 text-orange-500" />
                      <span className="text-lg text-orange-500">
                        {localDateString(device.estimated_time_of_enegized)}
                      </span>
                    </>
                  )}
                </div>
                <div>
                  {device.PFPT ? (
                    <>
                      <HiShieldCheck className="w-10 h-10 text-green-500" />
                      <span className="text-lg text-green-500">
                        {localDateString(device.actual_finish_time_PFPT)}
                      </span>
                    </>
                  ) : (
                    <>
                      <HiShieldExclamation className="w-10 h-10 text-orange-500" />
                      <span className="text-lg text-orange-500">
                        {localDateString(device.estimated_time_of_PFPT)}
                      </span>
                    </>
                  )}
                </div>
                <Menus.Menu>
                  <Menus.Toggle id={device.id} />
                  <Menus.List id={device.id}>
                    <Menus.Button icon={<HiEye className="w-10 h-10" />}>
                      See details
                    </Menus.Button>
                    <Menus.Button
                      icon={
                        <HiBattery100 className="w-10 h-10 text-green-500" />
                      }
                      isDisabled={device.energized || isEnergizing}
                      onClick={() =>
                        Energized({
                          deviceId: device.id,
                          deviceObject: { ...device },
                        })
                      }
                    >
                      Energized Done
                    </Menus.Button>
                    <Menus.Button
                      icon={
                        <HiShieldCheck className="w-10 h-10 text-green-500" />
                      }
                      isDisabled={device.PFPT || isPFPTing}
                      onClick={() =>
                        PFPTDone({
                          deviceId: device.id,
                          deviceObject: { ...device },
                        })
                      }
                    >
                      PFPT Done
                    </Menus.Button>
                  </Menus.List>
                </Menus.Menu>
              </Table.Row>
            );
          })}
          <Table.Footer>
            <Pagination count={count}></Pagination>
          </Table.Footer>
        </Table>
      </Menus>
    </>
  );
}

export default ProjectDetail;
