// Selecciono elementos HTML que voy a manipular
const fecha = document.querySelector('#fecha');
const lista = document.querySelector('#lista');
const input = document.querySelector('#input');
const botonEnter = document.querySelector('#boton-enter');
const check = 'fa-check-circle';
const uncheck = 'fa-circle';
const lineThrough = 'line-through';
let id = 1;
let listaTodo = [];



//Funcion de fecha
const fechaActual = new Date();
fecha.innerHTML = fechaActual.toLocaleDateString('es-AR', { weekday: 'long', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' })

// Funcion agregarTarea
function agregarTarea(tarea, id, realizado, eliminado) {
    if (eliminado) { return }

    const done = realizado ? check : uncheck;
    const line = realizado ? lineThrough : '';

    const elemento = `
                    <li id="elemento">
                        <i class="far ${done} " data="realizado" id="${id}"></i>
                        <p class="text ${line}">${tarea}</p>
                        <i class=" fas fa-trash de" data="eliminado" id="${id}"></i>
                    </li>
    `
    lista.insertAdjacentHTML('beforeend', elemento)
}

// fn de tarea Realizada
const tareaRealizada = (element) => {
    element.classList.toggle(check);
    element.classList.toggle(uncheck);
    // console.log(element.classList)
    element.parentNode.querySelector('.text').classList.toggle(lineThrough);
    listaTodo[element.id].realizado = listaTodo[element.id].realizado ? false : true
}
//fn de tarea eliminada
const tareaEliminada = (element) => {
    element.parentNode.parentNode.removeChild(element.parentNode);
    listaTodo[element.id].eliminado = true
}

// Agrega escuchar al botón
botonEnter.addEventListener('click', () => {
    const tarea = input.value;
    if (tarea) {
        agregarTarea(tarea, id, false, false)
        listaTodo.push({
            nombre: tarea,
            id: id,
            realizado: false,
            eliminado: false
        })

        localStorage.setItem('TODO', JSON.stringify(listaTodo))
        input.value = ''
        id++
    }
})

// Agrega escuchar cuando de enter el usuario
document.addEventListener('keyup', function (e) {
    if (e.key === 'Enter') {
        const tarea = input.value;
        if (tarea) {
            agregarTarea(tarea, id, false, false)
            listaTodo.push({
                nombre: tarea,
                id: id,
                realizado: false,
                eliminado: false
            })

            localStorage.setItem('TODO', JSON.stringify(listaTodo))
            input.value = ''
            id++
        }
        // console.log(listaTodo)
    }
})

lista.addEventListener('click', function (event) {
    const element = event.target;
    const elementData = element.attributes.data.value
    // console.log(elementData) // Realizado.
    if (elementData === 'realizado') {
        tareaRealizada(element)
    }
    else if (elementData === 'eliminado') {
        tareaEliminada(element)
    }
    localStorage.setItem('TODO', JSON.stringify(listaTodo))
})


//LocalStorage 
let data = localStorage.getItem('TODO')
if (data) {
    listaTodo = JSON.parse(data)
    id = listaTodo.length
    cargarLista(listaTodo)
} else {
    listaTodo = []
    id = 0
}

function cargarLista(array) {
    array.forEach(function (i) {
        agregarTarea(i.nombre, i.id, i.realizado, i.eliminado)
    })
}

