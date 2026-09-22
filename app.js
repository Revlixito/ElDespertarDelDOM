const btnAbrirCarrito = document.querySelector('#btn-abrir-carrito');
const btnCerrarCarrito = document.querySelector('#btn-cerrar-carrito');
const panelCarrito = document.querySelector('#panel-carrito');



btnAbrirCarrito.addEventListener('click', () => {
    panelCarrito.classList.add('abierto');
});

btnCerrarCarrito.addEventListener('click', () => {
    panelCarrito.classList.remove('abierto');
});