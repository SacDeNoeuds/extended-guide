/** @jsx React.createElement */
import React from 'react'
import { Todo } from '@/setup/Api'

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
