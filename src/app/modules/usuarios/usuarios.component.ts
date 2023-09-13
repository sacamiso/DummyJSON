import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { constants } from 'src/app/core/constants';
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
  tamPag = constants.tamPags;
  cargado = false;
  userAux: User | undefined;

  constructor(private readonly userService: UserService,
    private readonly router: Router) { }

  ngOnInit(): void {
    this.cargarPagina(0);
  }

  cargarPagina(pag: number) {
    this.pagina = pag;
    this.listaUsuariosMostrar(this.tamPag, this.tamPag * this.pagina);
  }

  listaUsuariosMostrar(limit: number, skip: number) {
    this.userService.getUsersInterval(limit, skip).subscribe({
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

  eliminarUsuario(id: number) {
    this.userService.deleteUser(id).subscribe({
      next: (response) => {
        this.userAux = response;
        alert('El usuario'+ this.userAux.username +' ha sido eliminado correctamente');
      },
      error: (error) => {
        console.log(error);
      }
    })
  }

  search(search: string) {
    this.userService.searchUser(search).subscribe({
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

  goToDetalleUsuario(){
    this.router.navigate(['usuarios/usuario/detalle']);
  }

}
