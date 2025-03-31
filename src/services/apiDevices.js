import supabase from "./supabase";
export async function getDevices() {
  const { data, error } = await supabase.from("devices").select("*");
  if (error) {
    console.error(error);
    throw new Error("Deviced can not be loaded");
  }
  return data;
}

export async function getDevicesByProjectId({ ProjectId }) {
  const { data, error } = await supabase
    .from("devices")
    .select("*")
    .eq("project_id", ProjectId);
  if (error) {
    console.error(error);
    throw new Error("Device By projectId can not be loaded");
  }
  return data;
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
