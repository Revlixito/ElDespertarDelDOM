// Array de productos con la estructura para crearlos dinámicamente
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

const btnAbrirCarrito = document.querySelector('#btn-abrir-carrito');
const btnCerrarCarrito = document.querySelector('#btn-cerrar-carrito');
const panelCarrito = document.querySelector('#panel-carrito');

const catalogo = document.querySelector('#catalogo');
const contenedorFiltros = document.querySelector('#filtros');


btnAbrirCarrito.addEventListener('click', () => {
    panelCarrito.classList.add('abierto');
});

btnCerrarCarrito.addEventListener('click', () => {
    panelCarrito.classList.remove('abierto');
});

function pintarCatalogo(listaProductos) {
    // 1. Limpiamos el contenedor por si acaso
    catalogo.innerHTML = '';

    // 2. Recorremos el array recibido con forEach
    listaProductos.forEach(producto => {
        // Creamos la tarjeta del producto
        const tarjeta = document.createElement('article');
        tarjeta.classList.add('tarjeta-producto');

        // Usamos template literals para inyectar los datos del objeto
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

        // 3. Añadimos la tarjeta creada al grid en el DOM
        catalogo.appendChild(tarjeta);
    });
}

// Llamada inicial para que pinte todos los productos al cargar la página
pintarCatalogo(listaProductos);


// Delegación de eventos para los filtros de categoría
contenedorFiltros.addEventListener('click', (e) => {
    // 1. Verificamos si lo que se clickeó es un botón de filtro
    const boton = e.target.closest('.btn-filtro');
    if (!boton) return; // Si se clickea fuera de un botón, no hace nada

    // 2. Gestión visual de la clase 'activo'
    // Seleccionamos todos los botones dentro de #filtros y quitamos la clase 'activo'
    document.querySelectorAll('.btn-filtro').forEach(btn => btn.classList.remove('activo'));
    // Añadimos la clase 'activo' al botón pulsado
    boton.classList.add('activo');

    // 3. Obtenemos el valor de la categoría desde dataset
    const categoriaSeleccionada = boton.dataset.categoria;

    // 4. Filtramos el array de productos
    if (categoriaSeleccionada === 'todos') {
        pintarCatalogo(productos);
    } else {
        const productosFiltrados = productos.filter(producto => producto.categoria === categoriaSeleccionada);
        pintarCatalogo(productosFiltrados);
    }
});

// Delegación de eventos para los filtros de categoría
contenedorFiltros.addEventListener('click', (e) => {
    // 1. Verificamos si lo que se clickeó es un botón de filtro
    const boton = e.target.closest('.btn-filtro');
    if (!boton) return; // Si se clickea fuera de un botón, no hace nada

    // 2. Gestión visual de la clase 'activo'
    // Seleccionamos todos los botones dentro de #filtros y quitamos la clase 'activo'
    document.querySelectorAll('.btn-filtro').forEach(btn => btn.classList.remove('activo'));
    // Añadimos la clase 'activo' al botón pulsado
    boton.classList.add('activo');

    // 3. Obtenemos el valor de la categoría desde dataset
    const categoriaSeleccionada = boton.dataset.categoria;

    // 4. Filtramos el array de productos
    if (categoriaSeleccionada === 'todos') {
        pintarCatalogo(listaProductos);
    } else {
        const productosFiltrados = listaProductos.filter(producto => producto.categoria === categoriaSeleccionada);
        pintarCatalogo(productosFiltrados);
    }
});
