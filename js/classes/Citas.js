export class Citas{
    constructor(){
        this.citas = [];
    }
    agregarCitas(cita){
        this.citas = [...this.citas, cita];
    }
    eliminarcita(id){
        this.citas = this.citas.filter(cita => cita.id !== id);
    }
    editarCitas(citaActualizada){
        //iterar y crea un nuevo arreglo
        //si es la cita que se debe actulizar, se rescribe el objeto (citaActualizada)
        this.citas = this.citas.map(cita => cita.id = citaActualizada.id ? citaActualizada : cita);
    } 
}