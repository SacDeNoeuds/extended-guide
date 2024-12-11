/** @jsx React.createElement */
import React, { useEffect } from 'react'
import { TodoListModel } from '../../models/TodoListModel'
import { useSignal } from './useSignal'

interface Props {
  model: TodoListModel
}
export function TodoList({ model }: Props) {
  const data = useSignal(model.data)
  useEffect(() => {
    model.getTodos()
  }, [])
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
      {data.state === 'initial' && <p>Waiting for data to be loaded</p>}
      {data.state === 'pending' && (
        <p>Loading…</p>
      )}
      {data.state === 'failure' && (
        <p>Error: {data.error.message}</p>
      )}
      {data.state === 'success' && (
        <ul>
          {data.value.map((todo) => (
            <li key={todo.id}>
              {todo.title}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
