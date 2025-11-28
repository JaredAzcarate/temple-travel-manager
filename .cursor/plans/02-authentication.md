# Feature 02: Autenticación y Protección de Rutas

## Objetivo
Implementar autenticación con Firebase Auth para usuarios ADMIN y CHAPEL, protección de rutas admin con verificación de roles, y componentes de autenticación reutilizables siguiendo principios SOLID.

## Estructura de Carpetas

```
/hooks
  /auth
    useAuth.ts              # Hook principal de autenticación
    useAuthState.ts         # Hook para estado de auth
    useProtectedRoute.ts    # Hook para protección de rutas
/lib
  /auth
    auth.service.ts         # Servicio de autenticación (login, logout, signup)
    user.repository.ts      # Repositorio para usuarios (CRUD)
    auth.middleware.ts      # Middleware para verificación en servidor
  /repositories
    user.repository.ts      # Repository pattern para usuarios
/types
  /auth
    auth.types.ts           # Tipos para autenticación
/components
  /auth
    ProtectedRoute.tsx      # Componente para proteger rutas
    RequireRole.tsx         # Componente para verificar roles específicos
    AuthGuard.tsx           # Guard de autenticación
/app
  /api
    /auth
      /login
        route.ts            # POST - Login endpoint
      /logout
        route.ts            # POST - Logout endpoint
      /me
        route.ts            # GET - Obtener usuario actual
      /session
        route.ts            # GET - Verificar sesión
/utils
  /auth
    role.utils.ts           # Utilidades para roles
    permissions.utils.ts    # Utilidades para permisos
```

## Tareas

### 1. Tipos de Autenticación (types/auth)
- **auth.types.ts**: 
  - `AuthUser` - Usuario autenticado con datos de Firestore
  - `LoginCredentials` - Credenciales de login
  - `AuthState` - Estado de autenticación
  - `SessionData` - Datos de sesión

### 2. Servicios de Autenticación (lib/auth)
- **auth.service.ts**: 
  - `login(email, password)` - Login con Firebase Auth
  - `logout()` - Cerrar sesión
  - `getCurrentUser()` - Obtener usuario actual
  - `onAuthStateChanged()` - Listener de cambios de auth
  - Seguir principio Single Responsibility

### 3. Repositorio de Usuarios (lib/repositories)
- **user.repository.ts**:
  - `getUserById(id)` - Obtener usuario por ID
  - `getUserByEmail(email)` - Obtener usuario por email
  - `createUser(data)` - Crear usuario en Firestore
  - `updateUser(id, data)` - Actualizar usuario
  - Seguir Repository Pattern (Dependency Inversion)

### 4. Hooks de Autenticación (hooks/auth)
- **useAuth.ts**: Hook principal que expone estado y funciones de auth
- **useAuthState.ts**: Hook para obtener solo el estado actual
- **useProtectedRoute.ts**: Hook para protección automática de rutas

### 5. Componentes de Protección (components/auth)
- **ProtectedRoute.tsx**: Wrapper que protege rutas admin
- **RequireRole.tsx**: Wrapper que verifica rol específico (ADMIN)
- **AuthGuard.tsx**: Guard que verifica autenticación antes de renderizar

### 6. API Routes (app/api/auth)
- **POST /api/auth/login**: Endpoint para login (server-side)
- **POST /api/auth/logout**: Endpoint para logout
- **GET /api/auth/me**: Obtener usuario actual desde sesión
- **GET /api/auth/session**: Verificar si hay sesión activa
- Seguir principios SOLID en cada endpoint

### 7. Middleware de Autenticación (lib/auth)
- **auth.middleware.ts**: 
  - `verifyAuth()` - Verificar token de Firebase
  - `verifyRole()` - Verificar rol específico
  - `getUserFromRequest()` - Extraer usuario de request

### 8. Utilidades (utils/auth)
- **role.utils.ts**: 
  - `isAdmin(role)` - Verificar si es ADMIN
  - `isChapel(role)` - Verificar si es CHAPEL
  - `hasPermission()` - Verificar permisos
- **permissions.utils.ts**: Constantes y funciones de permisos

### 9. Página de Login (app/admin/login)
- Formulario de login con Ant Design
- Integración con react-hook-form
- Manejo de errores
- Redirección después de login

### 10. Layout Admin con Protección (app/admin/layout.tsx)
- Layout base para área admin
- Integrar AuthGuard
- Sidebar de navegación según rol
- Header con información de usuario

## Principios SOLID Aplicados

- **Single Responsibility**: Cada servicio/repositorio tiene una responsabilidad única
- **Open/Closed**: Componentes extensibles mediante props
- **Liskov Substitution**: Interfaces consistentes
- **Interface Segregation**: Hooks específicos para cada necesidad
- **Dependency Inversion**: Repositorios dependen de interfaces, no de implementaciones

## Flujo de Autenticación

1. Usuario accede a `/admin/login`
2. Ingresa email y password
3. Sistema autentica con Firebase Auth
4. Obtiene datos del usuario desde Firestore (users collection)
5. Guarda sesión (localStorage/cookies)
6. Redirige según rol:
   - ADMIN → `/admin`
   - CHAPEL → `/admin/caravans` (vista filtrada)
7. Rutas protegidas verifican autenticación y rol
8. Si no autenticado → redirige a `/admin/login`

## Archivos a Crear

### Types
- `/types/auth/auth.types.ts`

### Services & Repositories
- `/lib/auth/auth.service.ts`
- `/lib/repositories/user.repository.ts`
- `/lib/auth/auth.middleware.ts`

### Hooks
- `/hooks/auth/useAuth.ts`
- `/hooks/auth/useAuthState.ts`
- `/hooks/auth/useProtectedRoute.ts`

### Components
- `/components/auth/ProtectedRoute.tsx`
- `/components/auth/RequireRole.tsx`
- `/components/auth/AuthGuard.tsx`

### API Routes
- `/app/api/auth/login/route.ts`
- `/app/api/auth/logout/route.ts`
- `/app/api/auth/me/route.ts`
- `/app/api/auth/session/route.ts`

### Utils
- `/utils/auth/role.utils.ts`
- `/utils/auth/permissions.utils.ts`

### Pages
- `/app/admin/login/page.tsx`
- `/app/admin/layout.tsx` (con protección)

