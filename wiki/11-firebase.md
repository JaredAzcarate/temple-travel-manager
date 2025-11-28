# 🔥 Firebase y Firestore

## Configuración

- Cliente Firebase: `/firebase/client.ts` (singleton)
- Admin SDK: `/firebase/admin.ts` (para server-side)
- Configuración en variables de entorno (`.env.local`)

## Collections (Firestore)

- Nombres en inglés, plural, camelCase
- `chapels`, `users`, `caravans`, `buses`, `busStops`, `registrations`

## Repository Pattern

**Todas las operaciones de Firestore pasan por repositorios**

- Ubicación: `/lib/repositories/`
- Métodos estándar: `getAll()`, `getById()`, `create()`, `update()`, `delete()`

### Ejemplo

```typescript
export class CaravanRepository {
  async getAll(): Promise<WithId<Caravan>[]> {
    // Implementación con Firestore
  }

  async getById(id: string): Promise<WithId<Caravan>> {
    // Implementación con Firestore
  }
}
```

## Tipos TypeScript

- Interfaces para cada modelo en `/types/models/`
- Helper types: `WithId<T>`, `CreateInput<T>`, `UpdateInput<T>`
- Converters para Timestamps

## Errores

- Clases de error personalizadas en `/utils/firestore/errors.ts`
- `FirestoreNotFoundError`, `FirestoreValidationError`, etc.

---

**Ver también**: [Testing y Validación](./12-testing.md) | [Índice](./development.md)

