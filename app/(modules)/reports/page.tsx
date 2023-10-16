/* eslint-disable react/no-unescaped-entities */
"use client";
import DropdownProjects from "@/components/DropdownProjects";
import BoardService from "@/service/BoardsService";
import { ChartLineDown, FolderDashed, Plus } from "@phosphor-icons/react";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";

export default function Reports() {
  const router = useRouter();
  const params = useSearchParams();
  const [selectedProject, setSelectedProject] = useState<any>(null);
  const {
    data: boards,
    isLoading,
    refetch,
    isFetching,
  } = useQuery(
    "boards",
    async () => {
      if (params.has("project_id")) {
        // return await BoardService.getBoards(params.toString())
        console.log(selectedProject);
      }
    },
    {
      refetchOnMount: true,
      refetchOnWindowFocus: true,
    }
  );

  useEffect(() => {
    refetch();
  }, [params, refetch]);

  return (
    <>
      <div className="flex justify-between items-center">
        <span>
          <h2 className="text-3xl text-zinc-900/80 font-semibold">Reports</h2>
          <p className="text-zinc-500 font-light">
            Here you find your awesome reports
          </p>
        </span>
        <DropdownProjects
          selectedProject={setSelectedProject}
          route={"reports"}
        />
      </div>
      <div className="mt-4 w-full h-full min-h-[400px] flex justify-center items-center flex-col gap-3 border border-dashed text-center p-4 rounded-md">
        {selectedProject ? (
          <>
            <div className="h-16 w-16 rounded-full flex justify-center items-center bg-zinc-100">
              <ChartLineDown size={32} weight="thin" />
            </div>
            <p>No reports avaiable</p>
            <p className="font-light text-xs text-zinc-500">
              When you start to using the plataform your reports will show here
            </p>
          </>
        ) : (
          <>
            <div className="h-16 w-16 rounded-full flex justify-center items-center bg-zinc-100">
              <ChartLineDown size={32} weight="thin" />
            </div>
            <p>Select the project</p>
              <p className="font-light text-xs text-zinc-500 max-w-xs">
               To see a the reports select a project in the top right corner, if you don't have any create a new one
              </p>
          </>
        )}
      </div>
    </>
  );
}
