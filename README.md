# Tedbus Project

This project appears to be a bus management system, likely involving both a frontend (built with Angular) and a backend (Node.js). It seems to handle bus data, route data, and potentially includes features like Firebase messaging and Twilio integration for communication.

## Project Structure

- `frontend/`: Contains the Angular application for the user interface.
- `frontend/server/`: Houses the Node.js backend, including controllers, models, and routes.
- `busdata.json`, `routedata.json`: Likely contain static or initial data for buses and routes.

## Installation

To set up the project, you will need to install dependencies for both the frontend and the backend.

### Frontend

Navigate to the `frontend` directory and install the Angular dependencies:

```bash
cd frontend
npm install
```

### Backend

Navigate to the `frontend/server` directory and install the Node.js dependencies:

```bash
cd frontend/server
npm install
```

## Usage

### Running the Backend Server

From the `frontend/server` directory, you can start the backend server:

```bash
cd frontend/server
node index.js
```

### Running the Frontend Application

From the `frontend` directory, you can serve the Angular application:

```bash
cd frontend
ng serve
```

This will typically open the application in your browser at `http://localhost:4200/`.
