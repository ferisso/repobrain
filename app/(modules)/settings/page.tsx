'use client'
import { useSession } from "next-auth/react"
import Image from "next/image"
import { useState } from "react"

export default function Settings() {
  const [isEditing, setIsEditing] = useState(false)
  const { data } = useSession()
  return (
    <>
      <div className="flex justify-between items-center">
        <span>
          <h2 className="text-3xl text-zinc-900/80 font-semibold">Settings</h2>
          <p className="text-zinc-500 font-light">Manage your account</p>
        </span>
        <span className="flex gap-2">
          <button
            className="flex items-center justify-center gap-1 text-white bg-teal-500 py-2 px-4 rounded-md text-xs outline-none"
            onClick={() => setIsEditing(!isEditing)}
          >
            {isEditing ? 'Save' : 'Edit'}
          </button>
          {
            isEditing && (
              <button
                className="flex items-center justify-center gap-1 text-white bg-red-500 py-2 px-4 rounded-md text-xs outline-none"
                onClick={() => setIsEditing(!isEditing)}
              >
                Cancel
              </button>
            )
          }
        </span>
      </div>
      <div className="mt-4 w-full h-full min-h-[400px] flex flex-col gap-3">
        <div className="grid grid-cols-10">
          <div className="col-span-6 flex flex-col gap-2">
            <label className="text-xs text-zinc-600" htmlFor="">Name</label>
            <input type="text" className="input-themed w-3/4" placeholder="Name" defaultValue={data?.user.name || ''} disabled={!isEditing} />
            <p className="text-xs text-zinc-500">Your name may appear around Repobrain where you contribute or are mentioned. You can remove it at any time.</p>
            <label className="text-xs text-zinc-600" htmlFor="">Email</label>
            <input type="text" className="input-themed w-3/4" placeholder="Email" defaultValue={data?.user.email || ''} disabled={!isEditing}  />
            <p className="text-xs text-zinc-500">This is your email that will show around RepobrainApp</p>
            <a
              className="w-fit text-sm bg-red-500 p-2 mt-4 rounded-md text-red-50 hover:bg-red-600"
              href="https://github.com/apps/repobrainapp"
              target="_blank"
            >
              Revoke App Access
            </a>
          </div>
          <div className="flex col-span-4 items-center flex-col gap-1">
            <div className="h-32 w-32 rounded-full border overflow-hidden mt-4">
              <Image alt="Profile image" src={"https://avatars.githubusercontent.com/u/48661787?v=4"} width={128} height={128} />
            </div>
            <button className="text-xs text-zinc-600 border rounded-md p-1.5">Change photo</button>
          </div>
        </div>
      </div>
    </>
  )
}