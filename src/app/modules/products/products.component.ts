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

  constructor(private readonly productService: ProductService,
    private readonly router: Router) { }

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

  eliminarProducto(id: number) {
    this.productService.deleteProduct(id).subscribe({
      next: (response) => {
        this.pAux = response;
        alert('El producto' + this.pAux.title + ' ha sido eliminado correctamente');
      },
      error: (error) => {
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
    //console.log('this.router.url', this.router.url)
    this.router.navigate(['productos/producto/detalle']);
  }

}

