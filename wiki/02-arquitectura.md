# 🏗 Arquitectura y Principios

## Principios SOLID

El proyecto sigue los principios SOLID:

### Single Responsibility Principle (SRP)

- Cada módulo/clase tiene una única responsabilidad
- Ejemplo: `UserRepository` solo maneja operaciones CRUD de usuarios
- Ejemplo: `AuthService` solo maneja autenticación

### Open/Closed Principle (OCP)

- Componentes extensibles mediante props/interfaces
- No modificamos código existente, lo extendemos

### Liskov Substitution Principle (LSP)

- Los componentes pueden ser reemplazados por sus interfaces
- Ejemplo: `RequireRole` puede reemplazar `ProtectedRoute`

### Interface Segregation Principle (ISP)

- Interfaces específicas y pequeñas
- Hooks específicos para cada necesidad (`useAuth`, `useAuthState`)

### Dependency Inversion Principle (DIP)

- Repositorios dependen de abstracciones, no de implementaciones
- Inyección de dependencias mediante servicios

## Patrones de Diseño

### Repository Pattern

- Todos los accesos a Firestore se hacen a través de repositorios
- Ubicación: `/lib/repositories/`
- Ejemplo: `UserRepository`, `ChapelRepository`, etc.

### Service Layer

- Lógica de negocio encapsulada en servicios
- Ubicación: `/lib/auth/`, `/lib/services/`
- Ejemplo: `AuthService`

### Custom Hooks

- Lógica reutilizable encapsulada en hooks
- Ubicación: `/hooks/`
- Ejemplo: `useAuth`, `useAuthState`

### Context API + React Query

- Estado global de autenticación con Context API
- Estado del servidor con React Query
- Cache automático y sincronización

---

**Ver también**: [Estructura de Carpetas](./03-estructura-carpetas.md) | [Índice](./development.md)

