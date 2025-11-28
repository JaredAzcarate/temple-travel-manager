# 💬 Feedback al Usuario

## Notification de Ant Design (OBLIGATORIO)

**⚠️ IMPORTANTE: Todo el feedback al usuario DEBE usar el componente `notification` de Ant Design.**

**NO usar `message` de Ant Design. Solo usar `notification`.**

## Idioma del Feedback

**⚠️ IMPORTANTE: Todo el feedback al usuario (notificaciones, mensajes de error, etc.) DEBE estar en portugués de Portugal.**

Los títulos y descripciones de las notificaciones deben estar en portugués de Portugal, no en inglés ni en español.

### ¿Por qué Notification?

- Mejor UX: las notificaciones aparecen en una posición fija y no bloquean la interacción
- Más información: permite mostrar títulos, descripciones y acciones
- Mejor accesibilidad: permanecen visibles hasta que el usuario las cierre
- Consistencia: todas las notificaciones tienen el mismo estilo y comportamiento

### Uso Básico

```typescript
import { notification } from "antd";

// Notificação de sucesso (português de Portugal)
notification.success({
  title: "Sucesso",
  description: "O utilizador foi criado com sucesso",
});

// Notificação de erro (português de Portugal)
notification.error({
  title: "Erro",
  description: "Não foi possível criar o utilizador. Por favor, tente novamente.",
});

// Notificação de aviso (português de Portugal)
notification.warning({
  title: "Aviso",
  description: "Esta ação não pode ser desfeita",
});

// Notificação de informação (português de Portugal)
notification.info({
  title: "Informação",
  description: "As alterações serão guardadas automaticamente",
});
```

### Configuración Recomendada

```typescript
import { notification } from "antd";

// Configuración global (opcional, en el provider)
notification.config({
  placement: "topRight",
  duration: 4.5,
  rtl: false,
});
```

### Ejemplo en Hooks

```typescript
import { notification } from "antd";
import { useMutation } from "@tanstack/react-query";

export function useCreateUser() {
  return useMutation({
    mutationFn: async (data: CreateUserInput) => {
      // ... lógica de creación
    },
    onSuccess: () => {
      notification.success({
        title: "Sucesso",
        description: "O utilizador foi criado com sucesso",
      });
    },
    onError: (error: Error) => {
      notification.error({
        title: "Erro ao criar utilizador",
        description: error.message || "Ocorreu um erro inesperado",
      });
    },
  });
}
```

### Ejemplo en Componentes

```typescript
import { notification } from "antd";
import { Button } from "antd";

export default function MyComponent() {
  const handleClick = async () => {
    try {
      await someAsyncOperation();
      notification.success({
        title: "Sucesso",
        description: "A operação foi concluída com sucesso",
      });
    } catch (error) {
      notification.error({
        title: "Erro",
        description:
          error instanceof Error ? error.message : "Erro desconhecido",
      });
    }
  };

  return <Button onClick={handleClick}>Ejecutar</Button>;
}
```

### Configuración Global (Opcional)

Puedes configurar la posición por defecto globalmente:

```typescript
import { notification } from "antd";

notification.config({
  placement: "topRight",
  duration: 4.5,
});
```

### Duración

- Por defecto: 4.5 segundos
- Se puede personalizar por notificación
- `duration: 0` para que no se cierre automáticamente

```typescript
notification.success({
  title: "Importante",
  description: "Esta notificação permanecerá até que a feches",
  duration: 0,
});
```

### ❌ NO Hacer

```typescript
// ❌ NO usar message
import { message } from "antd";
message.success("Operación exitosa");
message.error("Error");

// ❌ NO usar alert nativo
alert("Operación exitosa");

// ❌ NO usar console.log para feedback al usuario
console.log("Operación exitosa");
```

### ✅ Hacer

```typescript
// ✅ Usar notification com português de Portugal
import { notification } from "antd";
notification.success({
  title: "Sucesso",
  description: "As alterações foram guardadas com sucesso",
});
```

---

**Ver también**: [API Routes](./10-api-routes.md) | [Índice](./development.md)
