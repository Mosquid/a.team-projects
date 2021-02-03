import React from "react"
import { IProject } from "./types"

export const Project: React.FC<IProject> = ({
  description,
  title,
  industry,
  logo,
  role,
  backgroundImage
}) => {
  return <div className="projectItem">
    {title}
  </div>
}

