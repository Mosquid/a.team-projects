import React, { createContext } from "react"
import { ProjectStore } from "./store"

type IRootStoreContext = {
  projectsStore: ProjectStore
}

export const RootStoreContext = createContext<IRootStoreContext>(
  {} as IRootStoreContext
)
const projectsStore = new ProjectStore()

export const RootStoreProvider: React.FC<React.PropsWithChildren<{}>> = ({
  children,
}) => {
  return (
    <RootStoreContext.Provider value={{ projectsStore }}>
      {children}
    </RootStoreContext.Provider>
  )
}
