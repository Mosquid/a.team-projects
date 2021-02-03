import React, { useEffect } from "react"
import { observer } from "mobx-react"
import { useRootStore } from "../../hooks"
import { Project } from "../"

export const ProjectList: React.FC<{}> = observer(() => {
  const { projectsStore } = useRootStore()
  const { projects, deleteProject, updateProject } = projectsStore

  const trashProject = (id: number) => {
    deleteProject(id)
  }

  useEffect(() => {
    projectsStore.fetchProjects()
  }, [projectsStore])

  return (
    <>
      {projects.length > 0 && (
        <div className="projectList">
          {projects.map((project, index) => (
            <Project
              updateProject={updateProject}
              trashProject={trashProject}
              key={index}
              {...project}
            />
          ))}
        </div>
      )}
    </>
  )
})
