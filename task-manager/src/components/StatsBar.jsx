// StatsBar.jsx – показва обобщена статистика за задачите
export default function StatsBar({ tasks }) {
  const total = tasks.length
  const done = tasks.filter(t => t.done).length
  const pending = total - done
  const highPriority = tasks.filter(t => t.priority === 'high' && !t.done).length

  return (
    <div className="stats-bar">
      <div className="stat-card">
        <div className="stat-number">{total}</div>
        <div className="stat-label">Общо</div>
      </div>
      <div className="stat-card done">
        <div className="stat-number">{done}</div>
        <div className="stat-label">Изпълнени</div>
      </div>
      <div className="stat-card pending">
        <div className="stat-number">{pending}</div>
        <div className="stat-label">Предстоящи</div>
      </div>
      <div className="stat-card">
        <div className="stat-number" style={{ color: highPriority > 0 ? '#dc2626' : '#2d3a8c' }}>
          {highPriority}
        </div>
        <div className="stat-label">Висок приоритет</div>
      </div>
    </div>
  )
}
