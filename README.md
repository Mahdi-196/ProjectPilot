## Description
This project is a full-stack Kanban board application that includes user authentication using JSON Web Tokens (JWTs). It allows users to securely log in and manage their work tasks. The authentication system ensures that only authorized users can access and interact with the board.

## Features
- Secure user authentication using JWTs
- Persistent user sessions via local storage
- Task management through a Kanban-style board
- Protected API routes that require authentication
- Deployment on Render with PostgreSQL as the database

## Live Demo
(https://drive.google.com/file/d/1E7V4n1faVu7cI3c4qY1ecX3-RqZHkJvZ/view?usp=sharing)

## Technologies Used
- **Frontend:** React, TypeScript, Vite
- **Backend:** Node.js, Express, Sequelize, PostgreSQL
- **Authentication:** JSON Web Tokens (JWT), bcrypt
- **Deployment:** Render (for both frontend and backend)

## Installation and Setup
### Prerequisites
- Node.js installed on your machine
- PostgreSQL database setup

### Steps to Run Locally
1. Clone the repository:
   ```sh
   git clone https://github.com/Mahdi-196/ProjectPilot.git
   cd ProjectPilot
   ```
2. Install dependencies for both frontend and backend:
   ```sh
   cd server
   npm install
   cd ../client
   npm install
   ```
3. Set up environment variables:
   Create a `.env` file in the `server` directory with the following:
   ```env
   DATABASE_URL=postgresql://<username>:<password>@<hostname>/<database>
   DB_NAME=<database_name>
   DB_USER=<username>
   DB_PASSWORD=<password>
   JWT_SECRET=<your_secret_key>
   PORT=3006
   ```
4. Run the server:
   ```sh
   cd server
   npm run dev
   ```
5. Run the client:
   ```sh
   cd client
   npm run dev
   ```

## API Endpoints
### Authentication
- `POST /auth/login` - Logs in a user and returns a JWT
- `POST /auth/register` - Registers a new user
- `GET /auth/logout` - Logs out a user

### Ticket Management
- `GET /api/tickets` - Retrieves all tickets (requires authentication)
- `POST /api/tickets` - Creates a new ticket
- `PUT /api/tickets/:id` - Updates a ticket
- `DELETE /api/tickets/:id` - Deletes a ticket

## Deployment
The application is deployed using Render:
- **Frontend URL:** [https://projectpilot-15.onrender.com](https://projectpilot-15.onrender.com)
- **Backend URL:** Configured to connect via the environment variable `DATABASE_URL`

## Issues and Fixes
- **Login Issues:** Ensure the backend is running and responding to `/auth/login`.
- **CORS Errors:** Installed `@types/cors` and configured CORS in Express.
- **Database Connection:** Verified `DATABASE_URL` in `.env` matches the Render database settings.


## INFO
[Mahdi-196](https://github.com/Mahdi-196)

## License
This project is licensed under the MIT License.

