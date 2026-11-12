const input = document.getElementById('campoPalavra');
const btn = document.getElementById('btnMostrar');
const saida = document.getElementById('resultado');

const textoSubstituir = document.getElementById('textoSubstituir');
const novoTexto = document.getElementById('novoTexto');

btn.addEventListener('click', () => {
    const texto = (input.value || '').trim();
    const procurar = textoSubstituir.value;
    const substituirPor = novoTexto.value;

    const textoUpper = texto.toUpperCase();

    const finalText = procurar
        ? textoUpper.split(procurar).join(substituirPor)
        : textoUpper;

    saida.textContent = finalText.length ? finalText : '(vazio)';
});