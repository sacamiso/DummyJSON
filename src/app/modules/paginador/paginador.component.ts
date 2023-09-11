import { areAllEquivalent } from '@angular/compiler/src/output/output_ast';
import { Component, Input, OnInit, Output, EventEmitter} from '@angular/core';
import { constants } from 'src/app/core/constants';

@Component({
  selector: 'app-paginador',
  templateUrl: './paginador.component.html',
  styleUrls: ['./paginador.component.css']
})
export class PaginadorComponent implements OnInit {

  @Input() numeroElementos: number = 0;
  @Output() pagina = new EventEmitter<number>();

  tamPag = constants.tamPags;
  pagActual: number = 0;
  numPagTotales: number = 1; //puede que no haya ningún elemento

  aux: Array<number> = [];
  
  ngOnInit(): void {
    console.log("numero de elementos al pasar por onInit");
    console.log(this.numeroElementos);
    this.numPagTotales = Math.ceil(this.numeroElementos/this.tamPag);
    //this.numPagTotales = 8;
    this.aux = new Array(this.numPagTotales);
    //console.log(this.aux);
  }

  cambiarPagina(pag: number) {
    this.pagActual = pag;
    console.log('He pasado por aqui'); 
    console.log(this.pagActual);    
    this.pagina.emit(this.pagActual);
  }

  irAnterior(){
    if(this.pagActual > 0){ //cuento que la numeración de las páginas va desde 0 hasta n-1
      this.pagActual--;
      this.pagina.emit(this.pagActual);
    }
  }

  irSiguiente(){
    if(this.pagActual < (this.numPagTotales-1)){
      this.pagActual++;
      this.pagina.emit(this.pagActual);
    }
  }

}
