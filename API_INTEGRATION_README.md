# Integración con API - Portfolio Frontend

## Resumen de Cambios

Se ha reemplazado el uso de datos mock con una integración completa con la API del portfolio. El sistema ahora:

1. **Carga datos desde la API** en lugar de usar datos estáticos
2. **Maneja estados de loading** mientras se cargan los datos
3. **Maneja errores de conexión** de manera elegante
4. **Proporciona fallback a datos mock** cuando la API no está disponible
5. **Muestra indicadores visuales** del estado de la conexión

## Estructura de Archivos

### Nuevos Archivos Creados

- `services/api.ts` - Servicio principal para llamadas a la API
- `config/api.ts` - Configuración de la API y endpoints
- `components/LoadingSpinner.tsx` - Componente de loading reutilizable
- `components/ErrorMessage.tsx` - Componente de error reutilizable
- `components/MockDataBanner.tsx` - Banner para indicar uso de datos mock

### Archivos Modificados

- `context/PortfolioContext.tsx` - Integración con API y manejo de estados
- `pages/index.tsx` - Manejo de estados de loading y error
- `pages/about.tsx` - Manejo de estados de loading y error
- `pages/projects.tsx` - Manejo de estados de loading y error
- `pages/contact.tsx` - Manejo de estados de loading y error

## Configuración

### Variables de Entorno

Crear un archivo `.env.local` en la raíz del proyecto:

```env
# Configuración de la API
NEXT_PUBLIC_API_URL=http://localhost:3001/api

# Configuración del entorno
NODE_ENV=development
```

### Endpoints de la API

La aplicación espera que la API esté disponible en:

- **GET** `http://localhost:3001/api/portfolio` - Obtener datos del portfolio
- **PUT** `http://localhost:3001/api/portfolio` - Actualizar datos del portfolio (futuro)

## Funcionalidades

### 1. Carga de Datos

- Al iniciar la aplicación, se intenta cargar datos desde la API
- Si la API está disponible, se usan esos datos
- Si hay un error, se usa el fallback a datos mock

### 2. Estados de UI

- **Loading**: Spinner animado mientras se cargan los datos
- **Error**: Mensaje de error con botón para reintentar
- **Mock Data**: Banner amarillo indicando que se usan datos de ejemplo
- **Success**: Contenido normal de la aplicación

### 3. Manejo de Errores

- Errores de red (conexión perdida)
- Errores de API (4xx, 5xx)
- Timeouts de conexión
- Fallback automático a datos mock

### 4. Funciones Disponibles

```typescript
const {
  portfolio, // Datos del portfolio
  loading, // Estado de carga
  error, // Mensaje de error
  hasApiError, // Si hay error de API
  isUsingMockData, // Si se usan datos mock
  refreshPortfolio, // Función para recargar datos
  updatePortfolio, // Función para actualizar datos
} = usePortfolio();
```

## Uso

### Desarrollo Local

1. **Iniciar el servidor de desarrollo:**

   ```bash
   npm run dev
   ```

2. **Configurar la API:**

   - Asegurarse de que la API esté corriendo en `http://localhost:3001`
   - O cambiar la URL en `.env.local`

3. **Probar diferentes escenarios:**
   - API disponible: Datos se cargan desde la API
   - API no disponible: Se muestran datos mock con banner
   - Error de API: Se muestra mensaje de error con opción de reintentar

### Producción

1. **Configurar variables de entorno:**

   ```env
   NEXT_PUBLIC_API_URL=https://tu-api.com/api
   ```

2. **Build y deploy:**
   ```bash
   npm run build
   npm start
   ```

## Beneficios

1. **Datos Dinámicos**: El portfolio puede actualizarse sin redeploy
2. **Mejor UX**: Estados de loading y error claros
3. **Resiliencia**: Funciona offline con datos mock
4. **Escalabilidad**: Fácil agregar nuevas funcionalidades de API
5. **Mantenibilidad**: Código organizado y reutilizable

## Próximos Pasos

1. **Implementar cache** para mejorar performance
2. **Agregar autenticación** para actualizaciones
3. **Implementar actualizaciones en tiempo real**
4. **Agregar validación de datos** de la API
5. **Implementar retry automático** con backoff exponencial
