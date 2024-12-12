/** @jsx React.createElement */
import React from "react"
import { Todo } from "../../setup/Api"

interface Props {
  todos: Todo[]
  onToggle: (todo: Todo) => unknown
  disabled: boolean
}
export function TodoCheckboxList({ todos, onToggle, disabled }: Props) {
  return (
    <div>
      {todos.map((todo) => (
        <label key={todo.id} style={{ display: 'block' }}>
          <input
            type="checkbox"
            checked={todo.completed}
            onChange={() => onToggle(todo)}
            disabled={disabled}
          />
          <span>{todo.title}</span>
        </label>
      ))}
    </div>
  )
}
