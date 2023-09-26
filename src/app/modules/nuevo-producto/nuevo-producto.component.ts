import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { ProductService } from '../../core/services/product.service';
import { Product } from 'src/app/core/model/product.model';
import { firstValueFrom } from 'rxjs';
@Component({
  selector: 'app-nuevo-producto',
  templateUrl: './nuevo-producto.component.html',
  styleUrls: ['./nuevo-producto.component.css']
})

export class NuevoProductoComponent implements OnInit {

  producto: Product | undefined;
  existe = false;
  cargado = false;
  id: number;
  productoForm: FormGroup; //Si lo declaro solo así tengo que inicializarlo en el constructor
  categorias:Array<string> = [];
  alertPlaceholder: HTMLElement | null;
  tineImagenes = false;
  currentImageIndex: number = 0;
  
  constructor(
    private route: ActivatedRoute,
    private readonly productService: ProductService,
    private location: Location,
    private formBuilder: FormBuilder
  ) {
    this.id = Number(this.route.snapshot.paramMap.get('id'));
    this.productoForm = this.formBuilder.group({
      title: [null, Validators.required],
      description: null,
      price: [null, Validators.compose([Validators.pattern(/^\d+(\.\d+)?$/), Validators.required])],
      discountPercentage: [null, Validators.compose([Validators.pattern(/^\d+(\.\d+)?$/), Validators.required])],
      rating: [null, Validators.compose([Validators.min(0),Validators.max(5), Validators.pattern(/^\d+(\.\d+)?$/), Validators.required])],
      stock:  [null, Validators.compose([Validators.pattern(/^\d+$/), Validators.required])],
      brand: [null, Validators.required],
      category: [null, Validators.required]
    });
    this.alertPlaceholder = document.getElementById('liveAlert');
  }

  ngOnInit()  {
    this.getCategorias();
    this.iniciaProducto();
    if (this.id == 0) {
      this.existe = false;
    } else {
      this.cargaDatos();
      this.existe = true;
    }
    this.cargado = true;
  }

  async cargaDatos() {
    await this.getProduct();

    if (!this.producto) {
      return;
    }

    this.productoForm.patchValue({
      title: this.producto.title,
      description: this.producto.description,
      price: this.producto.price,
      discountPercentage: this.producto.discountPercentage,
      rating: this.producto.rating,
      stock: this.producto.stock,
      brand: this.producto.brand,
      category: this.producto.category,
    });

    if(this.producto.images.length>0){
      this.tineImagenes = true;
    }
  }

  iniciaProducto() {
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

  nextImage() {
    if(!this.producto){
      return;
    }
    this.currentImageIndex = (this.currentImageIndex + 1) % this.producto.images.length;
  }

  prevImage() {
    if(!this.producto){
      return;
    }
    this.currentImageIndex =
      (this.currentImageIndex - 1 + this.producto.images.length) % this.producto.images.length;
  }

  guardar() {
    if (!this.producto) {
      return;
    }

    if (this.existe) {
      this.updateProduct();
    } else {
      this.guardarNuevoProducto();
    }
  }

  getCategorias() {
    this.productService.getCategorias().subscribe({
      next: (response) => {
        this.categorias = response;
      },
      error: (error) => {
        console.log(error);
      }
    })
  }

  async getProduct() {
    //En este caso no se puede emplear la estructura habitual de next, error, complete, ya que no podriamos hacer el await
    //De la siguiente manera soluciono el problema de la sincronía a la hora de cargar los datos en el fomulario
    this.producto = await firstValueFrom(this.productService.getProductById(this.id));
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

  updateProduct() {
    if (!this.producto) {
      return;
    }

    this.productService.updateProduct(this.id, this.producto).subscribe({
      next: (response) => {
        this.producto = response;
        this.alerta('El artículo ha sido actualizado correctamente ' + this.producto.title, 'success');
        
      },
      error: (error) => {
        this.alerta('El artículo no se ha podido actualizar', 'danger');
        console.log(error);
      }
    })
  }

  guardarNuevoProducto() {
    if (!this.producto) {
      return;
    }

    this.productService.addProduct(this.producto).subscribe({
      next: (response) => {
        this.producto = response;
        this.alerta('El artículo ha sido guardado correctamente' + this.producto.title, 'success');
        
      },
      error: (error) => {
        this.alerta('El artículo no se ha podido guardar', 'danger');
        console.log(error);
      }
    })
  }

  goBack() {
    this.location.back();
  }
}
