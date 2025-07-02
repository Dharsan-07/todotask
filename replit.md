# Business Dashboard Application

## Overview

This is a full-stack business dashboard application built with React, TypeScript, and Express. The application provides a comprehensive business management interface with user authentication, analytics, project management, user management, and reporting capabilities. It uses a modern tech stack with shadcn/ui components for the frontend and PostgreSQL with Drizzle ORM for the backend.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Routing**: Wouter for client-side routing
- **State Management**: TanStack Query (React Query) for server state management
- **UI Components**: shadcn/ui component library built on Radix UI primitives
- **Styling**: Tailwind CSS with CSS variables for theming
- **Build Tool**: Vite for development and bundling

### Backend Architecture
- **Framework**: Express.js with TypeScript
- **Database**: PostgreSQL with Drizzle ORM
- **Database Provider**: Neon Database (@neondatabase/serverless)
- **Authentication**: Session-based authentication with bcrypt for password hashing
- **API Design**: RESTful API with JSON responses

### Key Design Decisions
- **Monorepo Structure**: Organized into `client/`, `server/`, and `shared/` directories for clear separation of concerns
- **Type Safety**: Full TypeScript coverage across frontend and backend with shared types
- **Component Library**: shadcn/ui chosen for professional appearance and accessibility
- **Database Migration**: Drizzle Kit for schema management and migrations
- **Development Experience**: Hot reload with Vite and TypeScript checking

## Key Components

### Authentication System
- User login and registration with form validation using Zod
- Password hashing with bcrypt
- Session management (localStorage-based for demo, should be replaced with proper JWT/session handling)
- Role-based access control (admin, manager, user roles)

### Dashboard Interface
- Protected routes with authentication guards
- Responsive sidebar navigation
- Dashboard statistics and analytics
- Activity feed and recent actions
- Quick actions for common tasks

### Data Management
- User management with CRUD operations
- Project management with status tracking
- Activity logging for audit trails
- Dashboard statistics and metrics

### UI/UX Features
- Dark/light theme support
- Mobile-responsive design
- Professional business interface
- Toast notifications for user feedback
- Loading states and error handling

## Data Flow

### Authentication Flow
1. User submits login credentials
2. Backend validates against database
3. Success returns user data, stored in localStorage
4. Protected routes check authentication status
5. Automatic redirect to login if unauthorized

### Data Fetching Pattern
1. React Query manages server state
2. API requests through centralized `api.ts`
3. Error handling with toast notifications
4. Optimistic updates where appropriate
5. Background refetching for fresh data

### Database Operations
1. Drizzle ORM handles type-safe database queries
2. Connection pooling through Neon serverless
3. Schema migrations managed by Drizzle Kit
4. Validation using Drizzle-Zod integration

## External Dependencies

### Core Dependencies
- **React Ecosystem**: React, React DOM, React Router (Wouter)
- **UI Framework**: Radix UI primitives, Tailwind CSS, shadcn/ui
- **State Management**: TanStack Query for server state
- **Forms**: React Hook Form with Zod validation
- **Database**: Drizzle ORM, Neon Database driver
- **Authentication**: bcrypt for password hashing
- **Utilities**: date-fns, clsx, class-variance-authority

### Development Dependencies
- **Build Tools**: Vite, esbuild for production builds
- **TypeScript**: Full type checking and compilation
- **Development**: tsx for TypeScript execution, Replit-specific plugins

## Deployment Strategy

### Development Environment
- Vite dev server for frontend with hot reload
- tsx for running TypeScript server directly
- Environment variables for database connection
- Replit-specific development enhancements

### Production Build
1. Frontend built with Vite to `dist/public`
2. Backend bundled with esbuild to `dist/index.js`
3. Single deployment artifact serving both frontend and API
4. Static file serving for production frontend assets

### Database Setup
- PostgreSQL database required (Neon recommended)
- Environment variable `DATABASE_URL` must be configured
- Run `npm run db:push` to sync schema with database
- Drizzle migrations stored in `/migrations` directory

### Environment Configuration
- `NODE_ENV` for development/production modes
- `DATABASE_URL` for PostgreSQL connection
- Replit-specific variables for development features

## Changelog

```
Changelog:
- July 02, 2025. Initial setup
```

## User Preferences

```
Preferred communication style: Simple, everyday language.
```