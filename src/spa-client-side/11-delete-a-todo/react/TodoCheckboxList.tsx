/** @jsx React.createElement */
import React from 'react'
import { Todo } from '@/spa-client-side/setup/TodoApi'

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
        <div key={todo.id} className="todo-item">
          <input
            type="checkbox"
            checked={todo.completed}
            onChange={() => onToggle(todo)}
            disabled={disabled}
          />
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
          <button
            type="button"
            onClick={() => onDelete(todo)}
            disabled={disabled}
          >
            🗑️
          </button>
        </div>
      ))}
    </div>
  )
}
