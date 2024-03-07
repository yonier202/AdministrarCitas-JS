//campos del formulario
const mascotaInput = document.querySelector('#mascota');
const propietarioInput = document.querySelector('#propietario');
const telefonoInput = document.querySelector('#telefono');
const fechaInput = document.querySelector('#fecha');
const horaInput = document.querySelector('#hora');
const sintomasInput = document.querySelector('#sintomas');
//UI
const formulario = document.querySelector('#nueva-cita');
const contenedorLista = document.querySelector('#citas');

class Citas{
    constructor(){
        this.citas=[];
    }
    agregarCitas(cita){
        this.citas=[...this.citas, cita];
    }
    eliminarcita(id){
        this.citas= this.citas.filter(cita => cita.id !== id);
    }
    
}

class UI{
    imprimirAlerta(mj, tipo){
        const divAlerta = document.createElement('div');
        divAlerta.classList.add('text-center', 'alert', 'd-block', 'col-12');
        divAlerta.textContent = mj;

        //clases cuando es tipo error
        if (tipo=== "error"){
            divAlerta.classList.add('alert-danger');
        }else{
            divAlerta.classList.add('alert-success');
        }

        //agregar al DOM
        document.querySelector('#contenido').insertBefore(divAlerta,document.querySelector('.agregar-cita'));

        //quitar alerta
        setTimeout(() => {
            divAlerta.remove();
        }, 5000);
    }
    imprimirCitas({citas}){
        this.limpiarHtml();

        citas.forEach(cita => {
            const {mascota, propietario, telefono, fecha, hora, sintomas, id} = cita;

            const divCita = document.createElement('div');
            divCita.classList.add('cita', 'p-3');
            divCita.dataset.id = id;

            //Scripting de los elemnetos de la cita
            const mascotaParrafo = document.createElement('h2');
            mascotaParrafo.classList.add('card-title', 'font-weight-bolder');
            mascotaParrafo.textContent = mascota;

            const propietarioParrafo = document.createElement('p');
            propietarioParrafo.innerHTML = `
                <span class="font-weight-bolder">Propietario:</span> ${propietario}
            `;
            const telefonoParrafo = document.createElement('p');
            telefonoParrafo.innerHTML = `
                <span class="font-weight-bolder">Telefono:</span> ${telefono}
            `;
            const fechaParrafo = document.createElement('p');
            fechaParrafo.innerHTML = `
                <span class="font-weight-bolder">Fecha:</span> ${fecha}
            `;
            const horaParrafo = document.createElement('p');
            horaParrafo.innerHTML = `
                <span class="font-weight-bolder">Hora:</span> ${hora}
            `;
            const sintomasParrafo = document.createElement('p');
            sintomasParrafo.innerHTML = `
                <span class="font-weight-bolder">Sintomas:</span> ${sintomas}
            `;

            //Boton para eliminar cita
            const btnEliminar = document.createElement('button');
            btnEliminar.classList.add('btn', 'btn-danger', 'mr-2');
            btnEliminar.innerHTML = `Eliminar <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
            </svg>
            `;
            btnEliminar.onclick = () => {
                eliminarcita(id);
            };
            

            //Agregar los parrafos al divCita
            divCita.appendChild(mascotaParrafo);
            divCita.appendChild(propietarioParrafo);
            divCita.appendChild(telefonoParrafo);
            divCita.appendChild(fechaParrafo);
            divCita.appendChild(horaParrafo);
            divCita.appendChild(sintomasParrafo);
            divCita.appendChild(btnEliminar);


            //agregar las citas al Html
            contenedorLista.appendChild(divCita)
        });
    }
    limpiarHtml(){
        while (contenedorLista.firstChild) {
            contenedorLista.removeChild(contenedorLista.firstChild)
        }
    }

}

const ui=new UI();
const administrarCitas = new Citas(); 

//EVENTOS
eventListners();
function eventListners() {
    mascotaInput.addEventListener('input', datosCita);
    propietarioInput.addEventListener('input', datosCita);
    telefonoInput.addEventListener('input', datosCita);
    fechaInput.addEventListener('input', datosCita);
    horaInput.addEventListener('input', datosCita);
    sintomasInput.addEventListener('input', datosCita);

    formulario.addEventListener('submit', agregarCita);
}
//onjeto con la informacion de la cita
const citaObj={
    mascota : "",
    propietario : "",
    telefono : "",
    fecha : "",
    hora : "",
    sintomas : "",

}

function datosCita(e) {
    // asignacion dinamica atravez del atributo name llenando cada propiedad con su valor
    //las propiedades se tienen que llamar igual que el atributo name 
    citaObj[e.target.name] = e.target.value;

}

//valida y aagrega nueva cita
function agregarCita(e){
    e.preventDefault();
    
    //extraer 
    const {mascota, propietario, telefono, fecha, hora, sintomas} = citaObj ;

    if (mascota === "" || propietario === "" || telefono === "" || fecha === "" || hora === "" || sintomas === "") {
        ui.imprimirAlerta('Todos los campos son obligatorios', 'error')
        return;
    }

    //generar un id unico
    citaObj.id=Date.now();

    //Creando una cita
    administrarCitas.agregarCitas({...citaObj});

    formulario.reset();

    //reinicar Objeto
    reiniciarObjeto();

    //Mostrar el HTML de las citas 
    ui.imprimirCitas(administrarCitas);
}

function reiniciarObjeto() {
    
    citaObj.mascota = "";
    citaObj.propietario = "";
    citaObj.telefono = "";
    citaObj.fecha = "";
    citaObj.hora = "";
    citaObj.sintomas = "";
    
}

function eliminarcita(id){
    //elimninar Cita
    administrarCitas.eliminarcita(id);

    //Mostrar u nmensaje
    ui.imprimirAlerta('La cita se eliminó correctamente');

    //refrescar citas
    ui.imprimirCitas(administrarCitas);
}

