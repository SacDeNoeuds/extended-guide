/** @jsx React.createElement */
import React from 'react'
import { TodoPageModel } from '../../models/TodoPageModel'
import { TodoList } from './TodoList-2'

interface Props {
  model: TodoPageModel
}

export function TodoPage({ model }: Props) {
  return (
    <div>
      <p>Todo Page in React</p>
      <TodoList model={model.components.todoList} />
    </div>
  )
}