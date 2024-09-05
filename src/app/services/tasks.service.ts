import ApiService from "./ApiService";

export async function getHotels(params) {
  return ApiService.fetchData({
    url: "/recruiting/hotels",
    method: "get",
    params,
  });
}
