const stockProductos = [
    {id: 1, nombre: "Tubo de calamar", categoria: "Mariscos", descripcion: "Tubo para rabas", precio: 1200, stock: 20},
    {id: 2, nombre: "Cornalitos", categoria: "Pescados", descripcion: "Cornalitos congelados", precio: 700, stock: 20},
]

const contenedorProductos = document.getElementById('contenedor-productos')


//carrito
let carrito = []

stockProductos.forEach((producto) => {
    const div = document.createElement('div')
    div.innerHTML = `
    <div class="card" style="width: 18rem;">
        <img src="..." class="card-img-top" alt="...">
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
    const item = stockProductos.find ((prod) => prod.id === prodId)
    carrito.push(item)
    console.log(carrito)
}