/** @jsx React.createElement */
import React from 'react'
import { Todo } from '@/setup/TodoApi'

interface Props {
  todos: Todo[]
  onToggle: (todo: Todo) => unknown
  disabled: boolean
}
export function TodoCheckboxList({ todos, onToggle, disabled }: Props) {
  return (
    <div>
      {todos.map((todo) => (
        <label key={todo.id} className="todo-item">
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
