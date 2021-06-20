import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import {typeCells} from './interfaceDataCells'
import {mockDataCells}from './mockDataCells'


@Injectable({
  providedIn: 'root'
})
export class getDataCellsService {


  constructor( ) { 

  }


  getDataCells(): Observable<typeCells[]> {
    const dataCells = of(mockDataCells);
    return dataCells;
  }

  ngOnInit(){

  }
}
