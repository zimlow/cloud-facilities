"use client";
import { useRouter } from "next/navigation";

export default function CancelButton() {
  const router = useRouter();

  return <button onClick={() => router.back()}>Cancel</button>;
}
