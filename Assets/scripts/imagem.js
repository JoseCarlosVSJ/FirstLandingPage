document.addEventListener("DOMContentLoaded", function() {
    mudarConteudo('SobrePrintOpenCard.html');
});

function mudarConteudo(url) {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4 && xhr.status === 200) {
            document.getElementById('conteudo').innerHTML = xhr.responseText;
        }
    };
    xhr.send();
}
