# 🏢 Smart HRMS

A full-stack **Human Resource Management System** with role-based access control, built with React, Node.js, and MongoDB Atlas.

🔗 **Live Demo:** [smart-hrms.vercel.app](https://smart-hrms-project-b9lx.vercel.app)

---

## ✨ Features

### 👑 Admin
- View all employees & add new ones
- Approve or reject leave requests
- View attendance records of all employees
- Access full dashboard with analytics

### 👤 Employee
- Mark daily attendance (Present / Absent / Leave)
- Apply for leave via form
- Edit own profile
- View personal dashboard

> ⚠️ Employees cannot access Admin routes. Role-based protection is enforced on both frontend and backend.

---

## 🛠️ Tech Stack

| Layer | Tech |
|-------|------|
| Frontend | React, Tailwind CSS, Framer Motion |
| Backend | Node.js, Express.js |
| Database | MongoDB Atlas |
| Auth | JWT (JSON Web Tokens) |
| Deployment | Vercel (Frontend), Render (Backend) |

---

## 🚀 Getting Started

### 1. Clone the repo

```bash
git clone https://github.com/Aiman2027/smart-hrms-project.git
cd smart-hrms-project
```

### 2. Setup Backend

```bash
cd backend
npm install
```

Create a `.env` file in `/backend`:

```env
MONGO_URI=your_mongodb_atlas_uri
JWT_SECRET=your_jwt_secret
PORT=5000
```

```bash
npm start
```

### 3. Setup Frontend

```bash
cd frontend
npm install
npm run dev
```

---

## 🔐 Test Credentials

| Role | Email | Password |
|------|-------|----------|
| Admin | fatma@gmail.com | 1234 |

---

## 📁 Project Structure

```
smart-hrms-project/
├── backend/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   └── server.js
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   └── utils/
│   └── index.html
```

---

## 👨‍💻 Author

**Aiman** — [GitHub](https://github.com/Aiman2027)

---

⭐ If you like this project, give it a star!
