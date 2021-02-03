import { ProjectStore } from "./projectStore"

export class RootStore {
  projectStore: ProjectStore

  constructor() {
    this.projectStore = new ProjectStore(this)
  }
}

export { ProjectStore }
