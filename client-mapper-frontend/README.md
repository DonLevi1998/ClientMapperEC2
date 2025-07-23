# Client Mapper Frontend

This project is the frontend for the distributed system "Client Mapper". It is built with Angular and provides a modern, responsive web interface for user and product management.

## Features

- **User Management:**
  - List, create, edit, and delete users.
  - Modal forms for user creation and editing.
  - Success and error messages for all actions.
- **Product Management:**
  - List, create, edit, and delete products.
  - Modal forms for product creation and editing.
  - Success and error messages for all actions.
- **Authentication:**
  - Login form with role-based redirection (admin/main menu).
  - Create user (registration) form.
- **Responsive Design:**
  - Modern UI with sidebar navigation and modals.

## Architecture

- **Framework:** Angular (standalone components, Angular 16+)
- **Build & Serve:**
  - Multi-stage Docker build (Node.js for build, Nginx for serving static files)
  - Custom `nginx.conf` for SPA routing

## External Services

This frontend interacts with several backend microservices via REST APIs:

- **User Services:**
  - Create, update, delete, list, and find users
- **Product Services:**
  - Create, update, delete, list, and find products
- **Authentication Service:**
  - Login and role verification
- **Password Hash Service:**
  - Password hashing for user registration

All API endpoints are configured in the `enviroments.ts` file for easy modification.

## How to Run (Docker)

1. Build the Docker image:
   ```sh
   docker build -t client-mapper-frontend .
   ```
2. Run the container:
   ```sh
   docker run -p 8080:80 client-mapper-frontend
   ```
3. Access Local the app at [http://localhost:8080](http://localhost:8080)

## Development

- Install dependencies:
  ```sh
  npm install
  ```
- Run locally:
  ```sh
  npm start
  # or
  ng serve
  ```
- The app will be available at [http://localhost:4200](http://localhost:4200)

## Project Structure

- `src/app/` - Angular components and logic
- `src/enviroments/` - API endpoint configuration
- `Dockerfile` - Multi-stage build and Nginx setup
- `nginx.conf` - Nginx configuration for SPA

## Notes

- This frontend is designed to work with the full Client Mapper distributed backend system. Make sure all required backend services are running and accessible.
- For API endpoints and ports, see `src/enviroments/enviroments.ts`.
- For any issues or contributions, please open an issue or pull request.
