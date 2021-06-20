import { Component, OnInit } from '@angular/core';
import { typeCells } from 'src/app/services/dataDrawIo/interfaceDataCells';
import { getDataCellsService } from 'src/app/services/dataDrawIo/getDataCells.service';


@Component({
  selector: 'app-show-data-cells',
  templateUrl: './show-data-cells.component.html',
  styleUrls: ['./show-data-cells.component.css']
})
export class ShowDataCellsComponent implements OnInit {

  dataCells?:typeCells[];

  constructor(private CellsService:getDataCellsService) { }

  getDataCells():void{
    this.CellsService.getDataCells()
    .subscribe(cells=>this.dataCells = cells)
  }
  ngOnInit(): void {
    this.getDataCells();
  }

}
