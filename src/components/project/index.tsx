import React, { useState } from "react"
import { IProject } from "./types"
import { Icon } from ".."

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
          <Icon name="trash" />
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
    role,
    backgroundImage,
    logo,
  } = props

  const handleSaveChange = (fieldName: string, e: React.FocusEvent) => {
    const value = e.target.textContent
    updateProject({
      id,
      [fieldName]: value,
    })
    setEditing(false)
  }

  return (
    <div className="projectCard">
      <ProjectHeader
        logo={logo}
        backgroundImage={backgroundImage}
        title={title}
      />
      <div className={`details ${editing ? "editing" : ""}`}>
        <div
          className="editModeToggle"
          onClick={() => !editing && setEditing(true)}
        >
          <h3
            className="editable"
            onBlur={(e) => handleSaveChange("title", e)}
            suppressContentEditableWarning={!!editing}
            contentEditable={!!editing}
          >
            {title}
          </h3>
          <h6
            className="editable industry"
            onBlur={(e) => handleSaveChange("industry", e)}
            suppressContentEditableWarning={!!editing}
            contentEditable={!!editing}
          >
            {industry}
          </h6>
          <p
            className="description editable"
            onBlur={(e) => handleSaveChange("description", e)}
            suppressContentEditableWarning={!!editing}
            contentEditable={!!editing}
          >
            {description}
          </p>
          <div className="role">
            <Icon name="case" />
            <span
              className="editable"
              onBlur={(e) => handleSaveChange("role", e)}
              suppressContentEditableWarning={!!editing}
              contentEditable={!!editing}
            >
              {role}
            </span>
          </div>
        </div>
        <ProjectFooter triggerDelete={() => trashProject(id)} />
      </div>
    </div>
  )
}
