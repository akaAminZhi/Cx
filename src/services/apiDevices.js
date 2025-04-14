import supabase from "./supabase";
import { PAGE_SIZE } from "../utils/constans";
import { addDays, endOfISOWeek, startOfISOWeek, subDays } from "date-fns";
import { getStartOfThisWeek } from "../utils/helpers";

export async function getDevices() {
  const { data, error } = await supabase.from("devices").select("*");
  if (error) {
    console.error(error);
    throw new Error("Deviced can not be loaded");
  }
  return data;
}

export async function getDevicesByProjectIdAndPage({
  ProjectId,
  page,
  filter,
}) {
  let query = supabase
    .from("devices")
    .select("*", { count: "exact" })
    .eq("project_id", ProjectId)
    .order("id", { ascending: false });
  // const queryDate = addDays(new Date(), 10).toISOString();
  // console.log(queryDate);
  // console.log(getStartOfThisWeek());
  // console.log(endOfISOWeek(new Date()));
  // FILTER
  if (filter) {
    if (filter.value === "energized")
      query = query[filter.method || "eq"]("energized", true);
    if (filter.value === "PFPT")
      query = query[filter.method || "eq"]("PFPT", true);
    if (filter.value === "not_energized")
      query = query[filter.method || "eq"]("energized", false);
    if (filter.value === "task_this_week") {
      const today = new Date();
      const start = startOfISOWeek(today).toISOString();
      const end = endOfISOWeek(today).toISOString();
      query = query.or(
        `and(estimated_time_of_enegized.gte.${start},estimated_time_of_enegized.lte.${end}),and(estimated_time_of_PFPT.gte.${start},estimated_time_of_PFPT.lte.${end})`
      );
      // query = query
      //   .gte("estimated_time_of_enegized", start)
      //   .lte("estimated_time_of_enegized", end);
    }
  }
  if (page) {
    const from = (page - 1) * PAGE_SIZE;
    const to = from + PAGE_SIZE - 1;
    query = query.range(from, to);
  }
  const { data, error, count } = await query;
  if (error) {
    console.error(error);
    throw new Error("Device By projectId can not be loaded");
  }
  return { data, count };
}

export async function updateDevice(id, obj) {
  const { data, error } = await supabase
    .from("devices")
    .update(obj)
    .eq("id", id)
    .select()
    .single();

  if (error) {
    console.error(error);
    throw new Error("Device could not be updated");
  }
  return data;
}

export async function getAllDevicesByProjectId({ ProjectId }) {
  let query = supabase
    .from("devices")
    .select("*", { count: "exact" })
    .eq("project_id", ProjectId);

  const { data, error, count } = await query;
  if (error) {
    console.error(error);
    throw new Error("Device By projectId can not be loaded");
  }
  return { data, count };
}

export async function upsertDevices(cleanData) {
  // console.log(cleanData);
  const { data, error } = await supabase.from("devices").upsert(cleanData, {
    onConflict: "id", // change this to your primary key
    ignoreDuplicates: false,
  });

  if (error) {
    console.error(error);
    throw new Error("upsert failed");
  }
  return data;
}
