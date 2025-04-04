import Logo from "./Logo";
import MainNav from "./MainNav";
import { HiCloudArrowUp } from "react-icons/hi2";
import Modal from "./Modal";
import UploadDevicesForm from "../features/devices/UploadDevicesForm";
function Sidebar() {
  return (
    <aside className="flex flex-col gap-3 p-12 row-span-full border-r-2 border-r-gray-100">
      <Logo></Logo>
      <MainNav></MainNav>
      <Modal>
        <Modal.Open opens="upload">
          <HiCloudArrowUp className="fixed w-20 h-20 text-indigo-400 bottom-5 hover:cursor-pointer" />
        </Modal.Open>
        <Modal.Window name="upload">
          <UploadDevicesForm></UploadDevicesForm>
        </Modal.Window>
      </Modal>
    </aside>
  );
}

export default Sidebar;
