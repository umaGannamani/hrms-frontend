📘 HRMS – Employees, Teams & Logs Management System

A full-stack HR Management System built using:

Frontend: React.js

Backend: Node.js + Express

Database: SQLite (Sequelize ORM)

Auth: JWT Authentication

Features: Employees CRUD, Teams CRUD, Assign/Unassign team members, Logs tracking
🚀 Features
✅ Employees Module
Add employee
Update employee
Delete employee
View all employees
Automatically generate log entry

✅ Teams Module
Create team
Update team
Delete team
View all teams
Assign employee to team
Unassign employee from team
Logs every action

✅ Logs Module
Track actions (create, update, delete, assign, unassign)
Shows who did what and when
Stored in Logs table in SQLite
Protected using JWT
Supports delete logs (admin)

🔐 Authentication
User login returns JWT token
Protected routes require Authorization: Bearer <token>
Token stores:
userId
orgId

📁 Project Structure
backend/
│── controllers/
│   ├── EmployeeController.js
│   ├── TeamController.js
│   ├── LogController.js
│── middleware/
│   ├── authMiddleware.js
│── models/
│   ├── Employees.js
│   ├── Teams.js
│   ├── Users.js
│   ├── Organisations.js
│   ├── EmployeeTeams.js
│   ├── Logs.js
│── routes/
│   ├── employeeRoutes.js
│   ├── teamRoutes.js
│   ├── logRoutes.js
│── server.js
│── database.sqlite
│── .env

frontend/
│── src/
│   ├── api.js
│   ├── pages/
│   │   ├── Employees.js
│   │   ├── Teams.js
│   │   ├── Logs.js
│   ├── components/
│── package.json


🛠 Backend API Documentation
🔹 Employees API
Method	Endpoint	Description
GET	/api/employees	Get all employees for organisation
GET	/api/employees/:id	Get employee by ID
POST	/api/employees	Create employee
PUT	/api/employees/:id	Update employee
DELETE	/api/employees/:id	Delete employee
🔹 Teams API
Method	Endpoint	Description
GET	/api/teams	Get all teams
POST	/api/teams	Create new team
PUT	/api/teams/:id	Update team
DELETE	/api/teams/:id	Delete team
🔹 Team Assignment API
Method	Endpoint	Description
POST	/api/teams/:teamId/assign	Assign a user or multiple users
DELETE	/api/teams/:teamId/unassign	Unassign from team

Example body (single):

{
  "employeeId": 5
}


Example body (batch):

{
  "employeeIds": [1, 2, 3]
}

🔹 Logs API
Method	Endpoint	Description
GET	/api/logs	Get all logs
DELETE	/api/logs/:id	Delete a log

Log format example:

{
  "userId": 1,
  "orgId": 1,
  "action": "employee_created",
  "details": "Employee John Doe was created",
  "severity": "info"
}
▶️ Running the Backend
1. Install dependencies
cd backend
npm install

2. Configure .env
JWT_SECRET=your_secret_key
PORT=5000

3. Start Backend
node server.js
💻 Running the Frontend
1. Install dependencies
cd frontend
npm install

2. Start React App
npm start

📌 Tech Used
React.js (Hooks)
Node.js + Express.js
SQLite (Sequelize ORM)
JWT Authentication
CORS Enabled
REST API Architecture

📦 Deployment
You can deploy to:
Render (backend) : https://backend-hrms-atq5.onrender.com

Vercel (frontend) : https://hrms-frontend-mu.vercel.app/

Set environment variables based on render panel.
🎯 Conclusion
This HRMS system gives:
Clean API architecture
Secure auth
Full logs tracking
Simple relational structure
Frontend integration
