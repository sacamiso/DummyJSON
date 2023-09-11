import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { ProductService } from '../../core/services/product.service';
import { Product } from 'src/app/core/model/product.model';

@Component({
  selector: 'app-detalle-producto',
  templateUrl: './detalle-producto.component.html',
  styleUrls: ['./detalle-producto.component.css']
})
export class DetalleProductoComponent implements OnInit {

  producto: Product | undefined;
  mensaje: string ="";
  

  constructor(
    private route: ActivatedRoute, //gracias a esta linea se obtiene el id del producto
    private readonly productService: ProductService,
    private location: Location
  ) { }

  ngOnInit(): void {
    this.getProduct();
  }


  getProduct(){
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.productService.getProductById(id).subscribe({
      next: (response) => {
        this.producto = response;
      },
      error: (error) => {
        console.log(error);
      }
    })
  }

  

  goBack(): void {
    this.location.back();
  }

}
