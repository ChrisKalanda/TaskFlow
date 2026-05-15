import { useTranslation } from "react-i18next";

const PRIORITY_COLORS = { low: "#22c55e", medium: "#f59e0b", high: "#ef4444" };

export default function TaskCard({ task, onEdit, onDelete }) {
  const { t } = useTranslation();

  return (
    <div className="task-card">
      <div className="task-card-header">
        <span
          className="priority-badge"
          style={{ backgroundColor: PRIORITY_COLORS[task.priority] }}
        >
          {t(`task.priority.${task.priority}`)}
        </span>
        <div className="task-actions">
          <button onClick={() => onEdit(task)} title="Edit">✏️</button>
          <button onClick={() => onDelete(task.id)} title="Delete">🗑️</button>
        </div>
      </div>
      <h3>{task.title}</h3>
      {task.description && <p>{task.description}</p>}
      {task.due_date && (
        <p className="due-date">
          {t("task.dueDate", {
            date: new Date(task.due_date).toLocaleDateString(t("locale")),
          })}
        </p>
      )}
    </div>
  );
}
