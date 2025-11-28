#!/usr/bin/env node

/**
 * Script para crear un usuario ADMIN inicial
 * 
 * Uso:
 *   node scripts/create-admin-user.js <email> <password> <name>
 * 
 * Ejemplo:
 *   node scripts/create-admin-user.js admin@example.com password123 "Admin User"
 * 
 * O usando curl:
 *   curl -X POST http://localhost:3000/api/admin/create-user \
 *     -H "Content-Type: application/json" \
 *     -H "x-secret-key: tu-secret-key" \
 *     -d '{"email":"admin@example.com","password":"password123","name":"Admin User","role":"ADMIN"}'
 */

const args = process.argv.slice(2);

if (args.length < 3) {
  console.error("Error: Se requieren 3 argumentos");
  console.error("Uso: node scripts/create-admin-user.js <email> <password> <name>");
  console.error("Ejemplo: node scripts/create-admin-user.js admin@example.com password123 \"Admin User\"");
  process.exit(1);
}

const [email, password, name] = args;
const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";
const secretKey = process.env.ADMIN_CREATE_USER_SECRET_KEY || "";

async function createAdminUser() {
  try {
    const response = await fetch(`${baseUrl}/api/admin/create-user`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(secretKey && { "x-secret-key": secretKey }),
      },
      body: JSON.stringify({
        email,
        password,
        name,
        role: "ADMIN",
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error("Error:", data.error || "Error desconocido");
      process.exit(1);
    }

    console.log("✅ Usuario ADMIN creado exitosamente!");
    console.log("📧 Email:", email);
    console.log("👤 Nombre:", name);
    console.log("🆔 User ID:", data.data?.userId);
    console.log("\n💡 Ahora puedes hacer login en /admin/login");
  } catch (error) {
    console.error("Error al crear el usuario:", error.message);
    process.exit(1);
  }
}

createAdminUser();

