/* eslint-disable react/no-unescaped-entities */
"use client";
import DropdownProjects from "@/components/DropdownProjects";
import BoardService from "@/service/BoardsService";
import GitHubAPIService from "@/service/GitHubAPIService";
import { ChartLineDown, FolderDashed, Plus } from "@phosphor-icons/react";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  LineElement,
  PointElement,
} from 'chart.js';
import { Bar, Line } from 'react-chartjs-2';
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);;

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
      if (params.has("project_id") || selectedProject) {
        getReports();
      }
    },
    {
      refetchOnMount: true,
      refetchOnWindowFocus: false,
    }
  );

  useEffect(() => {
    refetch();
  }, [params, refetch]);


  const [contributors, setContributors] = useState<any[]>([])
  const [commits, setCommits] = useState<any[]>([])
  const [files, setFiles] = useState<any>(null)
  const [comparisson, setComparisson] = useState<any>([])
  const [additions, setAdditions] = useState<any>(0)
  const [deletions, setDeletions] = useState<any>(0)
  const [lastYearCommits, setLastYearCommits] = useState<any>([])

  const getReports = async () => {
    setContributors([]);
    setCommits([]);
    setFiles(null);
    setComparisson([]);
    setAdditions(0);
    setDeletions(0)
    setLastYearCommits([])


    const contributorsApi = await GitHubAPIService.GetRepoContributions(
      selectedProject
    )
    setContributors(contributorsApi);

    const commitsApi = await GitHubAPIService.GetRepoCommits(
      selectedProject,
    )
    setCommits(commitsApi)

    const filesApi = await GitHubAPIService.GetRepoFilesLength(
      selectedProject
    )
    let sum = 0
    filesApi?.forEach((x: any) => {
      sum += x?.size
    })
    setFiles(sum)
    
    // console.log('files',files);
    // console.log('commits', commits);
    // console.log('contributors', contributors)

    let compare = await GitHubAPIService.GetRepoComparisson(
      selectedProject,
      commitsApi[commitsApi.length-1]?.sha,
      commitsApi[0]?.sha
    )
    setComparisson(compare)
    console.log('comparisson', comparisson)

    compare?.files?.forEach((x: any) => {
      setAdditions((curr: any) => curr + x.additions);
      setDeletions((curr: any) => curr + x.deletions);
    });

    let lastYearCommitsApi = await GitHubAPIService.GetContributorsCommits(selectedProject);
    setLastYearCommits(lastYearCommitsApi)
    buildContributorsChart()
  };

  const buildContributorsChart = () => {

    const today = new Date();
    let lastWeeks = [];

    for (let i = 0; i < lastYearCommits[0]?.weeks.length; i++) {
      const date = new Date(today);
      date.setDate(date.getDate() - i * 7); 

      const day = date.getDate(); 
      const month = date.getMonth() + 1; 
      const year = date.getFullYear(); 

      lastWeeks.push(`${year}-${month}-${day}`);
    }
    lastWeeks = lastWeeks.reverse();

    const chartColors = [
      'rgba(255, 99, 132)',
      'rgba(54, 162, 235)',
      'rgba(255, 206, 86)',
      'rgba(75, 192, 192)',
      'rgba(153, 102, 255)',
      'rgba(255, 159, 64)',
    ]

    let data = {
      labels: lastWeeks,
      datasets: lastYearCommits.map((x: any, i:number) => {
        return{
          label: x?.author?.login,
          backgroundColor: chartColors[i],
          borderColor: chartColors[i],
          data: x?.weeks?.map((w: any) => {return w.c})
        }
      })
    }

    const options = {
      responsive: true,
      plugins: {
        legend: {
          position: 'top' as const,
        },
        title: {
          display: true,
          text: 'Chart.js Line Chart',
        },
      },
    };
    
    return {data, options}
  }

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
            {lastYearCommits.length && <Line options={buildContributorsChart().options} data={buildContributorsChart().data} />}
            <p>
              Excluding merges, {contributors.length} authors have pushed {commits.length} commits to main. On the main branch, we have {files} bytes in files, and there
              have been {additions} additions and {deletions} deletions.
            </p>
          </>
        ) : (
          <>
            <div className="h-16 w-16 rounded-full flex justify-center items-center bg-zinc-100">
              <ChartLineDown size={32} weight="thin" />
            </div>
            <p>Select the project</p>
            <p className="font-light text-xs text-zinc-500 max-w-xs">
              To see a the reports select a project in the top right corner, if
              you don't have any create a new one
            </p>
          </>
        )}
      </div>
    </>
  );
}
