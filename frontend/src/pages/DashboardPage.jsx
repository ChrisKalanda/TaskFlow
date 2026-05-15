import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useAuth } from "../context/AuthContext";
import api from "../api";
import TaskCard from "../components/TaskCard";
import TaskModal from "../components/TaskModal";
import LanguageToggle from "../components/LanguageToggle";

export default function DashboardPage() {
  const { user, logout } = useAuth();
  const { t } = useTranslation();
  const [tasks, setTasks] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingTask, setEditingTask] = useState(null);

  const STATUSES = ["todo", "in_progress", "done"];

  const fetchTasks = async () => {
    const res = await api.get("/api/tasks/");
    setTasks(res.data);
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleDelete = async (id) => {
    await api.delete(`/api/tasks/${id}`);
    setTasks((prev) => prev.filter((t) => t.id !== id));
  };

  const handleEdit = (task) => {
    setEditingTask(task);
    setShowModal(true);
  };

  const handleSave = async (taskData) => {
    if (editingTask) {
      const res = await api.put(`/api/tasks/${editingTask.id}`, taskData);
      setTasks((prev) => prev.map((t) => (t.id === editingTask.id ? res.data : t)));
    } else {
      const res = await api.post("/api/tasks/", taskData);
      setTasks((prev) => [res.data, ...prev]);
    }
    setShowModal(false);
    setEditingTask(null);
  };

  const tasksByStatus = (status) => tasks.filter((t) => t.status === status);

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <h1>TaskFlow</h1>
        <div className="header-right">
          <span>{t("dashboard.hello", { username: user?.username })}</span>
          <button onClick={() => { setEditingTask(null); setShowModal(true); }} className="btn-primary">
            {t("dashboard.newTask")}
          </button>
          <button onClick={logout} className="btn-secondary">{t("dashboard.logout")}</button>
          <LanguageToggle />
        </div>
      </header>

      <div className="board">
        {STATUSES.map((status) => (
          <div key={status} className="column">
            <div className="column-header">
              <h2>{t(`dashboard.columns.${status}`)}</h2>
              <span className="count">{tasksByStatus(status).length}</span>
            </div>
            <div className="task-list">
              {tasksByStatus(status).map((task) => (
                <TaskCard
                  key={task.id}
                  task={task}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                />
              ))}
              {tasksByStatus(status).length === 0 && (
                <p className="empty">{t("dashboard.noTasks")}</p>
              )}
            </div>
          </div>
        ))}
      </div>

      {showModal && (
        <TaskModal
          task={editingTask}
          onSave={handleSave}
          onClose={() => { setShowModal(false); setEditingTask(null); }}
        />
      )}
    </div>
  );
}
