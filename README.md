# TaskFlow

A full-stack task management app built with FastAPI, PostgreSQL and React — featuring JWT authentication and a Kanban board.

## 📸 Application Preview

### 🔐 Login
<img src="screenshots/login.png" width="700">

### 📝 Register
<img src="screenshots/register.png" width="700">

### 📋 Dashboard
<img src="screenshots/dashboard.png" width="700">

### ➕ New Task
<img src="screenshots/new-task.png" width="700">

## Tech Stack

| Layer    | Technology                          |
|----------|-------------------------------------|
| Backend  | Python 3.12, FastAPI, SQLAlchemy    |
| Database | PostgreSQL 18                       |
| Auth     | JWT (python-jose + passlib/bcrypt)  |
| Frontend | React 19, Vite, React Router, Axios |

## Features

- User registration & login with JWT
- Kanban board with 3 columns: To Do / In Progress / Done
- Create, edit and delete tasks
- Priority levels (Low / Medium / High)
- Due dates
- Protected routes (auto-redirect if not logged in)

## Prerequisites

- **Python 3.12** (do not use 3.13+ — `psycopg2-binary` and `pydantic-core` have no pre-built wheels for those versions)
- Node.js 18+
- PostgreSQL 18 installed and running

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/YOUR_USERNAME/taskflow.git
cd taskflow
```

### 2. Set up the backend

```bash
cd backend

# Create and activate virtual environment (Python 3.12)
py -3.12 -m venv venv
venv\Scripts\activate        # Windows
# source venv/bin/activate   # Mac/Linux

# Install dependencies
pip install -r requirements.txt
```

### 3. Configure environment variables

Create a `.env` file in the `backend/` folder based on `.env.example`:

```
DATABASE_URL=postgresql://postgres:YourPassword@localhost/taskflow
SECRET_KEY=a-long-random-secret-key
ALLOWED_ORIGINS=http://localhost:5173
```

### 4. Create the PostgreSQL database

```sql
CREATE DATABASE taskflow;
```

On Windows with PostgreSQL 18 (if `psql` is not in PATH):

```powershell
& "C:\Program Files\PostgreSQL\18\bin\psql.exe" -U postgres -P pager=off -c "CREATE DATABASE taskflow;"
```

### 5. Start the backend

```bash
uvicorn app.main:app --reload
```

API available at `http://localhost:8000`
Swagger docs at `http://localhost:8000/docs`

### 6. Set up and start the frontend

```bash
cd frontend
npm install
npm run dev
```

App available at `http://localhost:5173`

## Deployment

This project is configured for deployment on **Railway** (backend + PostgreSQL) and **Vercel** (frontend).

### Backend — Railway

1. Go to [railway.app](https://railway.app) and connect your GitHub repo
2. Set the root directory to `backend`
3. Add a PostgreSQL service — Railway will set `DATABASE_URL` automatically
4. Add the following environment variables:
   ```
   SECRET_KEY=a-long-random-secret-key
   ALLOWED_ORIGINS=https://your-app.vercel.app
   ```

### Frontend — Vercel

1. Go to [vercel.com](https://vercel.com) and connect your GitHub repo
2. Set the root directory to `frontend`
3. Add the following environment variable:
   ```
   VITE_API_URL=https://your-backend.railway.app
   ```

## Project Structure

```
taskflow/
├── backend/
│   ├── app/
│   │   ├── main.py          # FastAPI entry point
│   │   ├── database.py      # SQLAlchemy connection
│   │   ├── models.py        # ORM models (User, Task)
│   │   ├── schemas.py       # Pydantic schemas
│   │   ├── auth.py          # JWT + password hashing
│   │   └── routers/
│   │       ├── auth.py      # /api/auth/*
│   │       └── tasks.py     # /api/tasks/*
│   ├── requirements.txt
│   ├── Procfile             # Railway start command
│   ├── runtime.txt          # Python version for Railway
│   ├── .env                 # Environment variables (not committed)
│   └── .env.example         # Environment variables template
└── frontend/
    └── src/
        ├── App.jsx
        ├── api.js            # Configured Axios client
        ├── context/
        │   └── AuthContext.jsx
        ├── pages/
        │   ├── LoginPage.jsx
        │   ├── RegisterPage.jsx
        │   └── DashboardPage.jsx
        └── components/
            ├── TaskCard.jsx
            └── TaskModal.jsx
```

## API Endpoints

| Method | Route              | Description        | Auth |
|--------|--------------------|--------------------|------|
| POST   | /api/auth/register | Create an account  | No   |
| POST   | /api/auth/login    | Login (JWT token)  | No   |
| GET    | /api/auth/me       | Get current user   | Yes  |
| GET    | /api/tasks/        | List tasks         | Yes  |
| POST   | /api/tasks/        | Create a task      | Yes  |
| GET    | /api/tasks/{id}    | Get a task         | Yes  |
| PUT    | /api/tasks/{id}    | Update a task      | Yes  |
| DELETE | /api/tasks/{id}    | Delete a task      | Yes  |
