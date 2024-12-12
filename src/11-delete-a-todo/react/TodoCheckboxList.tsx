/** @jsx React.createElement */
import React from "react"
import { Todo } from "../../setup/Api"

interface Props {
  todos: Todo[]
  onToggle: (todo: Todo) => unknown
  onTitleChanged: (todo: Todo, title: string) => unknown
  onDelete: (todo: Todo) => unknown
  disabled: boolean
}
export function TodoCheckboxList({
  todos,
  onToggle,
  onTitleChanged,
  onDelete,
  disabled,
}: Props) {
  return (
    <div>
      {todos.map((todo) => (
        <div key={todo.id}>
          <input
            type="checkbox"
            checked={todo.completed}
            onChange={() => onToggle(todo)}
            disabled={disabled}
          />
          &emsp;
          <input
            type="text"
            disabled={disabled}
            defaultValue={todo.title}
            onBlur={(event) => {
              const nextTitle = event.target.value
              if (nextTitle === todo.title) return
              return onTitleChanged(todo, nextTitle)
            }}
          />
          &emsp;
          <button type="button" onClick={() => onDelete(todo)} disabled={disabled}>
            🗑️
          </button>
        </div>
      ))}
    </div>
  )
}
