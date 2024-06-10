function abrirContato(){
    window.location.href = 'sobre.html';
}

function confirmacaoEnvio() {
    let nome = document.getElementById('nome').value;
    if (nome.length < 2) {
        alert('Nome inválido');
        return false;
    }
    let email = document.getElementById('email').value;
    if (email.indexOf('@') === -1 || email.indexOf('.') === -1) {
        alert('E-mail inválido');
        return false; 
    }
    alert('Enviado com sucesso! Em breve a nossa equipe entrará em contato.');
    return true;
}