# ⚙️ Configuración de Firebase Admin SDK

## Problema Común

Si ves el error:
```
Firebase Admin credentials not configured. 
Set FIREBASE_ADMIN_CLIENT_EMAIL and FIREBASE_ADMIN_PRIVATE_KEY environment variables
```

Significa que necesitas configurar las credenciales de Firebase Admin SDK.

## Solución

### Opción 1: Usar Service Account JSON (Recomendado para desarrollo)

1. Ve a [Firebase Console](https://console.firebase.google.com/)
2. Selecciona tu proyecto
3. Ve a **Project Settings** (⚙️) > **Service Accounts**
4. Haz clic en **Generate New Private Key**
5. Descarga el archivo JSON (ej: `serviceAccountKey.json`)
6. **NO subas este archivo a Git** (debe estar en `.gitignore`)

#### Configurar variables de entorno

Crea o actualiza tu archivo `.env.local`:

```bash
# Firebase Admin SDK - Service Account
FIREBASE_ADMIN_PROJECT_ID=tu-project-id
FIREBASE_ADMIN_CLIENT_EMAIL=firebase-adminsdk-xxxxx@tu-project-id.iam.gserviceaccount.com
FIREBASE_ADMIN_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nTu private key aquí\n-----END PRIVATE KEY-----\n"
```

**Importante**: 
- El `PRIVATE_KEY` debe estar entre comillas dobles
- Los `\n` deben estar presentes (representan saltos de línea)
- Si copias desde el JSON, asegúrate de mantener los saltos de línea

### Opción 2: Extraer del JSON manualmente

Si tienes el archivo JSON del service account:

```json
{
  "type": "service_account",
  "project_id": "tu-project-id",
  "private_key_id": "...",
  "private_key": "-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n",
  "client_email": "firebase-adminsdk-xxxxx@tu-project-id.iam.gserviceaccount.com",
  ...
}
```

Extrae estos valores:
- `project_id` → `FIREBASE_ADMIN_PROJECT_ID`
- `client_email` → `FIREBASE_ADMIN_CLIENT_EMAIL`
- `private_key` → `FIREBASE_ADMIN_PRIVATE_KEY` (mantén los `\n`)

### Opción 3: Usar el mismo PROJECT_ID del cliente

Si ya tienes `NEXT_PUBLIC_FIREBASE_PROJECT_ID` configurado, puedes usar:

```bash
# Firebase Admin SDK
FIREBASE_ADMIN_PROJECT_ID=${NEXT_PUBLIC_FIREBASE_PROJECT_ID}
FIREBASE_ADMIN_CLIENT_EMAIL=firebase-adminsdk-xxxxx@tu-project-id.iam.gserviceaccount.com
FIREBASE_ADMIN_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"
```

## Verificación

Después de configurar las variables:

1. Reinicia el servidor de desarrollo (`npm run dev`)
2. Intenta crear un usuario desde `/admin/register`
3. Si funciona, verás el usuario creado en Firebase Console > Authentication

## Notas Importantes

### Seguridad

- **NUNCA** subas el archivo JSON del service account a Git
- **NUNCA** expongas las credenciales en el código
- Usa `.env.local` que está en `.gitignore`
- En producción, usa variables de entorno del hosting (Vercel, etc.)

### Permisos

El Service Account tiene permisos completos de administrador:
- Puede crear usuarios en Firebase Auth
- Puede escribir en Firestore sin restricciones de reglas
- Puede leer/escribir cualquier colección

Por eso es importante mantenerlo seguro.

## Troubleshooting

### Error: "Invalid private key"

- Verifica que el `PRIVATE_KEY` esté entre comillas dobles
- Verifica que los `\n` estén presentes
- No uses comillas simples

### Error: "Project ID not found"

- Verifica que `FIREBASE_ADMIN_PROJECT_ID` coincida con tu proyecto de Firebase
- Puedes usar `NEXT_PUBLIC_FIREBASE_PROJECT_ID` si es el mismo proyecto

### Error: "Permission denied"

- Verifica que el Service Account tenga permisos en Firebase Console
- Verifica las reglas de Firestore (`firestore.rules`)

### Error: "There is no configuration corresponding to the provided identifier"

Este error significa que el `projectId` no coincide con las credenciales del service account.

**Solución:**

1. **Verifica que todos los valores correspondan al mismo proyecto:**
   - Abre el archivo JSON del service account que descargaste
   - Verifica que `FIREBASE_ADMIN_PROJECT_ID` sea **exactamente igual** a `project_id` en el JSON
   - Verifica que `FIREBASE_ADMIN_CLIENT_EMAIL` sea **exactamente igual** a `client_email` en el JSON
   - Verifica que `FIREBASE_ADMIN_PRIVATE_KEY` sea **exactamente igual** a `private_key` en el JSON

2. **Ejemplo de verificación:**
   ```json
   // En tu serviceAccountKey.json:
   {
     "project_id": "mi-proyecto-12345",  // ← Debe coincidir con FIREBASE_ADMIN_PROJECT_ID
     "client_email": "firebase-adminsdk-abc@mi-proyecto-12345.iam.gserviceaccount.com",  // ← Debe coincidir
     "private_key": "-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"  // ← Debe coincidir
   }
   ```

   ```bash
   # En tu .env.local:
   FIREBASE_ADMIN_PROJECT_ID=mi-proyecto-12345  # ← Mismo valor que project_id
   FIREBASE_ADMIN_CLIENT_EMAIL=firebase-adminsdk-abc@mi-proyecto-12345.iam.gserviceaccount.com  # ← Mismo valor
   FIREBASE_ADMIN_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"  # ← Mismo valor
   ```

3. **Si usas NEXT_PUBLIC_FIREBASE_PROJECT_ID:**
   - Asegúrate de que `NEXT_PUBLIC_FIREBASE_PROJECT_ID` sea el mismo que `project_id` en el JSON
   - O mejor, usa explícitamente `FIREBASE_ADMIN_PROJECT_ID` con el valor del JSON

4. **Reinicia el servidor después de cambiar las variables:**
   ```bash
   # Detén el servidor (Ctrl+C) y reinícialo
   npm run dev
   ```

---

**Ver también**: [Firebase y Firestore](./11-firebase.md) | [Firestore Security Rules](./14-firestore-rules.md) | [Índice](./development.md)

