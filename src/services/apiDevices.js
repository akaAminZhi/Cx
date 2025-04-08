import supabase from "./supabase";
import { PAGE_SIZE } from "../utils/constans";

export async function getDevices() {
  const { data, error } = await supabase.from("devices").select("*");
  if (error) {
    console.error(error);
    throw new Error("Deviced can not be loaded");
  }
  return data;
}

export async function getDevicesByProjectIdAndPage({ ProjectId, page }) {
  let query = supabase
    .from("devices")
    .select("*", { count: "exact" })
    .eq("project_id", ProjectId)
    .order("id", { ascending: false });

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
