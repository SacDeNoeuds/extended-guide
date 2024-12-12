/** @jsx React.createElement */
import React from 'react'
import { RemoteData } from '@/6-react-app/RemoteData'
import { useSignal } from '@/6-react-app/useSignal'
import { useEffect } from "react"
import { TodoPageModel } from '../TodoPageModel'
import { TodoCheckboxList } from "./TodoCheckboxList"

interface Props {
  model: TodoPageModel
}

export function TodoPage({ model }: Props) {
  const todoList = useSignal(model.getTodoList.data)
  const toggleData = useSignal(model.toggleTodo.data)

  // fetch the todo list on mount.
  useEffect(() => {
    void model.getTodoList.trigger()
    // explicitly mark the promise as non-awaiting with `void`
  }, [])

  // dispose on unmount.
  useEffect(() => model.dispose, [])

  return (
    <div>
      <p>Todo Page in React</p>
      <RemoteData
        data={todoList}
        success={(todos) => (
          <TodoCheckboxList
            todos={todos}
            onToggle={model.toggleTodo.trigger}
            disabled={toggleData.state === 'pending'}
          />
        )}
      />
    </div>
  )
}
