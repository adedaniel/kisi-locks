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

export async function getLocks(params) {
  const data = await kisiClient.get(`/locks`, params);
  return data;
}

export async function getGroupLocks(params) {
  const data = await kisiClient.get("/group_locks", params);
  return data;
}

export async function addGroupLock(params) {
  const data = await kisiClient.post("/group_locks", params);
  return data;
}

export async function removeLockFromGroup(params) {
  const data = await kisiClient.delete(`/group_locks/${params.id}`);
  return data;
}
