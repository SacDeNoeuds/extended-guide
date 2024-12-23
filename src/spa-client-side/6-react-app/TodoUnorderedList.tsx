/** @jsx React.createElement */
import React from 'react'
import { Todo } from '@/spa-client-side/setup/TodoApi'

interface Props {
  todos: Todo[]
}
export function TodoUnorderedList({ todos }: Props) {
  return (
    <ul>
      {todos.map((todo) => (
        <li key={todo.id}>{todo.title}</li>
      ))}
    </ul>
  )
}
