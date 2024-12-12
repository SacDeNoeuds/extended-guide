/** @jsx React.createElement */
import React, { useEffect } from "react"
import { TodoPageModel } from "../5-app-model/TodoPageModel"
import { useSignal } from "./useSignal"
import { RemoteData } from "./RemoteData"
import { TodoUnorderedList } from "./TodoUnorderedList"

interface Props {
  model: TodoPageModel
}

export function TodoPage({ model }: Props) {
  const todos = useSignal(model.todos.data)

  // fetch the todos on mount.
  useEffect(() => {
    void model.todos.trigger()
    // explicitly mark the promise as non-awaiting with `void`
  }, [])

  return (
    <div>
      <p>Todo Page in React</p>
      <RemoteData
        data={todos}
        success={(todos) => <TodoUnorderedList todos={todos} />}
      />
    </div>
  )
}