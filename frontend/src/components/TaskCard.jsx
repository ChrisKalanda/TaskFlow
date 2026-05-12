const PRIORITY_COLORS = { low: "#22c55e", medium: "#f59e0b", high: "#ef4444" };
const PRIORITY_LABELS = { low: "Faible", medium: "Moyen", high: "Élevé" };

export default function TaskCard({ task, onEdit, onDelete }) {
  return (
    <div className="task-card">
      <div className="task-card-header">
        <span
          className="priority-badge"
          style={{ backgroundColor: PRIORITY_COLORS[task.priority] }}
        >
          {PRIORITY_LABELS[task.priority]}
        </span>
        <div className="task-actions">
          <button onClick={() => onEdit(task)} title="Modifier">✏️</button>
          <button onClick={() => onDelete(task.id)} title="Supprimer">🗑️</button>
        </div>
      </div>
      <h3>{task.title}</h3>
      {task.description && <p>{task.description}</p>}
      {task.due_date && (
        <p className="due-date">
          Échéance : {new Date(task.due_date).toLocaleDateString("fr-CA")}
        </p>
      )}
    </div>
  );
}
