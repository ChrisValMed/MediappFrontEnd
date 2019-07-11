import { ActivatedRoute } from '@angular/router';
import { EspecialidadService } from './../../_service/especialidad.service';
import { MatTableDataSource, MatPaginator, MatSort, MatSnackBar } from '@angular/material';
import { Especialidad } from './../../_model/especialidad';
import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-especialidad',
  templateUrl: './especialidad.component.html',
  styleUrls: ['./especialidad.component.css']
})
export class EspecialidadComponent implements OnInit {

  displayedColumns = ['id', 'nombre', 'acciones'];
  dataSource: MatTableDataSource<Especialidad>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private especialidadService: EspecialidadService, private snackBar: MatSnackBar, public route: ActivatedRoute) { }

  ngOnInit() {
    this.especialidadService.especialidadesCambio.subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });

    this.especialidadService.mensajeCambio.subscribe(data => {
      this.snackBar.open(data, 'Aviso', {
        duration: 2000,
      });
    });

    this.especialidadService.listar().subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.dataSource.filter = filterValue;
  }

  eliminar(idEspecialidad: number) {
    this.especialidadService.eliminar(idEspecialidad).subscribe(data => {
      this.especialidadService.listar().subscribe(data => {
        this.especialidadService.especialidadesCambio.next(data);
        this.especialidadService.mensajeCambio.next('Se eliminó');
      });
    });
  }
}
