# 🧭 Routing y Navegación

## Next.js App Router

- Todas las rutas están en `/app`
- Rutas dinámicas con `[id]` (ej: `/admin/caravans/[id]`)

## Protección de Rutas

### Rutas Públicas

- `/` - Home
- `/registration` - Registro público
- `/registration/success` - Confirmación de registro
- `/confirm-payment` - Confirmación de pago

### Rutas Protegidas (Admin)

- Todas las rutas en `/admin/**` están protegidas
- Componente `AuthGuard` en el layout de admin
- Redirección automática a `/admin/login` si no autenticado

## Filtros y Búsquedas

**Los filtros se manejan mediante parámetros de URL (query params).**

### Ejemplo de Implementación

```typescript
import { useSearchParams } from "next/navigation";

export default function CaravansPage() {
  const searchParams = useSearchParams();
  const chapelId = searchParams.get("chapelId");
  const status = searchParams.get("status");

  // Usar los parámetros para filtrar
  const { data } = useQuery({
    queryKey: ["caravans", { chapelId, status }],
    queryFn: () => caravanRepository.getFiltered({ chapelId, status }),
  });
}
```

### Ventajas

- URLs compartibles y bookmarkeables
- Estado de filtros visible en la URL
- Navegación con botón "atrás" del navegador funciona correctamente
- Fácil de debuggear

### Convención de Nombres

- Parámetros en camelCase (ej: `?chapelId=123&status=active`)
- Valores múltiples con array (ej: `?busIds[]=1&busIds[]=2`)

---

**Ver también**: [UI y Estilos](./08-ui-estilos.md) | [Índice](./development.md)

