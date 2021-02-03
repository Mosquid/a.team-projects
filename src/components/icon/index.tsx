import React from "react"
import Case from "./icons/case"
import Trash from "./icons/trash"

export const Icon: React.FC<{ name: string }> = ({ name }) => {
  const icons: Record<string, React.FC> = {
    case: Case,
    trash: Trash,
  }
  const El = icons[name] || <></>

  return (
    <div className="Icon">
      <El />
    </div>
  )
}
