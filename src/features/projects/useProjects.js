import { useQuery } from "@tanstack/react-query";
import { getProjects } from "../../services/apiProjects";

function useProjects() {
  const { isPending, data: projects } = useQuery({
    queryKey: ["projects"],
    queryFn: getProjects,
  });
  return { isPending, projects };
}

export default useProjects;
