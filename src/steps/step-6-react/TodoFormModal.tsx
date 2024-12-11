/** @jsx React.createElement */
import React, { useEffect } from "react"
import { useSignal } from "./useSignal"
import { TodoFormModel } from "../../models/TodoFormModel"
import { Signal } from "../../setup/Signal"
import { TodoForm } from "./TodoForm"

interface Props {
  model: Signal<TodoFormModel | undefined>
  formId: string
}

export function TodoFormModal({ formId, model }: Props) {
  const form = useSignal(model)

  return (
    <dialog open={!!form}>
      <header>Todo Form</header>
      {form && <TodoForm model={form} id={formId} />}
      <footer>
        <button type="button" onClick={() => model.set(undefined)}>
          Cancel
        </button>
        <button type="submit" form={formId}>
          Save
        </button>
      </footer>
    </dialog>
  )
}
