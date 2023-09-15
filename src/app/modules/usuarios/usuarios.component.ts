import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { constants } from 'src/app/core/constants';
import { Cart } from 'src/app/core/model/carro.model';
import { User } from 'src/app/core/model/user.model';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {

  usuarios: Array<User> = [];
  numeroUsuarios: number = 0;
  pagina: number = 0;
  tamPag: number = constants.tamPags;
  cargado = false;
  userAux: User | undefined;

  edad: string = '';
  fechaNacimiento: string = '';
  genero: string = '';
  verFiltros = false;

  textSearchVox: string = '';

  carrosAux: Array<Cart> = [];
  numeroCarros: number = 0;
  carroCargado = false;

  constructor(private readonly userService: UserService,
    private readonly router: Router) { }

  ngOnInit(): void {
    this.cargarPagina(0);
  }

  verCarro(idUsuario: number) {
    this.carroCargado = false;
    this.userService.getCarritoUsuario(idUsuario).subscribe({
      next: (response) => {
        this.carrosAux = response.carts;
        this.numeroCarros = response.total;
        this.carroCargado = true;
      },
      error: (error) => {
        console.log(error);
      }
    })
  }

  cargarPagina(pag: number) {
    this.pagina = pag;
    this.listaUsuariosMostrar(this.tamPag, this.tamPag * this.pagina);
  }

  listaUsuariosMostrar(limit: number, skip: number) {
    const NumEdad = Number(this.edad);
    if (this.edad != '' && !isNaN(NumEdad) && this.edad!=null) {
      this.userService.filtrarPorEdad(NumEdad, this.tamPag, this.tamPag * this.pagina).subscribe({
        next: (response) => {
          this.usuarios = response.users;
          this.numeroUsuarios = response.total;
          console.log(this.usuarios);
        },
        error: (error) => {
          console.log(error);
        }
      })
    } else if (this.fechaNacimiento != '' && this.fechaNacimiento!=null) {
      this.userService.filtrarPorFechaNacimiento(this.fechaNacimiento, this.tamPag, this.tamPag * this.pagina).subscribe({
        next: (response) => {
          this.usuarios = response.users;
          this.numeroUsuarios = response.total;
          console.log(this.usuarios);
        },
        error: (error) => {
          console.log(error);
        }
      })
    } else if (this.genero != '' && this.genero!=null) {
      this.userService.filtrarPorGenero(this.genero, this.tamPag, this.tamPag * this.pagina).subscribe({
        next: (response) => {
          this.usuarios = response.users;
          this.numeroUsuarios = response.total;
          console.log(this.usuarios);
        },
        error: (error) => {
          console.log(error);
        }
      })
    } else {
      this.userService.searchUsertInterval(this.textSearchVox, limit, skip).subscribe({
        next: (response) => {
          this.usuarios = response.users;
          this.numeroUsuarios = response.total;
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

  eliminarUsuario(id: number) {
    this.userService.deleteUser(id).subscribe({
      next: (response) => {
        this.userAux = response;
        alert('El usuario' + this.userAux.username + ' ha sido eliminado correctamente');
      },
      error: (error) => {
        console.log(error);
      }
    })
  }

  search(search: string) {
    this.pagina = 0;
    this.verFiltros = false;
    this.genero='';
    this.edad = '';
    this.fechaNacimiento='';
    this.textSearchVox = search;
    this.userService.searchUsertInterval(search, this.tamPag, this.tamPag * this.pagina).subscribe({
      next: (response) => {
        this.usuarios = response.users;
        this.numeroUsuarios = response.total;
        console.log(this.usuarios);
      },
      error: (error) => {
        console.log(error);
      }
    })
  }


  goToDetalleUsuario() {
    this.router.navigate(['usuarios/usuario/detalle']);
  }

  Multiplos4(total: number) {
    return Array.from({ length: total }, (_, i) => (i + 1) * 4); //para cada posición calcula su múltiplo de 4
  }

  activarFiltros() {
    if (this.verFiltros == false) {
      this.verFiltros = true;
    } else {
      this.verFiltros = false;
    }
  }
}
