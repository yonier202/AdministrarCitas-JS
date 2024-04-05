import { citaObj, editando } from "./variables.js";
import { UI } from "./classes/UI.js";
import { Citas } from "./classes/Citas.js";
import { formulario, mascotaInput, propietarioInput, telefonoInput, fechaInput, horaInput, sintomasInput} from "./selectores.js"; 


export const ui=new UI();
export const administrarCitas = new Citas(); 

export let DB;

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

        //Edita en IndexDB

        const transaction = DB.transaction(['citas'], 'readwrite');
        const objectStore = transaction.objectStore('citas');

        objectStore.put(citaObj)

        transaction.oncomplete = function (){
            //texto del boton al estado original
            formulario.querySelector('button[type="submit"]').textContent = "Crear cita";
            editando.value = false;
            ui.imprimirAlerta('Editado correctamente');
        }

        transaction.onerror = function (){
            console.log("hubo un error");
        }

        
    }
    else{
        //generar un id unico
        citaObj.id=Date.now();

        //Creando una cita
        administrarCitas.agregarCitas({...citaObj});

        //Insertar Registro en Indexdb

        const transaction = DB.transaction(['citas'], 'readwrite');

        //habilitar objectstore
        const objectStore = transaction.objectStore('citas');

        //insertar en la bd
        objectStore.add(citaObj);

        transaction.oncomplete = function (){
            console.log('Cita Agregada');

            //Mensajea agregado correctamente;
            ui.imprimirAlerta('Agregado Correctamente');
        }

    }

    

    formulario.reset();

    //reinicar Objeto
    reiniciarObjeto();

    //Mostrar el HTML de las citas 
    //le pasamos todas las citas 
    ui.imprimirCitas();
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
    const transaction = DB.transaction(['citas'], 'readwrite');
    const objectStore = transaction.objectStore('citas');

    objectStore.delete(id);

    transaction.oncomplete = function (){
        //Mostrar u nmensaje
        ui.imprimirAlerta('La cita se eliminó correctamente');

         //refrescar citas
        ui.imprimirCitas();
    }
    transaction.onerror = function (){
        "Hubo un error"
    }    
    

   
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

export function crearDB(){
    //crear base de datos
    const crearDB = window.indexedDB.open('citas',1);

    //si hay error
    crearDB.onerror = function(){
        console.log('Hubo un error');
    };

    //si sale bien
    crearDB.onsuccess = function(){
        console.log('Base de datos creada correctamente');

        DB=crearDB.result;
        
        //MOstrar citas al cargar (Pero IndexedDB ya esta listo)
        ui.imprimirCitas();
    };

    //definir el schema
    crearDB.onupgradeneeded = function(e){
        const db = e.target.result;

        const objecStore = db.createObjectStore('citas',{
            keyPath: 'id',
            autoIncrement: true
        });
        //definir todas las mascota
        objecStore.createIndex('mascota','mascota',{unique: false});
        objecStore.createIndex('propietario', 'propietario',{unique: false});
        objecStore.createIndex('telefono', 'telefono',{unique: false});
        objecStore.createIndex('fecha', 'fecha',{unique: false});
        objecStore.createIndex('hora', 'hora',{unique: false});
        objecStore.createIndex('sintomas','sintomas',{unique: false});
        objecStore.createIndex('id', 'id',{unique: true});

        console.log("DB Creada y Listo");
    };
}
