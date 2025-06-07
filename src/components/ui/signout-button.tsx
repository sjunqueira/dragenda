"use client";

import { useRouter } from "next/navigation";

import { authClient } from "@/lib/auth-client";

import { Button } from "./button";

const SignOutButton = () => {
  const router = useRouter();

  return (
    <Button
      onClick={() =>
        authClient.signOut({
          fetchOptions: {
            onSuccess: () => {
              router.push("/login");
            },
          },
        })
      }
    >
      Sair
    </Button>
  );
};

export default SignOutButton;
