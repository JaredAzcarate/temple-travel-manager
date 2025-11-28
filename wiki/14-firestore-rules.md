# 🔒 Firestore Security Rules

## Configuración

Las reglas de seguridad de Firestore están definidas en `firestore.rules` en la raíz del proyecto.

## Reglas Básicas

### Autenticación

- Todas las operaciones requieren autenticación (excepto creación de registros públicos)
- Los usuarios ADMIN tienen acceso completo
- Los usuarios CHAPEL solo pueden ver/editar registros de su propia capilla

### Colecciones

#### `users`
- **Lectura**: Usuarios autenticados pueden leer
- **Escritura**: Solo ADMIN o el propio usuario puede crear/actualizar
- **Eliminación**: Solo ADMIN

#### `chapels`
- **Lectura**: Usuarios autenticados
- **Escritura**: Solo ADMIN

#### `caravans`
- **Lectura**: Usuarios autenticados
- **Escritura**: Solo ADMIN

#### `buses`
- **Lectura**: Usuarios autenticados
- **Escritura**: Solo ADMIN

#### `busStops`
- **Lectura**: Usuarios autenticados
- **Escritura**: Solo ADMIN

#### `registrations`
- **Lectura**: 
  - ADMIN: Ve todas las registraciones
  - CHAPEL: Solo ve las de su capilla
- **Creación**: Público (registro sin autenticación)
- **Actualización**: ADMIN o CHAPEL (solo de su capilla)
- **Eliminación**: Solo ADMIN

## Desarrollo

Para desarrollo, puedes usar reglas más permisivas temporalmente:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if true; // Solo para desarrollo
    }
  }
}
```

**⚠️ IMPORTANTE**: Nunca uses reglas permisivas en producción.

## Despliegue

Para desplegar las reglas a Firebase:

```bash
firebase deploy --only firestore:rules
```

O desde Firebase Console:
1. Ve a Firestore Database
2. Pestaña "Rules"
3. Copia y pega el contenido de `firestore.rules`
4. Haz clic en "Publish"

---

**Ver también**: [Firebase y Firestore](./11-firebase.md) | [Índice](./development.md)

