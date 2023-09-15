import { NgModule } from '@angular/core';

import { RouterModule, Routes } from '@angular/router';
import { ProductComponent } from 'src/app/modules/products/products.component';
import { NuevoProductoComponent } from 'src/app/modules/nuevo-producto/nuevo-producto.component';
import { PaginaInicioComponent } from './modules/pagina-inicio/pagina-inicio.component';
import { UsuariosComponent } from './modules/usuarios/usuarios.component';
import { NuevoUsuarioComponent } from './modules/nuevo-usuario/nuevo-usuario.component';
import { CarritosComponent } from './modules/carritos/carritos.component';


const routes: Routes = [
  {path: '', component:PaginaInicioComponent},
  {path: 'productos', component:ProductComponent},
  {path: 'productos/producto/detalle', component:NuevoProductoComponent},
  {path: 'productos/producto/detalle/edit/:id', component:NuevoProductoComponent},
  {path: 'usuarios', component:UsuariosComponent},
  {path: 'usuarios/usuario/detalle', component:NuevoUsuarioComponent},
  {path: 'usuarios/usuario/detalle/edit/:id', component:NuevoUsuarioComponent},
  {path: 'carritos/usuario/:id', component:CarritosComponent},
];

 

@NgModule({

  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]

})

export class AppRoutingModule { }