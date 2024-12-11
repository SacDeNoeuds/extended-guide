/** @jsx React.createElement */
import React, { useEffect } from "react"
import { TodoListModel } from "../../models/TodoListModel"
import { useSignal } from "./useSignal"
import { DeleteTodoButton } from './DeleteTodoButton'
import { ConfirmActionModal } from './ConfirmActionModal'

interface Props {
  model: TodoListModel
}
export function TodoList({ model }: Props) {
  const data = useSignal(model.data)

  useEffect(() => {
    model.getTodos()
  }, [])

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
      {data.state === "initial" && <p>Waiting for data to be loaded</p>}
      {data.state === "pending" && <p>Loading…</p>}
      {data.state === "failure" && <p>Error: {data.error.message}</p>}
      {data.state === "success" && (
        <ul>
          {data.value.map((todo) => (
            <li
              key={todo.id}
              style={{
                display: "flex",
                gap: "0.5rem",
                justifyContent: "space-between",
              }}
            >
              <span>{todo.title}</span>
              <span style={{ display: 'flex', gap: '0.25rem' }}>
                <button type="button" onClick={() => model.openTodoForm(todo)}>
                  {'✏️'}
                </button>
                <DeleteTodoButton model={model.deleteTodo} todo={todo}>
                  {'×'}
                </DeleteTodoButton>
              </span>
            </li>
          ))}
        </ul>
      )}
      <ConfirmActionModal action={model.deleteTodo.action}>
        {(todo) => (
          <p>Are you sure you want to delete "{todo.title}"?</p>
        )}
      </ConfirmActionModal>
    </div>
  )
}
