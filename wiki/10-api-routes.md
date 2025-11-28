# 🔌 API Routes

## Estructura

- Todas las rutas API en `/app/api`
- Siguen la estructura de Next.js App Router
- Route handlers: `route.ts`

## Convenciones

### Métodos HTTP

- `GET` - Lectura de datos
- `POST` - Creación/mutaciones
- `PUT` - Actualización completa
- `PATCH` - Actualización parcial
- `DELETE` - Eliminación

### Respuestas

- Formato estándar usando `ApiResponse<T>`
- Códigos HTTP apropiados
- Mensajes de error claros

```typescript
// Ejemplo de respuesta
return NextResponse.json<ApiResponse>(
  {
    success: true,
    data: result,
  },
  { status: 200 }
);
```

### Autenticación en API Routes

- Middleware `verifyAuth()` para verificar token
- Middleware `verifyRole()` para verificar roles
- Extraer usuario con `getUserFromRequest()`

---

**Ver también**: [Firebase y Firestore](./11-firebase.md) | [Índice](./development.md)

