"use server";

import { cookies } from "next/headers";

// Function to set a cookie
export async function setUserCookie(userData) {
  const { username } = userData;
  console.log("Ckkoie data: ", username);

  cookies().set({
    name: "user",
    value: JSON.stringify({ username }),
    maxAge: 60,
  });

  console.log("User cookie set successfully");
}

export async function getUserFromCookie() {
  const cookieStore = cookies();
  const userCookie = cookieStore.get("user");
  if (userCookie) {
    try {
      return JSON.parse(userCookie.value); // Parse the cookie value to retrieve the user
    } catch (error) {
      console.error("Failed to parse user cookie", error);
    }
  }

  return null;
}
