import { Component, OnInit} from '@angular/core';
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

  productos: Array<Product> = [];
  numeroProductos: number = 0;
  pagina: number = 0;
  tamPag = constants.tamPags;
  cargado = false;


  constructor(private readonly productService: ProductService,
    private readonly router: Router) { }

  ngOnInit() {

    this.cargarPagina(0);

  }

  cargarPagina(pag: number) {
    //console.log('He pasado por el segundo lugar'); 
    //console.log(pag);   
    this.pagina = pag;
    this.listaElementosMostrar(this.tamPag, this.tamPag*this.pagina);
  }

  listaElementosMostrar(limit: number, skip: number){
    //console.log('limit '+limit);
    //console.log('skip '+skip);
    this.productService.getProductsInterval(limit,skip).subscribe({
      next: (response) => {
        console.log('He pasado por el tercer lugar'); 
        
        this.productos = response.products;
        this.numeroProductos = response.total;
        //console.log(this.productos);
      },
      error: (error) => {
        console.log(error);
      },
      complete: () => {
        this.cargado = true;
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

      }
    })
  }

  goToNewProduct() {
    console.log('this.router.url', this.router.url)
    this.router.navigate(['productos/producto/detalle']);
  }

  /* Al final creo que este método no me es necesarioi ya que con el anterior vale
  
  getAll() {
    this.productService.getAllProducts().subscribe({
      next: (response) => {
        this.productos = response.products;
        this.numeroProductos = response.total;
        console.log(this.productos);
      },
      error: (error) => {

      }
    })
  }*/

}

