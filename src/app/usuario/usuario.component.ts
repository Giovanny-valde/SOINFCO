import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { UsuarioService } from '../services/usuario.service';
import { usuario } from '../models/usuario.model';
import { NgbdSortableHeader, SortEvent } from '../models/sorting';
import { SortingService } from '../services/sorting.service';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css']
})
export class UsuarioComponent implements OnInit {

	@ViewChildren(NgbdSortableHeader) headers!: QueryList<NgbdSortableHeader>;
  usuarios!  : usuario[]
  usuarioSort! : usuario[]
  page : number= 1;
  pageSize : number = 10;


  constructor(
    private usuarioService : UsuarioService,
    private sortingService : SortingService
  ) { }

  ngOnInit(): void {
    this.usuarioService.get().subscribe((data)=>{
      this.usuarios = data
      this.usuarioSort = [...this.usuarios]
    })
  }

  onSort({ column, direction }: SortEvent): void {
    this.sortingService.setHeaders(this.headers);
    this.sortingService.setData([...this.usuarios]);

    // Perform sorting using the service and assign the sorted data
    this.usuarioSort = this.sortingService.sort(column as string, direction);
  }

}
