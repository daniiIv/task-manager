// App.jsx – коренен компонент, композира цялото приложение
import StatsBar from './components/StatsBar.jsx'
import TaskForm from './components/TaskForm.jsx'
import Filters from './components/Filters.jsx'
import TaskList from './components/TaskList.jsx'
import { useTaskManager } from './useTaskManager.js'

export default function App() {
  const {
    tasks,
    filteredTasks,
    filter, setFilter,
    search, setSearch,
    addTask, toggleTask, deleteTask, editTask,
  } = useTaskManager()

  return (
    <div className="app">
      {/* Заглавна секция */}
      <header className="app-header">
        <h1>📋 Task Manager</h1>
        <p>Управлявай задачите си ефективно с React</p>
      </header>

      {/* Статистики */}
      <StatsBar tasks={tasks} />

      {/* Форма за добавяне */}
      <TaskForm onAdd={addTask} />

      {/* Филтри и търсене */}
      <Filters
        filter={filter}
        setFilter={setFilter}
        search={search}
        setSearch={setSearch}
      />

      {/* Списък задачи */}
      <TaskList
        tasks={filteredTasks}
        onToggle={toggleTask}
        onDelete={deleteTask}
        onEdit={editTask}
      />

      <footer className="app-footer">
        Task Manager &mdash; React 18 + Vite &mdash; {new Date().getFullYear()}
      </footer>
    </div>
  )
}
