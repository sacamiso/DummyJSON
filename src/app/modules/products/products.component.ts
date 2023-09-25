import { Component, OnInit, ViewChild } from '@angular/core';
import { ProductService } from '../../core/services/product.service';
import { Product } from 'src/app/core/model/product.model';
import { constants } from 'src/app/core/constants';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})

export class ProductComponent implements OnInit {

  //@ViewChild('searchBox') searchBox: HTMLInputElement | undefined;

  productos: Array<Product> = [];
  numeroProductos: number = 0;
  pagina: number = 0;
  tamPag: number = constants.tamPags;
  cargado = false;
  pAux: Product | undefined;

  textSearchBox: string = '';
  alertPlaceholder: HTMLElement | null;

  constructor(private readonly productService: ProductService,
    private readonly router: Router) {
      this.alertPlaceholder = document.getElementById('liveAlert');
     }

  ngOnInit(): void {
    this.cargarPagina(0);
  }

  cargarPagina(pag: number) {
    this.pagina = pag;
    this.listaElementosMostrar(this.tamPag, this.tamPag * this.pagina);
  }

  listaElementosMostrar(limit: number, skip: number) {
    this.productService.searchProductInterval(this.textSearchBox, limit, skip).subscribe({
      next: (response) => {
        this.productos = response.products;
        this.numeroProductos = response.total;
      },
      error: (error) => {
        console.log(error);
      },
      complete: () => {
        this.cargado = true;
      }
    })
  }

  alerta(message: string, type: string) {
    this.alertPlaceholder = document.getElementById('liveAlert');
    if (!this.alertPlaceholder) {
      return;
    }

    const wrapper = document.createElement('div');
    wrapper.innerHTML = `<div class="alert alert-${type} alert-dismissible" role="alert"> ${message} <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button></div>`;

    this.alertPlaceholder.appendChild(wrapper);
  }

  eliminarProducto(id: number) {
    this.productService.deleteProduct(id).subscribe({
      next: (response) => {
        this.pAux = response;
        this.alerta('El producto ' + this.pAux.title + ' ha sido eliminado correctamente', 'success');
        
      },
      error: (error) => {
        this.alerta('El producto no se ha podido eliminar', 'danger');
        console.log(error);
      }
    })
  }

  search(search: string) {
    this.pagina = 0;
    this.textSearchBox = search;
    this.productService.searchProductInterval(search, this.tamPag, this.tamPag * this.pagina).subscribe({
      next: (response) => {
        this.productos = response.products;
        this.numeroProductos = response.total;
        console.log(this.productos);
      },
      error: (error) => {
        console.log(error);
      }
    })
  }

  Multiplos4(total: number) {
    return Array.from({ length: total }, (_, i) => (i + 1) * 4); //para cada posición calcula su múltiplo de 4
  }

  goToNewProduct() {
   
    this.router.navigate(['productos/producto/detalle']);
  }

}

