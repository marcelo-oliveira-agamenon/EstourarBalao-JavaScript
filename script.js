var timeId = null; // variável timeout do tempo

function iniciaJogo() {
    
    var url = window.location.search; //recuperando o nível do jogo
    var nivel_jogo = url.replace("?" , " "); //removendo o ? do url
    var tempo_segundo = 0;
    //Lógica para definir o tempo de jogo
    if (nivel_jogo == 1) {
        tempo_segundo = 120;
    } else if (nivel_jogo == 2) {
        tempo_segundo = 60;
    } else if (nivel_jogo == 3) {
        tempo_segundo = 30;
    }
    
    document.getElementById('tempoSegundo').innerHTML = tempo_segundo; // passando o tempo de jogo para span

    var qtd_baloes = 80;
    //imprime e exibe a quantidade de balões
    document.getElementById('baloes_inteiros').innerHTML = qtd_baloes;
    document.getElementById('baloes_estourados').innerHTML = 0;

    criaBaloes(qtd_baloes);

    contagemTempo(tempo_segundo + 1);
}

function contagemTempo(segundo) {
    //decrementa a variável para imitar cronômetro
    segundo--;

    if (segundo == -1) {
        clearTimeout(timeId); // para a execução do timeOut
        gameOver(); // acaba o jogo
        return false;
    }

    document.getElementById('tempoSegundo').innerHTML = segundo;

    timeId = setTimeout("contagemTempo("+segundo+")", 1000);
}

function gameOver() {
    removeEventoBalao();
    alert("Fim de jogo!! Você não conseguiu estourar os balões a tempo!!");
}

function criaBaloes(qtd_baloes) {
    //laço para gerar balões dentro da div
    for (var i = 1; i <= qtd_baloes; i++) {
        
        var balao = document.createElement("img");
        balao.src = 'imagens/balao_azul_pequeno.png';
        balao.style.margin = '10px';
        balao.onclick = function() {
            estourar(this);
        }
        balao.id = 'b'+ i;

        document.getElementById('cenario').appendChild(balao);
    }
}

function estourar(balao) {
    var idBalao = balao.id;
    document.getElementById(idBalao).src = 'imagens/balao_azul_pequeno_estourado.png'
    document.getElementById(idBalao).setAttribute("onclick", "");

    pontuacao();
}

function pontuacao() {
    var baloes_inteiros = parseInt(document.getElementById('baloes_inteiros').innerHTML);
    var baloes_estourados = parseInt(document.getElementById('baloes_estourados').innerHTML);

    baloes_estourados++;
    baloes_inteiros--;

    document.getElementById('baloes_inteiros').innerHTML = baloes_inteiros;
    document.getElementById('baloes_estourados').innerHTML = baloes_estourados;

    situacaoJogo(baloes_inteiros);
}

function situacaoJogo(baloes_inteiros) {
    if (baloes_inteiros == -1) {
        alert('Parabéns!! Você conseguiu estourar todos os balões!!');
        pararJogo();
    }
}

function pararJogo() {
    clearTimeout(timeId);
}

function removeEventoBalao() {
    var i = 1; // recuperar o id dos baloes

    while (document.getElementById('b' + i)) {
        document.getElementById('b' + i).onclick = ''; // remover evento do balão
        i++;
    }
}