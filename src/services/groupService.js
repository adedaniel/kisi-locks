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

export async function getGroups(params) {
  const data = await kisiClient.get("/groups", params);
  return data;
}

export async function getGroupById(params) {
  const data = await kisiClient.get(`/groups/${params.id}`);
  return data;
}
