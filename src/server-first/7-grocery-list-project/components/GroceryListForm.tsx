/* @jsxImportSource hono/jsx */

type Props = {
  action: string
  values?: { listName: string }
  submitLabel: string
}

export function GroceryListForm({ action, values, submitLabel }: Props) {
  return (
    <form action={action} method="post">
      <input
        type="text"
        name="listName"
        value={values?.listName}
        placeholder="221B Bake Street"
        required
      />
      <button type="submit">{submitLabel}</button>
    </form>
  )
}
