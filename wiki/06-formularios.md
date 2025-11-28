# 📋 Formularios

## Ant Design Form (NO react-hook-form)

**Usamos exclusivamente el sistema de formularios de Ant Design.**

### Estructura Básica

```typescript
const [form] = Form.useForm<FormData>();

<Form
  form={form}
  layout="vertical"
  onFinish={handleSubmit}
  onFinishFailed={handleError}
>
  <Form.Item
    name="email"
    label="Email"
    rules={[
      { required: true, message: "El email es requerido" },
      { type: "email", message: "Email inválido" },
    ]}
  >
    <Input />
  </Form.Item>
</Form>
```

### Validación

- Validación integrada de Ant Design
- Reglas en el prop `rules` de `Form.Item`
- Mensajes personalizados en español

### Ventajas

- Integración perfecta con Ant Design
- Validación robusta out-of-the-box
- Menos dependencias
- UI consistente

---

**Ver también**: [Routing y Navegación](./07-routing.md) | [Índice](./development.md)

