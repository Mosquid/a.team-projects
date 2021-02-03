import React, { useEffect } from "react"
import { observer } from "mobx-react"
import { useRootStore } from "../../hooks"
import { Project } from "../"

export const ProjectList: React.FC<{}> = observer(() => {
  const { projectsStore } = useRootStore()
  const { projects } = projectsStore

  useEffect(() => {
    projectsStore.fetchProjects()
  }, [projectsStore])

  return (
    <>
      {projects.length > 0 && (
        <h1>
          {projects.map((project, index) => (
            <Project key={index} {...project} />
          ))}
        </h1>
      )}
    </>
  )
})
