import { useQuery } from "@tanstack/react-query";
import { getDevicesByProjectId } from "../../services/apiDevices";
export function useDevices(ProjectId) {
  //   console.log(ProjectId);
  const {
    isPending,
    data: devicesByProjectId,
    error,
  } = useQuery({
    queryKey: ["devicesByProjectId", ProjectId],
    queryFn: () => getDevicesByProjectId({ ProjectId }),
  });
  return { isPending, error, devicesByProjectId };
}
