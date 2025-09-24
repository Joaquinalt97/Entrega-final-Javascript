let productos = [];

fetch('/data')
    .then(res => res.json())
    .then(data => {
        productos = data;
        mostrarProductos();
    })
    .catch(error => {
        console.error("Error al cargar productos:", error);
    });

function mostrarProductos() {
    const contenedor = document.getElementById("productos");

    productos.forEach(producto => {
        const div = document.createElement("div");
        div.classList.add("producto");

        div.innerHTML = `
        <img src="${producto.img}" alt="${producto.nombre}" width="150">
        <h3>${producto.nombre}</h3>
        <p>Precio: $${producto.precio}</p>
        <button onclick="agregarAlCarrito(${producto.id})">Agregar al carrito</button>
    `;

        contenedor.appendChild(div);
    });
}
