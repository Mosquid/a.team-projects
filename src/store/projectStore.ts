import { IProject } from "../components/project/types"
import { observable, action } from "mobx"

export interface IProjectStore {
  fetched: boolean
  projects: Array<IProject | null>
}

export class ProjectStore implements IProjectStore {
  private rootStore = null

  @observable fetched = false
  @observable projects: Array<IProject> = []

  constructor(rootStore?: any) {
    this.rootStore = rootStore
  }

  @action setProjects = (projects: Array<IProject>): void => {
    this.projects.push(...projects)
  }

  @action deleteProject = (projectId: number): void => {
    const filtered = this.projects.filter(({ id }) => id !== projectId)

    this.projects = filtered
  }

  @action updateProject = (payload: IProject): void => {
    const updatedInd = this.projects.findIndex(({ id }) => id === payload.id)
    
    if (updatedInd >= 0 ) {
      this.projects[updatedInd] = {
        ...this.projects[updatedInd],
        ...payload
      }
    }
  }
}
