import axios from "axios";
import { getUserData } from "../../utils/loaders";
import { env } from "../../environment/environment";

export async function handelSignIn(info, navigate) {
  try {
    const { data } = await axios.post("https://linked-posts.routemisr.com/users/signin", info, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    console.log(data.token);
    localStorage.setItem("userToken", data.token);
    const userDataRes = await getUserData();
    localStorage.setItem("user_data", JSON.stringify(userDataRes.user));
    env.loggedUserData = userDataRes.user;
    navigate("/home");
    return data;
  } catch (error) {
    console.error("Axios error:", error.response || error.message);
    return error.response?.data || { message: "Something went wrong" };
  }
}
