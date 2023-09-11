'use client'
import { useEffect, useState } from "react"
import { Dialog, DialogContent, DialogDescription, DialogTitle, DialogFooter, DialogHeader, DialogTrigger } from "./ui/dialog"
import { useSession } from "next-auth/react"
import { Check } from "react-feather"

interface DialogCreateProjectProps {
  children: React.ReactNode;
}

export default function DialogCreateProject({ children }: DialogCreateProjectProps) {
  const [repos, setRepos] = useState<Array<any>>()
  const [selectedRepo, setSelectedRepo] = useState<any>()
  const session = useSession()

  const getRepos = async () => {
    const accessToken = session.data?.user.access_token
    const response = await fetch("https://api.github.com/user/repos", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (response.ok) {
      const repositories = await response.json();
      setRepos(repositories)
    } else {
      throw new Error("Failed to fetch user repositories");
    }
  }

  useEffect(() => {
    getRepos()
  }, [])

  return (
    <Dialog>
      <DialogTrigger asChild>
        { children }
      </DialogTrigger>
      <DialogContent className="sm:max-w-[625px]">
        <DialogHeader>
          <DialogTitle>Adding boards</DialogTitle>
          <DialogDescription>
            Please select the desire repository
          </DialogDescription>
        </DialogHeader>

        <div className="w-full max-h-52 border rounded-sm overflow-y-auto">
          {
            repos?.map(item => {
              return (
                <div
                  key={item.id}
                  className="px-4 py-2 border-b cursor-pointer hover:bg-zinc-100 flex justify-between items-center"
                  onClick={() => setSelectedRepo(item)}
                >
                  <span>
                    {item.name}
                    <span className="ml-2 text-xs text-zinc-400">
                      {item.full_name}
                    </span>
                  </span>
                  {
                    selectedRepo?.id == item.id &&
                    <Check size={18} />
                  }
                </div>
              )
            })
          }
        </div>

        <DialogFooter>
          <button
            className="text-white bg-teal-500 py-2 px-4 rounded-md text-xs"
          >
            Save changes
          </button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}