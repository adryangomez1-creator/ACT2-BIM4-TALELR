# Documentación: Formulario Reactivo de Registro de Productos en Angular

**Institución:** Fundación Kinal  
**Curso:** Taller / Desarrollo Web  
**Actividad:** Actividad 2 &mdash; Formulario Reactivo de Registro de Productos  

---

## 1. Modelo de Datos (`src/app/models/producto.model.ts`)
Se definió la interfaz `Producto` con los tipos de datos requeridos para cada campo:

```typescript
export interface Producto {
  nombre: string;
  descripcion: string;
  precio: number;
  categoria: string;
  stock: number;
}
```

---

## 2. Formulario Reactivo y Validaciones (`src/app/components/producto-form/`)
El formulario se construye utilizando `FormBuilder` y `FormGroup`, configurando controles y validaciones síncronas para cada campo:

| Campo | Tipo | Validaciones | Mensaje de Error |
| :--- | :--- | :--- | :--- |
| **Nombre** | Texto | `Validators.required`, `Validators.minLength(3)` | Campo obligatorio y mínimo 3 caracteres. |
| **Descripción** | Texto largo | `Validators.required`, `Validators.minLength(10)` | Campo obligatorio y mínimo 10 caracteres. |
| **Precio** | Numérico | `Validators.required`, `Validators.min(1)` | Campo obligatorio y valor mayor a 0. |
| **Categoría** | Selección | `Validators.required` | Debe seleccionar una categoría. |
| **Stock** | Numérico | `Validators.required`, `Validators.min(0)` | Campo obligatorio y no puede ser negativo. |

### Control de Estados:
- **`invalid` y `touched`**: Se evalúan con la función `esInvalido(campo)` para mostrar los errores solo si el usuario interactuó con el campo.
- **`markAllAsTouched()`**: Si se intenta enviar el formulario con datos incompletos o inválidos, se marcan todos los campos como tocados para alertar visualmente al usuario.

---

## 3. Uso de Directivas Estructurales (`*ngIf` y `*ngFor`)
- **`*ngIf`**:
  - Muestra condicionalmente los mensajes de error en rojo debajo de cada control si `esInvalido(campo)` es verdadero.
  - Muestra el mensaje de alerta de éxito cuando el producto se guarda correctamente.
  - En la tabla de productos, muestra un mensaje si no hay productos registrados.
- **`*ngFor`**:
  - Itera la lista de categorías en el elemento `<select>` del formulario.
  - Itera la lista de productos registrados para mostrarlos en las filas de la tabla.

---

## 4. Servicio e Inyección de Dependencias (`src/app/services/producto.service.ts`)
El servicio `ProductoService` se encuentra decorado con `@Injectable({ providedIn: 'root' })` e inyectado en el constructor de los componentes.

- **`obtenerProductos()`**: Devuelve el arreglo de productos registrados.
- **`agregarProducto(producto)`**: Agrega el nuevo producto a la lista e imprime en la consola (`console.log`) los datos recibidos para verificar la comunicación simulada con el backend.

---

## 5. Pruebas Realizadas

1. **Prueba de Formulario Inválido:**
   - Se intenta enviar el formulario vacío.
   - **Resultado:** No se envía ningún dato al servicio, los campos se marcan en rojo (`is-invalid`) y se despliegan los mensajes de error con `*ngIf`.
2. **Prueba de Longitudes y Valores:**
   - Se ingresa un nombre de 2 letras y un precio de -5.
   - **Resultado:** Se muestran los mensajes: *"El nombre debe tener al menos 3 caracteres"* y *"El precio debe ser mayor a 0"*.
3. **Prueba de Envío Válido:**
   - Se completan todos los campos correctamente y se presiona **Guardar Producto**.
   - **Resultado:** Los datos se envían al `ProductoService`, se muestran en consola, se actualiza la tabla de productos a la derecha y el formulario se limpia automáticamente mostrando una alerta de éxito.
