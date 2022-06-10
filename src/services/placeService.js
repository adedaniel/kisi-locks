import Kisi from "kisi-client";

const kisiClient = new Kisi({
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
    Authorization: `KISI-LOGIN ${localStorage.getItem(
      "kisiAuthenticationToken"
    )}`,
  },
});

export async function getPlaces(params) {
  const data = await kisiClient.get("/places", params);
  return data;
}
