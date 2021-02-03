import { IProject } from "./components/project/types"

export const fetchProjects = async (): Promise<Array<IProject> | null> => {
  try {
    const apiUrl = process.env.REACT_APP_API_URL || ""
    const response = await (await fetch(apiUrl)).json()
    return response as Array<IProject>
  } catch (error) {
    console.error(error)
    return null
  }
}
