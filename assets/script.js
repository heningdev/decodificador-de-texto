// Codificador / Decodificador de textos

//Váriaveis
const input = document.getElementById('text-input');
const output = document.getElementById('text-output');
const encryptButton = document.getElementById('encrypt-btn');
const decryptButton = document.getElementById('decrypt-btn');
const noMsgFound = document.getElementById('no-msg-found');
const modal = document.getElementById('modal');
const modalText = document.getElementById('modal-text');

encryptButton.addEventListener('click', encryptText);
decryptButton.addEventListener('click', decryptText);

//Funções  para criptografia e descriptografia
function encryptText() {
    let text = input.innerText.toLowerCase();
    let result;

    if (!text) {
        modalText.textContent = 'Nenhum conteúdo para codificar';
        showOrHideModal();
        return;
    }

    result = text.replace(/[aeiou]/g, match => replacements[match]);

    showOutputText(result);
}

function decryptText() {
    let text = input.innerText.toLowerCase();
    let result;
    
    if (!text) {
        modalText.textContent = 'Nenhum conteúdo para decodificar';
        showOrHideModal();
        return;
    }
    
    result = text.replace(/enter/g, 'e')
                  .replace(/imes/g, 'i')
                  .replace(/ai/g, 'a')
                  .replace(/ober/g, 'o')
                  .replace(/ufat/g, 'u');

    showOutputText(result);
}

const replacements = {
    'a': 'ai',
    'e': 'enter',
    'i': 'imes',
    'o': 'ober',
    'u': 'ufat',
};

const reverseReplacements = Object.fromEntries(
    Object.entries(replacements).map(([key, value]) => [value, key])
);

//Função que exibe o texto de  saída
function showOutputText(result) {
    noMsgFound.style.display = 'none';
    output.innerText = result;
    createCopyButton();
}

//Função do botão: Copiar o texto de saída
function createCopyButton() {
    const outputContainer = document.querySelector('.text-output-container');
    let hasCopyButton = outputContainer.contains(outputContainer.querySelector('button'));
    
    if (!hasCopyButton) {
        const copyButton = document.createElement('button');
        copyButton.innerHTML = 'Copiar';
        outputContainer.appendChild(copyButton);
        copyButton.classList.add('light-btn');
        copyButton.setAttribute('onclick', 'copyToClipboard()');
    }
}

//Função de alerta: Texto foi copiado
async function copyToClipboard() {
    await navigator.clipboard.writeText(output.innerText);
    modalText.textContent = 'Texto copiado para a área de transferência.';
    showOrHideModal();
}

//Função com temporizador da mensagem de alerta
const modalDisplayTime = 2000;
function showOrHideModal() {
    modal.classList.toggle('hidden');

    if (!modal.classList.contains('hidden')) {
        setTimeout(() => {
            modal.classList.add('hidden');
        }, modalDisplayTime);
    }
}