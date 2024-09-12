"use client";

import { getUserFromCookie, setUserCookie } from "@/app/actions";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const usersList = [
  { username: "admin", password: "admin123" },
  { username: "user1", password: "password1" },
  { username: "user2", password: "password2" },
];

const SignIn = () => {
  const router = useRouter();

  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [errorMessage, setErrorMessage] = useState();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { username, password } = formData;

    if (authenticateUser(username, password)) {
      await setUserCookie(username);
      router.push("/dashboard");
    } else {
      setErrorMessage("Invalid username or password");
    }
  };

  function authenticateUser(username, password) {
    if (username === "" || password === "") return false;

    const user = usersList.find(
      (item) => item.username === username && item.password === password
    );

    return user ? true : false;
  }

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

  return (
    <div className="bg-slate-100 min-h-screen text-neutral-800 grid place-content-center">
      <section className="bg-white p-4 rounded-md">
        <header className="mb-4">
          <h2 className="text-xl font-bold mb-1"> Sign in </h2>
          <p className="font-medium">Enter your details to sign in </p>
        </header>
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <div className="flex flex-col gap-2">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              name="username"
              onChange={handleChange}
              className="py-2 px-4 w-72 border-[1px] rounded-md border-slate-400"
            />
          </div>

          <div className="flex flex-col gap-2">
            {" "}
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              onChange={handleChange}
              className="py-2 px-4 w-72 border-[1px] rounded-md border-slate-400"
            />{" "}
          </div>

          {/* <Link href={""}> */}
          <button
            type="submit"
            className="bg-slate-800 text-white w-full p-2 rounded-md"
          >
            Sign in
          </button>
          {/* </Link> */}
        </form>
        {/* <div className="mt-4 text-center">
          <p className="text-sm">
            Don't have an account?{" "}
            <Link href="/sign-up" className="text-blue-600 underline">
              Sign up here
            </Link>
          </p>
        </div> */}
      </section>
    </div>
  );
};

export default SignIn;
