import AXIOS_API from "@/utils/axiosAPI";

export async function getAllCompanyUsers() {
  const { data } = await AXIOS_API.get("/admin/companies");
  return data;
}