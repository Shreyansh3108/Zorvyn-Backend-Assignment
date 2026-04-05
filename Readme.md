#  Zorvyn Finance API

> **A Production-Grade Ledger.** A secure, role-based backend REST API demonstrating clean architecture, data aggregation, and resource-level authorization for an SDE technical assessment.

[![Node.js](https://img.shields.io/badge/Node.js-Backend-339933?style=for-the-badge&logo=nodedotjs)](https://nodejs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Database-47A248?style=for-the-badge&logo=mongodb)](https://www.mongodb.com/)
[![Express.js](https://img.shields.io/badge/Express.js-Framework-000000?style=for-the-badge&logo=express)](https://expressjs.com/)

---

##  Overview

**Zorvyn Finance API** is a specialized Node.js/Express backend built as a technical take-home assignment. It serves as a financial ledger system where users can securely record income and expenses, while a built-in analytics engine calculates real-time dashboard metrics.

The project strictly adheres to the **Controller-Service-Model** design pattern, ensuring that business logic is cleanly separated from HTTP transport layers. It features comprehensive JWT-based authentication and a robust Role-Based Access Control (RBAC) system.

##  The Challenge
Technical assessments often test basic CRUD capabilities, but real-world financial systems require:
* **Mathematical Efficiency:** Performing heavy calculations on large datasets without crashing the Node.js event loop.
* **Granular Security:** Ensuring that even authenticated users cannot modify or delete records they do not own.
* **Maintainability:** Structuring code so that future developers can easily add new routes or database models without untangling spaghetti code.

##  Architecture & Solutions

The application is engineered for security and scalability, utilizing modern backend paradigms.

### Core Architecture (Controller-Service-Model)
* **Controllers:** Act purely as traffic cops—validating incoming HTTP requests and formatting JSON responses.
* **Services:** Contain 100% of the business logic and database interactions, making the system highly testable and modular.
* **Middleware Pipeline:** Custom interceptors handle JWT verification, role authorization (`viewer`, `analyst`, `admin`), and custom terminal request logging.

### The Dashboard Aggregation Engine
Instead of downloading thousands of transaction documents into the JavaScript runtime to calculate totals, the API leverages **MongoDB Aggregation Pipelines**. Using `$match` and `$group` operators, the database natively calculates total income, total expenses, and a rolling **30-day trailing expense** metric, returning a lightweight JSON object to the client in milliseconds.

---

## 🛠️ Tech Stack

* **Runtime:** Node.js
* **Framework:** Express.js
* **Database:** MongoDB Atlas (NoSQL)
* **ODM:** Mongoose
* **Security:** `bcryptjs` (Cryptographic hashing), `jsonwebtoken` (Stateless auth)

---

##  Key Engineering Decisions

### 1. Resource-Level Ownership Authorization
Standard RBAC isn't enough for financial data. In the `finance.service.js`, the update and delete methods explicitly require the `userId`. This ensures an Admin cannot accidentally (or maliciously) delete a transaction created by another user, providing strict resource-level isolation.

### 2. Custom Logging Middleware
To simulate a production environment, a custom interceptor was built into `app.js` to log all incoming API hits (`[API HIT] GET /api/dashboard/summary`). This provides immediate visibility into traffic flow without relying on heavy third-party logging libraries during development.

### 3. Database Indexing
The `FinanceRecord` model utilizes targeted indexing on `createdBy`, `type`, and `category`. This ensures that as the ledger grows to millions of rows, the dashboard aggregation queries remain highly performant.

---

##  Setup Instructions

### Prerequisites
* Node.js (v18+)
* MongoDB Atlas Cluster URI
* Git

### Installation

1. **Clone the Repository**
   ```bash
   git clone <your-github-repo-link-here>
   cd zorvyn-backend
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Configure Environment Variables**
   Create a `.env` file in the root directory and add your secure keys:
   ```env
   PORT=5000
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_super_secret_dev_key
   ```

4. **Boot the Server**
   ```bash
   npm run dev
   ```

---

## 🧪 Testing with Postman

To test the private routes in this API, you will need to authenticate:
1. Make a `POST` request to `/api/users/login` with your credentials.
2. Copy the `token` string from the JSON response.
3. For all `/api/finance` and `/api/dashboard` requests, go to the **Authorization** tab in Postman.
4. Select **Bearer Token** and paste your token into the field.

---

## 📡 API Endpoints

###  Authentication (`/api/users`)
| Method | Route | Description | Auth Required |
| :--- | :--- | :--- | :--- |
| `POST` | `/register` | Create a new user account | ❌ |
| `POST` | `/login` | Authenticate and receive JWT | ❌ |

###  Transactions (`/api/finance`)
| Method | Route | Description | Auth Required |
| :--- | :--- | :--- | :--- |
| `GET` | `/` | Fetch all records for the logged-in user | ✅ (Any Role) |
| `POST` | `/` | Create a new financial record | ✅ (Admin) |
| `PUT` | `/:id` | Update an owned record | ✅ (Admin) |
| `DELETE` | `/:id` | Permanently delete an owned record | ✅ (Admin) |

###  Analytics (`/api/dashboard`)
| Method | Route | Description | Auth Required |
| :--- | :--- | :--- | :--- |
| `GET` | `/summary` | Retrieve aggregated totals, 30-day rolling expenses, and recent feed | ✅ (Any Role) |

---
*Developed by Shreyansh Dwivedi as a technical assessment for backend engineering.*
