import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort, MatDialog, MatSnackBar } from '@angular/material';
import { Signos } from './../../_model/signo';
import { SignoService } from './../../_service/signo.service';
import { SignoDialogComponent } from './signo-dialog/signo-dialog.component';

@Component({
  selector: 'app-signo',
  templateUrl: './signo.component.html',
  styleUrls: ['./signo.component.css']
})
export class SignoComponent implements OnInit {

  displayedColumns = ['idsigno', 'temperatura', 'ritmo', 'pulso', 'paciente', 'acciones'];
  dataSource: MatTableDataSource<Signos>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private signoService: SignoService, private dialog: MatDialog, private snackBar: MatSnackBar) { }

  ngOnInit() {

    this.signoService.signosCambio.subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });

    this.signoService.mensajeCambio.subscribe(data => {
      this.snackBar.open(data, 'Aviso', { duration: 2000 });
    });

    this.signoService.listar().subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  
  
  openDialog(signo?: Signos) {
    let sig = signo != null ? signo : new Signos();
    this.dialog.open(SignoDialogComponent, {
      width: '250px',
      data: sig
    })
  }

  eliminar(signo: Signos) {
    this.signoService.eliminar(signo.idSignos).subscribe(() => {
      this.signoService.listar().subscribe(medicos => {
        this.signoService.signosCambio.next(medicos);
        this.signoService.mensajeCambio.next("Se elimino");
      });
    });
  }

}
