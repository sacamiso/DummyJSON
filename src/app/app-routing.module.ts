import { NgModule } from '@angular/core';

import { RouterModule, Routes } from '@angular/router';
import { ProductComponent } from 'src/app/modules/products/products.component';
import { DetalleProductoComponent } from 'src/app/modules/detalle-producto/detalle-producto.component';
import { NuevoProductoComponent } from 'src/app/modules/nuevo-producto/nuevo-producto.component';
import { PaginaInicioComponent } from './modules/pagina-inicio/pagina-inicio.component';


const routes: Routes = [
  {path: '', component:PaginaInicioComponent},
  {path: 'productos', component:ProductComponent},
  {path: 'productos/producto/:id', component:DetalleProductoComponent},
  {path: 'productos/producto/detalle/:id', component:NuevoProductoComponent},
  {path: 'productos/producto/detalle', component:NuevoProductoComponent},
];

 

@NgModule({

  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]

})

export class AppRoutingModule { }