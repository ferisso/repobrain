'use client'

import { useState } from "react"

export default function Settings() {
  const [isEditing, setIsEditing] = useState(false)
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
      <div className="mt-4 w-full h-full min-h-[400px] flex justify-center items-center flex-col gap-3 border text-center p-4 rounded-md">

      </div>
    </>
  )
}