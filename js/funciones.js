import { citaObj, editando } from "./variables.js";
import { UI } from "./classes/UI.js";
import { Citas } from "./classes/Citas.js";
import { formulario, mascotaInput, propietarioInput, telefonoInput, fechaInput, horaInput, sintomasInput} from "./selectores.js"; 


export const ui=new UI();
export const administrarCitas = new Citas(); 

export function datosCita(e) {
    // asignacion dinamica atravez del atributo name llenando cada propiedad con su valor
    //las propiedades se tienen que llamar igual que el atributo name 
    citaObj[e.target.name] = e.target.value;

}


//valida y aagrega nueva cita
export function agregarCita(e){
    e.preventDefault();
    
    //extraer 
    const {mascota, propietario, telefono, fecha, hora, sintomas} = citaObj ;

    if (mascota === "" || propietario === "" || telefono === "" || fecha === "" || hora === "" || sintomas === "") {
        ui.imprimirAlerta('Todos los campos son obligatorios', 'error')
        return;
    }

    if (editando.value) {

        //pasar el objeto de la cita
        administrarCitas.editarCitas({...citaObj});

        //texto del boton al estado original
        formulario.querySelector('button[type="submit"]').textContent = "Crear cita";
        editando.value = false;
        ui.imprimirAlerta('Editado correctamente');
    }
    else{
        //generar un id unico
        citaObj.id=Date.now();

        //Creando una cita
        administrarCitas.agregarCitas({...citaObj});

        //Mensajea agregado correctamente;
        ui.imprimirAlerta('Agregado Correctamente');
    }

    

    formulario.reset();

    //reinicar Objeto
    reiniciarObjeto();

    //Mostrar el HTML de las citas 
    //le pasamos todas las citas 
    ui.imprimirCitas(administrarCitas);
}

export function reiniciarObjeto() {
    
    citaObj.mascota = "";
    citaObj.propietario = "";
    citaObj.telefono = "";
    citaObj.fecha = "";
    citaObj.hora = "";
    citaObj.sintomas = "";
    
}

export function eliminarcita(id){
    //elimninar Cita
    administrarCitas.eliminarcita(id);

    //Mostrar u nmensaje
    ui.imprimirAlerta('La cita se eliminó correctamente');

    //refrescar citas
    ui.imprimirCitas(administrarCitas);
}

// carga los datos y el modo edicion 
export function cargarEdicion(cita){
    const {mascota, propietario, telefono, fecha, hora, sintomas, id} = cita;
    mascotaInput.value =  mascota;
    propietarioInput.value = propietario;
    telefonoInput.value = telefono; 
    fechaInput.value = fecha; 
    horaInput.value = hora; 
    sintomasInput.value = sintomas; 

    citaObj.mascota= mascota;
    citaObj.propietario= propietario;
    citaObj.telefono= telefono;
    citaObj.fecha= fecha;
    citaObj.hora= hora;
    citaObj.sintomas= sintomas;
    citaObj.id= id;
    

    formulario.querySelector('button[type="submit"]').textContent = "Guardar Cambios";
    editando.value = true;
}