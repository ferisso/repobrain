'use client'
import Logo from "@/components/Logo";
import { useRouter } from "next/navigation";
import { GitHub } from "react-feather";
import { signIn, useSession } from 'next-auth/react'
import { toast } from "react-toastify";
import { SubmitHandler, useForm } from "react-hook-form";

interface ILoginForm {
  email: string;
  password: string;
}

export default function Login() {
  const router = useRouter();
  const { data } = useSession();

  const { register, handleSubmit, formState: { errors } } = useForm<ILoginForm>();

  const onSubmit: SubmitHandler<ILoginForm> = (data, a) => {
    console.log(data);
    toast.error("Usuário ou senha inválidos")
  }

  const signin = async (type: string) => {
    await signIn(type, {
      redirect: true,
    })
  }

  if (data) {
    router.push('/boards')
  }

  return (
    <div className="flex h-screen flex-col items-center justify-center p-4 bg-zinc-50 font-light">
      <div className="max-w-sm w-full rounded-xl shadow-lg flex flex-col gap-4 px-8 py-10 bg-white items-center">
        <Logo height="65" className="mb-2" color="rgb(39, 39, 42)" />
        <form
          className="max-w-sm w-full flex flex-col gap-4"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="w-full">
            <input
              type="text"
              placeholder="Insira o seu e-mail"
              className="w-full border box-border border-zinc-300 px-4 py-2 rounded-lg focus:ring-2 focus:ring-teal-500 outline-none"
              {...register("email", { required: 'Por favor insira o e-mail', pattern: { value: /^\S+@\S+$/i, message: 'O formato não é válido' } })}
            />
            {errors.email && <p className="font-light text-red-500 text-xs ml-2 mt-1">{errors.email.message}</p>}
          </div>
          <div className="w-full">
            <input
              type="password"
              placeholder="Insira a sua senha"
              className="w-full border box-border border-zinc-300 px-4 py-2 rounded-lg focus:ring-2 focus:ring-teal-500 outline-none"
              {...register("password", { required: 'Por favor insira a sua senha' })}
            />
            {errors.password && <p className="font-light text-red-500 text-xs ml-2 mt-1">{errors.password.message}</p>}
          </div>
          <button
            className="w-full p-2 h-[42px] bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-all outlined-none text-sm"
            type="submit"
          >
            Entrar
          </button>
        </form>
        <p className="text-zinc-400 text-xs">ou</p>
        <button
          className="w-full p-2 h-[42px] bg-zinc-800 hover:bg-zinc-700 transition-all text-white rounded-lg flex gap-2 justify-center items-center outlined-none text-sm"
          onClick={() => signin('github')}
        >
          <GitHub size={20} />
          Entrar com o Github
        </button>
      </div>
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