/* eslint-disable react/no-unescaped-entities */
"use client";
import DropdownProjects from "@/components/DropdownProjects";
import BoardService from "@/service/BoardsService";
import GitHubAPIService from "@/service/GitHubAPIService";
import { ChartLineDown, FolderDashed, Plus, File, FilePdf } from "@phosphor-icons/react";
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
import AvatarCard from "@/components/AvatarCard";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  BarElement,
);

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
      if (params.has("project_id") && selectedProject) {
        getReports();
      }
    },
    {
      refetchOnMount: false,
      refetchOnWindowFocus: false,
    }
  );

  useEffect(() => {
    refetch();
  }, [params, refetch, selectedProject]);


  const [contributors, setContributors] = useState<any[]>([])
  const [commits, setCommits] = useState<any[]>([])
  const [files, setFiles] = useState<any>(null)
  const [comparisson, setComparisson] = useState<any>([])
  const [additions, setAdditions] = useState<any>(0)
  const [deletions, setDeletions] = useState<any>(0)
  const [lastYearCommits, setLastYearCommits] = useState<any>([])
  const [lastModifiedFile, setLastModifiedFile] = useState<any>(null)
  const [issues, setIssues] = useState<any>([])

  const getReports = async () => {
    setContributors([]);
    setCommits([]);
    setFiles(null);
    setComparisson([]);
    setAdditions(0);
    setDeletions(0)
    setLastYearCommits([])
    setLastModifiedFile(null)
    setIssues([])


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

    let compare = await GitHubAPIService.GetRepoComparisson(
      selectedProject,
      commitsApi[commitsApi.length - 1]?.sha,
      commitsApi[0]?.sha
    )
    setComparisson(compare)

    compare?.files?.forEach((x: any) => {
      setAdditions((curr: any) => curr + x.additions);
      setDeletions((curr: any) => curr + x.deletions);
    });

    let lastYearCommitsApi = await GitHubAPIService.GetContributorsCommits(selectedProject);
    setLastYearCommits(lastYearCommitsApi)
    buildContributorsChart();

    let lastModifiedFileApi = await GitHubAPIService.GetLastModifiedFile(selectedProject, commitsApi[0]?.sha);
    setLastModifiedFile(lastModifiedFileApi)

    let issuesApi = await GitHubAPIService.GetRepoIssues(selectedProject);
    setIssues(issuesApi)
    buildIssuesChart();
  };

  const buildIssuesChart = () => {
    const dataMap: any = new Map();

    issues.forEach((item: any) => {
      const assignee = item?.assignee?.login ? item?.assignee?.login : 'Unassigned';
      const state = item.state;

      if (!dataMap.has(assignee)) {
        dataMap.set(assignee, { open: 0, closed: 0 });
      }

      dataMap.get(assignee)[state]++;
    });

    const labels = [...dataMap.keys()];
    const openData = labels.map(assignee => dataMap.get(assignee).open);
    const closedData = labels.map(assignee => dataMap.get(assignee).closed);

    let data = {
      labels: labels,
      datasets: [
        {
          label: 'Open',
          data: openData,
          backgroundColor: 'rgba(75, 192, 192)',
          borderColor: 'rgba(75, 192, 192)'
        },
        {
          label: 'Closed',
          data: closedData,
          backgroundColor: 'rgba(153, 102, 255)',
          borderColor: 'rgba(153, 102, 255)'
        },
      ],
    }

    console.log(data)

    let options = {
      indexAxis: 'y' as const,
      responsive: true,
      plugins: {
        legend: {
          position: 'right' as const,
        },
        title: {
          display: false,
        },
      }
    };

    return { data, options }
  }

  const buildContributorsChart = () => {

    if (lastYearCommits.length === 0) return { options: undefined, data: { labels: [], datasets: [] } }

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
      datasets: lastYearCommits?.map((x: any, i: number) => {
        return {
          label: x?.author?.login,
          backgroundColor: chartColors[i],
          borderColor: chartColors[i],
          data: x?.weeks?.map((w: any) => { return w.c })
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
          display: false,
        },
      },
    };

    return { data, options }
  }

  const downloadPDF = () => {
    const input: HTMLElement | null = document.getElementById('print');
    if (input)
      html2canvas(input)
        .then((canvas) => {
          const imgData: string = canvas.toDataURL('image/png');
          const pdf = new jsPDF({ unit: 'px', orientation: "landscape", format: [552, 372] });
          console.log(canvas.height, canvas.width)
          pdf.addImage(imgData, 0, 0, 552, 372);
          pdf.save(`${selectedProject.name}-${new Date().toDateString().replaceAll(' ', '-')}.pdf`);
        })
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
        <div className="flex gap-8">
          {
            selectedProject && <button
              className="flex items-center justify-center gap-1 text-teal-500 border border-teal-500 py-2 px-4 rounded-md text-xs hover:bg-teal-500/5"
              onClick={() => downloadPDF()}>
              <FilePdf size={18} />
              Generate PDF
            </button>
          }
          <DropdownProjects
            selectedProject={setSelectedProject}
            route={"reports"}
          />
        </div>
      </div>
      <div className="mt-4 w-full h-full min-h-[400px] flex justify-center items-center flex-col gap-8 border text-center p-4 rounded-md" id="print">
        {lastYearCommits.length && selectedProject && lastModifiedFile ? (
          <>
            <div className="flex justify-between w-full gap-8">
              <div className="border py-2 px-3 rounded-md w-2/3">
                <span className="font-semibold text-zinc-800 mb-4">Last year commits</span>
                <Line options={buildContributorsChart().options} data={buildContributorsChart().data} />
              </div>
              <div className="flex flex-col w-1/3 gap-8">
                <div className="flex flex-col border rounded-md py-2 px-3">
                  <span className="font-semibold text-zinc-800 mb-4">Total of contributions</span>
                  <div className="flex gap-3 items-center font-light text-md transition-colors py-4 px-5">
                    {contributors.map((c: any) =>
                      <div className="flex flex-col" key={c?.id}>
                        <span className="text-teal-500 font-semibold mb-2">{c.contributions}</span>
                        <AvatarCard user={{ name: c.login, image: c.avatar_url, id: c.id, email: c.email }} />
                      </div>
                    )}
                  </div>
                </div>
                <p className="text-zinc-500 text-sm font-light">
                  Excluding merges,
                  <b className="font-semibold text-zinc-700 mx-1">{contributors.length}</b>
                  authors have pushed
                  <b className="font-semibold text-zinc-700 mx-1">{commits.length}
                  </b> commits to main. On the main branch, we have
                  <b className="font-semibold text-zinc-700 mx-1">{files}</b>
                  bytes in files, and there
                  have been <b className="text-teal-500 font-semibold mx-1">{additions}</b>
                  additions and <b className="text-red-500 font-semibold">{deletions}</b> deletions.
                </p>
              </div>
            </div>
            <div className="flex justify-between w-full gap-8">
              <div className="flex flex-col justify-between border py-2 px-3 rounded-md w-1/2">
                <div className="flex flex-col">
                  <span className="font-semibold text-zinc-800 mb-4">Last modified files</span>
                  <div className="flex flex-col gap-3">
                    {lastModifiedFile?.files?.map((f: any) =>
                      <div className="flex justify-between text-sm text-zinc-500" key={f.sha}>
                        <a title={f.filename} className="flex gap-2 items-center" href={f.raw_url} target="_blank"><File size={20} />
                          <span className="underline hover:text-zinc-700">
                            {f.filename.length > 50 ? f.filename.substring(0, 50) + '...' : f.filename}
                          </span>
                        </a>
                        <div className="flex"><b className="text-teal-500">+ {f.additions}</b><b className="text-red-500 ml-3">- {f.deletions}</b></div>
                      </div>
                    )}
                  </div>
                </div>
                <div className="flex justify-between mt-4">
                  <span className="text-zinc-500">Author</span>
                  <AvatarCard user={{ name: lastModifiedFile?.author?.login, image: lastModifiedFile?.author?.avatar_url, id: lastModifiedFile?.author?.id, email: lastModifiedFile?.author?.email }} />
                </div>
              </div>
              <div className="flex flex-col border py-2 px-3 rounded-md w-1/2">
                <span className="font-semibold text-zinc-800 mb-4">Issues per user</span>
                <Bar options={buildIssuesChart().options} data={buildIssuesChart().data} />
              </div>
            </div>
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
