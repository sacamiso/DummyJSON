import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { ProductComponent } from './modules/products/products.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; 

import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { PaginadorComponent } from './modules/paginador/paginador.component';
import { NuevoProductoComponent } from './modules/nuevo-producto/nuevo-producto.component';
import { NavegacionComponent } from './modules/navegacion/navegacion.component';
import { PaginaInicioComponent } from './modules/pagina-inicio/pagina-inicio.component';
import { UsuariosComponent } from './modules/usuarios/usuarios.component';
import { NuevoUsuarioComponent } from './modules/nuevo-usuario/nuevo-usuario.component';
import { CarritosComponent } from './modules/carritos/carritos.component';
import { FooterComponent } from './modules/footer/footer.component';
@NgModule({
  declarations: [
    AppComponent,
    ProductComponent,
    PaginadorComponent,
    NuevoProductoComponent,
    NavegacionComponent,
    PaginaInicioComponent,
    UsuariosComponent,
    NuevoUsuarioComponent,
    CarritosComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
