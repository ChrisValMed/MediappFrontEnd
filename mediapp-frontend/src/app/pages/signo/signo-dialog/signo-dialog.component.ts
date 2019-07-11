import { Paciente } from './../../../_model/paciente';
import { Component, OnInit, Inject } from '@angular/core';
import { Signos } from './../../../_model/signo';
import { SignoService } from './../../../_service/signo.service';
import { MatDialogRef, MAT_DIALOG_DATA, MatTableDataSource } from '@angular/material';
import { FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import { PacienteService } from 'src/app/_service/paciente.service';

export interface PacInter {
  valueP: number;
  viewValueP: string[];
}

export const _filter = (opt: string[], value: string): string[] => {
  const filterValue = value.toLowerCase();

  return opt.filter(item => item.toLowerCase().indexOf(filterValue) === 0);
};


@Component({
  selector: 'app-signo-dialog',
  templateUrl: './signo-dialog.component.html',
  styleUrls: ['./signo-dialog.component.css']
})
export class SignoDialogComponent implements OnInit {

  signo: Signos;
  pac: Paciente;

  stateForm: FormGroup = this._formBuilder.group({
    pacInter: '',
  });


  constructor(private dialogRef: MatDialogRef<SignoDialogComponent>, 
    @Inject(MAT_DIALOG_DATA) private data: Signos, private signoService: SignoService,private pacienteService: PacienteService,
    private _formBuilder: FormBuilder) { }

    

    options: PacInter[] = [];

    stateGroupOptions: Observable<PacInter[]>;
    
    ngOnInit() {

      this.signo = new Signos();

      this.stateForm = new FormGroup({
        'id': new FormControl(this.data.idSignos),
        'fecha': new FormControl(this.data.fecha),
        'temperatura': new FormControl(this.data.temperatura),
        'pulso': new FormControl(this.data.pulso),
        'ritmo': new FormControl(this.data.ritmo),
        'pacInter': new FormControl(''),
        'idPacF': new FormControl('0')
      });
      

      this.pacienteService.listar().subscribe(dataPac => {
        //console.log(dataPac);
        
        dataPac.forEach(element => {
         
          this.options.push({
            valueP: element.idPaciente,
            viewValueP: [element.nombres +' '+element.apellidos]
          });  

        });
        
      });

      this.stateGroupOptions = this.stateForm.get('pacInter')!.valueChanges
      .pipe(
        startWith(''),
        map(value => this._filterGroup(value))
      );

      

    }

    private _filterGroup(value: string): PacInter[] {
      if (value) {
        return this.options
          .map(group => ({valueP: group.valueP, viewValueP: _filter(group.viewValueP, value)}))
          .filter(group => group.viewValueP.length > 0);
      }
  
      return this.options;
    }
  
    cancelar() {
      
      this.dialogRef.close();
    }
  
    operar() {

      this.signo.idSignos = this.stateForm.value['id'];
      
      this.signo.fecha = this.stateForm.value['fecha'];
      this.signo.temperatura = this.stateForm.value['temperatura'];
      this.signo.pulso = this.stateForm.value['pulso'];
      this.signo.ritmo = this.stateForm.value['ritmo'];

      this.pac = new Paciente;
      this.pac.idPaciente=0;
      
      //console.log(this.stateForm);
      this.stateGroupOptions.subscribe(selPac => {

        selPac.forEach(element => {

          if(element.viewValueP == this.stateForm.value['pacInter']){
            //console.log(element.valueP);
            this.pac.idPaciente=element.valueP;

          }

        });

      });
      

      this.signo.paciente = this.pac;
      

      if (this.signo != null && this.signo.idSignos > 0) {
        this.signoService.modificar(this.signo).subscribe(data => {
          this.signoService.listar().subscribe(signos => {
            this.signoService.signosCambio.next(signos);
            this.signoService.mensajeCambio.next("Se modifico");
          });
        });
      } else {
        this.signoService.registrar(this.signo).subscribe(data => {
          this.signoService.listar().subscribe(signos => {
            this.signoService.signosCambio.next(signos);
            this.signoService.mensajeCambio.next("Se registro");
          });
        });
      }
      this.dialogRef.close();
    }

}
