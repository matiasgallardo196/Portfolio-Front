# Estructura de Theme para la API del Backend

## Problema Identificado

La API del backend está devolviendo todos los datos correctamente, pero **falta la propiedad `theme`** que es esencial para el frontend. Esto causa errores como:

```
TypeError: Cannot read properties of undefined (reading 'zIndex')
```

## Solución

Agregar la propiedad `theme` a la respuesta de la API con la siguiente estructura:

```json
{
  "about": { ... },
  "skills": { ... },
  "achievements": [ ... ],
  "languages": [ ... ],
  "projects": [ ... ],
  "contact": { ... },
  "theme": {
    "colors": {
      "primary": {
        "50": "#eff6ff",
        "100": "#dbeafe",
        "200": "#bfdbfe",
        "300": "#93c5fd",
        "400": "#60a5fa",
        "500": "#3b82f6",
        "600": "#2563eb",
        "700": "#1d4ed8",
        "800": "#1e40af",
        "900": "#1e3a8a"
      },
      "secondary": {
        "50": "#f8fafc",
        "100": "#f1f5f9",
        "200": "#e2e8f0",
        "300": "#cbd5e1",
        "400": "#94a3b8",
        "500": "#64748b",
        "600": "#475569",
        "700": "#334155",
        "800": "#1e293b",
        "900": "#0f172a"
      },
      "accent": {
        "50": "#fdf4ff",
        "100": "#fae8ff",
        "200": "#f5d0fe",
        "300": "#f0abfc",
        "400": "#e879f9",
        "500": "#d946ef",
        "600": "#c026d3",
        "700": "#a21caf",
        "800": "#86198f",
        "900": "#701a75"
      },
      "gray": {
        "50": "#f9fafb",
        "100": "#f3f4f6",
        "200": "#e5e7eb",
        "300": "#d1d5db",
        "400": "#9ca3af",
        "500": "#6b7280",
        "600": "#4b5563",
        "700": "#374151",
        "800": "#1f2937",
        "900": "#111827"
      },
      "yellow": {
        "400": "#fbbf24",
        "500": "#f59e0b"
      },
      "blue": {
        "400": "#60a5fa",
        "500": "#3b82f6"
      },
      "purple": {
        "300": "#c4b5fd",
        "600": "#7c3aed"
      }
    },
    "fonts": {
      "sans": ["Inter", "system-ui", "sans-serif"],
      "display": ["Poppins", "system-ui", "sans-serif"],
      "weights": {
        "light": 300,
        "normal": 400,
        "medium": 500,
        "semibold": 600,
        "bold": 700,
        "extrabold": 800,
        "black": 900
      }
    },
    "animations": {
      "fadeIn": {
        "duration": "0.5s",
        "easing": "ease-in-out",
        "keyframes": {
          "0%": { "opacity": "0" },
          "100%": { "opacity": "1" }
        }
      },
      "slideUp": {
        "duration": "0.5s",
        "easing": "ease-out",
        "keyframes": {
          "0%": { "transform": "translateY(20px)", "opacity": "0" },
          "100%": { "transform": "translateY(0)", "opacity": "1" }
        }
      },
      "float": {
        "duration": "6s",
        "easing": "ease-in-out",
        "keyframes": {
          "0%, 100%": { "transform": "translateY(0px)" },
          "50%": { "transform": "translateY(-10px)" }
        }
      },
      "pulse": {
        "duration": "3s",
        "easing": "cubic-bezier(0.4, 0, 0.6, 1)"
      }
    },
    "spacing": {
      "container": {
        "maxWidth": "80rem",
        "padding": {
          "mobile": "1rem",
          "tablet": "1.5rem",
          "desktop": "2rem"
        }
      },
      "navbar": {
        "height": "5rem",
        "padding": "1rem"
      },
      "section": {
        "padding": "4rem 0",
        "margin": "2rem 0"
      },
      "card": {
        "padding": "1.5rem",
        "borderRadius": "1rem"
      },
      "button": {
        "padding": "0.75rem 1.5rem",
        "borderRadius": "0.75rem"
      }
    },
    "shadows": {
      "glow": "0 0 20px rgba(59, 130, 246, 0.3)",
      "glowLg": "0 0 40px rgba(59, 130, 246, 0.4)",
      "card": "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
      "cardHover": "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
      "button": "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)"
    },
    "gradients": {
      "primary": "linear-gradient(to right, #2563eb, #c026d3)",
      "accent": "linear-gradient(to right, #c026d3, #2563eb)",
      "background": {
        "light": "linear-gradient(to bottom right, #f8fafc, #dbeafe, #e0e7ff)",
        "dark": "linear-gradient(to bottom right, #111827, #1f2937, #111827)"
      },
      "text": {
        "light": "linear-gradient(to right, #2563eb, #c026d3)",
        "dark": "linear-gradient(to right, #60a5fa, #e879f9)"
      },
      "button": {
        "primary": "linear-gradient(to right, #2563eb, #1d4ed8)",
        "secondary": "linear-gradient(to right, #f8fafc, #e2e8f0)"
      }
    },
    "breakpoints": {
      "sm": "640px",
      "md": "768px",
      "lg": "1024px",
      "xl": "1280px",
      "2xl": "1536px"
    },
    "borderRadius": {
      "sm": "0.25rem",
      "md": "0.5rem",
      "lg": "0.75rem",
      "xl": "1rem",
      "2xl": "1.5rem"
    },
    "backdropBlur": {
      "sm": "4px",
      "md": "12px",
      "lg": "16px"
    },
    "transitions": {
      "fast": "150ms ease-in-out",
      "normal": "300ms ease-in-out",
      "slow": "500ms ease-in-out"
    },
    "zIndex": {
      "navbar": 50,
      "modal": 100,
      "tooltip": 200
    }
  }
}
```

## Propiedades Críticas

Las siguientes propiedades son **esenciales** y deben estar presentes:

1. **`theme.zIndex.navbar`** - Usado por el componente Navbar
2. **`theme.spacing.navbar.height`** - Altura del navbar
3. **`theme.backdropBlur.md`** - Efecto de blur
4. **`theme.transitions.normal`** - Transiciones
5. **`theme.colors.yellow[500]`** y **`theme.colors.blue[400]`** - Usados por ThemeToggle

## Implementación en el Backend

### Opción 1: Agregar theme como propiedad estática

```javascript
// En tu endpoint del portfolio
const portfolioData = {
  about: aboutData,
  skills: skillsData,
  achievements: achievementsData,
  languages: languagesData,
  projects: projectsData,
  contact: contactData,
  theme: {
    // ... estructura completa del theme
  },
};
```

### Opción 2: Crear tabla theme en la base de datos

```sql
CREATE TABLE themes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  userId UUID REFERENCES users(id),
  theme JSONB NOT NULL,
  createdAt TIMESTAMP DEFAULT NOW(),
  updatedAt TIMESTAMP DEFAULT NOW()
);
```

## Verificación

Después de implementar, puedes verificar que funciona ejecutando:

```bash
node test-api-structure.js
```

Deberías ver:

```
🎉 ¡Estructura de datos perfecta!
```

## Notas Importantes

- El frontend ya tiene validaciones de seguridad para manejar casos donde `theme` sea undefined
- Si no puedes agregar `theme` inmediatamente, el frontend usará valores por defecto
- La estructura de `theme` es extensible y puede ser personalizada por usuario
