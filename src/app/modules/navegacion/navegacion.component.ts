import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navegacion',
  templateUrl: './navegacion.component.html',
  styleUrls: ['./navegacion.component.css']
})
export class NavegacionComponent implements OnInit {

  seleccionado: number = 0;
  constructor() { }

  ngOnInit(): void {
  }

  cambiaSeleccionado(activo: number) {
    switch (activo) {
      case 1:
        this.seleccionado = 1;
        break;
      case 2:
        this.seleccionado = 2;
        break;
      case 3:
        this.seleccionado = 3;
        break;
      default:
        this.seleccionado = 0;
        break;
    }
  }

}
