// useTaskManager.js – custom hook с цялата бизнес логика
import { useState, useMemo } from 'react'

let nextId = 1

function formatDate(date) {
  return date.toLocaleDateString('bg-BG', { day: '2-digit', month: 'short', year: 'numeric' })
}

// Примерни начални задачи
const INITIAL_TASKS = [
  { id: nextId++, title: 'Прочети документацията на React', category: 'Учене', priority: 'high', done: false, createdAt: formatDate(new Date()) },
  { id: nextId++, title: 'Направи проекта за университета', category: 'Учене', priority: 'high', done: false, createdAt: formatDate(new Date()) },
  { id: nextId++, title: 'Купи продукти от магазина', category: 'Пазаруване', priority: 'medium', done: true, createdAt: formatDate(new Date()) },
  { id: nextId++, title: 'Провери имейлите', category: 'Работа', priority: 'low', done: false, createdAt: formatDate(new Date()) },
]

export function useTaskManager() {
  const [tasks, setTasks] = useState(INITIAL_TASKS)
  const [filter, setFilter] = useState('all')     // 'all' | 'pending' | 'done'
  const [search, setSearch] = useState('')

  // Добавяне на задача
  function addTask({ title, category, priority }) {
    const newTask = {
      id: nextId++,
      title,
      category,
      priority,
      done: false,
      createdAt: formatDate(new Date()),
    }
    setTasks(prev => [newTask, ...prev])
  }

  // Превключване на статуса
  function toggleTask(id) {
    setTasks(prev => prev.map(t => t.id === id ? { ...t, done: !t.done } : t))
  }

  // Изтриване
  function deleteTask(id) {
    setTasks(prev => prev.filter(t => t.id !== id))
  }

  // Редакция на заглавие
  function editTask(id, newTitle) {
    setTasks(prev => prev.map(t => t.id === id ? { ...t, title: newTitle } : t))
  }

  // Филтриране + търсене (с useMemo за оптимизация)
  const filteredTasks = useMemo(() => {
    return tasks
      .filter(t => {
        if (filter === 'pending') return !t.done
        if (filter === 'done') return t.done
        return true
      })
      .filter(t => t.title.toLowerCase().includes(search.toLowerCase()))
  }, [tasks, filter, search])

  return {
    tasks,
    filteredTasks,
    filter, setFilter,
    search, setSearch,
    addTask, toggleTask, deleteTask, editTask,
  }
}
