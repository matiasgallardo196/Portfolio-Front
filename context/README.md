# Portfolio Context Documentation

## Overview

The `PortfolioContext` provides global access to portfolio data throughout the application using React Context API. This centralized approach makes it easy to access portfolio information from any component and prepares the application for future API integration.

## Structure

### Files

- `PortfolioContext.tsx` - Main context implementation
- `README.md` - This documentation

### Key Components

#### PortfolioProvider

The provider component that wraps the application and makes portfolio data available globally.

#### usePortfolio Hook

A custom hook that provides easy access to portfolio data from any component.

## Usage

### Basic Usage

```typescript
import { usePortfolio } from "../context/PortfolioContext";

const MyComponent = () => {
  const { portfolio } = usePortfolio();
  const { about, projects, skills } = portfolio;

  return (
    <div>
      <h1>{about.fullName}</h1>
      <p>Projects: {projects.length}</p>
    </div>
  );
};
```

### Destructuring Specific Data

```typescript
const MyComponent = () => {
  const { portfolio } = usePortfolio();
  const { about, projects, skills, achievements, languages, contact, theme } =
    portfolio;

  // Use specific data sections
  return (
    <div>
      <h1>{about.fullName}</h1>
      <p>{about.location}</p>
      <div>{about.biography}</div>
    </div>
  );
};
```

### Accessing Theme Data

```typescript
const ThemedComponent = () => {
  const { portfolio } = usePortfolio();
  const { theme } = portfolio;

  return (
    <div
      style={{
        backgroundColor: theme.colors.primary[500],
        borderRadius: theme.borderRadius.lg,
        transition: theme.transitions.normal,
      }}
    >
      Themed content
    </div>
  );
};
```

## App Integration

The context is integrated in `pages/_app.tsx`:

```typescript
import { PortfolioProvider } from "../context/PortfolioContext";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <PortfolioProvider>
      <ThemeProvider>
        <Component {...pageProps} />
      </ThemeProvider>
    </PortfolioProvider>
  );
}
```

## Data Structure

The context provides access to the complete `PortfolioData` interface:

```typescript
interface PortfolioContextType {
  portfolio: PortfolioData;
  // Future API methods will be added here
}
```

Where `PortfolioData` includes:

- `about` - Personal information
- `skills` - Technical skills by category
- `achievements` - List of achievements
- `languages` - Language proficiencies
- `projects` - Portfolio projects
- `contact` - Contact information
- `theme` - Visual theme configuration

## Future API Integration

The context is designed to easily transition from mock data to real API calls. The commented code in `PortfolioContext.tsx` shows the pattern for future implementation:

```typescript
// Future implementation example:
const [portfolio, setPortfolio] = useState<PortfolioData | null>(null);
const [loading, setLoading] = useState(true);
const [error, setError] = useState<string | null>(null);

useEffect(() => {
  const fetchPortfolio = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/portfolio");
      const data = await response.json();
      setPortfolio(data);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to fetch portfolio data"
      );
    } finally {
      setLoading(false);
    }
  };

  fetchPortfolio();
}, []);
```

### Future Context Interface

```typescript
interface PortfolioContextType {
  portfolio: PortfolioData | null;
  loading: boolean;
  error: string | null;
  refreshPortfolio: () => Promise<void>;
  updatePortfolio: (data: Partial<PortfolioData>) => Promise<void>;
}
```

## Benefits

1. **Global Access**: Any component can access portfolio data without prop drilling
2. **Type Safety**: Full TypeScript support with proper interfaces
3. **Centralized Management**: Single source of truth for portfolio data
4. **Future-Ready**: Easy transition to API integration
5. **Performance**: Context optimization prevents unnecessary re-renders
6. **Maintainability**: Clean separation of concerns

## Migration from Direct Imports

### Before (Direct Import)

```typescript
import { portfolioData } from "../data";

const MyComponent = () => {
  const { about } = portfolioData;
  // ...
};
```

### After (Context Hook)

```typescript
import { usePortfolio } from "../context/PortfolioContext";

const MyComponent = () => {
  const { portfolio } = usePortfolio();
  const { about } = portfolio;
  // ...
};
```

## Error Handling

The `usePortfolio` hook includes error handling:

```typescript
const { portfolio } = usePortfolio(); // Throws error if used outside PortfolioProvider
```

Always ensure components using `usePortfolio` are wrapped within `PortfolioProvider`.

## Best Practices

1. **Use the hook**: Always use `usePortfolio()` instead of direct imports
2. **Destructure efficiently**: Only destructure the data you need
3. **Error boundaries**: Wrap components in error boundaries for future API integration
4. **Loading states**: Prepare for loading states when transitioning to API
5. **Memoization**: Consider memoizing expensive computations on portfolio data

## Testing

When testing components that use the context:

```typescript
import { PortfolioProvider } from "../context/PortfolioContext";

const TestComponent = () => (
  <PortfolioProvider>
    <MyComponent />
  </PortfolioProvider>
);
```

## Troubleshooting

### Common Issues

1. **"usePortfolio must be used within a PortfolioProvider"**

   - Ensure the component is wrapped in `PortfolioProvider`
   - Check that `_app.tsx` includes the provider

2. **TypeScript errors**

   - Ensure proper imports from `../context/PortfolioContext`
   - Check that `PortfolioData` interface is properly imported

3. **Data not updating**
   - Context updates automatically when portfolio data changes
   - For future API integration, ensure proper state management
