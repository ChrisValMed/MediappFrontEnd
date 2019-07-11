import { Medico } from './../../_model/medico';
import { MatSort, MatPaginator, MatTableDataSource, MatDialog, MatSnackBar } from '@angular/material';
import { MedicoService } from './../../_service/medico.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MedicoDialogoComponent } from './medico-dialogo/medico-dialogo.component';

@Component({
  selector: 'app-medico',
  templateUrl: './medico.component.html',
  styleUrls: ['./medico.component.css']
})
export class MedicoComponent implements OnInit {

  displayedColumns = ['idmedico', 'nombres', 'apellidos', 'cmp', 'acciones'];
  dataSource: MatTableDataSource<Medico>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private medicoService: MedicoService, private dialog: MatDialog, private snackBar: MatSnackBar) { }

  ngOnInit() {

    this.medicoService.medicosCambio.subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });

    this.medicoService.mensajeCambio.subscribe(data => {
      this.snackBar.open(data, 'Aviso', { duration: 2000 });
    });


    this.medicoService.listar().subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  
  openDialog(medico?: Medico) {
    let med = medico != null ? medico : new Medico();
    this.dialog.open(MedicoDialogoComponent, {
      width: '250px',
      data: med
    })
  }

  eliminar(medico: Medico) {
    this.medicoService.eliminar(medico.idMedico).subscribe(() => {
      this.medicoService.listar().subscribe(medicos => {
        this.medicoService.medicosCambio.next(medicos);
        this.medicoService.mensajeCambio.next("Se elimino");
      });
    });
  }

}
