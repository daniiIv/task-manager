// TaskItem.jsx – единична задача с inline редакция
import { useState } from 'react'

const PRIORITY_LABELS = { high: 'Висок', medium: 'Среден', low: 'Нисък' }
const PRIORITY_BADGE = { high: 'badge-high', medium: 'badge-medium', low: 'badge-low' }

export default function TaskItem({ task, onToggle, onDelete, onEdit }) {
  const [editing, setEditing] = useState(false)
  const [editValue, setEditValue] = useState(task.title)

  function saveEdit() {
    const v = editValue.trim()
    if (v) onEdit(task.id, v)
    setEditing(false)
  }

  function cancelEdit() {
    setEditValue(task.title)
    setEditing(false)
  }

  const priorityClass = `priority-${task.priority}`
  const doneClass = task.done ? 'done' : ''

  return (
    <div className={`task-item ${doneClass} ${task.done ? '' : priorityClass}`}>
      {/* Checkbox */}
      <div
        className={`task-check ${task.done ? 'checked' : ''}`}
        onClick={() => onToggle(task.id)}
        title={task.done ? 'Маркирай като незавършена' : 'Маркирай като завършена'}
      >
        {task.done && '✓'}
      </div>

      {/* Content */}
      <div className="task-content">
        {editing ? (
          <div className="form-row">
            <input
              className="edit-input"
              value={editValue}
              onChange={e => setEditValue(e.target.value)}
              onKeyDown={e => { if (e.key === 'Enter') saveEdit(); if (e.key === 'Escape') cancelEdit() }}
              autoFocus
              maxLength={120}
            />
            <button className="btn-save" onClick={saveEdit}>Запази</button>
            <button className="btn-cancel" onClick={cancelEdit}>Отказ</button>
          </div>
        ) : (
          <>
            <div className={`task-title ${task.done ? 'done-text' : ''}`}>{task.title}</div>
            <div className="task-meta">
              <span className="badge badge-cat">{task.category}</span>
              <span className={`badge ${PRIORITY_BADGE[task.priority]}`}>
                {PRIORITY_LABELS[task.priority]}
              </span>
              <span className="task-date">{task.createdAt}</span>
            </div>
          </>
        )}
      </div>

      {/* Actions */}
      {!editing && (
        <div className="task-actions">
          <button className="btn-icon btn-edit" onClick={() => setEditing(true)} title="Редактирай">✏️</button>
          <button className="btn-icon btn-delete" onClick={() => onDelete(task.id)} title="Изтрий">🗑️</button>
        </div>
      )}
    </div>
  )
}
