import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Producto } from '../models/producto.model';

@Injectable({ providedIn: 'root' })
export class ProductoService {
  private readonly productos: Producto[] = [];

  obtenerProductos(): Producto[] {
    return [...this.productos];
  }

  agregarProducto(producto: Producto): Observable<Producto> {
    this.productos.push({ ...producto });
    console.log('Producto recibido por el backend simulado:', producto);
    return of({ ...producto });
  }
}
