const productosEnCarrito = JSON.parse(localStorage.getItem('Carrito'));

const carritoVacio = document.getElementById('carrito-vacio');
const contenedorProductos = document.getElementById('carrito-productos');
const contenedorCarritoAcciones = document.getElementById('carrito-acciones');
const contenedorCarritoComprado = document.getElementById('carrito-comprado');
const totalCompra = document.getElementById('total');
let botonesEliminarCarrito = document.querySelectorAll('.carrito-producto-eliminar');
const botonVaciar = document.getElementById('carrito-acciones-vaciar');
const botonComprar = document.getElementById('carrito-acciones-comprar');
const numerito = document.getElementById('numerito');


function cargarProductosCarrito() {
    if (productosEnCarrito !== null && productosEnCarrito.length > 0) {
        carritoVacio.classList.add('disabled');
        contenedorProductos.classList.remove('disabled');
        contenedorCarritoAcciones.classList.remove('disabled');
        contenedorCarritoComprado.classList.add('disabled');

        contenedorProductos.innerHTML = "";

        productosEnCarrito.forEach(producto => {
            const div = document.createElement('div');
            div.classList.add('carrito-producto');
            div.innerHTML = `<img class="carrito-producto-imagen"
                        src="${producto.imagen}" alt="${producto.titulo}">
                    <div class="carrito-producto-titulo">
                        <small>${producto.categoria.nombre}</small>
                        <h3>${producto.titulo}</h3>
                    </div>
                    <div class="carrito-producto-cantidad">
                        <small>Cantidad</small>
                        <p>${producto.cantidad}</p>
                    </div>
                    <div class="carrito-producto-precio">
                        <small>Precio</small>
                        <p>S/. ${producto.precio}</p>
                    </div>
                    <div class="carrito-producto-subtotal">
                        <small>Subtotal</small>
                        <p>S/. ${producto.precio * producto.cantidad}</p>
                    </div>
                    <button class="carrito-producto-eliminar" id="${producto.id}">
                        <i class="bi bi-trash-fill"></i>
                    </button>`;
            contenedorProductos.append(div);
        });
    } else {
        carritoVacio.classList.remove('disabled');
        contenedorProductos.classList.add('disabled');
        contenedorCarritoAcciones.classList.add('disabled');
        contenedorCarritoComprado.classList.add('disabled');
    }

    actualizarNumerito();
    actualizarTotal();
    actualizarBotonesEliminar();
}

cargarProductosCarrito();


//Obtener los botones de eliminar productos
function actualizarBotonesEliminar() {
    botonesEliminarCarrito = document.querySelectorAll('.carrito-producto-eliminar');

    botonesEliminarCarrito.forEach(boton => {
        boton.addEventListener('click', eliminarDelCarrito)
    });
}

function eliminarDelCarrito(e) {
    const idBoton = e.currentTarget.id;
    const index = productosEnCarrito.findIndex(producto => producto.id === idBoton);

    productosEnCarrito.splice(index, 1);
    cargarProductosCarrito();

    localStorage.setItem('Carrito', JSON.stringify(productosEnCarrito));
}

//Mantener actualizado el número del Carrito
function actualizarNumerito() {
    let nuevoNumerito = 0;

    productosEnCarrito.forEach(producto => nuevoNumerito += producto.cantidad);
    console.log(nuevoNumerito);
    numerito.innerText = nuevoNumerito;
}

//Vaciar el carrito
botonVaciar.addEventListener('click', vaciarCarrito);

function vaciarCarrito() {
    productosEnCarrito.length = 0;
    localStorage.setItem('Carrito', JSON.stringify(productosEnCarrito));
    cargarProductosCarrito();
}

//Función para actualizar el total de la compra
function actualizarTotal() {
    let total = 0;

    productosEnCarrito.forEach(producto => {
        total = total + (producto.precio * producto.cantidad);
        totalCompra.innerText = 'S/. ' + total;
    });
}

//Al presionar el botón de comprar
botonComprar.addEventListener('click', comprarCarrito);

function comprarCarrito() {
    productosEnCarrito.length = 0;
    localStorage.setItem('Carrito', JSON.stringify(productosEnCarrito));
    cargarProductosCarrito();

    carritoVacio.classList.add('disabled');
    contenedorProductos.classList.add('disabled');
    contenedorCarritoAcciones.classList.add('disabled');
    contenedorCarritoComprado.classList.remove('disabled');
}