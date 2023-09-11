'use client'
import { ReactNode, useEffect, useState } from "react"
import { Dialog, DialogContent, DialogDescription, DialogTitle, DialogFooter, DialogHeader, DialogTrigger } from "./ui/dialog"
import { Plus } from "@phosphor-icons/react"
import { SubmitHandler, useForm } from "react-hook-form";
import { useSession } from "next-auth/react";
import APIService from "@/service/APIService";
import { createTeam } from "@/service/TeamService";

interface ICreateTeam {
  name: string
  description?: string
}

interface DialogCreateTeamsProps {
  children: React.ReactNode,
  refreash?: () => void
}

export default function DialogCreateTeams({ children, refreash }: DialogCreateTeamsProps) {
  const { register, handleSubmit, formState: { errors } } = useForm<ICreateTeam>();

  const onSubmit: SubmitHandler<ICreateTeam> = async (data) => {
    await createTeam(data)
    refreash && refreash()
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
       {children}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Creating team</DialogTitle>
          <DialogDescription>
            Please insert the team information
          </DialogDescription>
        </DialogHeader>

        <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col w-full gap-1">
            <input
              placeholder="Name"
              className="w-full border px-4 py-2 rounded-md outline-none focus:border-teal-500"
              {...register("name", { required: 'Please insert a name' })}
            />
            <span className="text-xs text-red-500 px-2">
              {errors.name?.message}
            </span>
          </div>
          <input
            placeholder="Description (optional)"
            className="w-full border px-4 py-2 rounded-md outline-none focus:border-teal-500"
            {...register("description")}
          />
        </form>

        <DialogFooter>
          <button
            className="text-white bg-teal-500 p-3 rounded-md text-xs"
            onClick={handleSubmit(onSubmit)}
          >
            Create Team
          </button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}