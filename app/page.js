import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center max-sm:items-start">
        <header>
          <h2>Welcome to next js auth using Cookies</h2>
        </header>
        <Link href={"/sign-in"} className="bg-blue-700 py-2 px-4 rounded-md">
          Sign up
        </Link>
      </main>
    </div>
  );
}
