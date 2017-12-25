var campo = new Campo({ x: 10, y: 18 });
var info = new Info({});

var game = new Game({
	campo: campo,
	info: info,
	velocidade: 400
});

var pecaAtual = new Peca({});

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
				pecaAtual = new Peca({});

				// Pontua (ou não) sempre que tiver linhas cheias no campo
				game.pontuar();

			}
		}

		pecaAtual.desce(game.getCampo());

	}, game.getVelocidade());

	// Verifica se alguma tecla foi pressionada
	$("body").keydown(function(e) {

	  	// up
	  	if(e.keyCode == 38) {	
	  		pecaAtual.rotaciona();
	  	}

	  	// baixo
	  	else if(e.keyCode == 40) {
	  		if(!game.colidiuY(pecaAtual) && !game.getCampo().fimY(pecaAtual)) {
		  		pecaAtual.desce(game.getCampo());
	  		}
  		}

		// left
	  	if(e.keyCode == 37 && !game.getCampo().fimEsquerda(pecaAtual)) {
			if(!game.colidiuEsquerda(pecaAtual)) {
				pecaAtual.praEsquerda(game.getCampo());
			} else {
				// Fazer barulho/feedback visual indicando que não é possível
			}
	  	}	  	

	  	// right
	  	else if(e.keyCode == 39 && !game.getCampo().fimDireita(pecaAtual)) {
			if(!game.colidiuDireita(pecaAtual)) {
				pecaAtual.praDireita(game.getCampo());
			} else {
				// Fazer barulho/feedback visual indicando que não é possível
			}
	  	}
	});
});