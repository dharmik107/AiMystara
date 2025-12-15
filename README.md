# AiMystara

AiMystara is an AI-powered branding and digital automation company website. This project features a modern, Apple-inspired minimal design built with React and Tailwind CSS, backed by a Node.js/Express server and MySQL database.

## Tech Stack

- **Frontend:** React, Vite, Tailwind CSS (CDN), Framer Motion, Lucide React
- **Backend:** Node.js, Express
- **Database:** MySQL
- **Tooling:** TypeScript, Vite

## Prerequisites

Before you begin, ensure you have met the following requirements:
- **Node.js** installed (v18+ recommended)
- **MySQL** installed and running

## Setup

1.  **Install Dependencies**
    ```bash
    npm install
    ```

2.  **Database Configuration**
    - Create a MySQL database named `aimystara`.
    - Import the schema from `server/schema.sql` to create the necessary tables.
    - (Optional) Run `node server/init-db.js` to initialize the database with seed data.

    ```bash
    # Example command to run schema (if mysql is in your path)
    mysql -u root -p aimystara < server/schema.sql
    ```


## Running the Application

This project requires both the backend server and the frontend client to be running.

1.  **Start the Backend Server**
    Open a terminal and run:
    ```bash
    node server/index.js
    # or if you have nodemon installed
    npx nodemon server/index.js
    ```
    The server will start on `http://localhost:5000`.

2.  **Start the Frontend Client**
    Open a new terminal configuration and run:
    ```bash
    npm run dev
    ```
    The site will be available at `http://localhost:5173` (or the port shown in the terminal).

## Features

- **Dynamic Content:** Services, Jobs, and Applications are managed via the database.
- **Admin Panel:** Secure admin dashboard to manage content.
    - **Login:** `/login`
    - **Dashboard:** `/admin`
- **Responsive Design:** Fully responsive layout with premium animations.

