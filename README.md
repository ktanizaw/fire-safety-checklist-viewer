# Fire Safety Checklist Viewer

A comprehensive fire safety assessment management system consisting of a GraphQL API backend built with NestJS and a modern Vue.js frontend built with Nuxt 4.

## 🏗️ Project Structure

```
fire-safety-checklist-viewer/
├── fire-safety-checklist-viewer-api/     # NestJS GraphQL API
└── fire-safety-checklist-viewer-frontend/ # Nuxt 4 Vue.js Frontend
```

## 🚀 Quick Start

### Prerequisites

- Node.js (v18 or higher) - Required for Nuxt 4, NestJS 11, and TypeScript 5.7+
- npm, yarn, pnpm, or bun
- No database required (uses mock data for demonstration)

### Backend (API) Setup

1. Navigate to the API directory:

```bash
cd fire-safety-checklist-viewer-api
```

2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm run start:dev
```

The API will be available at `http://localhost:5001/graphql`

### Frontend Setup

1. Navigate to the frontend directory:

```bash
cd fire-safety-checklist-viewer-frontend
```

2. Install dependencies:

```bash
npm install
```

3. Set up environment variables:

Create a `.env` file in the frontend directory:

```bash
# Create .env file
echo "API_ENDPOINT=http://localhost:5001" > .env
```

4. Start the development server:

```bash
npm run dev
```

The frontend will be available at `http://localhost:3000`

## 🛠️ Technology Stack

### Backend

- **NestJS** - Progressive Node.js framework
- **GraphQL** - Query language for APIs
- **Apollo Server** - GraphQL server implementation
- **TypeScript** - Type-safe JavaScript
- **Jest** - Testing framework

### Frontend

- **Nuxt 4** - Vue.js framework
- **Vue 3** - Progressive JavaScript framework
- **TypeScript** - Type-safe JavaScript
- **SCSS** - Advanced CSS preprocessor
- **URQL** - GraphQL client
- **GraphQL Code Generator** - Type-safe GraphQL operations

## 🔧 Technical Decisions

### GraphQL over REST

- **Limited Fields Requirement**: The overview page only needed specific fields, making GraphQL's field selection capability ideal for efficient data fetching
- **Type Safety**: GraphQL Code Generator automatically generates TypeScript types for the frontend, enabling maintainable development with full type safety

### SCSS over CSS Frameworks

- **Development Speed**: Chose SCSS as the fastest styling technology within the limited development time
- **Original Design**: Preferred creating a unique app design rather than using CSS frameworks that would result in similar-looking applications

### ESLint over Biome

- **Familiarity**: Selected ESLint due to familiarity with its configuration and setup process

### Nuxt.js over Next.js

- **Nuxt.js Expertise**: Had prior experience with Nuxt.js rather than Next.js, enabling faster development.
Nuxt.js provides built-in features like auto-imports, file-based routing.

### NestJS Backend Framework

- **Position Requirements**: The applied backend position specifically required NestJS experience
- **Learning Opportunity**: Wanted to gain hands-on experience with NestJS's modular architecture and dependency injection

## 📋 Requirements & Assumptions

### Requirements

- Fire safety assessment management system
- View and browse assessments
- Track completion status and pending actions
- Responsive design for various devices
- Type-safe development with TypeScript

### Assumptions Made

- **Authentication**: No authentication system implemented (assumes internal use)
- **User Roles**: Single user type (assessor/viewer)
- **Real-time Updates**: Not implemented (manual refresh required)

## ⚖️ Trade-offs & Future Improvements

1. **Database Connection**: Using mock data instead of implementing a real database

2. **GraphQL Introspection API Documentation**: Not implemented

3. **CSV/PDF Export**: Export functionality not implemented
