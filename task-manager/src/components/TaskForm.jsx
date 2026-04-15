// TaskForm.jsx – форма за добавяне на нова задача
import { useState } from 'react'

const CATEGORIES = ['Работа', 'Лично', 'Учене', 'Пазаруване', 'Друго']
const PRIORITIES = [
  { value: 'high', label: 'Висок' },
  { value: 'medium', label: 'Среден' },
  { value: 'low', label: 'Нисък' },
]

export default function TaskForm({ onAdd }) {
  const [title, setTitle] = useState('')
  const [category, setCategory] = useState('Работа')
  const [priority, setPriority] = useState('medium')

  function handleSubmit(e) {
    e.preventDefault()
    const trimmed = title.trim()
    if (!trimmed) return
    onAdd({ title: trimmed, category, priority })
    setTitle('')
  }

  return (
    <div className="form-card">
      <h2>Добави нова задача</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-row">
          <input
            type="text"
            placeholder="Описание на задачата..."
            value={title}
            onChange={e => setTitle(e.target.value)}
            maxLength={120}
          />
          <select value={category} onChange={e => setCategory(e.target.value)}>
            {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
          <select value={priority} onChange={e => setPriority(e.target.value)}>
            {PRIORITIES.map(p => <option key={p.value} value={p.value}>{p.label} приоритет</option>)}
          </select>
          <button type="submit" className="btn-add">+ Добави</button>
        </div>
      </form>
    </div>
  )
}
