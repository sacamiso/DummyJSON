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

  @ViewChild('searchBox') searchBox: HTMLInputElement  | undefined;

  productos: Array<Product> = [];
  numeroProductos: number = 0;
  pagina: number = 0;
  tamPag = constants.tamPags;
  cargado = false;
  pAux: Product | undefined; 

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
    if(this.searchBox){
      if(this.searchBox.value != ""){
        this.productService.searchProductInterval(this.searchBox.value,limit, skip).subscribe({
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
      }else{
        this.productService.getProductsInterval(limit, skip).subscribe({
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
    }else{
      this.productService.getProductsInterval(limit, skip).subscribe({
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
    
    
  }

  eliminarProducto(id: number) {
    this.productService.deleteProduct(id).subscribe({
      next: (response) => {
        this.pAux = response;
        alert('El producto'+ this.pAux.title +' ha sido eliminado correctamente');
      },
      error: (error) => {
        console.log(error);
      }
    })
  }

  search(search: string) {
    this.productService.searchProduct(search).subscribe({
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

  goToNewProduct() {
    //console.log('this.router.url', this.router.url)
    this.router.navigate(['productos/producto/detalle']);
  }
  
}

