// Se realiza la carga del archivo JSON usando el método fetch() 
fetch("tienda.json")
    // Verificamos si la respuesta es exitosa
    .then(response => {
        // Si la respuesta no es correcta (response.ok es falso), lanzamos un error
        if (!response.ok) {
            throw new Error("Error al cargar el archivo JSON");
        }
        // Si la respuesta es exitosa, convertimos los datos a formato JSON
        return response.json();
    })
    // Si el JSON se cargó correctamente, pasamos los datos a la función mostrarPedidos
    .then(data => mostrarPedidos(data))

// Función principal para mostrar los pedidos en la página
function mostrarPedidos(data) {
    // Seleccionamos el contenedor HTML donde se mostrarán los pedidos
    const container = document.getElementById("pedidos-container");

    // Iteramos sobre las claves del objeto `data`, que corresponden a los años (2023, 2024)
    Object.keys(data).forEach(year => {
        // Obtenemos los datos de cada año (por ejemplo, 2023 o 2024)
        const yearData = data[year];

        // Iteramos sobre las claves dentro de cada año, que son los trimestres (por ejemplo, T1, T2)
        Object.keys(yearData).forEach(trimestre => {
            // Obtenemos los pedidos para cada trimestre
            const pedidos = yearData[trimestre];

            // Creamos un título para el año y trimestre (por ejemplo, "2023 - T1")
            const yearTitle = document.createElement("h2");
            yearTitle.textContent = `${year} - ${trimestre.replace("_", " ")}`;
            container.appendChild(yearTitle); // Añadimos el título al contenedor

            // Iteramos sobre cada pedido de ese trimestre
            pedidos.forEach(pedido => {
                // Creamos un div para representar cada pedido
                const pedidoDiv = document.createElement("div");
                pedidoDiv.classList.add("pedido"); // Añadimos una clase "pedido" para aplicar estilos

                // Creamos un div para mostrar la información del cliente
                const clienteDiv = document.createElement("div");
                clienteDiv.classList.add("cliente"); // Añadimos una clase "cliente" para aplicar estilos

                // Mostramos los detalles del cliente: nombre, apellidos, teléfono, correo y dirección
                clienteDiv.innerHTML = `
                    <strong>Cliente:</strong> ${pedido.cliente.nombre} ${pedido.cliente.apellidos}<br>
                    <strong>Teléfono:</strong> ${pedido.cliente.telefono}<br>
                    <strong>Correo:</strong> ${pedido.cliente.correo}<br>
                    <strong>Dirección:</strong> ${pedido.cliente.direccion.calle}, ${pedido.cliente.direccion.ciudad}, ${pedido.cliente.direccion.codigo_postal}, ${pedido.cliente.direccion.provincia}
                `;
                pedidoDiv.appendChild(clienteDiv); // Añadimos la información del cliente al div del pedido

                // Creamos un div para mostrar los productos del pedido
                const productosDiv = document.createElement("div");
                productosDiv.classList.add("productos"); // Añadimos una clase "productos" para aplicar estilos
                productosDiv.innerHTML = "<strong>Productos:</strong>"; // Añadimos un título para los productos

                // Iteramos sobre los productos del pedido y los mostramos
                pedido.productos.forEach(producto => {
                    // Creamos un div para cada producto
                    const productoDiv = document.createElement("div");
                    productoDiv.classList.add("producto"); // Añadimos una clase "producto" para aplicar estilos
                    productoDiv.innerHTML = `${producto.nombre} (Referencia: ${producto.referencia}) - ${producto.precio}€ x ${producto.unidades} unidades`;
                    productosDiv.appendChild(productoDiv); // Añadimos el producto al div de productos
                });
                pedidoDiv.appendChild(productosDiv); // Añadimos el div de productos al div del pedido

                // Mostramos el total de la factura
                const totalDiv = document.createElement("div");
                totalDiv.innerHTML = `<strong>Total Factura:</strong> ${pedido.total_factura}€`;
                pedidoDiv.appendChild(totalDiv); // Añadimos el total al div del pedido

                // Finalmente, añadimos el div del pedido al contenedor general
                container.appendChild(pedidoDiv);
            });
        });
    });
}