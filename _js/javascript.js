// 🎯 SISTEMA DE VALIDACIÓN AVANZADA //
const formulario = document.getElementById('formularioAvanzado');
const campos = formulario.querySelectorAll('input, textarea, select');
const btnEnviar = document.getElementById('btnEnviar');
// Estado de validación de cada campo
let estadoValidacion = {};
// Inicializar estado de todos los campos
campos.forEach((campo) => {
estadoValidacion[campo.name] = false;
});
// 🎯 VALIDACIONES ESPECÍFICAS POR CAMPO
// Validación del nombre
document
.getElementById('nombres')
.addEventListener('input', function () {
const valor = this.value.trim();
const nombres = valor
.split(' ')
.filter((nombre) => nombre.length > 0);
if (valor.length < 3) {
mostrarError(
'errorNombre',
'El nombre debe tener al menos 3 caracteres'
);
marcarCampo(this, false);
} else if (nombres.length < 1) {
mostrarError('errorNombre', 'Ingresa al menos 1 nombres');
marcarCampo(this, false);
} else {
mostrarExito('exitoNombre', '✓ Nombre válido');
marcarCampo(this, true);
}
});
document
.getElementById('apellidos')
.addEventListener('input', function () {
const valor = this.value.trim();
const apellidos = valor
.split(' ')
.filter((apellido) => apellido.length > 0);
if (valor.length < 3) {
mostrarError(
'errorApellidos',
'El apellido debe tener al menos 3 caracteres'
);
marcarCampo(this, false);
} else if (apellidos.length < 1) {
mostrarError('errorApellidos', 'Ingresa al menos 1 apellido');
marcarCampo(this, false);
} else {
mostrarExito('exitoApellidos', '✓ Apellido válido');
marcarCampo(this, true);
}
});
// Validación del email
document.getElementById('correo').addEventListener('input', function
() {
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
if (!emailRegex.test(this.value)) {
mostrarError('errorCorreo', 'Formato de email inválido');
marcarCampo(this, false);
} else {mostrarExito('exitoCorreo', '✓ Email válido');
marcarCampo(this, true);
}
});
// Validación de contraseña con indicador de fortaleza
document
.getElementById('password')
.addEventListener('input', function () {
const password = this.value;
const fortaleza = calcularFortalezaPassword(password);
actualizarBarraFortaleza(fortaleza);
if (password.length < 8) {
mostrarError(
'errorPassword',
'La contraseña debe tener al menos 8 caracteres'
);
marcarCampo(this, false);
} else if (fortaleza.nivel < 2) {
mostrarError(
'errorPassword',
'Contraseña muy débil. Añade números y símbolos'
);
marcarCampo(this, false);
} else {
mostrarExito('exitoPassword', `✓ Contraseña
${fortaleza.texto}`);
marcarCampo(this, true);
}
// Revalidar confirmación si existe
const confirmar = document.getElementById('confirmarPassword');
if (confirmar.value) {
confirmar.dispatchEvent(new Event('input'));
}
});
// Validación de confirmación de contraseña
document
.getElementById('confirmarPassword')
.addEventListener('input', function () {
const password = document.getElementById('password').value;
if (this.value !== password) {
mostrarError('errorConfirmar', 'Las contraseñas no coinciden'); 
marcarCampo(this, false);
} else if (this.value.length > 0) {
mostrarExito('exitoConfirmar', '✓ Contraseñas coinciden');
marcarCampo(this, true);
}
});
// Validación del teléfono con formato automático
document
  .getElementById('telefono')
  .addEventListener('input', function () {
    // Solo números, máximo 10 dígitos
    let valor = this.value.replace(/\D/g, '').substring(0, 10);

    // Formatear: 300-123-4567
    let formateado = valor;
    if (valor.length > 6) {
      formateado = valor.substring(0, 3) + '-' + valor.substring(3, 6) + '-' + valor.substring(6, 10);
    } else if (valor.length > 3) {
      formateado = valor.substring(0, 3) + '-' + valor.substring(3, 6);
    }
    this.value = formateado;

      // Validar formato final 

      const telefonoRegex = /^\d{3}-\d{3}-\d{4}$/;
      if (this.value.length === 0) {
          ocultarMensaje('errorTelefono');
          ocultarMensaje('exitoTelefono');
          marcarCampo(this, true); 
      } else if (!telefonoRegex.test(this.value)) {
            mostrarError('errorTelefono', 'Formato: 300-123-4567');
            ocultarMensaje('exitoTelefono');
            marcarCampo(this, false);
      } else {
            ocultarMensaje('errorTelefono');
            mostrarExito('exitoTelefono', '✓ Teléfono válido');
            marcarCampo(this, true);
      }
  });
// Validación de fecha de nacimiento
document
.getElementById('fechaNacimiento')
.addEventListener('change', function () {
   if (!this.value) {
      ocultarMensaje('errorFechaNacimiento');
      ocultarMensaje('exitoFechaNacimiento');
      marcarCampo(this, true); // Campo opcional
      return;
   }
      const fechaNacimiento = new Date(this.value);
      const hoy = new Date();
      let edad = hoy.getFullYear() - fechaNacimiento.getFullYear();
      const m = hoy.getMonth() - fechaNacimiento.getMonth();
      if (m < 0 || (m === 0 && hoy.getDate() < fechaNacimiento.getDate())) {
          edad--;
      }
      if (fechaNacimiento > hoy) {
            mostrarError('errorFechaNacimiento', 'La fecha no puede ser futura');
            marcarCampo(this, false);
      } else if (edad < 18) {
            mostrarError('errorFechaNacimiento', 'Debes ser mayor de 18 años');
            marcarCampo(this, false);
      } else if (edad > 100) {
            mostrarError('errorFechaNacimiento', 'Edad no válida, debe ser menor de 100 años');
            marcarCampo(this, false);
      } else {
            ocultarMensaje('errorFechaNacimiento');
            mostrarExito('exitoFechaNacimiento', `✓ Edad: ${edad} años`);
            marcarCampo(this, true);
      }
});
// Contador de caracteres para comentarios
document.getElementById('comentarios').addEventListener('input', function () {
const contador = document.getElementById('contadorComentarios');
contador.textContent = this.value.length;
if (this.value.length > 450) {
contador.style.color = '#dc3545';
mostrarError('errorComentarios', 'Máximo 450 caracteres');
ocultarMensaje('exitoComentarios');
marcarCampo(this, false);
} else if (this.value.length > 400) {
      contador.style.color = '#ffc107';
      ocultarMensaje('errorComentarios', 'Maximo 450 caracteres');
      mostrarExito('exitoComentarios', 'Casi al límite');
      marcarCampo(this, true);
} else {
      contador.style.color = '#666';
      ocultarMensaje('errorComentarios');
      mostrarExito('exitoComentarios', '✓ Comentario válido');
      marcarCampo(this, true);
}

});
// Validación de términos
document
.getElementById('terminos')
.addEventListener('change', function () {
if (!this.checked) {
mostrarError(
'errorTerminos',
'Debes aceptar los términos y condiciones'
);
marcarCampo(this, false);
} else {
ocultarMensaje('errorTerminos');
marcarCampo(this, true);
}
});
// 🎯 FUNCIONES AUXILIARES
function mostrarError(idElemento, mensaje) {
const elemento = document.getElementById(idElemento);
elemento.textContent = mensaje;
elemento.style.display = 'block';
ocultarMensaje(idElemento.replace('error', 'exito'));
}
function mostrarExito(idElemento, mensaje) {
const elemento = document.getElementById(idElemento);
elemento.textContent = mensaje;
elemento.style.display = 'block';
ocultarMensaje(idElemento.replace('exito', 'error'));
}
function ocultarMensaje(idElemento) {
const elemento = document.getElementById(idElemento);
if (elemento) elemento.style.display = 'none';
}
function marcarCampo(campo, esValido) {
estadoValidacion[campo.name] = esValido;
if (esValido) {
      campo.classList.remove('invalido');
campo.classList.add('valido');
} else {
campo.classList.remove('valido');
campo.classList.add('invalido');
}
actualizarProgreso();
actualizarBotonEnvio();
}
function calcularFortalezaPassword(password) {
let puntos = 0;
let feedback = [];
if (password.length >= 8) puntos++;
if (password.length >= 12) puntos++;
if (/[a-z]/.test(password)) puntos++;
if (/[A-Z]/.test(password)) puntos++;
if (/[0-9]/.test(password)) puntos++;
if (/[^A-Za-z0-9]/.test(password)) puntos++;
const niveles = ['muy débil', 'débil', 'media', 'fuerte', 'muy fuerte'];
const nivel = Math.min(Math.floor(puntos / 1.2), 4);
return { nivel, texto: niveles[nivel], puntos };
}
function actualizarBarraFortaleza(fortaleza) {
const barra = document.getElementById('strengthBar');
const clases = [
'strength-weak',
'strength-weak',
'strength-medium',
'strength-strong',
'strength-very-strong',
];
barra.className = 'password-strength ' + clases[fortaleza.nivel];
}
function actualizarProgreso() {
const totalCampos = Object.keys(estadoValidacion).length;
const camposValidos = Object.values(estadoValidacion).filter(
(valido) => valido
).length;
const porcentaje = Math.round((camposValidos / totalCampos) *
100);
document.getElementById('barraProgreso').style.width = porcentaje
+ '%';
document.getElementById('porcentajeProgreso').textContent =
porcentaje + '%';
}
function actualizarBotonEnvio() {
const todosValidos = Object.values(estadoValidacion).every(
(valido) => valido
);
btnEnviar.disabled = !todosValidos;
}
// 🎯 MANEJO DEL ENVÍO DEL FORMULARIO
function mostrarResumenFormulario() {
      const form = document.getElementById('formularioAvanzado');
      const resumen = document.getElementById('contenidoResumen');
      let html = '<ul style="list-style:none; padding: 0;">';


      html += `<li><strong>Nombres:</strong> ${form.nombres.value}</li>`;
      html += `<li><strong>Apellidos:</strong> ${form.apellidos.value}</li>`;
      html += `<li><strong>Email:</strong> ${form.correo.value}</li>`;
      html += `<li><b>Contraseña:</b> (oculta)</li>`;
      html += `<li><strong>Teléfono:</strong> ${form.telefono.value}</li>`;
      html += `<li><strong>Fecha de Nacimiento:</strong> ${form.fechaNacimiento.value}</li>`;
      html += `<li><strong>Comentarios:</strong> ${form.comentarios.value}</li>`;

      html += '</ul>';
      resumen.innerHTML = html;
      document.getElementById('resumenDatos').style.display = 'block';
      form.style.display = 'none';
}

document.getElementById('formularioAvanzado').addEventListener('submit', function (e) {
  e.preventDefault();
  mostrarResumenFormulario();
});