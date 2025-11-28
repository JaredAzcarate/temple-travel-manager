# 🎨 UI y Estilos

## Ant Design como Base

- **Componentes UI**: 100% Ant Design
- **Tema**: Configurado en `AntdProvider`
- **Iconos**: Phosphor Icons (ver [memoria del proyecto](https://phosphoricons.com/))

## Idioma da UI

**⚠️ IMPORTANTE: Todo o texto da UI (labels, botões, placeholders, etc.) DEVE estar em português de Portugal.**

```typescript
// ✅ Correcto - UI em português de Portugal
<Form.Item label="Nome Completo" name="name">
  <Input placeholder="João Silva" />
</Form.Item>
<Button>Guardar</Button>

// ❌ Incorrecto - UI em inglês ou espanhol
<Form.Item label="Full Name" name="name">
  <Input placeholder="John Doe" />
</Form.Item>
<Button>Save</Button>
```

## Tailwind CSS para Estilos

- **NO CSS Modules**: Solo Tailwind
- **Clases utility-first**: `className="flex items-center gap-4"`
- **Combinación**: Ant Design para componentes, Tailwind para layout y spacing

### Ejemplo

```tsx
<div className="flex items-center gap-4 p-6 bg-white rounded-lg shadow-sm">
  <AntDesignComponent />
  <span className="text-gray-600">Texto con Tailwind</span>
</div>
```

## Modo de Color

**⚠️ IMPORTANTE: El proyecto NO tiene dark mode. Solo light mode.**

- No implementar toggle de dark mode
- No usar variables CSS para temas
- Ant Design configurado solo para light mode

## Responsive Design

- Mobile-first approach
- Tailwind breakpoints: `sm:`, `md:`, `lg:`, `xl:`
- Ant Design responsive components cuando aplique

---

**Ver también**: [Feedback al Usuario](./09-feedback-usuario.md) | [Índice](./development.md)

