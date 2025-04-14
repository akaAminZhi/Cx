import { useQuery, useQueryClient } from "@tanstack/react-query";
import {
  getDevicesByProjectIdAndPage,
  getAllDevicesByProjectId,
} from "../../services/apiDevices";
import { useSearchParams } from "react-router";
import { PAGE_SIZE } from "../../utils/constans";

export function useDevicesByProjectIdAndPage(ProjectId) {
  //   console.log(ProjectId);
  const queryClient = useQueryClient();
  const [searchParams] = useSearchParams();

  // FILTER
  const filterValue = searchParams.get("status");
  const filter =
    !filterValue || filterValue === "all"
      ? null
      : { field: "status", value: filterValue };
  // PAGINATION
  const page = !searchParams.get("page") ? 1 : Number(searchParams.get("page"));
  const {
    isPending,
    data: { data: devicesByProjectIdAndPage, count } = {},
    error,
  } = useQuery({
    queryKey: ["devicesByProjectIdAndPage", ProjectId, page, filter],
    queryFn: () => getDevicesByProjectIdAndPage({ ProjectId, page, filter }),
  });

  // PRE-FETCHING
  const pageCount = Math.ceil(count / PAGE_SIZE);

  if (page < pageCount) {
    queryClient.prefetchQuery({
      queryKey: ["devicesByProjectIdAndPage", ProjectId, page + 1, filter],
      queryFn: () =>
        getDevicesByProjectIdAndPage({ ProjectId, page: page + 1, filter }),
    });
  }
  if (page > 1) {
    queryClient.prefetchQuery({
      queryKey: ["devicesByProjectIdAndPage", ProjectId, page - 1, filter],
      queryFn: () =>
        getDevicesByProjectIdAndPage({ ProjectId, page: page - 1, filter }),
    });
  }
  return { isPending, error, devicesByProjectIdAndPage, count };
}

export function useDevicesByProjectId(ProjectId) {
  const {
    isPending,
    data: { data: devicesByProjectId, count } = {},
    error,
  } = useQuery({
    queryKey: ["devicesByProjectId", ProjectId],
    queryFn: () => getAllDevicesByProjectId({ ProjectId }),
  });
  return { isPending, error, devicesByProjectId, count };
}
