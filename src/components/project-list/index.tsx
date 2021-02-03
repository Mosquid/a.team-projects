import React, { useEffect } from "react"
import { observer } from "mobx-react"
import { useRootStore } from "../../hooks"

export const ProjectList: React.FC<{}> = observer(() => {
  const { projectsStore } = useRootStore()
  const { projects } = projectsStore

  useEffect(() => {
    projectsStore.fetchProjects()
  }, [])
  console.log(projects)
//doesn't update :(
  return <h1>{projects.length}</h1>
})
