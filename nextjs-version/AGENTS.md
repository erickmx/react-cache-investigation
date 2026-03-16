# AGENTS.md - Next.js Version Package

This document provides specific guidelines for AI agents working in the `nextjs-version` package.

## Package Overview

This package contains the Next.js application for testing React caching behaviors.

---

## Skills

### Vercel Composition Patterns

When working in this package, always use the `vercel-composition-patterns` skill to ensure Next.js-specific best practices are followed:

```bash
# Use the skill tool to load vercel-composition-patterns
skill(name: "vercel-composition-patterns")
```

This skill provides guidance on:
- App Router patterns and conventions
- Route handlers and API routes
- Server Components vs Client Components
- Data fetching and caching strategies
- Middleware usage
- Next.js optimization techniques

---

## Development Guidelines

Follow all guidelines from the root `AGENTS.md` file, plus:
- Use Next.js App Router conventions
- Follow Vercel composition patterns for this package
- Run type checking before committing: `npx tsc --noEmit`
- Ensure all tests pass before committing
