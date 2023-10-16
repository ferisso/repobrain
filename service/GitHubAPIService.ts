import axios, { AxiosHeaders, AxiosRequestConfig } from "axios";
import { getSession } from "next-auth/react"

interface IGithubIssue {
  owner?: string,
  repo?: string,
  title?: string,
  body?: string,
  assignees?: string[],
  milestone?: number,
  labels?: string[],
}

interface IGithubConsumer {
  method: 'get' | 'post' | 'put' | 'delete',
  endpoint: string,
  body?: any
}

// https://github.com/apps/repobrainapp/installations/new/permissions?target_id=48661787

const GitHubAPIService = {
   async GithubConsumer({ method, endpoint, body }: IGithubConsumer) {
    const accessToken = await this.GetGithubAccessToken()
    const GITHUB_API_URI = "https://api.github.com";
    const config: AxiosRequestConfig<any> = {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    }
    if (method.toLocaleLowerCase() === 'get') {
      return axios.get(`${GITHUB_API_URI}${endpoint}`, config)
    } else {
      return axios[method](`${GITHUB_API_URI}${endpoint}`, body, config)
    }
  },

  async GetGithubAccessToken() {
    const userData = await getSession()
    if (!userData) return false;
    if (!userData.user?.access_token) return false;
    return userData.user.access_token
  },

  async CreateNewIssue(issue: IGithubIssue) {
    const endpoint = `/repos/${issue.owner}/${issue.repo}/issues`

    const res = await this.GithubConsumer({
      method: 'post',
      endpoint,
      body: issue
    })
    return res.data
  },

  async GetRepoContributions(data: any) {
    const endpoint = `/repos/${data?.owner_name}/${data?.name}/contributors`;

    const res = await this.GithubConsumer({
      method: 'get',
      endpoint
    })
    return res.data
  },

  async GetRepoCommits(data: any) {
    const endpoint = `/repos/${data?.owner_name}/${data?.name}/commits?sha=main`;

    const res = await this.GithubConsumer({
      method: 'get',
      endpoint
    })
    return res.data
  },

  async GetRepoFilesLength(data: any) {
    const endpoint = `/repos/${data?.owner_name}/${data?.name}/contents?ref=main`;

    const res = await this.GithubConsumer({
      method: 'get',
      endpoint
    })
    return res.data
  },

  async GetRepoComparisson(data: any, oldSha: string, newSha:string) {
    const endpoint = `/repos/${data?.owner_name}/${data?.name}/compare/${oldSha}...${newSha}`;

    const res = await this.GithubConsumer({
      method: 'get',
      endpoint
    })
    return res.data
  },
}

export default GitHubAPIService