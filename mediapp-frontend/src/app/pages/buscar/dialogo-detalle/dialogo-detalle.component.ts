import { ConsultaListaExamenDTO } from './../../../_model/consultaListaExamenDTO';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Consulta } from './../../../_model/consulta';
import { Component, OnInit, Inject } from '@angular/core';
import { ExamenService } from 'src/app/_service/examen.service';

@Component({
  selector: 'app-dialogo-detalle',
  templateUrl: './dialogo-detalle.component.html',
  styleUrls: ['./dialogo-detalle.component.css']
})
export class DialogoDetalleComponent implements OnInit {

  consulta: Consulta;
  examenes: ConsultaListaExamenDTO[];

  constructor(public dialogRef: MatDialogRef<DialogoDetalleComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Consulta, private examenService: ExamenService) { }

  ngOnInit() {
    this.consulta = this.data;
    this.listarExamenes();
  }

  listarExamenes(){
    this.examenService.listarExamenPorConsulta(this.consulta.idConsulta).subscribe((data) => {
      this.examenes = data;
    });
  }

  cancelar() {
    this.dialogRef.close();
  }

}
