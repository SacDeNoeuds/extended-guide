/** @jsx React.createElement */
import React from 'react'
import { AppModel } from '../5-app-model/AppModel'
import { useSignal } from './useSignal'
import { TodoPage } from './TodoPage'

interface Props {
  model: AppModel
}

export function App({ model }: Props) {
  const route = useSignal(model.route)

  return (
    <div>
      <h2>React App</h2>
      {route.name === 'NotFound' && (
        <p>
          {'Page Not Found '}
          <button type="button" onClick={model.goToTodos}>
            {'Go to todos'}
          </button>
        </p>
      )}
      {route.name === 'TodoListPage' && <TodoPage model={route.make()} />}
    </div>
  )
}
