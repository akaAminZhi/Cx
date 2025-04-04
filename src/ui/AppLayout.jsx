import { Outlet } from "react-router";
import Sidebar from "./Sidebar";
import Header from "./Header";
import Spinner from "./Spinner";
import useProjects from "../features/projects/useProjects";
import { setGlobalProjects } from "../utils/globalProjects";
function AppLayout() {
  const { isPending, projects } = useProjects();
  if (isPending) return <Spinner></Spinner>;
  setGlobalProjects(projects);
  return (
    <div className="grid grid-cols-[20rem_1fr] grid-rows-[auto_1fr] h-screen max-w-screen">
      <Header></Header>
      <Sidebar></Sidebar>
      <main className="bg-gray-50 p-10 relative  whitespace-normal break-all">
        <Outlet></Outlet>
      </main>
    </div>
  );
}

export default AppLayout;
