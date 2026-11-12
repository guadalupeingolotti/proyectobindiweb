window.addEventListener('load', iniciar);

function iniciar() {
    iniciarMenu();
    iniciarFormulario();
    iniciarCatalogo();
}


/*/ menu hamburguesa /*/
function iniciarMenu() {
    let btnMenu = document.getElementById('btn-menu');
    let menu = document.querySelector('.nav');

    if (!btnMenu || !menu) {
        return;
    }

    // callbak: user click button
    btnMenu.addEventListener('click', function () {
        toggleMenu(btnMenu, menu)
    });

}

function toggleMenu(btnMenu, menu) {
    let abierto = menu.classList.toggle('activo');
    btnMenu.setAttribute('aria-expanded', abierto);
    btnMenu.setAttribute('aria-label', abierto ? 'Cerrar menú' : 'Abrir menú');
    btnMenu.textContent = abierto ? '✖' : '☰';
};

/*/ validar formulario /*/

function iniciarFormulario() {
    let form = document.querySelector('.form-contacto');
    if (!form) {
        return;
    }

    let campos = form.querySelectorAll('input');

    for (let i = 0; i < campos.length; i++) {
        campos[i].addEventListener('input', validarCampo);
    }
    
    form.addEventListener('submit', enviarFormulario);
}

// F auxiliar para validar un campo individual 
function aplicarValidacion(campo) {
    campo.classList.remove('campo-error', 'campo-ok');

    if (!campo.checkValidity()) {
        campo.classList.add('campo-error');
        return false;
    } else {
        campo.classList.add('campo-ok');
        return true;
    }
}

function validarCampo(event) {
    aplicarValidacion(event.target);
}

function enviarFormulario(event) {
    event.preventDefault();

    let form = event.target;
    let campos = form.querySelectorAll('input');
    let mensaje = form.querySelector('.mensaje');
    let firstError = null;

    for (let i = 0; i < campos.length; i++) {
        let esValido = aplicarValidacion(campos[i]);
        
        if (!esValido && firstError === null) {
            firstError = campos[i];
        }
    }

    if (firstError !== null) {
        if (mensaje) {
            mensaje.textContent = 'Por favor, revise los campos en rojo.';
            mensaje.className = 'mensaje mensaje-error';
        }
        firstError.focus();
        return;
    }

    if (mensaje) {
        mensaje.textContent = 'Formulario enviado correctamente.';
        mensaje.className = 'mensaje mensaje-ok';
    }
    
    form.reset();

    for (let j = 0; j < campos.length; j++) {
        campos[j].classList.remove('campo-error', 'campo-ok');
    }
}

/*/ catalogo productos /*/
let productos = [
    { nombre: 'Sérum hidratante', descripcion: 'Ácido hialurónico para piel seca, uso diario mañana y noche.', precio: 8500, fondo: 'fondo-1' },
    { nombre: 'Crema facial nutritiva', descripcion: 'Textura rica con manteca de karité, ideal para pieles secas y sensibles.', precio: 9200, fondo: 'fondo-2' },
    { nombre: 'Limpiador facial suave', descripcion: 'Gel de limpieza sin sulfatos, apto para todo tipo de piel.', precio: 6800, fondo: 'fondo-3' },
    { nombre: 'Protector solar FPS 50', descripcion: 'Fórmula liviana de rápida absorción, sin efecto blanco.', precio: 10500, fondo: 'fondo-4' },
    { nombre: 'Contorno de ojos', descripcion: 'Reduce ojeras y líneas de expresión con uso constante.', precio: 7900, fondo: 'fondo-1' },
    { nombre: 'Exfoliante corporal', descripcion: 'Sales marinas y coco, deja la piel suave e hidratada.', precio: 7200, fondo: 'fondo-2' }
];

function iniciarCatalogo() {
    let contenedor = document.getElementById('lista-productos');
    let buscador = document.getElementById('buscador');

    if (!contenedor || !buscador) {
        return;
    }

    mostrarProductos(productos);
 
    buscador.addEventListener('input', filtrarProductos);
 
    contenedor.addEventListener('click', evitarSalto);
}
 
function normalizar(texto) {
    return texto.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
}
 
function filtrarProductos(evento) {
    let busqueda = normalizar(evento.target.value.trim());
    let coincidencias = [];
    for (let i = 0; i < productos.length; i++) {
        let texto = normalizar(productos[i].nombre + ' ' + productos[i].descripcion);
 
        if (texto.indexOf(busqueda) !== -1) {
            coincidencias.push(productos[i]);
        }
    }
 
    mostrarProductos(coincidencias);
}

function mostrarProductos(lista) {
    let contenedor = document.getElementById('lista-productos');
    let estado = document.getElementById('resultado-busqueda');
    let html = '';
 
    for (let i = 0; i < lista.length; i++) {
        html += crearTarjeta(lista[i]);
    }
 
    contenedor.innerHTML = html;
 
    if (lista.length === 0) {
        estado.textContent = 'No encontramos productos que coincidan con tu búsqueda.';
    } else {
        estado.textContent = 'Mostrando ' + lista.length + ' de ' + productos.length + ' productos.';
    }
}

function crearTarjeta(producto) {
    return '' +
        '<article class="servicios-card">' +
            '<div class="foto-equipo ' + producto.fondo + '"></div>' +
            '<div class="card-contenido">' +
                '<h3>' + producto.nombre + '</h3>' +
                '<p>' + producto.descripcion + '</p>' +
                '<div class="precio-carrito">' +
                    '<span class="precio">$' + producto.precio.toLocaleString('es-AR') + '</span>' +
                    '<a href="#" class="btn-reserva">Agregar</a>' +
                '</div>' +
            '</div>' +
        '</article>';
}
 
function evitarSalto(evento) {
    if (evento.target.classList.contains('btn-reserva')) {
        evento.preventDefault();
    }
}