var campo = new Campo({ x: 10, y: 18 });
var info = new Info({});

var game = new Game({
    campo: campo,
    info: info,
    velocidade: 400000
});

var pecaAtual = new Peca({});
var arrayProximas = [
    new Peca({}),
    new Peca({}),
    new Peca({})
];

$(document).ready(function() {

    game.getCampo().gerar();

    $('#pontuacao').text(info.getPontuacao());
    
    // Loop principal
    setInterval(function() {
        
        if(game.colidiuY(pecaAtual) || game.getCampo().fimY(pecaAtual)) {
            
            // Game Over
            if(pecaAtual.getY() <= 0) {

                info = new Info({});
                game = new Game({
                    campo: campo,
                    info: info,
                    velocidade: 400
                });
                
                pecaAtual = new Peca({});
                game.getCampo().gerar();
            } else {

                game.mataPeca(pecaAtual);

                pecaAtual = arrayProximas.pop();
                arrayProximas.unshift(new Peca({}));

                // Pontua (ou não) sempre que tiver linhas cheias no campo
                game.pontuar();
            }
        }

        pecaAtual.desce(game.getCampo());

    }, game.getVelocidade());

    // Verifica se alguma tecla foi pressionada
    $("body").keydown(function(e) {
        var action;
        
             if(e.keyCode == 38) {  action = 'up';      } 
        else if(e.keyCode == 40) {  action = 'down';    } 
        else if(e.keyCode == 37) {  action = 'left';    } 
        else if(e.keyCode == 39) {  action = 'right';   }

        handleAction(action);
    });

    $('#up, #down, #left, #right, #action').on('click', function(e) {
        e.preventDefault();
        var action = $(this).attr('id');
        handleAction(action);
    });

    function handleAction(action) {

        if(action == 'up' || action == 'action') {  
            pecaAtual.rotaciona();
        }

        else if(action == 'down') {
            if(!game.colidiuY(pecaAtual) && !game.getCampo().fimY(pecaAtual)) {
                pecaAtual.desce(game.getCampo());
            }
        }
        
        if(action == 'left' && !game.getCampo().fimEsquerda(pecaAtual)) {
            if(!game.colidiuEsquerda(pecaAtual)) {
                pecaAtual.praEsquerda(game.getCampo());
            } else {
                // Fazer barulho/feedback visual indicando que não é possível
            }
        }
        
        else if(action == 'right' && !game.getCampo().fimDireita(pecaAtual)) {
            if(!game.colidiuDireita(pecaAtual)) {
                pecaAtual.praDireita(game.getCampo());
            } else {
                // Fazer barulho/feedback visual indicando que não é possível
            }
        }
    };
});