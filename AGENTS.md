# Project Agents.md Guide for AI Development

This Agents.md file provides comprehensive guidance for AI agents working with the Planique codebase.

## Project Overview

**IMPORTANT**: Always check the [README.md](./README.md) for project understanding and context.

Planique is an executive insights platform that transforms GitHub project activity into business-friendly reports. Built with:

- **Framework**: Next.js 15.3.5 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: Shadcn/UI with Radix UI primitives
- **Package Manager**: npm
- **Internationalization**: next-intl
- **State Management**: React Query (@tanstack/react-query)
- **Forms**: React Hook Form with Zod validation
- **Theme**: next-themes for dark/light mode support

## Project Structure for AI Navigation

```text
src/
├── app/                    # Next.js App Router directory
│   ├── [locale]/          # Internationalized routes
│   ├── globals.css        # Global styles
│   └── providers.tsx      # App-level providers
├── components/
│   └── ui/                # Shadcn/UI components (DO NOT MODIFY)
├── features/              # Feature-based organization (CREATE THIS)
│   └── <feature-name>/    # Individual feature directories
│       ├── components/    # Feature-specific components
│       ├── hooks/         # Feature-specific hooks
│       ├── types/         # Feature-specific TypeScript types
│       └── services/      # Feature-specific API services
├── hooks/                 # Global shared hooks
├── i18n/                  # Internationalization configuration
├── lib/                   # Utility libraries and configurations
└── messages/              # Translation files
```

## Architecture Guidelines

### Feature-Based Organization

**IMPORTANT**: Create feature-based folders in `src/features/<feature-name>` with the following structure:

```text
src/features/<feature-name>/
├── components/            # Feature-specific UI components
│   ├── FeatureComponent.tsx
├── hooks/                # Feature-specific custom hooks
│   ├── useFeature.ts
├── types/                # Feature-specific TypeScript interfaces
│   ├── feature.types.ts
└── services/             # Feature-specific API calls and business logic
    ├── featureService.ts
```

### Component Guidelines

1. **Use Shadcn/UI Components**: Always use components from `src/components/ui/` for consistent design
2. **Component Naming**: Use PascalCase for component names
3. **File Structure**: One component per file, matching the component name
4. **Exports**: Use default exports for components

### TypeScript Conventions

- **Interfaces**: Use PascalCase and suffix with `Props`, `Data`, or `Config`
- **Types**: Use PascalCase for type aliases
- **Enums**: Use PascalCase for enum names, UPPER_SNAKE_CASE for values
- **Strict Mode**: All TypeScript strict mode rules are enforced

## Development Workflow

### Required Commands After Each Task

**CRITICAL**: After implementing any feature or making changes, ALWAYS run these commands:

```bash
# 1. Run linting to check code quality
npm run lint

# 2. Run build to ensure no build errors
npm run build
```

### Package Management

- **Package Manager**: Use `npm` exclusively
- **Installation**: `npm install <package-name>`
- **Dev Dependencies**: `npm install -D <package-name>`

### Available Scripts

```bash
npm run dev        # Start development server with Turbopack
npm run build      # Build production application
npm run start      # Start production server
npm run lint       # Run ESLint
```

## Coding Standards

### React Best Practices

1. **Functional Components**: Use functional components with hooks
2. **TypeScript**: All components must be typed
3. **Error Handling**: Implement proper error boundaries and error handling
4. **Performance**: Use React.memo, useMemo, and useCallback when appropriate

### Styling Guidelines

1. **Tailwind CSS**: Use Tailwind classes for styling
2. **Shadcn/UI**: Utilize existing UI components from `src/components/ui/`
3. **Responsive Design**: Mobile-first approach with responsive breakpoints
4. **Theme Support**: Ensure dark/light mode compatibility

### API Integration

1. **Axios**: Use the configured axios instance from `src/lib/axiosConfig.ts`
2. **React Query**: Use for data fetching and state management
3. **Error Handling**: Implement proper error handling with `src/lib/errorHandler.ts`

### Form Handling

1. **React Hook Form**: Use for form state management
2. **Zod**: Use for form validation schemas
3. **Shadcn Form Components**: Use form components from `src/components/ui/`

## Internationalization

### i18n Implementation

1. **Messages**: Add translations to `src/messages/en.json`, `src/messages/fr.json`, `src/messages/rw.json`
2. **Usage**: Use `useTranslations` hook from next-intl
3. **Keys**: Use descriptive, hierarchical keys (e.g., `"features.auth.login.title"`)

## State Management

### React Query Implementation

1. **Queries**: Use for data fetching
2. **Mutations**: Use for data modifications
3. **Cache Keys**: Use consistent, hierarchical cache keys
4. **Error Handling**: Implement proper error states

## File Naming Conventions

- **Components**: PascalCase (e.g., `UserProfile.tsx`)
- **Hooks**: camelCase starting with "use" (e.g., `useUserData.ts`)
- **Types**: camelCase with descriptive names (e.g., `user.types.ts`)
- **Services**: camelCase with "Service" suffix (e.g., `userService.ts`)
- **Utilities**: camelCase (e.g., `formatDate.ts`)

## Import/Export Guidelines

### Import Order

1. React and Next.js imports
2. Third-party libraries
3. Internal components and hooks
4. Types and interfaces
5. Relative imports

## Performance Considerations

1. **Code Splitting**: Use dynamic imports for large components
2. **Image Optimization**: Use Next.js Image component
3. **Bundle Analysis**: Regular bundle size monitoring
4. **Caching**: Implement proper caching strategies

## Security Guidelines

1. **Environment Variables**: Use `.env.local` for sensitive data and .env.example to document the env needed by a project
2. **Input Validation**: Validate all user inputs with Zod
3. **XSS Prevention**: Sanitize user-generated content
4. **CSRF Protection**: Implement CSRF tokens for forms

## Deployment Considerations

1. **Build Optimization**: Ensure clean builds without warnings
2. **Environment Configuration**: Proper environment variable setup
3. **Performance Monitoring**: Implement performance tracking
4. **Error Logging**: Comprehensive error logging

## AI Agent Specific Instructions

### When Creating New Features

1. **Always** create features in `src/features/<feature-name>/`
2. **Always** run `npm run lint` after implementation
3. **Always** run `npm run build` to verify no build errors
4. **Always** use existing Shadcn/UI components
5. **Always** implement proper TypeScript types
6. **Always** add appropriate error handling
7. **Always** consider internationalization from the start

### Code Quality Checklist

Before considering a task complete:

- [ ] Feature follows the prescribed folder structure
- [ ] All TypeScript types are properly defined
- [ ] Shadcn/UI components are used appropriately
- [ ] Error handling is implemented
- [ ] Internationalization is considered
- [ ] `npm run lint` passes without errors
- [ ] `npm run build` completes successfully
- [ ] Code follows naming conventions
- [ ] Responsive design is implemented
- [ ] Dark/light mode compatibility is ensured

## Common Patterns

### API Service Pattern

```typescript
// src/features/user/services/userService.ts
import { axiosInstance } from "@/lib/axiosConfig";
import { User, CreateUserData } from "../types";

export const userService = {
  getUser: async (id: string): Promise<User> => {
    const response = await axiosInstance.get(`/users/${id}`);
    return response.data;
  },

  createUser: async (data: CreateUserData): Promise<User> => {
    const response = await axiosInstance.post("/users", data);
    return response.data;
  },
};
```

### Hook Pattern

```typescript
// src/features/user/hooks/useUser.ts
import { useQuery } from "@tanstack/react-query";
import { userService } from "../services";

export const useUser = (id: string) => {
  return useQuery({
    queryKey: ["user", id],
    queryFn: () => userService.getUser(id),
    enabled: !!id,
  });
};
```

### Component Pattern

```typescript
// src/features/user/components/UserProfile.tsx
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useUser } from "../hooks";
import { UserProfileProps } from "../types";

export default function UserProfile({ userId }: UserProfileProps) {
  const { data: user, isLoading, error } = useUser(userId);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading user</div>;

  return (
    <Card>
      <CardHeader>
        <CardTitle>{user?.name}</CardTitle>
      </CardHeader>
      <CardContent>
        <p>{user?.email}</p>
      </CardContent>
    </Card>
  );
}
```

---

**Remember**: This is a living document. Update it as the project evolves and new patterns emerge.
