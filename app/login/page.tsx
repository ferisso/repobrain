'use client'
import Logo from "@/components/Logo";
import { useRouter } from "next/navigation";
import { GitHub } from "react-feather";
import { signIn, useSession } from 'next-auth/react'
import { toast } from "react-toastify";
import { SubmitHandler, useForm } from "react-hook-form";
import { useState } from "react";
import { SpinnerGap } from "@phosphor-icons/react";

interface ILoginForm {
  email: string;
  password: string;
}

export default function Login() {
  const router = useRouter();
  const { data } = useSession();
  const [loadingCredentials, setLoadingCredentials] = useState(false)
  const [loadingGithub, setLoadingGithub] = useState(false)

  const { register, handleSubmit, formState: { errors } } = useForm<ILoginForm>();

  const onSubmit: SubmitHandler<ILoginForm> = (data, a) => {
    signin('credentials', data);
  }

  const signin = async (type: string, data?: ILoginForm) => {
    if (type === "credentials") {
      setLoadingCredentials(true);
    }

    if (type === "github") {
      setLoadingGithub(true);
    }

    const res = await signIn(type, {
      redirect: false,
      email: data?.email,
      password: data?.password
    });

    if (res?.error) {
      if (res.error !== "SessionRequired") {
        toast.error("Usuário ou senha inválidos")
      }
      setLoadingCredentials(false);
      setLoadingGithub(false);
    }
  }

  if (data) {
    if (!!window.location.search) {
      const urlPattern = /callbackUrl=([^&]+)/;
      const match = window.location.search.match(urlPattern);
      if (match) {
        const decodedUrl = decodeURIComponent(match[1]);
        router.push(decodedUrl)
        return
      }
    }
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
              placeholder="Insert your email address"
              className="w-full border box-border border-zinc-300 px-4 py-2 rounded-lg focus:ring-2 focus:ring-teal-500 outline-none"
              {...register("email", { required: 'Please insert your email', pattern: { value: /^\S+@\S+$/i, message: 'Not a valid email format' } })}
            />
            {errors.email && <p className="font-light text-red-500 text-xs ml-2 mt-1">{errors.email.message}</p>}
          </div>
          <div className="w-full">
            <input
              type="password"
              placeholder="Insert your password"
              className="w-full border box-border border-zinc-300 px-4 py-2 rounded-lg focus:ring-2 focus:ring-teal-500 outline-none"
              {...register("password", { required: 'Please insert your password' })}
            />
            {errors.password && <p className="font-light text-red-500 text-xs ml-2 mt-1">{errors.password.message}</p>}
          </div>
          <button
            className="w-full p-2 h-[42px] bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-all outlined-none text-sm flex justify-center items-center"
            disabled={loadingGithub || loadingCredentials}
            type="submit"
          >
            {
              loadingCredentials ? <SpinnerGap className="animate-spin" size={20} /> : "Sign in"
            }
          </button>
        </form>
        <p className="text-zinc-400 text-xs">or</p>
        <button
          className="w-full p-2 h-[42px] bg-zinc-800 hover:bg-zinc-700 transition-all text-white rounded-lg flex gap-2 justify-center items-center outlined-none text-sm"
          disabled={loadingGithub || loadingCredentials}
          onClick={() => signin('github')}
        >
          {
            loadingGithub
              ? <SpinnerGap size={20} className="animate-spin" />
              : <>
                <GitHub size={20} />
                Sign in with Github
              </>
          }
        </button>
      </div>
      <p className="mt-4 text-xs text-zinc-500">
        Doesn&apos;t have an account?
        <button
          className="text-teal-600 underline ml-1 hover:text-teal-700 transition-all cursor-pointer"
          onClick={() => router.push('/register')}
        >
          Sign up now
        </button>
      </p>
    </div>
  )
}