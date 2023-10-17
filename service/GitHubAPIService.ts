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
  method: 'get' | 'post' | 'put' | 'patch' | 'delete' ,
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

  async GetRepoCommits(data: any, page = 1): Promise<any> {
    const endpoint = `/repos/${data?.owner_name}/${data?.name}/commits?sha=main&per_page=100&page=${page}`;
    let commits = []

    const res = await this.GithubConsumer({
      method: 'get',
      endpoint
    });

    if (res.data.length > 0) {
      commits.push(...res.data);
  
      // Se houver mais páginas, continue a busca
      if (res.headers.link && res.headers.link.includes('rel="next"')) {
        const nextPage = page + 1;
        commits.push(...await this.GetRepoCommits(data, nextPage));
      }
    }
  
    return commits;
  },

  async GetRepoFilesLength(data: any) {
    const endpoint = `/repos/${data?.owner_name}/${data?.name}/contents?ref=main&per_page=100`;

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

  async GetContributorsCommits(data: any) {
    const endpoint = `/repos/${data?.owner_name}/${data?.name}/stats/contributors`;

    const res = await this.GithubConsumer({
      method: 'get',
      endpoint
    })
    if (res.status === 202) this.GetContributorsCommits(data)
    return res.data
  },

  async GetLastModifiedFile(data: any, sha: string) {
    const endpoint = `/repos/${data?.owner_name}/${data?.name}/commits/${sha}`;

    const res = await this.GithubConsumer({
      method: 'get',
      endpoint
    })
    if (res.status === 202) this.GetLastModifiedFile(data, sha)
    return res.data
  },

  async GetRepoIssues(data: any) {
    const endpoint = `/repos/${data?.owner_name}/${data?.name}/issues?state=all`;

    const res = await this.GithubConsumer({
      method: 'get',
      endpoint
    })
    if (res.status === 202) this.GetRepoIssues(data)
    return res.data
  },

  async CloseAnIssue({ owner, project, issue }: { owner: string, project: string, issue: string }) {
    const endpoint = `/repos/${owner}/${project}/issues/${issue}`

    const res = await this.GithubConsumer({
      method: 'patch',
      endpoint,
      body: {
        state: 'closed',
        state_reason: 'completed'
      }
    })
    return res.data
  },

  async ReOpenAnIssue({ owner, project, issue }: { owner: string, project: string, issue: string }) {
    const endpoint = `/repos/${owner}/${project}/issues/${issue}`

    const res = await this.GithubConsumer({
      method: 'patch',
      endpoint,
      body: {
        state: 'open',
        state_reason: 'reopened'
      }
    })
    return res.data
  }
}

export default GitHubAPIService