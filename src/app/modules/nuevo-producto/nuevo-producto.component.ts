import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';


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

  name = new FormControl('');
  productoForm: FormGroup; //Si lo declaro solo así tengo que inicializarlo en el constructor
  /*productoForm = new FormGroup({
    id: new FormControl(''),
    title: new FormControl(''),
    description: new FormControl(''),
    price: new FormControl(''),
    discountPercentage: new FormControl(''),
    rating: new FormControl(''),
    stock: new FormControl(''),
    brand: new FormControl(''),
    category: new FormControl(''),
  });*/

  constructor(
    private route: ActivatedRoute,
    private readonly productService: ProductService,
    private location: Location,
    private formBuilder: FormBuilder
  ) {
    this.id = Number(this.route.snapshot.paramMap.get('id'));
    console.log('sara2', this.id)
    this.productoForm = this.formBuilder.group({
      id: [this.id, Validators.required],
      title: [null, Validators.required],
      description: null,
      price: [null,Validators.compose([Validators.pattern(/^\d+(\.\d+)?$/), Validators.required])  ],
      discountPercentage: [null, Validators.compose([Validators.pattern(/^\d+$/), Validators.required]) ],
      rating: null,
      stock: null,
      brand: null,
      category: null
    });
  }

  async ngOnInit() {
    //Tal y como está declarado tiene que estar en el constructor
    /*this.productoForm = this.formBuilder.group({
      id: ['', Validators.required],
      title: ['', Validators.required],
      description: [''],
      price: ['',Validators.compose([Validators.pattern(/^\d+(\.\d+)?$/), Validators.required])  ],
      discountPercentage: [''],
      rating: [''],
      stock: [''],
      brand: [''],
      category: ['']
    });*/
    
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

    console.log(this.producto, '2')

    if(!this.producto) {
      return;
    }

    this.productoForm.patchValue({
      id: this.producto.id,
      title: this.producto.title,
      description: this.producto.description,
      price: this.producto.price,
      discountPercentage: this.producto.discountPercentage,
      rating: this.producto.rating,
      stock: this.producto.stock,
      brand: this.producto.brand,
      category: this.producto.category,
    });
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

  guardar() {
    if (this.producto) {
      if (this.existe) {
        this.updateProduct();
      } else {
        this.guardarNuevoProducto();
      }
    }
  }

  async getProduct() {
    // this.productService.getProductById(this.id).subscribe({
    //   next: (response: Product) => {
    //     this.producto = response;
    //   },
    //   error: (error) => {
    //     console.log(error);
    //   },
    //   complete: () => {
    //     this.cargado = true;
    //     console.log(this.producto, 'sara')
    //   }
    // })
    this.producto = await this.productService.getProductById(this.id).toPromise();
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
