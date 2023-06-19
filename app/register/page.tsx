'use client'
import Logo from "@/components/Logo";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useRef } from "react";
import { GitHub } from "react-feather";
import { SubmitHandler, useForm } from "react-hook-form";

interface IRegisterForm {
  name: string;
  lastName: string;
  email: string;
  password: string;
  passwordMatch: string;
}

export default function Register() {
  const router = useRouter();
  const signin = async (type: string) => {
    await signIn(type, {
      redirect: true,
    })
  }
  const { register, handleSubmit, watch, formState: { errors } } = useForm<IRegisterForm>();
  const password = useRef({});
  password.current = watch('password')
  const onSubmit: SubmitHandler<IRegisterForm> = data => {
    console.log(data)
  };

  return (
    <div className="flex h-screen flex-col items-center justify-center p-4 bg-zinc-50 font-light">
      <div className="max-w-sm w-full rounded-xl shadow-lg flex flex-col gap-4 px-8 py-10 bg-white items-center">
        <h1 className="font-semibold text-lg text-zinc-700 flex flex-col items-center">
          <Logo height="65" className="mb-2" color="rgb(39, 39, 42)" />
        </h1>
        <form
          className="max-w-sm w-full flex flex-col gap-4"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="w-full">
            <input
              type="text"
              placeholder="Nome"
              className="w-full border box-border border-zinc-300 px-4 py-2 rounded-lg focus:ring-2 focus:ring-teal-500 outline-none"
              {...register("name", { required: 'Campo necessário' })}
            />
            {errors.name && <p className="font-light text-red-500 text-xs ml-2 mt-1">{errors.name.message}</p>}
          </div>
          <div className="w-full">
            <input
              type="text"
              placeholder="Sobrenome"
              className="w-full border box-border border-zinc-300 px-4 py-2 rounded-lg focus:ring-2 focus:ring-teal-500 outline-none"
              {...register("lastName", { required: 'Campo necessário' })}
            />
            {errors.lastName && <p className="font-light text-red-500 text-xs ml-2 mt-1">{errors.lastName.message}</p>}
          </div>
          <div className="w-full">
            <input
              type="text"
              placeholder="Insira o seu email"
              className="w-full border box-border border-zinc-300 px-4 py-2 rounded-lg focus:ring-2 focus:ring-teal-500 outline-none"
              {...register("email", { required: 'Campo necessário', pattern: { value: /^\S+@\S+$/i, message: 'O formato não é válido' } })}
            />
            {errors.email && <p className="font-light text-red-500 text-xs ml-2 mt-1">{errors.email.message}</p>}
          </div>
          <div className="w-full">
            <input
              type="password"
              placeholder="Insira a sua senha"
              className="w-full border box-border border-zinc-300 px-4 py-2 rounded-lg focus:ring-2 focus:ring-teal-500 outline-none"
              {...register("password", { required: 'Campo necessário' })}
            />
            {errors.password && <p className="font-light text-red-500 text-xs ml-2 mt-1">{errors.password.message}</p>}
          </div>
          <div className="w-full">
            <input
              type="password"
              placeholder="Confirme a sua senha"
              className="w-full border box-border border-zinc-300 px-4 py-2 rounded-lg focus:ring-2 focus:ring-teal-500 outline-none"
              {...register("passwordMatch", { required: 'Campo necessário', validate: { isEqual: (v) => v == password.current || 'As senhas não são iguais' } })}
            />
            {errors.passwordMatch && <p className="font-light text-red-500 text-xs ml-2 mt-1">{errors.passwordMatch.message}</p>}
          </div>
          <button
            type="submit"
            className="w-full p-2 h-[42px] bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-all outlined-none text-sm"
          >
            Cadastrar
          </button>
        </form>
        <p className="text-zinc-400 text-xs">ou</p>
        <button
          className="w-full p-2 h-[42px] bg-zinc-800 hover:bg-zinc-700 transition-all text-white rounded-lg flex gap-2 justify-center items-center outlined-none text-sm"
          onClick={() => signin('github')}
        >
          <GitHub size={20} />
          Cadastrar-se com o Github
        </button>
      </div>
      <p className="mt-4 text-xs text-zinc-500">
        Possui uma conta?
        <button
          className="text-teal-600 underline ml-1 hover:text-teal-700 transition-all cursor-pointer"
          onClick={() => router.push('/login')}
        >
          Logar aqui
        </button>
      </p>
    </div>
  )
}