'use client'
import Logo from "@/components/Logo";
import HandleLoginService from "@/service/HandleLoginService";
import createUser from "@/service/HandleRegisterService";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useRef } from "react";
import { GitHub } from "react-feather";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";

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
    const registerInfo = {
      name: `${data.name} ${data.lastName}`,
      email: data.email,
      password: data.password
    }
    createUser(registerInfo)
    .then((res) => {
      if (res.status == 201) {
        toast.success('Usuário criado com sucesso')
        router.push('/login')
        setTimeout(() => {
          toast.info('Faça login para continuar')
        }, 500)
      }
    })
    .catch(err => toast.error(err))
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
              placeholder="First name"
              className="w-full border box-border border-zinc-300 px-4 py-2 rounded-lg focus:ring-2 focus:ring-teal-500 outline-none"
              {...register("name", { required: 'This field is required' })}
            />
            {errors.name && <p className="font-light text-red-500 text-xs ml-2 mt-1">{errors.name.message}</p>}
          </div>
          <div className="w-full">
            <input
              type="text"
              placeholder="Last name"
              className="w-full border box-border border-zinc-300 px-4 py-2 rounded-lg focus:ring-2 focus:ring-teal-500 outline-none"
              {...register("lastName", { required: 'This field is required' })}
            />
            {errors.lastName && <p className="font-light text-red-500 text-xs ml-2 mt-1">{errors.lastName.message}</p>}
          </div>
          <div className="w-full">
            <input
              type="text"
              placeholder="Insert an email"
              className="w-full border box-border border-zinc-300 px-4 py-2 rounded-lg focus:ring-2 focus:ring-teal-500 outline-none"
              {...register("email", { required: 'This field is required', pattern: { value: /^\S+@\S+$/i, message: 'Not a valid email format' } })}
            />
            {errors.email && <p className="font-light text-red-500 text-xs ml-2 mt-1">{errors.email.message}</p>}
          </div>
          <div className="w-full">
            <input
              type="password"
              placeholder="Insert your password"
              className="w-full border box-border border-zinc-300 px-4 py-2 rounded-lg focus:ring-2 focus:ring-teal-500 outline-none"
              {...register("password", { required: 'This field is required' })}
            />
            {errors.password && <p className="font-light text-red-500 text-xs ml-2 mt-1">{errors.password.message}</p>}
          </div>
          <div className="w-full">
            <input
              type="password"
              placeholder="Confirm your password"
              className="w-full border box-border border-zinc-300 px-4 py-2 rounded-lg focus:ring-2 focus:ring-teal-500 outline-none"
              {...register("passwordMatch", { required: 'This field is required', validate: { isEqual: (v) => v == password.current || `The passwords don't match` } })}
            />
            {errors.passwordMatch && <p className="font-light text-red-500 text-xs ml-2 mt-1">{errors.passwordMatch.message}</p>}
          </div>
          <button
            type="submit"
            className="w-full p-2 h-[42px] bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-all outlined-none text-sm"
          >
            Sign up
          </button>
        </form>
        <p className="text-zinc-400 text-xs">or</p>
        <button
          className="w-full p-2 h-[42px] bg-zinc-800 hover:bg-zinc-700 transition-all text-white rounded-lg flex gap-2 justify-center items-center outlined-none text-sm"
          onClick={() => signin('github')}
        >
          <GitHub size={20} />
          Sign up with Github
        </button>
      </div>
      <p className="mt-4 text-xs text-zinc-500">
        Already have an account
        <button
          className="text-teal-600 underline ml-1 hover:text-teal-700 transition-all cursor-pointer"
          onClick={() => router.push('/login')}
        >
          Sign in here
        </button>
      </p>
    </div>
  )
}