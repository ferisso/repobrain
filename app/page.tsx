import { GitHub } from "react-feather";

export default function Home() {
  return (
    <main className="flex h-screen flex-col items-center justify-center p-4 bg-zinc-50">
      <form className="max-w-sm w-full rounded-lg h-96 shadow-lg flex flex-col gap-5 p-8 bg-white items-center">
        <h1 className="font-semibold text-lg text-zinc-700">{`{ Repobrain }`}</h1>
        <input type="text" placeholder="Insira o seu email" className="w-full border box-border border-zinc-300 p-2 rounded-lg outline-none focus:border-purple-600" />
        <input type="text" placeholder="Insira a sua senha" className="w-full border box-border border-zinc-300 p-2 rounded-lg outline-none focus:border-purple-600" />
        <button className="w-full p-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-all outlined-none">Entrar</button>
        <p className="text-zinc-400 text-xs">ou</p>
        <button className="w-full p-2 bg-zinc-800 hover:bg-zinc-700 transition-all text-white rounded-lg flex gap-2 justify-center items-center outlined-none">
          <GitHub size={20} />
          Entrar com o Github
        </button>
      </form>
      <p className="mt-4 text-xs text-zinc-500">
        Não possui uma conta?
        <a href="" className="text-purple-600 underline ml-1 hover:text-purple-700 transition-all">
          Cadastre-se aqui
        </a>
      </p>
    </main>
  )
}
