import React, { useState } from "react"
import { IProject } from "./types"

interface ProjectPartialProps extends IProject {
  toggleMode?: () => void
  triggerDelete: () => void
}

interface ProjectProps extends IProject {
  trashProject: (id: number) => void
  updateProject: <T>(payload: T) => void
}

const ProjectHeader: React.FC<
  Pick<IProject, "title" | "backgroundImage" | "logo">
> = ({ backgroundImage, logo, title }) => {
  return (
    <div className="projectHeader">
      <div
        className="banner"
        style={{
          backgroundImage: `url(${backgroundImage})`,
        }}
      >
        {logo && (
          <div className="logo">
            <img src={logo} alt={title} />
          </div>
        )}
      </div>
    </div>
  )
}

const ProjectFooter: React.FC<Pick<ProjectPartialProps, "triggerDelete">> = ({
  triggerDelete,
}) => {
  return (
    <div className="projectFooter">
      <div className="actions">
        <div className="trash" onClick={triggerDelete}>
          Trash!
        </div>
      </div>
    </div>
  )
}

export const Project: React.FC<ProjectProps> = (props) => {
  const [editing, setEditing] = useState<Boolean>(false)
  const {
    id,
    title,
    industry,
    description,
    trashProject,
    updateProject,
    backgroundImage,
    logo,
  } = props

  const handleSaveChange = (fieldName: string, e: React.FocusEvent) => {
    const value = e.target.textContent
    updateProject({
      id,
      [fieldName]: value,
    })
  }

  return (
    <div className="projectCard">
      <ProjectHeader
        logo={logo}
        backgroundImage={backgroundImage}
        title={title}
      />
      <div className="details">
        <div
          className="editModeToggle"
          onClick={() => !editing && setEditing(true)}
        >
          <h3
            onBlur={(e) => handleSaveChange("title", e)}
            suppressContentEditableWarning={!!editing}
            contentEditable={!!editing}
          >
            {title}
          </h3>
          <h6
            onBlur={(e) => handleSaveChange("title", e)}
            suppressContentEditableWarning={!!editing}
            contentEditable={!!editing}
          >
            {industry}
          </h6>
          <p
            onBlur={(e) => handleSaveChange("title", e)}
            suppressContentEditableWarning={!!editing}
            contentEditable={!!editing}
          >
            {description}
          </p>
        </div>
        <ProjectFooter triggerDelete={() => trashProject(id)} />
      </div>
    </div>
  )
}
