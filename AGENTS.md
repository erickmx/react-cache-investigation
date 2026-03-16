# AGENTS.md - Development Guidelines for AI Agents

This document provides guidelines for AI agents working in this repository.

## Project Overview

This is a monorepo using Yarn workspaces and Lerna for managing multiple packages:
- `astro-version` - Astro application
- `components-base` - Shared React components and layouts
- `common` - Common utilities and fetch functions
- `nextjs-version` - Next.js application
- `vanilla-version` - React Server Components with manual SSR
- `api-interceptor` - API bridge for logging requests

---

## Build, Lint, and Test Commands

### Running Tests

```bash
# Run all tests
yarn test

# Run tests with coverage
yarn test:coverage

# Run a single test file
yarn test --config jest.config.cjs path/to/test.file.test.ts

# Run tests matching a pattern
yarn test --config jest.config.cjs --testNamePattern="component name"

# Run tests in watch mode
yarn test --config jest.config.cjs --watch
```

### Linting

```bash
# Run ESLint on all TypeScript/TSX files
yarn lint

# Lint specific file or directory
npx eslint path/to/file.ts --ext .ts,.tsx
```

### Type Checking

```bash
# Run TypeScript type checking
npx tsc --noEmit
```

### Lerna Commands

```bash
# Run command across all packages
yarn lerna run <script>

# Bootstrap packages
yarn lerna bootstrap
```

---

## Code Style Guidelines

### TypeScript Configuration

The project uses strict TypeScript with these key settings:
- **Target**: ES2020
- **Module**: ESNext
- **JSX**: react-jsx
- **Strict mode**: enabled
- **Module resolution**: bundler

### Import Conventions

Use path aliases for package imports:
```typescript
// Correct - using @Package aliases
import { fetchData } from '@Package/common';
import Button from '@Package/components-base/Button';

// Relative imports for local files within same package
import { utils } from './utils';
import { MyComponent } from '../MyComponent';
```

### Naming Conventions

- **Files**: PascalCase for components (`Button.tsx`), camelCase for utilities (`fetchData.ts`)
- **Components**: PascalCase (`MyComponent`)
- **Functions/variables**: camelCase (`fetchUserData`)
- **Constants**: UPPER_SNAKE_CASE (`MAX_RETRIES`)
- **Interfaces**: PascalCase with optional "I" prefix discouraged (`UserData` not `IUserData`)
- **Types**: Same as interfaces

### Type Definitions

```typescript
// Prefer interfaces for object shapes
interface UserProps {
  name: string;
  age: number;
}

// Use type for unions, primitives, tuples
type Status = 'loading' | 'success' | 'error';
type Coordinates = [number, number];

// Avoid 'any' - use 'unknown' if type is truly unknown
// If any is unavoidable, add eslint-disable comment
```

### React Patterns

```typescript
// Functional components with explicit prop types
interface ButtonProps {
  label: string;
  onClick: () => void;
  variant?: 'primary' | 'secondary';
}

function Button({ label, onClick, variant = 'primary' }: ButtonProps) {
  return <button onClick={onClick}>{label}</button>;
}

// Use React.FC sparingly (prefer inline function syntax above)
// Prefer composition over inheritance
```

### Error Handling

```typescript
// Use try/catch with specific error types
async function fetchData<T>(url: string): Promise<T> {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    if (error instanceof TypeError) {
      // Handle network errors
    }
    throw error; // Re-throw after handling
  }
}

// Never silently swallow errors
// Always log or handle errors appropriately
```

### ESLint Rules

Key rules enforced:
- `react/react-in-jsx-scope`: off (JSX transform handles this)
- `@typescript-eslint/explicit-module-boundary-types`: off
- `@typescript-eslint/no-explicit-any`: warn
- `react/prop-types`: off (TypeScript handles this)

### Test Guidelines

Test file locations:
- `__tests__/` directories
- `*.test.ts` or `*.test.tsx` files
- `*.spec.ts` or `*.spec.tsx` files

```typescript
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

describe('ComponentName', () => {
  it('should render correctly', () => {
    render(<ComponentName />);
    expect(screen.getByText('expected')).toBeInTheDocument();
  });
});
```

### Formatting

- 2 spaces for indentation
- Single quotes for strings (JS/TS)
- Trailing commas in multi-line objects/arrays
- Semicolons at end of statements
- Maximum line length: 100 characters (soft guideline)

### General Best Practices

1. **Keep functions small** - Single responsibility principle
2. **Avoid magic numbers** - Use named constants
3. **Write self-documenting code** - Clear names over comments
4. **Handle async properly** - Always handle rejections
5. **Don't commit secrets** - Use environment variables
6. **Write tests** - Aim for meaningful test coverage

---

## Project Structure

```
root/
├── astro-version/        # Astro app package
├── components-base/     # Shared React components
│   └── src/
├── common/              # Utilities and fetch functions
│   └── src/
├── nextjs-version/      # Next.js app package
├── vanilla-version/     # Manual SSR React package
├── api-interceptor/     # API logging bridge
│   └── src/
├── jest.config.cjs      # Jest configuration
├── jest.setup.cjs       # Jest setup file
├── eslint.config.js     # ESLint configuration
├── tsconfig.json        # TypeScript configuration
└── lerna.json           # Lerna configuration
```

---

## Git Workflow

### Committing Changes

When changes are approved by the user, use the `git-commit` skill to create commits:

```bash
# Use the skill tool to load git-commit skill
skill(name: "git-commit")
```

The skill will automatically:
1. Check git status for untracked files
2. Show staged and unstaged changes
3. Review recent commit messages for style
4. Create a properly formatted commit following conventional commits

### Pushing Changes

After committing, push to remote:

```bash
git push origin <branch-name>
```

---

## Skills

### Vercel React Best Practices

When working on React components and layouts (any `.tsx` file), use the `vercel-react-best-practices` skill to ensure best practices are followed:

```bash
# Use the skill tool to load vercel-react-best-practices
skill(name: "vercel-react-best-practices")
```

This skill provides guidance on:
- React Server Components patterns
- Client vs Server component decisions
- Data fetching best practices
- Performance optimizations
- Next.js specific patterns

---

## Common Tasks

### Adding a New Package

1. Create directory in root
2. Add `package.json` with name matching workspace
3. Add to `workspaces` array in root `package.json`
4. Run `yarn install` to link packages

### Adding Dependencies

```bash
# Add to root devDependencies
yarn add -D -W <package>

# Add to specific workspace
yarn workspace <package-name> add <package>
```

### Running Commands in Specific Package

```bash
yarn workspace @Package/package-name run <command>
```
