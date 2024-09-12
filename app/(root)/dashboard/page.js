"use client";

import { getUserFromCookie } from "@/app/actions";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

const Dashboard = () => {
  const router = useRouter();

  useEffect(() => {
    const checkSession = async () => {
      const userCookie = await getUserFromCookie();

      if (userCookie) {
        router.push("/dashboard");
      } else {
        router.push("/sign-in");
      }
    };
    checkSession();
  }, []);

  return <div>Dashboard</div>;
};

export default Dashboard;
