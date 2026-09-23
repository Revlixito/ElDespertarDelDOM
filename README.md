# La tienda del DOM (Primera entrega de Desarrollo Web)

## Uso de IA
* **Herramienta utilizada:** Gemini (Google).
* **Partes asistidas con IA:**
  * **Corrección de errores del HTML:** Revisión de la estructura inicial en el cuerpo y organizar la jerarquía de botones).
  * **Estructura y diseño CSS:** Sugerencias para el reseteo de estilos, el diseño responsivo del catálogo mediante CSS Grid y el sistema de apertura/cierre del panel lateral.
  * **Desarrollo de JS** El index de los productos por perez, y la estructura de creacion para cada tarjeta (producto)
  simplemente por que era bastante tedioso hacer eso a mano, correccion de errores en los botones de filtros, que se seleccionaban pero no filtraban.
* **Prompts reales relevantes:**
  1. *"bien asi?? [aqui es donde pegue mi codigo inicial] dime si algo esta mal, el porque y dime como solucionarlo"*
  2. *"vale, vamos a darle un poco dde estilo, dime como deberia de empezar"*
* **Cómo verifiqué lo generado:**
  * Inspeccioné el DOM en el navegador comprobando el modelo de caja con `box-sizing: border-box`.
  * Probé manualmente la animación del carrito forzando la clase `.abierto` en el elemento `<aside>` desde el inspector para comprobar que la transición con `transform: translateX` funcionaba sin romper el flujo de la página.
  * Consulté y verifiqué en detalle los conceptos que no recordaba o no conocía (la función `var()` para Custom Properties en `:root`, el porqué del uso de unidades relativas `rem` frente a `px`, y la utilidad de las variables).
* **Qué escribí / ajusté a mano:**
  * El esqueleto inicial del HTML y la semántica de los identificadores.
  * La adaptación de los estilos a mis necesidades y los comentarios explicativos en el archivo `style.css`.
  * El funcionamiento de apertura y cierre del carrito de la compra


## Autopsia

### 1. Mostrar y ocultar el carrito con CSS (`transform: translateX`) en vez de `display: none`
* **La decisión:** Dejar el panel lateral del carrito (`<aside>`) escrito directamente en el HTML y usar una clase `.abierto` en CSS que cambia `transform: translateX(100%)` a `translateX(0)`.
* **Alternativa descartada:** Ocultar el carrito con `display: none` y mostrarlo con `display: block`, o crearlo desde cero con JavaScript cada vez que se pulsa el botón.
* **Por qué elegí esto:** `display: none` corta de golpe la vista y no permite hacer una animación suave de entrada y salida. Con `transform` la transición se ve fluida y natural al abrirse desde la derecha. Además, tener la estructura ya en el HTML evita tener que generar todo el panel a mano con JavaScript.

### 2. Usar unidades `rem` en lugar de píxeles fijos (`px`) para espaciados y tamaños
* **La decisión:** Aplicar `rem` para los paddings, márgenes y tamaños del buscador y botones.
* **Alternativa descartada:** Usar valores directos en píxeles (como `padding: 16px`).
* **Por qué elegí esto:** Al principio los píxeles parecen más sencillos porque son un número exacto, pero son rígidos. Si un usuario cambia el tamaño de fuente predeterminado de su navegador por comodidad o problemas de vista, las medidas en `rem` se adaptan y crecen proporcionalmente, evitando que los botones o textos se corten o queden descuadrados.
