// Se realiza la carga del archivo JSON usando el método fetch()
fetch("tienda.json")
    .then(response => {
        // Verificamos si la respuesta es exitosa
        if (!response.ok) {
            throw new Error("Error al cargar el archivo JSON");
        }
        return response.json(); // Convertimos los datos a formato JSON
    })
    .then(data => mostrarPedidos(data)); // Pasamos los datos a la función mostrarPedidos

// Función principal para mostrar los pedidos en la página
function mostrarPedidos(data) {
    // Seleccionamos el contenedor HTML donde se mostrarán los pedidos
    const container = document.getElementById("pedidos-container");

    // Iteramos sobre los años en el objeto data (2023, 2024, etc.)
    Object.keys(data).forEach(year => {
        const yearData = data[year]; // Obtenemos los datos del año actual

        // Iteramos sobre los trimestres dentro de cada año
        Object.keys(yearData).forEach(trimestre => {
            const pedidos = yearData[trimestre]; // Obtenemos los pedidos de ese trimestre

            // Creamos un título con el año y trimestre
            const yearTitle = document.createElement("h2");
            yearTitle.textContent = `${year} - ${trimestre.replace("_", " ")}`;
            container.appendChild(yearTitle); // Añadimos el título al contenedor

            // Iteramos sobre cada pedido en el trimestre
            pedidos.forEach(pedido => {
                // Creamos un div para representar cada pedido
                const pedidoDiv = document.createElement("div");
                pedidoDiv.classList.add("pedido");

                // Div para la información del cliente
                const clienteDiv = document.createElement("div");
                clienteDiv.classList.add("cliente");
                clienteDiv.innerHTML = `
                    <strong>Cliente:</strong> ${pedido.cliente.nombre} ${pedido.cliente.apellidos}<br>
                    <strong>Teléfono:</strong> ${pedido.cliente.telefono}<br>
                    <strong>Correo:</strong> ${pedido.cliente.correo}<br>
                    <strong>Dirección:</strong> ${pedido.cliente.direccion.calle}, ${pedido.cliente.direccion.ciudad}, ${pedido.cliente.direccion.codigo_postal}, ${pedido.cliente.direccion.provincia}
                `;
                pedidoDiv.appendChild(clienteDiv); // Añadimos la información del cliente al pedido

                // Div para los productos del pedido
                const productosDiv = document.createElement("div");
                productosDiv.classList.add("productos");
                productosDiv.innerHTML = "<strong>Productos:</strong>";

                let totalFactura = 0; // Variable para almacenar el total calculado

                // Iteramos sobre los productos del pedido
                pedido.productos.forEach(producto => {
                    // Calculamos el subtotal del producto (precio * unidades)
                    let subtotal = producto.precio * producto.unidades;
                    totalFactura += subtotal; // Sumamos el subtotal al total de la factura

                    // Creamos un div para cada producto
                    const productoDiv = document.createElement("div");
                    productoDiv.classList.add("producto");
                    productoDiv.innerHTML = `
                        ${producto.nombre} (Referencia: ${producto.referencia}) - ${producto.precio.toFixed(2)}€ x ${producto.unidades} unidades = ${subtotal.toFixed(2)}€
                    `;
                    productosDiv.appendChild(productoDiv); // Añadimos el producto al div de productos
                });
                pedidoDiv.appendChild(productosDiv); // Añadimos los productos al div del pedido

                // Div para mostrar el total de la factura calculado
                const totalDiv = document.createElement("div");
                totalDiv.innerHTML = `<strong>Total Factura:</strong> ${totalFactura.toFixed(2)}€`;
                pedidoDiv.appendChild(totalDiv); // Añadimos el total al div del pedido

                // Finalmente, añadimos el pedido al contenedor general
                container.appendChild(pedidoDiv);
            });
        });
    });
}
