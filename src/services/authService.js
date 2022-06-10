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

export async function login({ email, password }) {
  const data = await kisiClient.signIn({
    domain: "test-task",
    email,
    password,
  });

  localStorage.setItem("kisiAuthenticationToken", data.authenticationToken);
  return data;
}

export async function getCurrentUser() {
  const data = await kisiClient.get("/user");
  return data;
}
