import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useAuth } from "../context/AuthContext";
import LanguageToggle from "../components/LanguageToggle";

export default function RegisterPage() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [form, setForm] = useState({ email: "", username: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await register(form.email, form.username, form.password);
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.detail || t("auth.registerError"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-lang">
          <LanguageToggle />
        </div>
        <h1>{t("auth.appName")}</h1>
        <h2>{t("auth.register")}</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>{t("auth.email")}</label>
            <input
              type="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              required
            />
          </div>
          <div className="form-group">
            <label>{t("auth.username")}</label>
            <input
              type="text"
              value={form.username}
              onChange={(e) => setForm({ ...form, username: e.target.value })}
              required
            />
          </div>
          <div className="form-group">
            <label>{t("auth.password")}</label>
            <input
              type="password"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              required
              minLength={6}
            />
          </div>
          {error && <p className="error">{error}</p>}
          <button type="submit" disabled={loading} className="btn-primary">
            {loading ? t("auth.creating") : t("auth.createAccount")}
          </button>
        </form>
        <p>
          {t("auth.alreadyAccount")} <Link to="/login">{t("auth.signIn")}</Link>
        </p>
      </div>
    </div>
  );
}
