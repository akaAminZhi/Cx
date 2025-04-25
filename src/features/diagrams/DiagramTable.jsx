import { useQueryClient } from "@tanstack/react-query";
import DiagramRow from "./DiagramRow";

function DiagramTable() {
  const queryClient = useQueryClient();
  const projects = queryClient.getQueryData(["projects"]);

  return (
    <div className="border-1 border-gray-200 text-2xl rounded-xl overflow-hidden p-5">
      <header className="grid grid-cols-2 gap-x-10 border-b-1 border-b-gray-100 bg-gray-50 uppercase font-semibold text-gray-600 p-7">
        <div></div>
        <div className="px-4">Name</div>
      </header>
      {projects.map((project) => {
        return <DiagramRow key={project.id} project={project}></DiagramRow>;
      })}
    </div>
  );
}

export default DiagramTable;
