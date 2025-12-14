# 📁 Estructura de Carpetas

## Organización por Features

El proyecto está organizado siguiendo un patrón de **features** donde cada feature agrupa todo su código relacionado (hooks, services, types, components). El código compartido entre features se encuentra en `common/`.

```
/
├── app/                          # Next.js App Router
│   ├── (public)/                 # Rutas públicas
│   │   ├── page.tsx             # Home
│   │   ├── registration/        # Registro público
│   │   └── confirm-payment/     # Confirmación de pago
│   ├── admin/                   # Área admin (protegida)
│   │   ├── layout.tsx          # Layout con protección
│   │   ├── login/              # Login
│   │   ├── caravans/           # Gestión de caravanas
│   │   ├── chapels/            # Gestión de capillas
│   │   ├── users/              # Gestión de usuarios
│   │   └── buses/              # Gestión de buses
│   └── api/                     # API Routes (server-side)
│       └── auth/               # Endpoints de autenticación
│
├── features/                     # Features de la aplicación
│   ├── auth/                    # Feature de autenticación
│   │   ├── hooks/              # Hooks específicos (useCreateUser, etc.)
│   │   ├── services/           # Servicios específicos (user.services.ts)
│   │   ├── types/              # Tipos específicos (user.types.ts)
│   │   └── components/         # Componentes específicos (si aplica)
│   ├── caravans/               # Feature de caravanas
│   │   ├── hooks/
│   │   ├── services/
│   │   ├── types/
│   │   └── components/
│   ├── chapels/                # Feature de capillas
│   │   ├── hooks/
│   │   ├── services/
│   │   ├── types/
│   │   └── components/
│   └── [otras-features]/       # Otras features siguiendo el mismo patrón
│
├── common/                      # Código compartido entre features
│   ├── hooks/                  # Hooks compartidos (roles.hooks.ts)
│   ├── services/               # Servicios compartidos (roles.services.ts)
│   ├── types/                  # Tipos compartidos (roles.types.ts)
│   ├── components/             # Componentes reutilizables globales
│   │   ├── layout/             # Componentes de layout
│   │   └── shared/             # Componentes compartidos genéricos
│   ├── providers/              # Providers de React (Ant Design, React Query)
│   │   ├── antd-provider.tsx
│   │   └── query-provider.tsx
│   ├── lib/                    # Configuración y utilidades base
│   │   ├── repositories/       # Repositorios (Repository Pattern)
│   │   └── firebase.js         # Configuración de Firebase
│   └── utils/                  # Utilidades generales
│       └── firestore/          # Utilidades de Firestore
│
└── wiki/                        # Documentación
    ├── project.md              # Especificación funcional
    └── development.md          # Índice de desarrollo
```

## Principios de Organización

### Cuándo usar `features/`

- Código específico de una feature de negocio (auth, caravans, chapels, users, buses)
- Hooks, services, types y components que solo se usan en esa feature
- Ejemplo: `features/auth/` contiene todo lo relacionado con autenticación

**Estructura estándar de una feature:**

```
features/[feature]/
  ├── hooks/          # Hooks específicos de la feature
  ├── services/       # Servicios específicos de la feature
  ├── types/          # Tipos específicos de la feature
  └── components/     # Componentes específicos de la feature (opcional)
```

### Cuándo usar `common/`

- Código compartido entre múltiples features
- Utilidades y helpers genéricos
- Componentes reutilizables globales (layout, shared)
- Providers de React (Ant Design, React Query)
- Configuración base (Firebase, repositories)
- Utilidades generales (firestore helpers, etc.)

**Ejemplos:**

- `common/roles/` - Se usa en auth y otras features
- `common/components/layout/` - Componentes de layout compartidos
- `common/providers/` - Providers globales de React
- `common/lib/` - Configuración de Firebase y repositorios
- `common/utils/` - Utilidades generales de Firestore

## Ejemplos Concretos

### Feature: `features/auth/`

```
features/auth/
  ├── hooks/
  │   └── user.hooks.ts          # useCreateUser, etc.
  ├── services/
  │   └── user.services.ts      # createUser, etc.
  ├── types/
  │   └── user.types.ts          # User, CreateUserInput, etc.
  └── components/                # Componentes específicos de auth (opcional)
```

### Código Compartido: `common/roles/`

```
common/
  ├── hooks/
  │   └── roles.hooks.ts         # useRoles
  ├── services/
  │   └── roles.services.ts      # getRoles
  └── types/
      └── roles.types.ts          # Role
```

## Beneficios de esta Estructura

- **Cohesión**: Todo el código de una feature está junto, facilitando el mantenimiento
- **Mantenibilidad**: Fácil encontrar y modificar código relacionado
- **Escalabilidad**: Fácil agregar nuevas features siguiendo el mismo patrón
- **Reutilización**: `common/` para código compartido, `features/` para específico
- **Claridad**: Estructura predecible y fácil de navegar

---

**Ver también**: [Convenciones de Código](./04-convenciones-codigo.md) | [Índice](./development.md)
