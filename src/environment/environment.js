import { jwtDecode } from "jwt-decode";

export const env = {
  loggedUserId: jwtDecode(localStorage.getItem("userToken")).user,
  baseUrl: "https://linked-posts.routemisr.com",
};
