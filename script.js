const input = document.getElementById('campoPalavra');
const btn = document.getElementById('btnMostrar');
const saida = document.getElementById('resultado');
const regras = document.getElementById('regrasSubstituicao');
const btnAdicionarRegra = document.getElementById('btnAdicionarRegra');
const btnCopiar = document.getElementById('btnCopiar');
const statusCopia = document.getElementById('statusCopia');

btnAdicionarRegra.addEventListener('click', () => {
    const regra = document.createElement('div');
    regra.className = 'regra-substituicao';
    regra.innerHTML = `
        <label>
            Substituir:
            <input type="text" class="textoSubstituir" placeholder="Ex.: ,">
        </label>
        <label>
            Por:
            <input type="text" class="novoTexto" placeholder="Ex.: _">
        </label>
        <button type="button" class="btnRemoverRegra">Remover</button>
    `;
    regras.appendChild(regra);
    regra.querySelector('.textoSubstituir').focus();
});

regras.addEventListener('click', (event) => {
    if (event.target.matches('.btnRemoverRegra')) {
        event.target.closest('.regra-substituicao').remove();
    }
});

btn.addEventListener('click', () => {
    let finalText = (input.value || '').trim().toUpperCase();

    regras.querySelectorAll('.regra-substituicao').forEach((regra) => {
        const procurar = regra.querySelector('.textoSubstituir').value;
        const substituirPor = regra.querySelector('.novoTexto').value;

        if (procurar) {
            finalText = finalText.split(procurar.toUpperCase()).join(substituirPor);
        }
    });

    saida.textContent = finalText.length ? finalText : '(vazio)';
});

btnCopiar.addEventListener('click', async () => {
    const texto = saida.textContent === '(vazio)' || saida.textContent === '...'
        ? ''
        : saida.textContent;

    try {
        if (navigator.clipboard && window.isSecureContext) {
            await navigator.clipboard.writeText(texto);
        } else {
            const campoTemporario = document.createElement('textarea');
            campoTemporario.value = texto;
            campoTemporario.setAttribute('readonly', '');
            campoTemporario.style.position = 'fixed';
            campoTemporario.style.opacity = '0';
            document.body.appendChild(campoTemporario);
            campoTemporario.select();
            const copiado = document.execCommand('copy');
            campoTemporario.remove();

            if (!copiado) {
                throw new Error('O navegador não conseguiu copiar o texto.');
            }
        }

        statusCopia.textContent = 'Resultado copiado!';
    } catch (error) {
        statusCopia.textContent = 'Não foi possível copiar o resultado.';
        console.error('Falha ao copiar o resultado:', error);
    }
});
