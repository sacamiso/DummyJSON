import { Component, OnInit } from '@angular/core';
import { ConexionService } from 'src/app/core/services/conexion.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  apiActiva: boolean = false;

  constructor(private readonly conexionService: ConexionService) { }

  ngOnInit(): void {
    this.compruebaConexion();
  }

  compruebaConexion() {
    this.conexionService.compruebaEstado().subscribe({
      next: (response) => {
        if(response.status === 'ok') {
          this.apiActiva=true;
        }else{
          this.apiActiva=false;
        }
      },
      error: (error) => {
        console.log(error);
      }
    })
  }

}
