import { useLocation, useNavigate, useParams } from "react-router";
import { useDevices } from "../devices/useDevices";
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
import Menus from "../../ui/Menus";
import { useEnergized } from "../devices/useEnergized";
import { usePFPTDone } from "../devices/usePFPTDone";
import DeviceStats from "../dashboard/DeviceStats";
function ProjectDetail() {
  const { projectId } = useParams();
  const location = useLocation();
  const { projectName } = location.state || {};
  const navigate = useNavigate();
  //   console.log(Number(projectId));
  const { isPending, devicesByProjectId } = useDevices(Number(projectId));
  const { Energized, isEnergizing } = useEnergized();
  const { PFPTDone, isPFPTing } = usePFPTDone();

  const hoverAcition =
    "hover:scale-103 hover:cursor-pointer hover:font-bold  hover:shadow-lg hover:rounded-xl hover:ring-3 hover:ring-gray-500 ";
  const activeAction =
    "active:scale-103 active:cursor-pointer active:font-bold  active:shadow-lg active:rounded-xl active:ring-3 active:ring-gray-500 ";
  if (isPending) return <Spinner></Spinner>;

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
          <Table.Row>
            {devicesByProjectId.map((device) => {
              return (
                <React.Fragment key={device.id}>
                  <div>{device.name}</div>
                  <div>
                    {device.energized ? (
                      <HiBattery100 className="w-10 h-10 text-green-500" />
                    ) : (
                      <HiBattery0 className="w-10 h-10 text-red-500" />
                    )}
                  </div>
                  <div>
                    {device.PFPT ? (
                      <HiShieldCheck className="w-10 h-10 text-green-500" />
                    ) : (
                      <HiShieldExclamation className="w-10 h-10 text-red-500" />
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
                </React.Fragment>
              );
            })}
          </Table.Row>
        </Table>
      </Menus>
    </>
  );
}

export default ProjectDetail;
