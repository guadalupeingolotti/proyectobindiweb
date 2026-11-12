window.addEventListener('load', iniciar);

function iniciar() {
    iniciarMenu();
    iniciarFormulario();
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
        toggleMenu(btnMenu, menu);
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