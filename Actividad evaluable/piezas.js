// Clave de LocalStorage para piezas
const piezasKey = 'piezas';

// Inicialización de LocalStorage
function inicializarLocalStorage() {
    if (!localStorage.getItem(piezasKey)) {
        localStorage.setItem(piezasKey, JSON.stringify([]));
    }
}

// Mostrar el formulario para crear una nueva pieza
function mostrarFormularioPieza() {
    document.getElementById('formulario').innerHTML = `
        <h2>Nueva Pieza</h2>
        <form onsubmit="crearPieza(event)">
            <label>Número Pieza:</label>
            <input type="number" id="numeroPieza" min="1" required><br>
            <label>Número Pedido:</label>
            <input type="number" id="numeroPedidoPieza" min="1" required><br>
            <label>Largo:</label>
            <input type="number" id="largo" min="1" required><br>
            <label>Ancho:</label>
            <input type="number" id="ancho" min="1" required><br>
            <label>Grosor:</label>
            <input type="number" id="grosor" min="1" required><br>
            <label>Color:</label>
            <input type="text" id="color" required><br>
            <label>Ambas Caras Chapeadas:</label>
            <input type="checkbox" id="ambasCaras"><br>
            <label>Cortadas:</label>
            <input type="checkbox" id="cortada"><br>
            <button type="submit">Crear Pieza</button>
        </form>
        <h3>Mostrar Pedidos</h3>
        <form id="" onsubmit="mostrarFormularioConsulta()">
            <label>Número de Pedido:</label>
            <button type="submit">Mostrar</button>
        </form>
    `;
}

// Crear una nueva pieza
function crearPieza(event) {
    event.preventDefault();
    
    const numeroPieza = parseInt(document.getElementById('numeroPieza').value);
    const numeroPedidoPieza = parseInt(document.getElementById('numeroPedidoPieza').value);
    const largo = parseFloat(document.getElementById('largo').value);
    const ancho = parseFloat(document.getElementById('ancho').value);
    const grosor = parseFloat(document.getElementById('grosor').value);
    const color = document.getElementById('color').value;

    const piezas = JSON.parse(localStorage.getItem(piezasKey)) || [];
    const pedidosExistentes = JSON.parse(localStorage.getItem(pedidosKey)) || [];

    if (piezas.some(pieza => pieza.numeroPieza === numeroPieza)) {
        alert('El número de pieza ya existe.');
        return;
    }
    if (numeroPieza < 1) {
        alert('El número de pieza debe ser mayor o igual a 1.');
        return;
    }
    if (!pedidosExistentes.some(p => p.numeroPedido === numeroPedidoPieza)) {
        alert('El número de pedido no existe.');
        return;
    }
    if (largo <= 0 || ancho <= 0 || grosor <= 0) {
        alert('Las medidas deben ser números mayores que 0.');
        return;
    }
    
    const nuevaPieza = { numeroPieza, numeroPedidoPieza, largo, ancho, grosor, color };
    piezas.push(nuevaPieza);
    localStorage.setItem(piezasKey, JSON.stringify(piezas));
    alert('Pieza creada con éxito.');
}
function mostrarFormularioConsulta() {
    document.getElementById('formulario').innerHTML = `
        <h2>Consultar Pedido</h2>
        <form onsubmit="consultarPedido(event)">
            <label>Número de Pedido:</label>
            <input type="number" id="numeroPedidoConsulta" min="1" required><br>
            <button type="submit">Consultar</button>
        </form>
    `;
}

function consultarPedido(event) {
    event.preventDefault();
    const numeroPedido = parseInt(document.getElementById('numeroPedidoConsulta').value);
    
    const piezas = JSON.parse(localStorage.getItem(piezasKey)) || [];
    const piezasFiltradas = piezas.filter(pieza => pieza.numeroPedidoPieza === numeroPedido);

    if (piezasFiltradas.length === 0) {
        alert('No hay piezas para el número de pedido proporcionado.');
        return;
    }
    
    let tablaHTML = `
        <table>
            <tr>
                <th>Num. Pieza</th>
                <th>Largo (cm)</th>
                <th>Ancho (cm)</th>
                <th>Grosor (cm)</th>
                <th>Color</th>
                <th>Superficie</th>
                <th>Volumen</th>
            </tr>
    `;
    
    piezasFiltradas.forEach(pieza => {
        const superficie = pieza.largo * pieza.ancho;
        const volumen = pieza.largo * pieza.ancho * pieza.grosor;
        
        tablaHTML += `
            <tr>
                <td>${pieza.numeroPieza}</td>
                <td>${pieza.largo}</td>
                <td>${pieza.ancho}</td>
                <td>${pieza.grosor}</td>
                <td>${pieza.color}</td>
                <td>${superficie}</td>
                <td>${volumen}</td>
            </tr>
        `;
    });
    
    tablaHTML += `</table>`;

    const resultadoElemento = document.getElementById('resultadoPedido');
    if (resultadoElemento) {
        resultadoElemento.innerHTML = tablaHTML;
    } else {
        console.error('Elemento "resultadoPedido" no encontrado.');
    }
}

// Inicializar LocalStorage al cargar la página
window.onload = inicializarLocalStorage;