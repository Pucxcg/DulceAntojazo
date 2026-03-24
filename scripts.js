/* ── Utilidad para mostrar resultado ── */
function mostrarResultado(resultadoEl, cantidad, precioUnitario, descuento) {
    const total = cantidad * precioUnitario;
    resultadoEl.innerHTML = `
      <div class="result-card">
        <span class="result-icon">🎉</span>
        <div>
          <p class="r-label">Total para tu pedido</p>
          <p class="r-value">$${total.toLocaleString('es-CO')} pesos</p>
          <p class="r-detail">
            ${cantidad} shot${cantidad > 1 ? 's' : ''} × $${precioUnitario.toLocaleString('es-CO')} c/u
            ${descuento ? ' · <strong style="color:var(--crema)">¡Precio especial!</strong>' : ''}
          </p>
        </div>
      </div>`;
}

function mostrarError(resultadoEl) {
    resultadoEl.innerHTML = `
      <div class="result-error">
        ⚠️ Por favor ingresa una cantidad válida (mínimo 1 shot).
      </div>`;
}

function calcular(inputId, resultadoId, umbral, precioNormal, precioEspecial) {
    const input = document.getElementById(inputId);
    const resultado = document.getElementById(resultadoId);
    const cantidad = parseInt(input.value);

    /* pequeña animación de re-render */
    resultado.style.display = 'none';
    void resultado.offsetWidth;
    resultado.style.display = 'block';

    if (!input.value || isNaN(cantidad) || cantidad < 1) {
        mostrarError(resultado);
        return;
    }

    const descuento = cantidad >= umbral;
    const precioUnitario = descuento ? precioEspecial : precioNormal;
    mostrarResultado(resultado, cantidad, precioUnitario, descuento);
}

/* ── 1 Onz: menos de 30 → $2.000 | 30+ → $1.500 ── */
function calcularShots() { calcular('cantidad1', 'resultado1', 30, 2000, 1500); }
// alias por si acaso
function calcularShot_1onz() { calcularShots(); }

/* ── 2 Onz: menos de 20 → $3.000 | 20+ → $2.500 ── */
function calcularShot_2onz() { calcular('cantidad2', 'resultado2', 20, 3000, 2500); }

/* ── 3 Onz: menos de 20 → $4.500 | 20+ → $4.000 ── */
function calcularShot_3onz() { calcular('cantidad3', 'resultado3', 20, 4500, 4000); }

/* ── Enter en cada input ── */
document.getElementById('cantidad1').addEventListener('keydown', e => { if (e.key === 'Enter') calcularShots(); });
document.getElementById('cantidad2').addEventListener('keydown', e => { if (e.key === 'Enter') calcularShot_2onz(); });
document.getElementById('cantidad3').addEventListener('keydown', e => { if (e.key === 'Enter') calcularShot_3onz(); });