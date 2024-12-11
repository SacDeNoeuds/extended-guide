/** @jsx React.createElement */
import React from "react"
import { AppModel } from "../../models/AppModel"
import { useSignal } from "./useSignal"
import { TodoPage } from "./TodoPage-2"

interface Props {
  model: AppModel
}

export function App({ model }: Props) {
  const activePage = useSignal(model.activePage)

  return (
    <>
      <p>React App</p>
      {activePage.name === "NotFound" && <p>Page Not Found</p>}
      {activePage.name === "Todos" && (
        <TodoPage model={activePage.createModel()} />
      )}
    </>
  )
}
