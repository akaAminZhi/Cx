import { useLocation, useNavigate, useParams } from "react-router";
import { useDevices } from "../devices/useDevices";
import Spinner from "../../ui/Spinner";
import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
function ProjectDetail() {
  const { projectId } = useParams();
  const location = useLocation();
  const { projectName } = location.state || {};
  const navigate = useNavigate();
  //   console.log(Number(projectId));
  const { isPending, devicesByProjectId } = useDevices(Number(projectId));

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
      <Row type="horizontal">
        <Heading>{projectName}</Heading>
      </Row>
      <Row>
        <div className="border-1 border-gray-200 text-2xl rounded-xl overflow-hidden">
          <header className="grid grid-cols-3 gap-x-10 border-b-1 border-b-gray-100 bg-gray-50 uppercase font-semibold text-gray-600 p-7">
            <div>DeviceName</div>
            <div></div>
          </header>

          {devicesByProjectId.map((device) => {
            return (
              <div
                className={
                  "grid grid-cols-2 gap-x-10 border-b-1  rounded  mx-5 my-2 border-b-gray-100 p-8 items-center bg-white transition-all duration-200 " +
                  hoverAcition +
                  activeAction
                }
                key={device.id}
                onClick={() => handleClick(device)}
              >
                {device.name}
              </div>
            );
          })}
        </div>
      </Row>
    </>
  );
}

export default ProjectDetail;
