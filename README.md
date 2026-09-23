# La tienda del DOM (Entrega final de Desarrollo Web)

## Uso de IA

* **Herramienta utilizada:** Gemini (Google).
* **Partes asistidas con IA:**
  * **Estructura y diseño CSS:** Prácticamente obra completa de la IA (variables, reseteo, flexbox, CSS Grid y el sistema animado del carrito), ya que no me acordaba de casi nada de CSS y necesitaba una base visual sólida.
  * **Corrección de errores del HTML:** Revisión inicial de etiquetas, jerarquía y accesibilidad semántica.
  * **Generación de HTML dinámico:** La creación de las tarjetas del catálogo y la estructura de los ítems dentro del carrito (`<li>` con botones de sumar, restar y eliminar) fue generada con IA para ahorrar tiempo, ya que picar esos bloques a mano era un proceso tedioso y repetitivo.
  * **Lógica del carrito y bonus:** Implementación de la gestión del estado del carrito, conexión del buscador, eventos de teclado y casi todo el desarrollo del modo oscuro con Custom Properties.
  * **Organización del proyecto:** La IA me ayudó a darle orden y forma a la estructura de `app.js` para que el flujo fuera lógico (estado, selectores, renderizado, lógica, eventos e inicialización).
  * **Formato del README:** Uso de la IA para limpiar el documento, corregir faltas de ortografía (tildes, comas, puntos), mejorar la claridad de la redacción y ajustar la indentación de Markdown.
* **Prompts reales relevantes:**
  1. *"bien asi?? [pegué mi código inicial] dime si algo esta mal, el porque y dime como solucionarlo"*
  2. *"vale, vamos a darle un poco dde estilo, dime como deberia de empezar"*
  3. *"const item = carrito.find(i => i.id === idProducto); aqui la funcion flecha que hace exactamente? no las entiendo del todo bien, iteran todo el rato o que?"*
  4. *"¿por qué se usan las funciones flecha y cómo funciona exactamente reduce y find con dataset?"*
* **Qué aprendí y qué interioricé de verdad:**
  * **Funciones flecha (`=>`):** Al principio me confundían con los bucles o pensaba que solo servían para booleanos, pero ya las entiendo por completo: su retorno implícito sin llaves, el ámbito léxico de `this` frente a `function` tradicional, y cuándo conviene usar cada una.
  * **Método `reduce()`:** Comprendí a fondo cómo sustituye a un bucle `for` tradicional mediante el acumulador (`acc`) y el elemento actual (`item`), evitando variables mutables fuera del ámbito.
  * **Atributos `data-*` y `dataset`:** Entendí cómo desacoplar la lógica de JS del texto visible de la interfaz guardando valores fijos en el HTML (IDs, categorías, acciones como `"sumar"` o `"restar"`) y recuperándolos de forma nativa.
* **Qué escribí / ajusté a mano:**
  * La eliminación manual del bloque duplicado de filtros que rompía la consola tras revisar el feedback.
  * La verificación en el navegador inspeccionando el modelo de caja, el evento `input` y los eventos de teclado (`Escape` y tecla `D`).
  * Los comentarios detallados en el código de `app.js`: tras ordenar el script con ayuda de la IA, me puse a comentarlo yo mismo paso por paso para asegurar la legibilidad y confirmar que entiendo al 100% cada línea antes de entregar.

---

## Autopsia

### 1. Mostrar y ocultar el carrito con CSS (`transform: translateX`) en vez de `display: none`
* **La decisión:** Dejar el panel lateral del carrito (`<aside>`) escrito directamente en el HTML y usar una clase `.abierto` en CSS que cambia `transform: translateX(100%)` a `translateX(0)`.
* **Alternativa descartada:** Ocultar el carrito con `display: none` y mostrarlo con `display: block`, o crearlo desde cero con JavaScript cada vez que se pulsa el botón.
* **Por qué elegí esto:** `display: none` corta de golpe la vista y no permite hacer una animación suave de entrada y salida. Con `transform` la transición se ve fluida y natural al abrirse desde la derecha. Además, tener la estructura ya en el HTML evita tener que generar todo el panel a mano con JavaScript.

### 2. Usar unidades `rem` en lugar de píxeles fijos (`px`) para espaciados y tamaños
* **La decisión:** Aplicar `rem` para los paddings, márgenes y tamaños del buscador y botones.
* **Alternativa descartada:** Usar valores directos en píxeles (como `padding: 16px`).
* **Por qué elegí esto:** Al principio los píxeles parecen más sencillos porque son un número exacto, pero son rígidos. Si un usuario cambia el tamaño de fuente predeterminado de su navegador por comodidad o problemas de vista, las medidas en `rem` se adaptan y crecen proporcionalmente, evitando que los botones o textos se corten o queden descuadrados.

### 3. Delegación de eventos en listas dinámicas frente a listeners individuales
* **La decisión:** Escuchar los eventos `click` en contenedores padre fijos (`#catalogo`, `#filtros`, `#articulos-carrito`) e identificar los elementos pulsados con `.closest()` y atributos `dataset`.
* **Alternativa descartada:** Asignar un `addEventListener` a cada botón de añadir o eliminar cada vez que se renderizaba una tarjeta o un elemento de la lista.
* **Por qué elegí esto:** Añadir listeners a elementos dinámicos que se destruyen y recrean (`innerHTML = ''`) genera fugas de memoria y obliga a reasociar eventos constantemente. La delegación de eventos centraliza la captura de interacciones en el padre sin importar cuántas veces cambie el contenido interno.