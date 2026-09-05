import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Producto } from './models/producto.model';
import { ProductoService } from './services/producto.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  private readonly formBuilder = inject(FormBuilder);
  private readonly productoService = inject(ProductoService);

  readonly categorias = ['Tecnología', 'Hogar', 'Oficina', 'Ropa', 'Alimentos'];
  readonly formularioProducto = this.formBuilder.nonNullable.group({
    nombre: ['', [Validators.required, Validators.minLength(3)]],
    descripcion: ['', [Validators.required, Validators.minLength(10)]],
    precio: [0, [Validators.required, Validators.min(1)]],
    categoria: ['', Validators.required],
    stock: [0, [Validators.required, Validators.min(0)]],
  });

  productos: Producto[] = this.productoService.obtenerProductos();
  mensajeExito = false;
  intentoEnvio = false;

  esInvalido(campo: keyof typeof this.formularioProducto.controls): boolean {
    const control = this.formularioProducto.controls[campo];
    return control.invalid && (control.touched || this.intentoEnvio);
  }

  guardarProducto(): void {
    this.intentoEnvio = true;
    if (this.formularioProducto.invalid) {
      this.formularioProducto.markAllAsTouched();
      this.mensajeExito = false;
      return;
    }

    const producto: Producto = this.formularioProducto.getRawValue();
    this.productoService.agregarProducto(producto).subscribe({
      next: () => {
        this.productos = this.productoService.obtenerProductos();
        this.mensajeExito = true;
        this.formularioProducto.reset({ nombre: '', descripcion: '', precio: 0, categoria: '', stock: 0 });
        this.intentoEnvio = false;
      },
      error: (error: unknown) => {
        console.error('Error al enviar el producto:', error);
        this.mensajeExito = false;
      },
    });
  }

  limpiarFormulario(): void {
    this.formularioProducto.reset({ nombre: '', descripcion: '', precio: 0, categoria: '', stock: 0 });
    this.intentoEnvio = false;
    this.mensajeExito = false;
  }
}
