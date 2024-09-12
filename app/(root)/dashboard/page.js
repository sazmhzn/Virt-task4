"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getUserFromCookie } from "@/app/actions"; // Adjust import based on your file structure

const Dashboard = () => {
  const router = useRouter();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const checkSession = async () => {
      const userCookie = await getUserFromCookie();

      if (userCookie) {
        setUser(userCookie); // Set user info in state
      } else {
        router.push("/sign-in");
      }
    };
    checkSession();
  }, [router]);

  return (
    <div className="grid place-content-center min-h-screen">
      <header>{user ? "Dashboard" : "Loading..."}</header>
    </div>
  );
};

export default Dashboard;
