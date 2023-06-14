'use client'
import Logo from "@/components/Logo";
import { useRouter } from "next/navigation";
import { GitHub } from "react-feather";

export default function Login() {
  const router = useRouter();
  return (
    <div className="flex h-screen flex-col items-center justify-center p-4 bg-zinc-50 font-light">
      <form className="max-w-sm w-full rounded-xl shadow-lg flex flex-col gap-4 px-8 py-10 bg-white items-center">
        <Logo height="65" className="mb-2" color="rgb(39, 39, 42)" />
        <input type="text" placeholder="Insira o seu email" className="w-full border box-border border-zinc-300 px-4 py-2 rounded-lg focus:ring-2 focus:ring-teal-500 outline-none" />
        <input type="password" placeholder="Insira a sua senha" className="w-full border box-border border-zinc-300 px-4 py-2 rounded-lg focus:ring-2 focus:ring-teal-500 outline-none" />
        <button className="w-full p-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-all outlined-none text-sm">Entrar</button>
        <p className="text-zinc-400 text-xs">ou</p>
        <button className="w-full p-2 bg-zinc-800 hover:bg-zinc-700 transition-all text-white rounded-lg flex gap-2 justify-center items-center outlined-none text-sm">
          <GitHub size={20} />
          Entrar com o Github
        </button>
      </form>
      <p className="mt-4 text-xs text-zinc-500">
        Não possui uma conta?
        <button
          className="text-teal-600 underline ml-1 hover:text-teal-700 transition-all cursor-pointer"
          onClick={() => router.push('/register')}
        >
          Cadastre-se aqui
        </button>
      </p>
    </div>
  )
}