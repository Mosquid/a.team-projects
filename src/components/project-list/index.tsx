import React, {useEffect} from "react"
import { useRootStore } from "../../hooks"

export const ProjectList: React.FC<{}> = () => {
  const { projectsStore } = useRootStore()
  useEffect(() => {
    projectsStore.setProjects([])
  }, [])
  
  return <h1>Test</h1>
}
