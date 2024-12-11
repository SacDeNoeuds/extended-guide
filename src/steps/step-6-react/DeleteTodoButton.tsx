/** @jsx React.createElement */
import React from "react"
import { DeleteTodoModel } from '../../models/DeleteTodoModel'
import { ConfirmActionModal } from './ConfirmActionModal'
import { Todo } from '../../setup/Api'

interface Props {
  todo: Todo;
  model: DeleteTodoModel
  children: React.ReactNode
}

export function DeleteTodoButton({ todo, model, children }: Props) {
  const action = model.action
  return (
    <button type="button" onClick={() => action.ask(todo)}>
      {children}
    </button>
  )
}