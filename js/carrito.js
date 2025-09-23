let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

function guardarCarrito() {
    localStorage.setItem("carrito", JSON.stringify(carrito));
}

function agregarAlCarrito(id) {
    if (!Array.isArray(productos)) {
        console.error("La variable 'productos' no es un arreglo o no ha sido inicializada.");
        Swal.fire({
            title: 'Error',
            text: 'Los productos aún no se han cargado.',
            icon: 'error',
            timer: 2000,
            showConfirmButton: false,
        });
        return;
    }

    const producto = productos.find(p => p.id === id);

    if (!producto) {
        Swal.fire({
            title: 'Error',
            text: `Producto con ID ${id} no encontrado.`,
            icon: 'error',
            timer: 2000,
            showConfirmButton: false,
        });
        return;
    }

    carrito.push(producto);
    guardarCarrito();
    actualizarCarrito();

    Swal.fire({
        title: 'Agregado',
        text: `${producto.nombre} se agregó al carrito.`,
        icon: 'success',
        timer: 1500,
        showConfirmButton: false,
    });
}

function actualizarCarrito() {
    const listaCarrito = document.getElementById("listaCarrito");
    const totalTexto = document.getElementById("total");

    listaCarrito.innerHTML = "";

    let total = 0;
    carrito.forEach((item, index) => {
        total += item.precio;
        const li = document.createElement("li");
        li.textContent = `${item.nombre} - $${item.precio}`;

        const btnEliminar = document.createElement("button");
        btnEliminar.textContent = "X";
        btnEliminar.onclick = () => eliminarDelCarrito(index);

        li.appendChild(btnEliminar);
        listaCarrito.appendChild(li);
    });

    totalTexto.textContent = `Total: $${total}`;
}

function eliminarDelCarrito(index) {
    Swal.fire({
        title: '¿Eliminar este producto?',
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: 'Eliminar',
        cancelButtonText: 'Cancelar',
    }).then((result) => {
        if (result.isConfirmed) {
            carrito.splice(index, 1);
            guardarCarrito();
            actualizarCarrito();
            Swal.fire('Producto eliminado', '', 'success');
        }
    });
}

function vaciarCarrito() {
    Swal.fire({
        title: '¿Estás seguro?',
        text: 'Se eliminarán todos los productos del carrito.',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Sí, vaciar',
        cancelButtonText: 'Cancelar',
    }).then((result) => {
        if (result.isConfirmed) {
            carrito = [];
            guardarCarrito();
            actualizarCarrito();
            Swal.fire('Carrito vaciado', '', 'success');
        }
    });
}

// Mostrar carrito al cargar
actualizarCarrito();

// Mostrar/ocultar sección del carrito
document.getElementById("verCarrito").addEventListener("click", () => {
    document.getElementById("carrito").classList.toggle("oculto");
});

document.getElementById("vaciarCarrito").addEventListener("click", vaciarCarrito);
