import { contenedorLista } from '../selectores.js';
import { eliminarcita, cargarEdicion, DB } from '../funciones.js';

export class UI{
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
    imprimirCitas(){
        this.limpiarHtml();

       //Leer contenido de la base de datos
       const objectStore = DB.transaction('citas').objectStore('citas');
       
       objectStore.openCursor().onsuccess = function(e){
            const cursor = e.target.result;

            if(cursor){
                const {mascota, propietario, telefono, fecha, hora, sintomas, id} = cursor.value;

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

                //boton editar
                const btnEditar= document.createElement('button');
                btnEditar.classList.add('btn', 'btn-info');
                btnEditar.innerHTML = `Editar <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6">
                <path d="M21.731 2.269a2.625 2.625 0 0 0-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 0 0 0-3.712ZM19.513 8.199l-3.712-3.712-12.15 12.15a5.25 5.25 0 0 0-1.32 2.214l-.8 2.685a.75.75 0 0 0 .933.933l2.685-.8a5.25 5.25 0 0 0 2.214-1.32L19.513 8.2Z" />
            </svg>`;
                const cita = cursor.value;
                btnEditar.onclick = () => cargarEdicion(cita);
                

                //Agregar los parrafos al divCita
                divCita.appendChild(mascotaParrafo);
                divCita.appendChild(propietarioParrafo);
                divCita.appendChild(telefonoParrafo);
                divCita.appendChild(fechaParrafo);
                divCita.appendChild(horaParrafo);
                divCita.appendChild(sintomasParrafo);
                divCita.appendChild(btnEliminar);
                divCita.appendChild(btnEditar);


                //agregar las citas al Html
                contenedorLista.appendChild(divCita);

                //ve al siguiente elemnto
                cursor.continue();
            }
       }
    }
    limpiarHtml(){
        while (contenedorLista.firstChild) {
            contenedorLista.removeChild(contenedorLista.firstChild)
        }
    }

}