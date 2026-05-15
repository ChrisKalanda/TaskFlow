import { useState } from "react";
import { useTranslation } from "react-i18next";

export default function TaskModal({ task, onSave, onClose }) {
  const { t } = useTranslation();
  const [form, setForm] = useState({
    title: task?.title || "",
    description: task?.description || "",
    status: task?.status || "todo",
    priority: task?.priority || "medium",
    due_date: task?.due_date ? task.due_date.slice(0, 10) : "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({
      ...form,
      due_date: form.due_date ? new Date(form.due_date).toISOString() : null,
    });
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <h2>{task ? t("task.editTitle") : t("task.newTitle")}</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>{t("task.titleLabel")}</label>
            <input
              type="text"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              required
            />
          </div>
          <div className="form-group">
            <label>{t("task.descriptionLabel")}</label>
            <textarea
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              rows={3}
            />
          </div>
          <div className="form-row">
            <div className="form-group">
              <label>{t("task.statusLabel")}</label>
              <select value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value })}>
                <option value="todo">{t("task.status.todo")}</option>
                <option value="in_progress">{t("task.status.in_progress")}</option>
                <option value="done">{t("task.status.done")}</option>
              </select>
            </div>
            <div className="form-group">
              <label>{t("task.priorityLabel")}</label>
              <select value={form.priority} onChange={(e) => setForm({ ...form, priority: e.target.value })}>
                <option value="low">{t("task.priority.low")}</option>
                <option value="medium">{t("task.priority.medium")}</option>
                <option value="high">{t("task.priority.high")}</option>
              </select>
            </div>
          </div>
          <div className="form-group">
            <label>{t("task.dueDateLabel")}</label>
            <input
              type="date"
              value={form.due_date}
              onChange={(e) => setForm({ ...form, due_date: e.target.value })}
            />
          </div>
          <div className="modal-actions">
            <button type="button" onClick={onClose} className="btn-secondary">{t("task.cancel")}</button>
            <button type="submit" className="btn-primary">
              {task ? t("task.save") : t("task.create")}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
