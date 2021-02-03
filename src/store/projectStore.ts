import { IProject } from "../components/project/types"
import { action, makeAutoObservable, observable } from "mobx"
import { fetchProjects } from "../api"

export interface IProjectStore {
  fetched: boolean
  storageKey: string
  projects: Array<IProject>
}

export class ProjectStore implements IProjectStore {
  storageKey = process.env.REACT_APP_STORAGE_KEY || ""
  fetched = false
  projects: Array<IProject> = []

  constructor() {
    makeAutoObservable(this, {
      projects: observable,
      fetchProjects: action,
      setProjects: action,
      deleteProject: action,
      updateProject: action,
    })
    this.projects = this.getLocalData()
  }

  getLocalData = () => {
    const localValue = localStorage.getItem(this.storageKey)

    if (localValue) return JSON.parse(localValue)

    return []
  }

  dehydrate = () => {
    window.localStorage.setItem(
      `${this.storageKey}`,
      JSON.stringify(this.projects)
    )
  }

  @action setProjects = (projects: Array<IProject>): void => {
    this.projects.push(...projects)
    this.dehydrate()
  }

  @action fetchProjects = async (): Promise<void> => {
    if (this.projects.length) return

    const projects = await fetchProjects()

    //add error handling??
    if (projects === null) return

    this.setProjects(projects)
  }

  @action deleteProject = (projectId: number): void => {
    const filtered = this.projects.filter(({ id }) => id !== projectId)

    this.projects = filtered
    this.dehydrate()
  }

  @action updateProject = (payload: Partial<IProject>): void => {
    const updatedInd = this.projects.findIndex(({ id }) => id === payload.id)

    if (updatedInd >= 0) {
      this.projects[updatedInd] = {
        ...this.projects[updatedInd],
        ...payload,
      }
      this.dehydrate()
    }
  }
}
