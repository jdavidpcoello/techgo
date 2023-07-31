// document.querySelector('form');
// addEventListener('submit', e => {
//     e.preventDefault();
//     const data = Object.fromEntries(
//         new FormData(e.target)
//     )
//     alert(JSON.stringify(data));
//     console.log(data);
// })

let listaEmpleados = [];

const objEmpleado = {
    id: '',
    nombre: '',
    codigo: '',
    email: '',
    contraseña: ''
}

let editando = false;

const formulario = document.querySelector('#formulario-control');
const nombreImput = document.querySelector('#nombre-empleado');
const codigoImput = document.querySelector('#codigo-empleado');
const correoImput = document.querySelector('#correo-empleado');
const contraseñaImput = document.querySelector('#contraseña-empleado');

formulario.addEventListener('submit', validarFormulario);

function validarFormulario(e) {
    e.preventDefault();

    if(nombreImput.value === '' || codigoImput.value === '' || correoImput.value === '' || contraseñaImput.value === ''){
        console.log("Todos los campos son obligatorios");
    }

    if(editando){
        editarEmpleado();
        editando = false;
    }else {
        objEmpleado.id = Date.now();
        objEmpleado.nombre = nombreImput.value;
        objEmpleado.codigo = codigoImput.value;
        objEmpleado.email = correoImput.value;
        objEmpleado.contraseña = contraseñaImput.value;

        agregarEmpleado();
    }
}

function agregarEmpleado() {
    listaEmpleados.push({...objEmpleado});

    mostrarEmpleados();

    formulario.reset();

    limpiarObjeto();
}

function limpiarObjeto() {
        objEmpleado.id = '';
        objEmpleado.nombre = '';
        objEmpleado.codigo = '';
        objEmpleado.email = '';
        objEmpleado.contraseña = '';
}

function mostrarEmpleados() {

    limpiarHTML();

    const divEmpleados = document.querySelector('.div-empleados');

    listaEmpleados.forEach( (empleado) => {
        const {id, nombre, codigo, email, contraseña} = empleado;

        const parrafo = document.createElement('p');
        parrafo.textContent = `${id} - ${nombre} - ${codigo} - ${email} - ${contraseña} - `;
        parrafo.dataset.id = id;

        const editarBoton = document.createElement('button');
        editarBoton.onclick = () => cargarEmpleado(empleado);
        editarBoton.textContent = 'Editar';
        editarBoton.classList.add('btn', 'btn-editar');
        parrafo.append(editarBoton);

        const eliminarBoton = document.createElement('button');
        eliminarBoton.onclick = () => eliminarEmpleado(id);
        eliminarBoton.textContent = 'Eliminar';
        eliminarBoton.classList.add('btn', 'btn-eliminar');
        parrafo.append(eliminarBoton);

        const hr = document.createElement('hr');

        divEmpleados.appendChild(parrafo);
        divEmpleados.appendChild(hr);


    });
}

function cargarEmpleado(empleado) {
    const {id, nombre, codigo, email, contraseña} = empleado;

    nombreImput.value = nombre;
    codigoImput.value = codigo;
    correoImput.value = email;
    contraseñaImput.value = contraseña;
    
    objEmpleado.id = id;
    
    formulario.querySelector('button[type="submit"]').textContent = 'Actualizar';

    editando = true;
}

function editarEmpleado() {

        objEmpleado.nombre = nombreImput.value;
        objEmpleado.codigo = codigoImput.value;
        objEmpleado.email = correoImput.value;
        objEmpleado.contraseña = contraseñaImput.value;

        listaEmpleados.map( (empleado) => {

            if(empleado.id === objEmpleado.id) {
                empleado.id = objEmpleado.id;
                empleado.nombre = objEmpleado.nombre;
                empleado.codigo = objEmpleado.codigo;
                empleado.correo = objEmpleado.email;
                empleado.contraseña = objEmpleado.contraseña;
            }
            
        });
        limpiarHTML();
        mostrarEmpleados();

        formulario.reset();
        formulario.querySelector('button[type="submit"]').textContent = 'Agregar';

        editando = false;
}

function eliminarEmpleado(id) {
    listaEmpleados = listaEmpleados.filter((empleado) => empleado.id !== id);

    limpiarHTML();
    mostrarEmpleados();

}

const limpiarHTML = () => {
    const divEmpleados = document.querySelector('.div-empleados');
    while(divEmpleados.firstChild) {
        divEmpleados.removeChild(divEmpleados.firstChild);
    }
}