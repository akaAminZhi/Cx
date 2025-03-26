import { useQuery } from "@tanstack/react-query";
import { getPFPTByDeviceId } from "../../services/apiPFPT";

export function usePFPT(deviceId) {
  //   console.log(ProjectId);
  const {
    isPending,
    data: PFPTSteps,
    error,
  } = useQuery({
    queryKey: ["PFPTSteps", deviceId],
    queryFn: () => getPFPTByDeviceId({ deviceId }),
  });
  return { isPending, error, PFPTSteps };
}
