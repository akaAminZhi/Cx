import { useLocation, useNavigate, useParams } from "react-router";
import {
  useDevicesByProjectIdAndPage,
  useDevicesByProjectId,
} from "../devices/useDevices";
import Spinner from "../../ui/Spinner";
import Table from "../../ui/Table";
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

function ProjectDetail() {
  const { projectId } = useParams();
  const location = useLocation();
  const { projectName } = location.state || {};
  const navigate = useNavigate();
  const { isPending, devicesByProjectIdAndPage, count } =
    useDevicesByProjectIdAndPage(Number(projectId));
  const { isPending: getAllDevicesPending, devicesByProjectId } =
    useDevicesByProjectId(Number(projectId));
  const { Energized, isEnergizing } = useEnergized();
  const { PFPTDone, isPFPTing } = usePFPTDone();

  const hoverAcition =
    "hover:scale-103 hover:cursor-pointer hover:font-bold  hover:shadow-lg hover:rounded-xl hover:ring-3 hover:ring-gray-500 ";
  const activeAction =
    "active:scale-103 active:cursor-pointer active:font-bold  active:shadow-lg active:rounded-xl active:ring-3 active:ring-gray-500 ";
  if (isPending || getAllDevicesPending) return <Spinner></Spinner>;
  const handleClick = (device) => {
    const { id: deviceId, name: deviceName } = device;
    const navigateToDevice = () =>
      navigate(`/projects/${projectId}/pfpt/${deviceId}`, {
        state: { projectName, deviceName },
      });

    // 在移动设备上延迟跳转以展示 active 效果
    if (window.matchMedia("(max-width: 1028px)").matches) {
      setTimeout(navigateToDevice, 300);
    } else {
      navigateToDevice();
    }
  };
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
      <DeviceStats devices={devicesByProjectId}></DeviceStats>
      <Menus>
        <Table columns={"1fr 1fr 1fr 5rem"}>
          <Table.Header>
            <div>DeviceName</div>
            <div>Energezed</div>
            <div>PFPT</div>
            <div></div>
          </Table.Header>
          {devicesByProjectIdAndPage.map((device) => {
            return (
              <Table.Row key={device.id}>
                <div>{device.name}</div>
                <div>
                  {device.energized ? (
                    <>
                      <HiBattery100 className="w-10 h-10 text-green-500" />
                      <span className="text-lg text-green-500">
                        {localDateString(device.actual_finish_time_energized)}
                      </span>
                    </>
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
