const pedidosKey = 'pedidos';
if (!localStorage.getItem(pedidosKey)) {
    localStorage.setItem(pedidosKey, JSON.stringify([]));
}

function mostrarFormularioPedido() {
    document.getElementById('formulario').innerHTML = `
        <h3>Nuevo Pedido</h3>
        <form id="formCrear" onsubmit="crearPedido(event)">
            <label>Número de Pedido:</label>
            <input type="number" id="numeroPedidoCrear" min="1" required><br>
            <label>Cliente:</label>
            <input type="text" id="clienteCrear" maxlength="50" required><br>
            <label>Fecha de Pedido:</label>
            <input type="date" id="fechaPedidoCrear" required><br>
            <label>Procesado:</label>
            <input type="checkbox" id="procesadoCrear"><br>
            <label>Servido:</label>
            <input type="checkbox" id="servidoCrear"><br>
            <button type="submit">Crear Pedido</button>
        </form>
        
        <h3>Eliminar Pedido</h3>
        <form id="formEliminar" onsubmit="eliminarPedido(event)">
            <label>Número de Pedido:</label>
            <input type="number" id="numeroPedidoEliminar" min="1" required><br>
            <button type="submit">Eliminar</button>
        </form>
        <h3>Modificar Pedido</h3>
    <form id="formModificar" onsubmit="ModificarPedido(event)">
        <label>Número de Pedido:</label>
        <input type="number" id="numeroPedidoModificar" min="1" required><br>
        <label>Cliente:</label>
        <input type="text" id="clienteModificar" maxlength="50" required><br>
        <label>Fecha de Pedido:</label>
        <input type="date" id="fechaPedidoModificar" required><br>
        <label>Procesado:</label>
        <input type="checkbox" id="procesadoModificar"><br>
        <label>Servido:</label>
        <input type="checkbox" id="servidoModificar"><br>
        <button type="submit">Modificar Pedido</button>
    </form>
    <h3>Mostrar Pedidos</h3>
        <form id="" onsubmit="mostrarFormularioConsulta()">
            <label>Número de Pedido:</label>
            <button type="submit">Mostrar</button>
        </form>
    `;
}

function crearPedido(event) {
    event.preventDefault();

    const numeroPedido = parseInt(document.getElementById('numeroPedidoCrear').value);
    const cliente = document.getElementById('clienteCrear').value;
    const fechaPedido = document.getElementById('fechaPedidoCrear').value;
    const procesado = document.getElementById('procesadoCrear').checked;
    const servido = document.getElementById('servidoCrear').checked;

    if (isNaN(numeroPedido) || numeroPedido < 1) {
        alert('El número de pedido debe ser un entero positivo.');
        return;
    }

    const pedidos = JSON.parse(localStorage.getItem(pedidosKey));
    console.log(numeroPedido);
    if (pedidos.findIndex(p => p.numeroPedido === numeroPedido)!=-1) {
        alert('El número de pedido ya existe.');
        return;
    }

   
    if (new Date()< new Date(fechaPedido)  ) {
        alert('La fecha de pedido no puede ser posterior a la fecha actual.');
        return;
    }

    pedidos.push({ numeroPedido, cliente, fechaPedido, procesado, servido });
    localStorage.setItem(pedidosKey, JSON.stringify(pedidos));
    alert('Pedido creado con éxito.');
}

function eliminarPedido(event) {
    event.preventDefault(); // Prevenir el envío del formulario

    const numeroPedido = parseInt(document.getElementById('numeroPedidoEliminar').value);
    const pedidos = JSON.parse(localStorage.getItem(pedidosKey));
    const index = pedidos.findIndex(p => p.numeroPedido === numeroPedido);
    if (index === -1) {
        
        alert("El pedido no existe.");
        return;
    }
    pedidos.splice(index, 1);
    localStorage.setItem(pedidosKey, JSON.stringify(pedidos));
    alert("Pedido eliminado correctamente.");
}
function ModificarPedido(event) {
    event.preventDefault(); // Prevenir el envío del formulario
    let cliente = document.getElementById('clienteModificar').value;
    let numeroPedido = parseInt(document.getElementById('numeroPedidoModificar').value);
    const pedidos = JSON.parse(localStorage.getItem(pedidosKey));
    const index = pedidos.findIndex(p => p.numeroPedido === numeroPedido);
    if (index === -1) {
        alert("El pedido no existe.");
        return;
    }
event.preventDefault(); // Prevenir el envío del formulario

 numeroPedido = parseInt(document.getElementById('numeroPedidoModificar').value);
 cliente = document.getElementById('clienteModificar').value;
 fechaPedido = document.getElementById('fechaPedidoModificar').value;
 procesado = document.getElementById('procesadoModificar').checked;
 servido = document.getElementById('servidoModificar').checked;
    if (index === -1) {
        alert("El pedido no existe.");
        return;
    }
    else{
        pedidos.splice(index, 1);
        pedidos.push({ numeroPedido, cliente, fechaPedido, procesado, servido });
        localStorage.setItem(pedidosKey, JSON.stringify(pedidos));
        alert('Pedido creado con éxito.');

    }
}
function mostrarFormularioConsulta() {
    document.getElementById('formulario').innerHTML = `
        <h2>Consultar Pedidos</h2>
        <form onsubmit="consultarPedido(event)">
            <label>Número de Pedidos:</label>
            <input type="number" id="numeroPedidoConsulta" min="1" required><br>
            <button type="submit" >Consultar</button>
        </form>
    `;
}

function consultarPedido(event) {
    event.preventDefault();
    const numeroPedido = parseInt(document.getElementById('numeroPedidoConsulta').value);
    
    const pedido = JSON.parse(localStorage.getItem(pedidosKey)) || [];
    const piezasFiltradas = pedido.filter(pedido => pedido.numeroPedido === numeroPedido);

    if (piezasFiltradas.length === 0) {
        alert('No hay piezas para el número de pedido proporcionado.');
        return;
    }
    
    let tablaHTML = `
        <table>
            <tr>
                <th>Num. pedido</th>
                <th>nombre </th>
                <th>fecha </th>
                <th>Grosor (cm)</th>
                <th>Color</th>
            </tr>
    `;
    
    piezasFiltradas.forEach(pedido => {
        
        tablaHTML += `
            <tr>
                <td>${pedido.numeroPedido}</td>
                <td>${pedido.cliente}</td>
                <td>${pedido.fechaPedido}</td>
                <td>${pedido.procesado}</td>
                <td>${pedido.servido}</td>
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
