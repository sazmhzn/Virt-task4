"use server";

import { cookies } from "next/headers";

const usersList = [
  { username: "admin", password: "admin123" },
  { username: "user1", password: "password1" },
  { username: "user2", password: "password2" },
];

export async function authenticateUser(username, password) {
  const user = usersList.find(
    (item) => item.username === username && item.password === password
  );
  return user ? true : false;
}

// Function to set a cookie
export async function setUserCookie(userData) {
  // You can destructure and get specific data from userData if needed
  const { username } = userData;

  // Set the cookie for the username
  cookies().set({
    name: "user",
    value: JSON.stringify({ username }), // Store username as JSON string
    httpOnly: true,
    path: "/",
    sameSite: "strict", // Helps to protect against CSRF attacks
    maxAge: 60 * 60 * 24 * 7, // Cookie expiry (1 week)
  });

  console.log("User cookie set successfully");
}

export async function getUserFromCookie() {
  const cookieStore = cookies();
  const userCookie = cookieStore.get("user");

  if (userCookie) {
    return JSON.parse(userCookie.value); // Parse the cookie value to retrieve the user
  }

  return null; // No user found
}
