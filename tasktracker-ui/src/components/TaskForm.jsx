import { useState } from 'react'

function TaskForm({ onTaskAdded }) {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    
    fetch('http://localhost:8080/api/tasks', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, description, isCompleted: false })
    })
    .then(res => res.json())
    .then(newTask => {
      onTaskAdded(newTask)
      setTitle('')
      setDescription('')
    })
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 mb-4">
      <input
        value={title}
        onChange={e => setTitle(e.target.value)}
        placeholder="Görev adı"
        className="border rounded px-3 py-2 flex-1 text-sm"
        required
      />
      <input
        value={description}
        onChange={e => setDescription(e.target.value)}
        placeholder="Açıklama"
        className="border rounded px-3 py-2 flex-1 text-sm"
      />
      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded text-sm hover:bg-blue-600"
      >
        Ekle
      </button>
    </form>
  )
}

export default TaskForm