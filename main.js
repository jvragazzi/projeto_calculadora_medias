    const form = document.getElementById('form-contato');
    let linhas = '';
    const contatos = {};
    const telefones = new Set();

    form.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const inputNomeContato = document.getElementById('nome-contato');
    const inputTelContato = document.getElementById('tel-contato');

    const nome = inputNomeContato.value.trim();
    const telefone = inputTelContato.value.trim();

    if (nome === '' || telefone === '') {
        alert('Por favor, preencha todos os campos obrigatórios');
        return;
    }

    if (nome in contatos) {
        alert(`O nome ${nome} já consta na sua agenda de contatos`);
        return;
    }

    if (telefone.length !== 11) {
        alert('O telefone deve conter 11 dígitos - (DDD) 9XXXX-XXXX');
        return;
    }

    if (telefones.has(telefone)) {
        alert(`O telefone ${telefone} já consta na sua agenda de contatos`);
        return;
    }

    contatos[nome] = telefone;
    telefones.add(telefone);

    const telefoneFormatado = formatarTelefone(telefone);

    let linha = '<tr>';
    linha += `<td>${nome}</td>`;
    linha += `<td>${telefoneFormatado}</td>`;
    linha += '</tr>';

    linhas += linha;

    inputNomeContato.value = '';
    inputTelContato.value = '';

    atualizaTabela();
    });

    function atualizaTabela() {
    const corpoTabela = document.querySelector('tbody');
    corpoTabela.innerHTML = linhas;
    }

    function formatarTelefone(numero) {
    const regex = /^(\d{2})(\d{5})(\d{4})$/;
    const telefoneFormatado = numero.replace(regex, "($1) $2-$3");
    return telefoneFormatado;
    }
