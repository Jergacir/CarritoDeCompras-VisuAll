// PRODUCTOS
const productos = [
    //Lentes
    {
        id: 'lentes-01',
        titulo: 'Lentes 01',
        imagen: 'https://econolentes.com.pe/cdn/shop/files/8053672030464_1.png?v=1719986649',
        categoria: {
            nombre: 'Lentes',
            id: 'Lentes',
        },
        precio: 150,
    },

    {
        id: 'lentes-02',
        titulo: 'Lentes 02',
        imagen: 'https://angler.com.pe/wp-content/uploads/2024/01/4.png',
        categoria: {
            nombre: 'Lentes',
            id: 'Lentes',
        },
        precio: 150,
    },

    {
        id: 'lentes-03',
        titulo: 'Lentes 03',
        imagen: 'https://www.visioncenter.com.pe/cdn/shop/files/8053672357943_1_512x512.png?v=1724738826',
        categoria: {
            nombre: 'Lentes',
            id: 'Lentes',
        },
        precio: 150,
    },

    {
        id: 'lentes-04',
        titulo: 'Lentes 04',
        imagen: 'https://chillibeans.bo/cdn/shop/products/LV.MT.0696-0407_1024x.png?v=1699542341',
        categoria: {
            nombre: 'Lentes',
            id: 'Lentes',
        },
        precio: 150,
    },

    //Juegos
    {
        id: 'juego-01',
        titulo: 'Ajedrez Braille',
        imagen: 'https://static.wixstatic.com/media/8067e0_d61285313aac4912a50c71e647a9d451~mv2.png/v1/fill/w_540,h_438,al_c,lg_1,q_85,enc_avif,quality_auto/8067e0_d61285313aac4912a50c71e647a9d451~mv2.png',
        categoria: {
            nombre: 'Juegos',
            id: 'Juegos',
        },
        precio: 200,
    },

    {
        id: 'juego-02',
        titulo: 'UNO Braille',
        imagen: 'https://static.wixstatic.com/media/8067e0_f2ba6f1c9e4645acabf17a8f588aad2c~mv2.png/v1/fill/w_582,h_434,al_c,lg_1,q_85,enc_avif,quality_auto/8067e0_f2ba6f1c9e4645acabf17a8f588aad2c~mv2.png',
        categoria: {
            nombre: 'Juegos',
            id: 'Juegos',
        },
        precio: 200,
    },

    //Relojes
    {
        id: 'reloj-01',
        titulo: 'Reloj Braille',
        imagen: 'https://static.wixstatic.com/media/8067e0_099f2366770b444da5eb93efd977d550~mv2.png/v1/fill/w_496,h_402,al_c,lg_1,q_85,enc_avif,quality_auto/8067e0_099f2366770b444da5eb93efd977d550~mv2.png',
        categoria: {
            nombre: 'Relojes',
            id: 'Relojes',
        },
        precio: 500,
    },

    {
        id: 'reloj-02',
        titulo: 'Reloj Braille',
        imagen: 'https://static.wixstatic.com/media/8067e0_98df9022530f4dc0a574bb95cf7efed8~mv2.png/v1/fill/w_938,h_700,al_c,q_90,usm_0.66_1.00_0.01,enc_avif,quality_auto/8067e0_98df9022530f4dc0a574bb95cf7efed8~mv2.png',
        categoria: {
            nombre: 'Relojes',
            id: 'Relojes',
        },
        precio: 500,
    },

]

//Obteniendo elementos del DOM
const contenedorProductos = document.getElementById('contenedor-productos');
const botonesCategorias = document.querySelectorAll('.boton-categoria');
const tituloCategoria = document.getElementById('titulo-principal');
let botonesAgregarCarrito = document.querySelectorAll('.producto-agregar');
const numerito = document.querySelector('#numerito');

//Creando las funciones
function cargarProductos(productosElegidos) {

    contenedorProductos.innerHTML = '';

    productosElegidos.forEach(producto => {
        const div = document.createElement("div");
        div.classList.add("producto");
        div.innerHTML = `<img class="producto-imagen" src="${producto.imagen}" alt="${producto.titulo}">
     <div class="producto-detalles">
         <h3 class="producto-titulo">${producto.titulo}</h3>
         <p class="producto-precio">S/. ${producto.precio}</p>
         <button class="producto-agregar" id="${producto.id}">Agregar a Carrito</button>
     </div>`

        contenedorProductos.append(div);
    });

    actualizarBotonesAgregar();
}

cargarProductos(productos);

botonesCategorias.forEach(boton => {
    boton.addEventListener('click', (e) => {

        botonesCategorias.forEach(boton => boton.classList.remove('active-aside'));
        e.currentTarget.classList.add('active-aside');

        if (e.currentTarget.id !== 'todos') {
            const productoCategoria = productos.find(producto => producto.categoria.id === e.currentTarget.id);
            tituloCategoria.innerText = productoCategoria.categoria.nombre;

            const productosBoton = productos.filter(producto => producto.categoria.id === e.currentTarget.id);
            cargarProductos(productosBoton);
        } else {
            tituloCategoria.innerText = 'Todos los productos';
            cargarProductos(productos);
        }
    });
});

function actualizarBotonesAgregar() {
    botonesAgregarCarrito = document.querySelectorAll('.producto-agregar');

    botonesAgregarCarrito.forEach(boton => {
        boton.addEventListener('click', agregarAlCarrito)
    });
}

//Creando Array de los productos que se agregan al carrito
let productosEnCarrito;

//Recuperamos los productos del carrito guardados en el LOCAL STORAGE
const productosEnCarritoLS = JSON.parse(localStorage.getItem('Carrito'));

if (productosEnCarritoLS) {
    productosEnCarrito = productosEnCarritoLS;
    actualizarNumerito();
} else {
    productosEnCarrito = [];
}

function agregarAlCarrito(e) {
    const idBoton = e.currentTarget.id;
    const productoAgregado = productos.find(producto => producto.id === idBoton);

    if (productosEnCarrito.some(producto => producto.id === idBoton)) {
        const index = productosEnCarrito.findIndex(producto => producto.id === idBoton);
        productosEnCarrito[index].cantidad++;
    } else {
        productoAgregado.cantidad = 1;
        productosEnCarrito.push(productoAgregado);
    }

    actualizarNumerito();
    console.log(productosEnCarrito);

    localStorage.setItem('Carrito', JSON.stringify(productosEnCarrito));

};

function actualizarNumerito() {
    // let numerito = productosEnCarrito.reduce((acc, producto) => acc + producto.cantidad, 0);
    let nuevoNumerito = 0;
    productosEnCarrito.forEach(producto => nuevoNumerito += producto.cantidad);
    console.log(nuevoNumerito);
    numerito.innerText = nuevoNumerito;
}