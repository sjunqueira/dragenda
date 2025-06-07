"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { GalleryVerticalEnd } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import LoginForm from "@/app/login/components/login-form";
import RegisterForm from "@/app/login/components/register-form";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { authClient } from "@/lib/auth-client";

const loginSchema = z.object({
  name: z.string().trim().min(2, { message: "Nome é obrigatório" }),
  email: z
    .string()
    .trim()
    .min(1, { message: "Email é obrigatório" })
    .email({ message: "Email inválido" }),
  password: z.string().trim().min(6, { message: "A senha é obrigatória" }),
  passwordConfirm: z
    .string()
    .trim()
    .min(6, { message: "A senha é obrigatória" }),
});

export default function AuthenticationPage() {
  // const [tab, setTab] = useState("account");
  const [tab, setTab] = useState<"account" | "register">("account");
  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const session = authClient.useSession();
  const router = useRouter();

  useEffect(() => {
    if (session.data?.user) {
      router.push("/dashboard");
    }
  }, [session, router]);

  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex justify-center gap-2 md:justify-start">
          <a href="#" className="flex items-center gap-2 font-medium">
            <div className="bg-primary text-primary-foreground flex size-6 items-center justify-center rounded-md">
              <GalleryVerticalEnd className="size-4" />
            </div>
            Dr. Consulta
          </a>
        </div>
        <div className="flex h-10/12 flex-1 items-center justify-center">
          <div className="w-full max-w-xs">
            <Tabs
              value={tab}
              onValueChange={(value) => {
                setTab(value as "account" | "register");
                form.reset();
              }}
              defaultValue="account"
              className="w-[400px]"
            >
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="account">Login</TabsTrigger>
                <TabsTrigger value="register">Criar nova conta</TabsTrigger>
              </TabsList>
              {/* TAB DE LOGIN */}
              {tab === "account" && <LoginForm setTab={setTab} />}
              {/* <LoginForm /> */}
              {/* TAB DE REGISTRO */}
              <RegisterForm />
            </Tabs>
          </div>
        </div>
      </div>
      <div className="bg-muted relative hidden lg:block">
        <Image
          src="/Dashboard.png"
          alt="Image"
          width={1920}
          height={1080}
          className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
        />
      </div>
    </div>
  );
}
