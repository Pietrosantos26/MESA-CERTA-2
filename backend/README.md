# Express MVP Backend

A Node.js and Express backend following the MVP (Model-View-Presenter) architecture pattern with PostgreSQL integration.

## Features

- RESTful API endpoints for CRUD operations
- PostgreSQL database integration with connection pooling
- JWT authentication and authorization
- Input validation and error handling
- Environment-based configuration
- Logging system for monitoring and debugging
- API documentation with Swagger

## Project Structure

```
src/
├── config/         # Configuration files
│   ├── db.js       # Database configuration
│   └── swagger.js  # Swagger configuration
├── middleware/     # Custom middleware
│   ├── authMiddleware.js     # Authentication middleware
│   └── errorMiddleware.js    # Error handling middleware
├── models/         # Database models
│   ├── userModel.js          # User model
│   └── itemModel.js          # Item model
├── presenters/     # Business logic (presenters)
│   ├── userPresenter.js      # User presenter
│   └── itemPresenter.js      # Item presenter
├── routes/         # API routes
│   ├── index.js              # Main router
│   ├── userRoutes.js         # User routes
│   └── itemRoutes.js         # Item routes
├── utils/          # Utility functions
│   ├── logger.js              # Logging utility
│   └── responseFormatter.js   # Response formatting utility
├── db/             # Database scripts
│   └── init.sql               # Database initialization script
└── server.js       # Entry point
```

## Getting Started

### Prerequisites

- Node.js (v14 or later)
- PostgreSQL database

### Setup

1. Clone the repository
2. Install dependencies: `npm install`
3. Create a `.env` file based on `.env.example`
4. Set up PostgreSQL database
5. Run the database initialization script in `src/db/init.sql`

### Running the Server

- Development mode: `npm run dev`
- Production mode: `npm start`

### API Documentation

Once the server is running, you can access the Swagger documentation at:
`http://localhost:3000/api-docs`

## Authentication

The API uses JWT (JSON Web Token) for authentication:

1. Register a new user: `POST /api/users/register`
2. Login to get a token: `POST /api/users/login`
3. Use the token in the `x-auth-token` header for protected routes

## API Endpoints

### Users

- `POST /api/users/register` - Register a new user
- `POST /api/users/login` - Login and get token
- `GET /api/users/profile` - Get current user profile
- `PUT /api/users/profile` - Update user profile
- `DELETE /api/users` - Delete user account

### Items

- `GET /api/items` - Get all items for the authenticated user
- `POST /api/items` - Create a new item
- `GET /api/items/:id` - Get an item by ID
- `PUT /api/items/:id` - Update an item
- `DELETE /api/items/:id` - Delete an item