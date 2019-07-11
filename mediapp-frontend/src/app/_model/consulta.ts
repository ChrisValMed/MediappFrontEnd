import { DetalleConsulta } from './detalleConsulta';
import { Especialidad } from './especialidad';
import { Paciente } from './paciente';
import { Medico } from './medico';
export class Consulta{
    idConsulta: number;
    paciente: Paciente;
    medico: Medico;
    especialidad: Especialidad;
    fecha: string;
    detalleConsulta: DetalleConsulta[];
}