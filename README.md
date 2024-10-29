# E-Commerce Backend

This is the backend for an e-commerce application built with TypeScript, Express, Prisma, and Swagger. The application provides a robust RESTful API for managing products, orders, and users, suitable for online shopping platforms.

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Getting Started](#getting-started)
- [API Documentation](#api-documentation)
- [Database Setup](#database-setup)
- [Running the Application](#running-the-application)

## Features

- User authentication and authorization
- Product management (CRUD operations)
- Order processing and management
- Swagger API documentation for easy interaction
- Type-safe database queries using Prisma

## Technologies Used

- **TypeScript**: A strongly typed programming language that builds on JavaScript.
- **Express**: A web framework for Node.js to build web applications and APIs.
- **Prisma**: A modern ORM that simplifies database interactions and provides type safety.
- **Swagger**: API documentation tool for generating interactive API documentation.
- **Node.js**: JavaScript runtime for building scalable network applications.

## Getting Started

### Prerequisites

- Node.js (v14 or later)
- npm or Yarn
- A PostgreSQL or MySQL database

### Installation

1. Clone the repository:
   
   ```bash
   git clone https://github.com/urushahi/ecommerce-backend.git
   cd ecommerce-backend
   
2. Install the dependencies::
   
   ```bash
   npm install
   
3. Create a .env file in the root directory with the following environment variables:
   
   ```bash
   DATABASE_URL="your-database-url"
   JWT_SECRET="your-secret"

## API Documentation

The API is documented using Swagger. After starting the server, you can access the documentation at:

http://localhost:3000/api-docs


## Database Setup

Initialize the database:

```bash
npx prisma migrate dev --name init
```
## Running the Application

To start the server in development mode, run:
```bash
npm start

