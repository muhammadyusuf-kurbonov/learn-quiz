# LearnQuiz Frontend Project

## Project Overview

This is a Nuxt.js 4 frontend application for an interactive quiz platform. The application implements a quiz system with question navigation, answer tracking, and results display. It uses Vue 3 Composition API with TypeScript, Nuxt UI components, and Tailwind CSS v4 for styling.

### Key Features
- Interactive quiz interface with multiple-choice questions
- Question navigation with visual indicators for answered questions
- Answer tracking and storage
- Results page with performance statistics
- Responsive design for various screen sizes
- TypeScript type safety throughout the application

### Architecture
The application follows a typical Nuxt.js 4 structure with:
- Pages for routing (index, quiz, results)
- Components for UI elements (QuizQuestion, QuizHeader, QuestionNavigation, etc.)
- Composables for state management (quizState)
- Data files for mock content
- Types for TypeScript interfaces and type safety

## Technologies and Dependencies

- **Framework**: Nuxt.js 4.2.1
- **Language**: TypeScript 5.9.3
- **Frontend**: Vue 3.5.24
- **Styling**: Tailwind CSS 4.1.17, Nuxt UI 4.1.0
- **Package Manager**: pnpm

Key dependencies include:
- `@nuxt/ui` - UI component library
- `@nuxt/image` - Image optimization
- `@nuxt/eslint` - Code linting
- `vue-router` - Client-side routing

## Important Files and Directories

### `/app`
Main application directory containing:
- `pages/` - Route components (index.vue, quiz.vue, results.vue)
- `components/` - Reusable UI components
- `composables/` - Composable functions for state management
- `data/` - Mock data files (mockQuiz.ts, mockResults.ts)
- `types/` - TypeScript type definitions (quiz.ts)
- `layouts/` - Layout templates
- `app.vue` - Root application component

### Key Components
- `QuizQuestion.vue` - Displays individual quiz questions with options
- `QuestionNavigation.vue` - Visual navigation showing answered/unanswered questions
- `QuizHeader.vue` - Header with question counter and timer display
- `ResultsCard.vue` - Displays quiz results and performance metrics

### Key Composables
- `quizState.ts` - Centralized quiz state management with navigation and answer tracking

### Key Types
- `quiz.ts` - TypeScript interfaces for Quiz, QuizQuestion, QuizResult, and QuizState

## Building and Running

### Setup
```bash
pnpm install
```

### Development
```bash
pnpm dev
```
The development server will start at `http://localhost:3000`

### Production
```bash
pnpm run build
```
This creates an optimized production build.

Preview the production build:
```bash
pnpm run preview
```

## Code Structure and Conventions

### TypeScript Usage
All components and composables use strict TypeScript typing with:
- Explicit type definitions for props, emits, and return values
- Composition API with `<script setup lang="ts">`
- Type imports from the `~/types/` directory

### Component Architecture
- Components are focused and have single responsibilities
- Props and emits are explicitly typed using TypeScript interfaces
- Components use Vue 3 Composition API with TypeScript support
- State is managed in composables using Vue's reactivity system

### Naming Conventions
- Components use PascalCase (e.g., QuizQuestion.vue)
- Composables use camelCase and start with `use` (e.g., useQuizState)
- Variables and functions use camelCase
- Type interfaces use PascalCase (e.g., QuizQuestion)

### Testing
Unit tests are created using Vitest and Vue Test Utils for:
- Composables (e.g., quizState.test.ts)
- Components (e.g., QuestionNavigation.test.ts, QuizQuestion.test.ts)

## Development Workflow

### Adding New Features
1. Create new components in the `components/` directory
2. Add corresponding type definitions in `types/quiz.ts`
3. Add composables to the `composables/` directory for shared logic
4. Write unit tests for new functionality in `__tests__` directories

### State Management
The application uses Vue 3's reactivity system with composables:
- `quizState.ts` manages the quiz state
- Answers are stored in a reactive Record object with question indices as keys
- Navigation functions update the current question index
- Answer selection updates the answers record

### Styling
- Tailwind CSS v4 is used with the new `bg-linear-*` syntax for gradients
- Nuxt UI components are used for consistent styling
- Responsive design principles are implemented throughout

## Known Issues and Improvements

- The app uses mock data for quiz content, which would need to be replaced with an actual API for production
- Timer functionality is currently simulated and not fully implemented
- Add more comprehensive unit tests for all components and composables
- Implement proper error handling for API calls when integrated with backend

## Important notes from user
- NEVER run dev server! Instead ask user to ckeck (manually)
- 