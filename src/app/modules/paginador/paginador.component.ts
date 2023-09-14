import { Component, Input, OnInit, Output, EventEmitter, OnChanges, SimpleChanges} from '@angular/core';
import { constants } from 'src/app/core/constants';

@Component({
  selector: 'app-paginador',
  templateUrl: './paginador.component.html',
  styleUrls: ['./paginador.component.css']
})
export class PaginadorComponent implements OnInit, OnChanges {

  @Input() numeroElementos: number = 0;
  @Input() tamPag: number = constants.tamPags;

  @Output() pagina = new EventEmitter<number>();

  
  pagActual: number = 0;
  numPagTotales: number = 1; //puede que no haya ningún elemento

  aux: Array<number> = [];

  ngOnChanges(changes: SimpleChanges): void {
    console.log('he entrado en onChanges');
    console.log(changes);
      if(changes['tamPag'] && changes['tamPag'].currentValue){
        this.numPagTotales = Math.ceil(this.numeroElementos/this.tamPag);
        this.aux = new Array(this.numPagTotales);
        this.pagActual = 0;
        this.pagina.emit(this.pagActual);
      }
      if(changes['numeroElementos'] && changes['numeroElementos'].currentValue){
        this.numPagTotales = Math.ceil(this.numeroElementos/this.tamPag);
        this.aux = new Array(this.numPagTotales);
      }
  }
  
  ngOnInit(): void {
    console.log("numero de elementos al pasar por onInit");
    console.log(this.numeroElementos);
    this.numPagTotales = Math.ceil(this.numeroElementos/this.tamPag);
    this.aux = new Array(this.numPagTotales);
  }

  cambiarPagina(pag: number) {
    this.pagActual = pag;
    //console.log('He pasado por aqui'); 
    //console.log(this.pagActual);    
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
