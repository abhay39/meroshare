"use client"
import { useRouter } from "next/navigation";

export default function Home() {
  const router=useRouter();

  return (
    <main className="">
      {
        router.push("/login")
      }
    </main>
  );
}
