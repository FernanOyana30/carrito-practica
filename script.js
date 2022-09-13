const stockProductos = [
    {id: 1, nombre: "Tubo de calamar", categoria: "Mariscos", descripcion: "Tubo para rabas", precio: 1200, stock: 20, cantidad: 1},
    {id: 2, nombre: "Cornalitos", categoria: "Pescados", descripcion: "Cornalitos congelados", precio: 700, stock: 20, cantidad: 1}
]

const contenedorProductos = document.getElementById('contenedor-productos')
const contenedorCarrito = document.getElementById('carrito-contenedor')
const vaciarCarrito = document.getElementById('vaciar-carrito')
const contadorCarrito = document.getElementById('contador-carrito')
const precioTotal = document.getElementById('precio-total')

//carrito
let carrito = []

//Local Storage
document.addEventListener('DOMContentLoaded', () => {
    if (localStorage.getItem('carrito')){
        carrito = JSON.parse(localStorage.getItem('carrito'))
        actualizarCarrito()
    }
})

vaciarCarrito.addEventListener('click', () => {
    carrito.length = 0
    localStorage.setItem('carrito', JSON.stringify(carrito))
    actualizarCarrito()
})

stockProductos.forEach((producto) => {
    const div = document.createElement('div')
    div.innerHTML = `
    <div class="card" style="width: 18rem;">
        
        <div class="card-body">
            <h5 class="card-title">${producto.nombre}</h5>
            <p class="card-text">${producto.categoria}</p>
            <p class="card-text">${producto.descripcion}</p>
            <p class="card-text">$${producto.precio}</p>
            <p class="card-text">${producto.stock}</p>
            <button id="agregar${producto.id}">Agregar</button>
        </div>
    </div>
    `
    contenedorProductos.appendChild(div)

    const boton = document.getElementById(`agregar${producto.id}`)

    boton.addEventListener('click', () => {
        agregarAlCarrito(producto.id)
    })
})

//funcion agregar al carrito

const agregarAlCarrito = (prodId) => {
    const existe = carrito.some (prod => prod.id === prodId)

    if (existe){
        const prod = carrito.map ( prod => {
            if (prod.id === prodId ){
                prod.cantidad++
            }
        })
    } else {
        const item = stockProductos.find ((prod) => prod.id === prodId)
    carrito.push(item)
    }  
    
    actualizarCarrito()
    console.log(carrito)
    console.log("sos gay")
}

//funcion eliminar del carrito

const eliminarDelCarrito = (prodId) => {
    const item = carrito.find((prod) => prod.id === prodId)
    const indice = carrito.indexOf(item)
    carrito.splice(indice, 1)    
    localStorage.setItem('carrito', JSON.stringify(carrito))
    actualizarCarrito()
    console.log("sos re gay")
    
}

//Actualizar carrito
const actualizarCarrito = () => {
    contenedorCarrito.innerHTML = ""

    carrito.forEach((prod) => {
        const div = document.createElement('div')
        div.innerHTML = `
        <div class="card" style="width: 18rem;">            
            <div class="card-body">
                <h5 class="card-title">${prod.nombre}</h5>
                <p class="card-text">${prod.categoria}</p>
                
                <p class="card-text">$${prod.precio}</p>
                
                <p class="card-text">${prod.cantidad}</p>
                <button onclick="eliminarDelCarrito(${prod.id})">Eliminar</button>
            </div>
        </div>
        `
        contenedorCarrito.appendChild(div)

        localStorage.setItem('carrito', JSON.stringify(carrito))
    })
    contadorCarrito.innerText = carrito.length
    precioTotal.innerText = carrito.reduce((acc, prod) => acc + prod.precio, 0)
}