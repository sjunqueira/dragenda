"use client";

import { redirect } from "next/navigation";

import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div>
      <Button
        onClick={() => {
          redirect("/login");
        }}
      >
        Eu sou um botão
      </Button>
    </div>
  );
}
