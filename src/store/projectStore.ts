import { IProject } from "../components/project/types"
import { action, makeAutoObservable, observable } from "mobx"
import { fetchProjects } from "../api"

export interface IProjectStore {
  fetched: boolean
  projects: Array<IProject | null>
}

export class ProjectStore implements IProjectStore {
  private rootStore = null

  fetched = false
  projects: Array<IProject> = []

  constructor(rootStore?: any) {
    makeAutoObservable(this, {
      projects: observable,
      fetchProjects: action,
      setProjects: action,
      deleteProject: action,
      updateProject: action,
    })
    this.rootStore = rootStore
  }

  @action setProjects = (projects: Array<IProject>): Array<IProject> => {
    this.projects.push(...projects)
    return this.projects
  }

  @action fetchProjects = async (): Promise<void> => {
    const projects = await fetchProjects()

    //add error handling??
    if (projects === null) return

    this.setProjects(projects)
  }

  @action deleteProject = (projectId: number): void => {
    const filtered = this.projects.filter(({ id }) => id !== projectId)

    this.projects = filtered
  }

  @action updateProject = (payload: Partial<IProject>): void => {
    const updatedInd = this.projects.findIndex(({ id }) => id === payload.id)

    if (updatedInd >= 0) {
      this.projects[updatedInd] = {
        ...this.projects[updatedInd],
        ...payload,
      }
    }
  }
}
