# Learn Quiz API Project

## Project Overview

This is a FeathersJS-based API project named "QuizFromContent" that is built to handle quiz content through a REST API with real-time capabilities. The project is built with NodeJS, TypeScript, and uses PostgreSQL as its database. It leverages the FeathersJS framework to provide a powerful and flexible API that can handle both REST and WebSocket connections.

### Key Technologies

- **Framework**: FeathersJS v5.0.37 (Koa-based)
- **Language**: TypeScript
- **Database**: PostgreSQL (with Knex.js as the query builder)
- **Packager**: pnpm
- **Schema Validation**: @feathersjs/typebox
- **Web Framework**: Koa.js
- **Real-time Transport**: Socket.io

### Architecture

The project follows the FeathersJS architecture with:
- **Services**: API endpoints that handle business logic (currently has a quiz service)
- **Schemas**: Typebox-based validation and resolution schemas
- **Hooks**: Middleware functions that process data before/after service operations
- **Database**: PostgreSQL with Knex.js adapter for database operations
- **Configuration**: JSON-based configuration with environment variable support

### Data Model

The main data model is the "Quiz" entity:
- **Table**: `quizes` 
- **Fields**: `id` (auto-incrementing number), `text` (string)
- **CRUD Operations**: Supports create, read, update, patch, and delete operations

### Project Structure

```
api/
├── config/                 # Configuration files
├── migrations/            # Database migration files
├── public/                # Static files served by the API
├── src/                   # Source code directory
│   ├── app.ts            # Main application file
│   ├── channels.ts       # Real-time communication channels
│   ├── declarations.ts   # TypeScript declarations
│   ├── postgresql.ts     # Database connection setup
│   ├── services/         # API service definitions
│   │   └── quizes/       # Quiz service implementation
│   └── validators.ts     # Validation utilities
├── test/                  # Test files
├── package.json          # Project dependencies and scripts
├── tsconfig.json         # TypeScript configuration
├── knexfile.ts           # Database migration configuration
└── readme.md             # Project documentation
```

### Environment Requirements

- Node.js version: >= 23.8.0
- PostgreSQL database
- pnpm package manager

### Building and Running

1. **Install Dependencies**:
   ```bash
   cd /home/muhammadyusuf-kurbonov/Projects/MyProjects/learn-quiz/api
   pnpm install
   ```

2. **Database Setup**:
   Make sure PostgreSQL is running and the connection string in `config/default.json` is correct.
   ```json
   "postgresql": {
     "client": "pg",
     "connection": "postgres://postgres:@localhost:5432/api"
   }
   ```

3. **Run Migrations**:
   ```bash
   pnpm run migrate
   ```

4. **Compile TypeScript**:
   ```bash
   pnpm run compile
   ```

5. **Start the Application**:
   ```bash
   pnpm start
   ```

6. **Develop with Auto-reload**:
   ```bash
   pnpm run dev
   ```

### Testing

- **Run All Tests**: `pnpm test`
- **Run Tests Only**: `pnpm run mocha`
- Tests are located in the `/test` directory with service-specific tests in `/test/services`

### Development Conventions

- **Code Style**: Follows Prettier formatting (configuration in `.prettierrc`)
- **Type Safety**: Strong typing with TypeScript and Typebox schema validation
- **Service Pattern**: Each API endpoint is implemented as a Feathers service
- **Hooks**: Use of Feathers hooks for validation, data transformation, and error handling
- **Database Migrations**: Uses Knex.js migrations for database schema management

### Feathers CLI Scaffolding

The project includes the Feathers command line interface for generating new services:
```bash
npx feathers generate service
```

### API Endpoints

Currently configured with a single service:
- **Quiz Service**: `/quizes` - supports all standard CRUD operations with proper schema validation

The API supports both REST and WebSocket transports, allowing for real-time communication capabilities.