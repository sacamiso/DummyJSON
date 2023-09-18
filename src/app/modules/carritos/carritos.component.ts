import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { UserService } from 'src/app/core/services/user.service';
import { ProductService } from 'src/app/core/services/product.service';
import { Cart } from 'src/app/core/model/carro.model';
import { Product } from 'src/app/core/model/product.model';
import { CarritoService } from 'src/app/core/services/carrito.service';
import { User } from 'src/app/core/model/user.model';

@Component({
  selector: 'app-carritos',
  templateUrl: './carritos.component.html',
  styleUrls: ['./carritos.component.css']
})
export class CarritosComponent implements OnInit {

  idUsuario: number;
  carros: Array<Cart> = [];
  productoAux: Product | undefined;
  numeroCarros: number = 0;
  cargado = false;
  usuario: User | undefined;

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private readonly userService: UserService,
    private readonly productService: ProductService,
    private readonly cartService: CarritoService
  ) {
    this.idUsuario = Number(this.route.snapshot.paramMap.get('id'));
    this.getUsuario(this.idUsuario);
  }

  ngOnInit(): void {
    this.getCarros(this.idUsuario);
    this.cargado = true;
  }

  getUsuario(idUsuario: number) {
    this.userService.getUserById(idUsuario).subscribe({
      next: (response) => {
        this.usuario = response;
      },
      error: (error) => {
        console.log(error);
      }
    })
  }

  getCarros(idUsuario: number) {
    this.userService.getCarritoUsuario(idUsuario).subscribe({
      next: (response) => {
        this.carros = response.carts;
        this.numeroCarros = response.total;
      },
      error: (error) => {
        console.log(error);
      }
    })
  }

  reseteaProducto(){
    this.productoAux = undefined;
  }


  getProductById(idP: number) {
    this.productService.getOneProduct(idP).subscribe({
      next: (response) => {
        this.productoAux=response;
      },
      error: (error) => {
        console.log(error);
      }
    })
  }

  actualizarProductos(idC: number) {
    this.cartService.getCartById(idC).subscribe({
      next: (response) => {
        for(let product of response.products) {
          this.getProductById(product.id);
        }
      },
      error: (error) => {
        console.log(error);
      }
    })
  }


  goBack() {
    this.location.back();
  }

}
