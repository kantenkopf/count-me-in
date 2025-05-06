# ⚡ Siemens Energy Lab - Code Challenge

## 📚 Table of Contents
1. [📝 Project Overview](#project-overview)  
2. [🔧 Prerequisites](#prerequisites)  
3. [📂 Folder Structure](#folder-structure)  
4. [🌐 Environment Variables](#environment-variables)  
5. [🚀 How to Use](#how-to-use)  
   5.1 [🏃‍♂️ Running the Project](#running-the-project)  
   5.2 [⚙️ Configuration](#configuration)  
6. [🛠️ Project Approach](#project-approach)  
7. [🌟 Future Improvements](#future-improvements)  
8. [📜 NPM Scripts](#npm-scripts)  
   8.1 [📥 Installation](#installation)  
   8.2 [💻 Development](#development)  
   8.3 [🌐 Production](#production)  
   8.4 [🏗️ Build](#build)  
   8.5 [🧪 Testing](#testing)  
   8.6 [🧹 Linting and Formatting](#linting-and-formatting)  
   8.7 [🗑️ Cleaning](#cleaning)

---

## 📝 Project Overview

This project is a real-time counter application built as part of the Siemens Energy Lab Code Challenge. It allows multiple clients to interact with a shared counter in real-time using WebSocket communication. The project is structured as a monorepo, with a Vue.js frontend and a Node.js backend powered by `socket.io`. The backend manages the counter state and history, while the frontend provides an interactive user interface.

---

## 🔧 Prerequisites

To run this project, ensure you have the following tools installed:

- **Node.js**: Version 16 or higher  
- **npm**: Version 7 or higher (comes with Node.js)  
- **Git**: For cloning the repository (optional)  

You can verify your installed versions with:
```bash
node -v
npm -v
git --version
```

---

## 📂 Folder Structure

The project is organized as a monorepo using npm workspaces. Below is an overview of the folder structure:

```
packages/
  client/   # Frontend Vue.js application
   src/    # Source code for the client
    components/  # Vue components
    views/       # Application views (pages)
    env/         # Environment-specific configurations
   public/        # Static assets (e.g., favicon, index.html)
   tests/         # Unit tests for the client
  server/   # Backend Node.js application
   src/    # Source code for the server
    sockets/     # WebSocket namespaces and stores
    helpers/     # Utility functions (e.g., environment handling)
    types/       # TypeScript type definitions
   test/          # Unit tests for the server
```

- **Client**: The frontend is built with Vue.js and provides the user interface for interacting with the counter.  
- **Server**: The backend is built with Node.js and `socket.io`, managing the counter state and handling WebSocket events.

---

## 🌐 Environment Variables

The project uses environment variables to configure runtime behavior. Below is a list of required variables and their default values:

### Backend (server)
| Variable   | Description                        | Default Value         |
|------------|------------------------------------|-----------------------|
| `NODE_ENV` | Environment mode (`dev` or `prod`) | `dev`                 |
| `PORT`     | Port for the server                | `3000`                |
| `CLIENT_URL` | URL of the client (only in dev mode) | `http://localhost:8080` |

### Frontend (client)
| Variable            | Description                              | Default Value         |
|---------------------|------------------------------------------|-----------------------|
| `SOCKET_URL_COUNTER` | WebSocket URL for the counter namespace | `http://localhost:3000/counter` |

### Updating Environment Variables

- **Backend**: Set them in your terminal or CI/CD pipeline.  
- **Frontend**: Modify the files in `env/`:
  - `env.dev.ts` for development  
  - `env.prod.ts` for production  

Example for setting environment variables in the terminal:
```bash
export NODE_ENV=prod
export PORT=4000
export CLIENT_URL=http://localhost:8080
```

---

## 🚀 How to Use

### 🏃‍♂️ Running the Project
- **Run Production Build Locally:**
  ```bash
  npm run server:prod
  ```
  This serves the pre-built production files locally.

- **Build and Run Production:**
  ```bash
  npm install
  npm run prod
  ```
  Installs dependencies, runs all test suites (client & server), builds the packages, and starts the production server at `http://localhost:3000`.

- **Run in Development Mode:**
  ```bash
  npm install
  npm run dev
  ```
  Runs both the client and server concurrently in development mode using `concurrently`. For individual instances:
  - Client: `npm run client:dev`
  - Server: `npm run server:dev`

### ⚙️ Configuration
- Update `package.json` to configure desired ports and `client_url` for the server and client.
- For deployment, update the `SOCKET_URL_COUNTER` in `packages/client/src/env/env.prod.ts` to avoid CORS errors.

---

## 🛠️ Project Approach

This project is structured as a monorepo using npm workspaces to reduce dependency duplication. Key considerations include:

1. **Vue CLI Constraints:** Since `vue-cli` does not natively support npm workspaces, plugins were installed manually.
2. **TypeScript Consistency:** A custom TS Node server was built to ensure consistent TypeScript versions across client and server.
3. **Testing Framework:** Jest was chosen over Vitest due to better integration with Webpack.

Environment variables are passed via the command line, eliminating the need for `.env` files. `socket.io` was used for real-time synchronization, with a global counter-store implemented under a `/counter` namespace.

---

## 🌟 Future Improvements

While the current implementation meets the requirements, the following enhancements are recommended for future iterations:

- **Shared Types:** Introduce shared types for socket events and environment modes to improve type safety and maintainability.
- **Enhanced Test Suites:** Expand test coverage, particularly for the backend, and rework the server's production mode test suite for better reliability.

---

## 📜 NPM Scripts

### 📥 Installation
- **Install Dependencies:**
  ```bash
  npm install
  ```

### 💻 Development
- **Run Both Client and Server:**
  ```bash
  npm run dev
  ```
- **Run Client Only:**
  ```bash
  npm run client:dev
  ```
- **Run Server Only:**
  ```bash
  npm run server:dev
  ```

### 🌐 Production
- **Run Production Server:**
  ```bash
  npm run server:prod
  ```
- **Build and Run Production:**
  ```bash
  npm run prod
  ```
- **Run Production without building:**
  ```bash
  npm run prod:nobuild
  ```

### 🏗️ Build
- **Build All:**
  ```bash
  npm run build
  ```
- **Build Client Only:**
  ```bash
  npm run build:client
  ```
- **Build Server Only:**
  ```bash
  npm run build:server
  ```

### 🧪 Testing
- **Run All Tests:**
  ```bash
  npm run test
  ```
- **Run Client Tests:**
  ```bash
  npm run test:client
  ```
- **Run Server Tests:**
  ```bash
  npm run test:server
  ```

### 🧹 Linting and Formatting
- **Lint All Code:**
  ```bash
  npm run lint
  ```
- **Lint Client Code:**
  ```bash
  npm run lint:client
  ```
- **Lint Server Code:**
  ```bash
  npm run lint:server
  ```
- **Format Code:**
  ```bash
  npm run format
  ```

### 🗑️ Cleaning
- **Clean Everything:**
  ```bash
  npm run clean:all
  ```
- **Clean Modules Only:**
  ```bash
  npm run clean:modules
  ```
- **Clean Build Artifacts:**
  ```bash
  npm run clean:dist
  ```

---
