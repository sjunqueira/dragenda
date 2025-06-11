import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { redirect } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { TabsContent } from "@/components/ui/tabs";
import { authClient } from "@/lib/auth-client";

import { PasswordInput } from "../../../components/password-input";
import { Card, CardContent } from "../../../components/ui/card";
import SocialLogin from "./social-login";

const RegisterSchema = z.object({
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

export default function RegisterForm() {
  const form = useForm<z.infer<typeof RegisterSchema>>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      passwordConfirm: "",
    },
  });

  async function onSubmit(values: z.infer<typeof RegisterSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
    if (values.password == values.passwordConfirm) {
      await authClient.signUp.email(
        {
          email: values.email,
          password: values.password,
          name: values.name, // User image URL (optional)
          callbackURL: "/dashboard", // A URL to redirect to after the user verifies their email (optional)
        },
        {
          onSuccess: () => {
            redirect("/dashboard");
            //redirect to the dashboard or sign in page
          },
          onError: (ctx) => {
            console.log(ctx.error);
            if (ctx.error.code == "USER_ALREADY_EXISTS") {
              toast.error("Email já cadastrado");
            }
            if (ctx.error.code == "PASSWORD_TOO_SHORT") {
              toast.error(
                "Senha muito curta, são necessários pelo menos 8 caracteres",
              );
            }
          },
        },
      );
    } else {
      toast.error("As senhas não batem");
    }
  }

  return (
    <TabsContent value="register">
      <Card className="h-1/3">
        <CardContent className="space-y-1">
          {/* <RegisterForm /> */}
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nome completo</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="exemplo@mail.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Senha</FormLabel>
                    <FormControl>
                      <PasswordInput {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="passwordConfirm"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Digite novamente a sua senha</FormLabel>
                    <FormControl>
                      <PasswordInput {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button
                type="submit"
                className="w-full"
                disabled={form.formState.isSubmitting}
              >
                {form.formState.isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Criando...
                  </>
                ) : (
                  "Criar conta"
                )}
              </Button>
            </form>
          </Form>
          <SocialLogin />
        </CardContent>
      </Card>
    </TabsContent>
  );
}
