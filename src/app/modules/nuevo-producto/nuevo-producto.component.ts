import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { FormBuilder } from '@angular/forms';

import { ProductService } from '../../core/services/product.service';
import { Product } from 'src/app/core/model/product.model';


@Component({
  selector: 'app-nuevo-producto',
  templateUrl: './nuevo-producto.component.html',
  styleUrls: ['./nuevo-producto.component.css']
})
export class NuevoProductoComponent implements OnInit {

  producto: Product | undefined;
  mensaje: string = "";
  existe = false;
  cargado = false;
  id: number;

  checkoutForm;

  constructor(
    private route: ActivatedRoute,
    private readonly productService: ProductService,
    private location: Location,
    private formBuilder: FormBuilder
  ) { 
    this.id = 0;
    this.checkoutForm = this.formBuilder.group({
      id: '',
      title: '',
      description: '',
      price: '',
      discountPercentage: '',
      rating: '',
      stock: '',
      brand: '',
      category: ''
    });
  }

  ngOnInit(): void {
    this.id = Number(this.route.snapshot.paramMap.get('id'));
    if(this.id==0){
      this.iniciaProducto();
      this.existe=false;
    }else{
      this.getProduct();
      this.existe=true;
    }
    this.cargado=true;
  }

  iniciaProducto(){
    this.producto = {
      id: 0,
      title: "",
      description: "",
      price: 0,
      discountPercentage: 0,
      rating: 0,
      stock: 0,
      brand: "",
      category: "",
      thumbnail: "",
      images: []
    };
  }

  guardar() {
    if (this.producto) {
      if (this.existe) {
        this.updateProduct();
      } else {
        this.guardarNuevoProducto();
      }
    }
  }

  getProduct() {
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

  updateProduct() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (this.producto) {
      this.productService.updateProduct(id, this.producto).subscribe({
        next: (response) => {
          this.producto = response;
          this.mensaje = "Producto actualizado correctamente";
        },
        error: (error) => {
          console.log(error);
        }
      })
    }
  }



  guardarNuevoProducto() {
    if (this.producto) {
      this.productService.addProduct(this.producto).subscribe({
        next: (response) => {
          this.producto = response;
          this.mensaje = "Producto añadido correctamente";
        },
        error: (error) => {
          console.log(error);
        }
      })
    }
  }

  goBack() {
    this.location.back();
  }
}
