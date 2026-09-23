//Declaracion de el indice con los productos, que se añadiran dinamicamente con una iteracion 
//inyectandolo con JS
const listaProductos = [
    {
        id: 1,
        nombre: "Monitor Gaming Alienware",
        categoria: "monitores",
        precio: 399.99,
        imagen: "media/alienware_monitor.png",
        descripcion: "Monitor curvo de alto rendimiento para gaming profesional."
    },
    {
        id: 2,
        nombre: "Monitor BenQ Zowie",
        categoria: "monitores",
        precio: 289.99,
        imagen: "media/benqzowie_monitor.png",
        descripcion: "El monitor definitivo para eSports y competición."
    },
    {
        id: 3,
        nombre: "Ratón Logitech G Pro",
        categoria: "ratones",
        precio: 119.99,
        imagen: "media/gpro_raton.png",
        descripcion: "Ratón inalámbrico ultraligero diseñado con profesionales."
    },
    {
        id: 4,
        nombre: "Teclado Logitech G Pro",
        categoria: "teclados",
        precio: 129.99,
        imagen: "media/gpro_teclado.png",
        descripcion: "Teclado mecánico TKL para un rendimiento de nivel profesional."
    },
    {
        id: 5,
        nombre: "Teclado Razer Huntsman",
        categoria: "teclados",
        precio: 149.99,
        imagen: "media/razerhuntsman_teclado.png",
        descripcion: "Teclado óptico analógico para una velocidad de actuación inigualable."
    },
    {
        id: 6,
        nombre: "Ratón Razer Viper V4 Pro",
        categoria: "ratones",
        precio: 159.99,
        imagen: "media/viperv4pro_raton.png",
        descripcion: "El ratón inalámbrico definitivo para máxima precisión."
    }
];

//variiables
let carrito = [];
let categoriaActiva = 'todos';

const btnAbrirCarrito = document.querySelector('#btn-abrir-carrito');
const btnCerrarCarrito = document.querySelector('#btn-cerrar-carrito');
const panelCarrito = document.querySelector('#panel-carrito');
const catalogo = document.querySelector('#catalogo');
const contenedorFiltros = document.querySelector('#filtros');
const buscador = document.querySelector('#buscador');
const contadorCarrito = document.querySelector('#contador-carrito');
const listaArticulosCarrito = document.querySelector('#articulos-carrito');
const precioCarrito = document.querySelector('#precio-carrito');
const btnVaciar = document.querySelector('#btn-vaciar');

// crea los productos en el catálogo
function pintarCatalogo(productosAMostrar) {
    catalogo.innerHTML = '';

    if (productosAMostrar.length === 0) {
        catalogo.innerHTML = '<p class="sin-resultados">No se encontraron productos que coincidan.</p>';
        return;
    }

    productosAMostrar.forEach(producto => {
        const tarjeta = document.createElement('article');
        tarjeta.classList.add('tarjeta-producto');

        tarjeta.innerHTML = `
            <img src="${producto.imagen}" alt="${producto.nombre}">
            <div class="info-producto">
                <h3>${producto.nombre}</h3>
                <p class="descripcion">${producto.descripcion}</p>
                <p class="precio">${producto.precio.toFixed(2)}€</p>
                <button class="btn-agregar" data-id="${producto.id}" type="button">
                    Añadir al carrito
                </button>
            </div>
        `;

        catalogo.appendChild(tarjeta);
    });
}

// Filtros del catalogo
function aplicarFiltros() {
    const textoBusqueda = buscador.value.trim().toLowerCase();

    const productosFiltrados = listaProductos.filter(producto => {
        const coincideCategoria = (categoriaActiva === 'todos') || (producto.categoria === categoriaActiva);
        const coincideTexto = producto.nombre.toLowerCase().includes(textoBusqueda)
        return coincideCategoria && coincideTexto; //Si coincide la categoria filtrada y el nombre, aparece el item
    });

    pintarCatalogo(productosFiltrados);
}

// Actualiza todos los elementos del carrito en el DOM
function actualizarCarritoUI() {
    // 1. Limpiamos la lista
    listaArticulosCarrito.innerHTML = '';

    if (carrito.length === 0) {
        listaArticulosCarrito.innerHTML = '<li class="carrito-vacio">La cesta está vacía.</li>';
    } else {
        carrito.forEach(item => {
            const li = document.createElement('li');
            li.classList.add('item-carrito');
            li.innerHTML = `
                <div class="info-item">
                    <strong>${item.nombre}</strong>
                    <span>${item.cantidad} x ${item.precio.toFixed(2)}€</span>
                </div>
                <div class="acciones-item">
                    <button class="btn-cantidad" data-id="${item.id}" data-accion="restar" type="button">-</button>
                    <span class="cantidad">${item.cantidad}</span>
                    <button class="btn-cantidad" data-id="${item.id}" data-accion="sumar" type="button">+</button>
                    <button class="btn-eliminar" data-id="${item.id}" type="button">✕</button>
                </div>
            `;
            listaArticulosCarrito.appendChild(li);
        });
    }

    // 2. Calculamos unidades totales y precio total
    const totalUnidades = carrito.reduce((acc, item) => acc + item.cantidad, 0);
    const totalPrecio = carrito.reduce((acc, item) => acc + (item.precio * item.cantidad), 0);

    // 3. Modificamos el DOM con textContent
    contadorCarrito.textContent = totalUnidades;
    precioCarrito.textContent = `${totalPrecio.toFixed(2)}€`;
}

// Añade un producto al array carrito
function agregarAlCarrito(idProducto) {
    const productoOriginal = listaProductos.find(p => p.id === idProducto);
    if (!productoOriginal) return;

    const productoEnCarrito = carrito.find(item => item.id === idProducto);

    if (productoEnCarrito) {
        productoEnCarrito.cantidad += 1;
    } else {
        carrito.push({
            id: productoOriginal.id,
            nombre: productoOriginal.nombre,
            precio: productoOriginal.precio,
            cantidad: 1
        });
    }

    actualizarCarritoUI();
}

// Modifica la cantidad o elimina un ítem del carrito
function modificarCantidad(idProducto, accion) {
    const item = carrito.find(i => i.id === idProducto);
    if (!item) return;

    if (accion === 'sumar') {
        item.cantidad += 1;
    } else if (accion === 'restar') {
        item.cantidad -= 1;
        if (item.cantidad <= 0) {
            carrito = carrito.filter(i => i.id !== idProducto);
        }
    }
    actualizarCarritoUI();
}

function eliminarDelCarrito(idProducto) {
    carrito = carrito.filter(item => item.id !== idProducto);
    actualizarCarritoUI();
}
//Eventos
// Abrir y cerrar el carrito
btnAbrirCarrito.addEventListener('click', () => {
    panelCarrito.classList.add('abierto');
});

btnCerrarCarrito.addEventListener('click', () => {
    panelCarrito.classList.remove('abierto');
});

// Delegación de eventos para los filtros de categoría
contenedorFiltros.addEventListener('click', (e) => {
    const boton = e.target.closest('.btn-filtro');
    if (!boton) return;

    document.querySelectorAll('.btn-filtro').forEach(btn => btn.classList.remove('activo'));
    boton.classList.add('activo');

    categoriaActiva = boton.dataset.categoria;
    aplicarFiltros();
});

// Evento input en tiempo real para el buscador
buscador.addEventListener('input', () => {
    aplicarFiltros();
});

// Delegación de eventos en el catálogo para el botón "Añadir al carrito"
catalogo.addEventListener('click', (e) => {
    const btnAgregar = e.target.closest('.btn-agregar');
    if (btnAgregar) {
        const id = parseInt(btnAgregar.dataset.id);
        agregarAlCarrito(id);
    }
});

// Delegación de eventos dentro de la lista del carrito (sumar, restar, eliminar)
listaArticulosCarrito.addEventListener('click', (e) => {
    const btnCantidad = e.target.closest('.btn-cantidad');
    const btnEliminar = e.target.closest('.btn-eliminar');

    if (btnCantidad) {
        const id = parseInt(btnCantidad.dataset.id);
        const accion = btnCantidad.dataset.accion;
        modificarCantidad(id, accion);
    } else if (btnEliminar) {
        const id = parseInt(btnEliminar.dataset.id);
        eliminarDelCarrito(id);
    }
});

// Botón para vaciar el carrito
btnVaciar.addEventListener('click', () => {
    carrito = [];
    actualizarCarritoUI();
});

// Eventos de teclado (Escape para cerrar carrito, 'D' para modo oscuro secreto)
window.addEventListener('keydown', (e) => {
    //Recomendado por la rubrica
    if (e.key === 'Escape') {
        panelCarrito.classList.remove('abierto');
    }
    // BONUS: Tecla secreta 'd' o 'D' para Modo Oscuro
    if (e.key.toLowerCase() === 'd' && document.activeElement !== buscador) {
        document.body.classList.toggle('dark-mode');
    }
});



//Inicializar catalogo y carrito
pintarCatalogo(listaProductos);
actualizarCarritoUI();