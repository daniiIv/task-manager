// Filters.jsx – филтри по статус и търсене по текст
export default function Filters({ filter, setFilter, search, setSearch }) {
  const buttons = [
    { key: 'all', label: 'Всички' },
    { key: 'pending', label: 'Предстоящи' },
    { key: 'done', label: 'Изпълнени' },
  ]

  return (
    <div className="filters">
      <span className="filter-label">Филтър:</span>
      {buttons.map(b => (
        <button
          key={b.key}
          className={`filter-btn ${filter === b.key ? 'active' : ''}`}
          onClick={() => setFilter(b.key)}
        >
          {b.label}
        </button>
      ))}
      <input
        className="search-input"
        type="text"
        placeholder="Търси задача..."
        value={search}
        onChange={e => setSearch(e.target.value)}
      />
    </div>
  )
}
