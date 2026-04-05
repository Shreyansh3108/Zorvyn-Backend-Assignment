# Zorvyn Finance API

A secure, role-based backend REST API for managing personal financial records and generating dashboard analytics. Built with Node.js, Express, and MongoDB.

## Features
- **Role-Based Access Control (RBAC):** Users are assigned roles (`viewer`, `analyst`, `admin`). Only Admins can modify or delete transaction records.
- **JWT Authentication:** Secure stateless authentication for all private routes.
- **Advanced Aggregations:** Uses MongoDB aggregation pipelines to dynamically calculate total income, expenses, and a rolling 30-day spending metric.
- **Custom Logging:** Includes middleware for tracking API request hits.

## Tech Stack
- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** MongoDB (Mongoose ORM)
- **Security:** bcryptjs (password hashing), jsonwebtoken (auth)

## Local Setup

1. **Clone the repository**
   ```bash
   git clone <your-repo-link-here>
   cd zorvyn-backend