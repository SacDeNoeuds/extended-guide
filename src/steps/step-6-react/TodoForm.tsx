/** @jsx React.createElement */
import React from "react"
import { AppModel } from "../../models/AppModel"
import { useSignal } from "./useSignal"
import { TodoFormModel } from "../../models/TodoFormModel"

interface Props {
  model: TodoFormModel
  id?: string
}

export function TodoForm({ id, model }: Props) {
  const title = useSignal(model.values.title)
  const completed = useSignal(model.values.completed)

  return (
    <form
      id={id}
      onSubmit={(event) => {
        event.preventDefault()
        model.submit()
      }}
    >
      <div>
        <label htmlFor="title-control">Title</label>
        <input
          type="text"
          id="title-control"
          value={title}
          onChange={(event) => {
            model.values.title.set(event.currentTarget.value)
          }}
        />
      </div>
      <div>
        <label>
          <input
            type="checkbox"
            id="title-control"
            checked={completed}
            onChange={(event) => {
              model.values.completed.set(event.currentTarget.checked)
            }}
          />
          Done
        </label>
      </div>
    </form>
  )
}
