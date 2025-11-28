# 📁 Estructura de Carpetas

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
├── components/                   # Componentes React reutilizables
│   ├── auth/                   # Componentes de autenticación
│   ├── providers/              # Providers (Ant Design, React Query)
│   ├── layout/                 # Componentes de layout
│   ├── forms/                  # Formularios reutilizables
│   ├── tables/                 # Tablas con Ant Design
│   └── shared/                 # Componentes compartidos
│
├── hooks/                       # Custom Hooks
│   ├── auth/                   # Hooks de autenticación
│   └── [feature]/              # Hooks por feature
│
├── lib/                         # Lógica de negocio y servicios
│   ├── auth/                   # Servicios de autenticación
│   ├── repositories/           # Repositorios (Repository Pattern)
│   ├── services/               # Servicios de negocio
│   └── utils/                  # Utilidades específicas
│
├── types/                       # Tipos TypeScript
│   ├── models/                 # Tipos de modelos de Firestore
│   ├── auth/                   # Tipos de autenticación
│   └── common/                 # Tipos compartidos
│
├── utils/                       # Utilidades generales
│   ├── auth/                   # Utilidades de autenticación
│   └── firestore/              # Utilidades de Firestore
│
├── firebase/                    # Configuración de Firebase
│   ├── client.ts               # Cliente Firebase (singleton)
│   ├── admin.ts                # Admin SDK
│   └── config/                 # Configuración
│
└── wiki/                        # Documentación
    ├── project.md              # Especificación funcional
    └── development.md          # Índice de desarrollo
```

---

**Ver también**: [Convenciones de Código](./04-convenciones-codigo.md) | [Índice](./development.md)

