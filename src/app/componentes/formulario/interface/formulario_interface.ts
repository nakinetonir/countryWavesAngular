//Para contruir el formulario dinámico que genera los campos para realizar las predicciones

import { ISelect } from './select_interface'

export interface IFormulario
{
    campo: string;
    label: string;
    tipo: string;
    category : ISelect[]

}
