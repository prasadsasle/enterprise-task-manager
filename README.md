# Enterprise Task Management System

> Built by **Prasad Sasle** — Java 17 | Spring Boot 3 | PostgreSQL | React | Docker | JWT | Swagger

A full-stack enterprise task management application built with a **microservices architecture**.
Designed with security, scalability, and maintainability in mind — directly relevant to banking and enterprise environments.

---

## 📸 Screenshots

### Main Dashboard
<img width="838" height="582" alt="Main Dashboard" src="https://github.com/user-attachments/assets/074d69a7-dd86-4e10-9576-16e91274a41e" />

### Application Overview
<img width="850" height="537" alt="Application Overview" src="https://github.com/user-attachments/assets/7a93f8f1-d95f-47e3-b76f-90ffba14be9f" />

---

## 🚀 Tech Stack

| Layer | Technology |
|-------|-----------|
| Backend | Java 17, Spring Boot 3.x, Spring Security |
| Auth | JWT (JSON Web Tokens) — Role-Based Access Control |
| Database | PostgreSQL, Spring Data JPA, Hibernate |
| Frontend | React 19, Tailwind CSS, Axios |
| DevOps | Docker, Docker Compose, GitHub |
| API Docs | Swagger / OpenAPI 3.0 |

---

## 🏗️ Architecture — 3 Microservices

| Service | Port | Responsibility |
|---------|------|----------------|
| auth-service | 8081 | User registration, login, JWT token generation |
| employee-service | 8082 | Employee CRUD, profile management |
| task-service | 8083 | Task CRUD, assignment, status, pagination, filtering |

```
project-root/
├── frontend/
│   ├── src/
│   │   ├── components/       # Login, TaskList, TaskForm, EmployeeList
│   │   └── services/         # auth.js, task.js, employee.js
│   └── package.json
├── backend/
│   ├── auth-service/         # Port 8081 — JWT Auth
│   ├── employee-service/     # Port 8082 — Employee Management
│   └── task-service/         # Port 8083 — Task Management
├── docker-compose.yml
└── README.md
```

---

## ✨ Features

- 🔐 JWT-based authentication with **Role-Based Access Control (ADMIN / EMPLOYEE)**
- 👤 User registration with role assignment (ADMIN or EMPLOYEE)
- ✅ Task lifecycle management: `TODO` → `IN_PROGRESS` → `DONE`
- 📋 Assign tasks to employees, filter by status, paginate results
- 🚫 ADMIN-only DELETE protection enforced at the API level
- 🔒 Protected React routes with JWT token expiry handling
- 📄 Swagger UI API documentation on each service
- 🐳 Full Docker Compose setup for one-command deployment

---

## 📝 API Endpoints

### Auth Service (Port 8081)
| Method | Endpoint | Access | Description |
|--------|----------|--------|-------------|
| POST | /auth/register | Public | Register with role: ADMIN or EMPLOYEE |
| POST | /auth/login | Public | Login — returns JWT token + role |

### Employee Service (Port 8082)
| Method | Endpoint | Access | Description |
|--------|----------|--------|-------------|
| GET | /employees | ADMIN/EMPLOYEE | Get all employees |
| POST | /employees | ADMIN/EMPLOYEE | Create employee |
| PUT | /employees/{id} | ADMIN/EMPLOYEE | Update employee |
| DELETE | /employees/{id} | ADMIN only | Delete employee |

### Task Service (Port 8083)
| Method | Endpoint | Access | Description |
|--------|----------|--------|-------------|
| GET | /tasks | ADMIN/EMPLOYEE | Get all tasks |
| GET | /tasks/paginated | ADMIN/EMPLOYEE | Paginated task list |
| GET | /tasks/filter?status= | ADMIN/EMPLOYEE | Filter by status |
| GET | /tasks/employee/{id} | ADMIN/EMPLOYEE | Tasks by employee |
| POST | /tasks | ADMIN/EMPLOYEE | Create task |
| PUT | /tasks/{id} | ADMIN/EMPLOYEE | Update task |
| DELETE | /tasks/{id} | **ADMIN only** | Delete task |

---

## 🔐 Environment Variables

Create a `.env` file in your project root:

```env
# Database Configuration
DB_USERNAME=your_username
DB_PASSWORD=your_password
DB_HOST=localhost
DB_PORT=5432

# Frontend API URLs
VITE_AUTH_API_URL=http://localhost:8081/auth
VITE_EMPLOYEE_API_URL=http://localhost:8082/employees
VITE_TASK_API_URL=http://localhost:8083/tasks
```

> Never commit your `.env` file — it is already in `.gitignore`

---

## 🛠️ Prerequisites

- Java 17+
- Node.js 16+ & npm
- Maven 3.6+
- Docker & Docker Compose

---

## 🚀 Getting Started

### Option 1 — Docker (Recommended)

```bash
git clone https://github.com/prasadsasle/enterprise-task-manager.git
cd enterprise-task-manager
docker-compose up --build
```

- Frontend: http://localhost:3000
- Auth API Docs: http://localhost:8081/swagger-ui/index.html
- Task API Docs: http://localhost:8083/swagger-ui/index.html

---

### Option 2 — Manual Setup

**1. Start PostgreSQL**
```bash
docker run --name postgres-db -e POSTGRES_PASSWORD=your_password -p 5432:5432 -d postgres
```

**2. Create Databases**
```sql
CREATE DATABASE auth_db;
CREATE DATABASE employee_db;
CREATE DATABASE task_db;
```

**3. Configure application.properties for each service**

Auth Service:
```properties
spring.application.name=auth-service
server.port=8081
spring.datasource.url=jdbc:postgresql://localhost:5432/auth_db
spring.datasource.username=${DB_USERNAME}
spring.datasource.password=${DB_PASSWORD}
```

Employee Service:
```properties
spring.application.name=employee-service
server.port=8082
spring.datasource.url=jdbc:postgresql://localhost:5432/employee_db
spring.datasource.username=${DB_USERNAME}
spring.datasource.password=${DB_PASSWORD}
```

Task Service:
```properties
spring.application.name=task-service
server.port=8083
spring.datasource.url=jdbc:postgresql://localhost:5432/task_db
spring.datasource.username=${DB_USERNAME}
spring.datasource.password=${DB_PASSWORD}
```

**4. Run Backend Services**
```bash
# Terminal 1
cd backend/auth-service && mvn spring-boot:run

# Terminal 2
cd backend/employee-service && mvn spring-boot:run

# Terminal 3
cd backend/task-service && mvn spring-boot:run
```

**5. Run Frontend**
```bash
cd frontend/task-tracker-ui
npm install
npm run dev
```

Frontend available at: http://localhost:5173

---

## 👤 Author

**Prasad Sasle**
- GitHub: [@prasadsasle](https://github.com/prasadsasle)
- Built for enterprise environments with JP Morgan-style architecture

---

## 📄 License

This project is licensed under the MIT License.
