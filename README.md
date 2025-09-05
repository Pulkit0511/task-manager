# 📋 Task Manager

![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)
![Prisma](https://img.shields.io/badge/Prisma-2D3748?style=for-the-badge&logo=prisma&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-336791?style=for-the-badge&logo=postgresql&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)

A full-stack task management application built with **React, Express, Prisma, and PostgreSQL**.

---

## ✨ Features

- 🔐 User authentication (signup/login with JWT)
- 📌 Create, update, delete, and filter tasks
- 🗂️ Categorize tasks (work, personal, etc.)
- 📅 Set due dates for tasks
- 📊 Task status tracking (Todo / In Progress / Done)
- 🎨 Modern responsive UI with React

---

## 🏗️ Tech Stack

- **Frontend:** React (Vite), TailwindCSS
- **Backend:** Node.js, Express.js
- **Database:** PostgreSQL (via Prisma ORM)
- **Auth:** JWT + bcrypt

---

## 🚀 Getting Started

### 1️⃣ Clone the repository

```bash
git clone https://github.com/<your-username>/task-manager.git
cd task-manager
```

### 2️⃣ Backend setup

```bash
cd server
npm install
```

Create `.env` file in `server/`

```env
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/taskmanager?schema=public"
JWT_SECRET="super-secret-change-me"
PORT=4000
CLIENT_ORIGIN=http://localhost:5173
```

Run Prisma migrations:

```bash
npx prisma generate
npx prisma db push
```

Start backend:

```bash
npm run dev
```

### 3️⃣ Frontend setup (coming soon)

```bash
cd ../client
npm install
npm run dev
```

---

## 📦 Project Structure

```
task-manager/
 ├── client/     # React frontend
 └── server/     # Express + Prisma backend
```

---

## 📝 API Endpoints

### Auth

- `POST /auth/signup` → Register user
- `POST /auth/login` → Login user

### Tasks

- `GET /tasks` → Get all tasks (filterable by status/category)
- `POST /tasks` → Create new task
- `PUT /tasks/:id` → Update task
- `DELETE /tasks/:id` → Delete task

---

## 🎯 Roadmap

- [ ] Add task priority (High/Medium/Low)
- [ ] Add reminders/notifications
- [ ] Add collaborative/shared task lists
- [ ] Deploy backend + frontend

---

## 👨‍💻 Author

Pulkit Gangwar – [GitHub](https://github.com/Pulkit0511)
