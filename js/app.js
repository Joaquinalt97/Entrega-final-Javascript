document.addEventListener("DOMContentLoaded", () => {
    const contenedor = document.getElementById("productos");
    const carritoSeccion = document.getElementById("carrito");
    const btnVerCarrito = document.getElementById("verCarrito");
    const btnVaciar = document.getElementById("vaciarCarrito");

    fetch('../data/productos.json')
        .then(response => response.json())
        .then(productos => {

            productos.forEach(prod => {
                const card = document.createElement("div");
                card.classList.add("card");
                card.innerHTML = `
                    <img src="${prod.img}" alt="${prod.nombre}">
                    <h3>${prod.nombre}</h3>
                    <p>$${prod.precio}</p>
                    <button onclick="agregarAlCarrito(${prod.id})">Agregar al carrito</button>
                `;
                contenedor.appendChild(card);
            });
        });

    btnVerCarrito.addEventListener("click", () => {
        carritoSeccion.classList.toggle("oculto");
    });

    btnVaciar.addEventListener("click", vaciarCarrito);


    actualizarCarrito();
});
