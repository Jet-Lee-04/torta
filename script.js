// Datos de ejemplo
const productos = [
    { id: 1, nombre: "Pastel de Calabaza", precio: 25 },
    { id: 2, nombre: "Galletas de Murciélago", precio: 10 },
    { id: 3, nombre: "Cupcakes de Telaraña", precio: 15 }
];

const ofertas = [
    { id: 1, nombre: "Combo Fantasma", precio: 30, descuento: 0.2 },
    { id: 2, nombre: "Pack Bruja", precio: 40, descuento: 0.15 }
];

// Carrito de compras
let carritoProductos = [];
let carritoOfertas = [];

// Funciones auxiliares
function mostrarPopup(id) {
    document.getElementById(id).style.display = 'block';
}

function cerrarPopup(id) {
    document.getElementById(id).style.display = 'none';
}

function actualizarCarrito(carrito, containerId) {
    const container = document.getElementById(containerId);
    container.innerHTML = '';
    let total = 0;
    carrito.forEach(item => {
        const itemElement = document.createElement('div');
        itemElement.textContent = `${item.nombre} - $${item.precio}`;
        container.appendChild(itemElement);
        total += item.precio;
    });
    const totalElement = document.createElement('div');
    totalElement.textContent = `Total: $${total}`;
    container.appendChild(totalElement);
}

// Event Listeners
document.getElementById('btnProductos').addEventListener('click', () => {
    mostrarPopup('productosPopup');
    const listaProductos = document.getElementById('listaProductos');
    listaProductos.innerHTML = '';
    productos.forEach(producto => {
        const productoElement = document.createElement('div');
        productoElement.innerHTML = `
            ${producto.nombre} - $${producto.precio}
            <button onclick="agregarAlCarrito(${producto.id}, 'productos')">Agregar al carrito</button>
        `;
        listaProductos.appendChild(productoElement);
    });
});

document.getElementById('btnOfertas').addEventListener('click', () => {
    mostrarPopup('ofertasPopup');
    const listaOfertas = document.getElementById('listaOfertas');
    listaOfertas.innerHTML = '';
    ofertas.forEach(oferta => {
        const ofertaElement = document.createElement('div');
        const precioConDescuento = oferta.precio * (1 - oferta.descuento);
        ofertaElement.innerHTML = `
            ${oferta.nombre} - $${precioConDescuento.toFixed(2)} <span style="text-decoration: line-through;">$${oferta.precio}</span>
            <span style="color: red;">${oferta.descuento * 100}% de descuento</span>
            <button onclick="agregarAlCarrito(${oferta.id}, 'ofertas')">Agregar al carrito</button>
        `;
        listaOfertas.appendChild(ofertaElement);
    });
});

document.getElementById('btnReservas').addEventListener('click', () => {
    mostrarPopup('reservasPopup');
});

// Agregar al carrito
function agregarAlCarrito(id, tipo) {
    let item;
    if (tipo === 'productos') {
        item = productos.find(p => p.id === id);
        carritoProductos.push(item);
        actualizarCarrito(carritoProductos, 'carritoProductos');
    } else if (tipo === 'ofertas') {
        item = ofertas.find(o => o.id === id);
        carritoOfertas.push(item);
        actualizarCarrito(carritoOfertas, 'carritoOfertas');
    }
}

// Reservas
document.querySelectorAll('.mesa').forEach(mesa => {
    mesa.addEventListener('click', () => {
        cerrarPopup('reservasPopup');
        mostrarPopup('reservaForm');
    });
});

document.getElementById('formReserva').addEventListener('submit', (e) => {
    e.preventDefault();
    const fecha = document.getElementById('fechaReserva').value;
    const hora = document.getElementById('horaReserva').value;
    const mensaje = `Hola, me gustaría hacer una reserva para el día ${fecha} a las ${hora}`;
    window.location.href = `https://wa.me/1234567890?text=${encodeURIComponent(mensaje)}`;
});

// Cerrar popups
document.querySelectorAll('.cerrar').forEach(button => {
    button.addEventListener('click', () => {
        const popup = button.closest('.popup');
        cerrarPopup(popup.id);
    });
});


// Función para enviar mensaje de WhatsApp con el carrito
function enviarCarritoWhatsApp(carrito, tipo) {
    let mensaje = `Hola, me gustaría hacer un pedido de ${tipo}:\n\n`;
    let total = 0;
    
    carrito.forEach(item => {
        mensaje += `${item.nombre} - $${item.precio}\n`;
        total += item.precio;
    });
    
    mensaje += `\nTotal: $${total}`;
    
    const numeroWhatsApp = "1234567890"; // Reemplaza con tu número de WhatsApp
    const urlWhatsApp = `https://wa.me/${numeroWhatsApp}?text=${encodeURIComponent(mensaje)}`;
    
    window.open(urlWhatsApp, '_blank');
}

// Event listeners para los botones de compra
document.getElementById('comprarProductos').addEventListener('click', () => {
    enviarCarritoWhatsApp(carritoProductos, 'productos');
});

document.getElementById('comprarOfertas').addEventListener('click', () => {
    enviarCarritoWhatsApp(carritoOfertas, 'ofertas');
});

// Cerrar popups con la X
document.querySelectorAll('.cerrar').forEach(closeButton => {
    closeButton.addEventListener('click', () => {
        const popup = closeButton.closest('.popup');
        cerrarPopup(popup.id);
    });
});