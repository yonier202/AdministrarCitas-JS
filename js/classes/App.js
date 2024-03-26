import {mascotaInput, propietarioInput, telefonoInput, fechaInput, horaInput, sintomasInput, formulario } from '../selectores.js';
import { datosCita, agregarCita } from '../funciones.js';

export class App{
    constructor(){
        this.initApp();
    }
    initApp(){
        mascotaInput.addEventListener('input', datosCita);
        propietarioInput.addEventListener('input', datosCita);
        telefonoInput.addEventListener('input', datosCita);
        fechaInput.addEventListener('input', datosCita);
        horaInput.addEventListener('input', datosCita);
        sintomasInput.addEventListener('input', datosCita);

        formulario.addEventListener('submit', agregarCita);
    }
}