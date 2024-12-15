"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  useEffect(() => {
    window.location.href = "/main/product";
  });
  return <div></div>;
}
