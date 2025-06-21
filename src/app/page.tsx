import Image from "next/image";
import Link from "next/link";

export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-start bg-white px-6 py-12">
      {/* Header */}
      <header className="mb-12 flex w-full max-w-5xl items-center justify-between">
        <Image src="/Logo.svg" alt="Logo Dr.Agenda" width={150} height={50} />

        <Link
          href="/login"
          className="rounded-md bg-blue-600 px-4 py-2 text-white transition hover:bg-blue-700"
        >
          Ir para Login
        </Link>
      </header>

      {/* Conteúdo principal */}
      <section className="w-full max-w-4xl space-y-6 text-center">
        <h1 className="text-3xl font-bold">Dr.Agenda</h1>
        <p className="text-lg text-gray-700">
          Esta é uma aplicação de testes. Não deve ser utilizada no mundo real.
        </p>
        <p className="text-lg text-gray-700">
          A aplicação ainda está em desenvolvimento e apresenta bugs. O login
          Social está temporariamente desabilitado, e caso queira testar a
          aplicação, pode usar as seguintes credenciais:
        </p>
        <div className="font-bold">
          <p>Email: admin@mail.com</p>
          <p>Senha: 123456789</p>
        </div>

        <div className="mt-8 overflow-hidden rounded-lg border shadow">
          <Image
            src="/Dashboard.png"
            alt="Exemplo da aplicação"
            width={1024}
            height={600}
            className="h-auto w-full"
          />
        </div>
      </section>
    </main>
  );
}
