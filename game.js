// --------------------- Classes ------------------------------

function Game(params) {
	this.campo = params.campo;
	this.velocidade = params.velocidade;
	this.pecasMortas = [];
	
	this.pecaAtual;

	this.mataPeca = function(peca) {
		this.pecasMortas.push(peca);
	};

	this.getPecasMortas = function() {
		return this.pecasMortas;
	};

	this.getCampo = function() {
		return this.campo;
	};

	// ---------- Settings ----------  

	this.getVelocidade = function() {
		return this.velocidade;
	};

	this.mudarTema = function() {

	};

	this.colidiuY = function(peca) {
		// Verifica se há alguma peça morta no lugar em que a peça atual está
		var colididas = this.pecasMortas.filter(function(pecaMorta) {
			
											// Compensa o tamanho 
											// da peça morta com o da atual
			return peca.y >= (pecaMorta.y - peca.matriz.length);
		});

		if(colididas.length == 0) {	
		
			return false;
		
		} else {

			// Verifica se também colidiram os pixels de dentro da matriz
			var colididasPX = colididas.filter(function(item) {

				var colisoresItem = getPxColisores(item);
				var colisoresPecaAtual = getPxColisores(pecaAtual);

				for (var i = 0; i < colisoresItem.length; i++) {
					for (var j = 0; j < colisoresPecaAtual.length; j++) {
						
						/* Verifica se as coordenadas são iguais (adicionando 1 para comparar em relação ao próximo loop)
							[0] e [1] equivalem a X e Y retornados por getPxColisores() */
						if (
							colisoresItem[i][0] == colisoresPecaAtual[j][0] &&
							colisoresItem[i][1] == (colisoresPecaAtual[j][1] + 1) 
						) {
							// DEBUG: Mostra quais dois pixels colidiram primeiro
							// $('#' + colisoresItem[i][1] + '-' + colisoresItem[i][0]).css('background-color', 'orange');
							// $('#' + (colisoresPecaAtual[j][1]) + '-' + colisoresPecaAtual[j][0] ).css('background-color', 'green');
							return true;
						}
					}
				}

				return false;
			});

			return colididasPX.length > 0;
		}
	}

}

function Campo(params) {
	// Dimensões do campo
	this.x = params.x;
	this.y = params.y;

	this.gerar = function() {
		for (var i = 0; i < this.y; i++) {
			var blocos = '';
			for (var j = 0; j < this.x; j++) {
				blocos += '<div class="bloco" id="'+ j +'-'+ i +'">'+  j +'-'+ i +'</div>';
			}
			$('#matriz').append('<div class="linha">'+ blocos +'</div>');
		}
	}

	this.fimY = function(peca) {
		return peca.y >= (this.y - peca.getAltura());
	};

	this.fimEsquerda = function(peca) {
		return peca.x <= 0;
	};

	this.fimDireita = function(peca) {
		return peca.x >= (this.x - peca.getLargura());
	};

	// Ativa/Inativa pixel baseado no Id que é uma string com as coordenadas (ex: #25-19)	
	this.setPixel = function(x, y, flag) {
		if(flag == 1) {
			$('#' + x + '-' + y).addClass('ativo');
		} else {
			$('#' + x + '-' + y).removeClass('ativo');
		}
	};

	/*
	* Printa uma peça na posição X,Y
	* Se a flag for false apaga todos os pixels da peça, sejam eles 0 ou 1
	* Se a flag for true seta pixels de acordo com o array da peça */
	this.printPeca = function(peca, flag) {
		
		for (var i = 0; i < peca.getAltura(); i++) {
			for (var j = 0; j < peca.getLargura(); j++) {
				
				// Evita que a peça atual apague os rastros das outras
				if(peca.getMatrizAtual()[i][j] != 0) {
					var valor = flag ? pecaAtual.getMatrizAtual()[i][j] : 0;
					this.setPixel(peca.getX() + i, peca.getY() + j, valor);
				}
			}
		}
	}
}

function Peca(params) {
	var obj = Pecas.getRandPeca();
	this.grupoPecas = obj.grupoPecas;
	this.rotacao = obj.rotacao;

	this.x = params.x;
	this.y = params.y;
	this.cor = params.cor;

	this.desce = function(campo) {
		campo.printPeca(this, false);
		this.y++;
		campo.printPeca(this, true);
	};

	this.praEsquerda = function() {
		campo.printPeca(this, false);
		this.x--;
		campo.printPeca(this, true);
	};

	this.praDireita = function() {
		campo.printPeca(this, false);
		this.x++;
		campo.printPeca(this, true);
	};	

	this.getMatrizAtual = function() {
		return Pecas.array[this.grupoPecas][this.rotacao];
	};

	this.colidiuY = function() {

	};

	this.colidiuEsquerda = function() {

	};

	this.colidiuDireita = function() {

	};

	this.rotaciona = function() {

	};

	this.getAltura = function() {
		return this.getMatrizAtual().length;
	};

	this.getLargura = function() {
		return this.getMatrizAtual()[0].length;
	};

	this.getX = function() {
		return this.x;
	};

	this.getY = function() {
		return this.y;
	}
}

// ------------------------------------------------------------

var campo = new Campo({ x: 20, y: 30 });

var game = new Game({
	campo: campo,
	velocidade: 300
});

// A primeira peça começa no centro e no topo
var pecaAtual = new Peca({
	x: 8,
	y: -1,
});

$(document).ready(function() {
	game.getCampo().gerar();
	
	// Loop principal
	setInterval(function() {
		
		if(game.colidiuY(pecaAtual) || game.getCampo().fimY(pecaAtual)) {
			game.mataPeca({
				x: pecaAtual.x,
				y: pecaAtual.y,
				matriz: pecaAtual.matriz
			});
			
			// Volta peça atual para o topo
			pecaAtual.y = -1;
			pecaAtual.x = 8;
			
			// Pega uma peça aleatória do repositório e define como a matriz
			pecaAtual.matriz = getRandMatriz();
		}

		pecaAtual.desce(campo);

		// console.log('loop');
	}, game.getVelocidade());

	// Verifica se alguma tecla foi pressionada
	$("body").keydown(function(e) {

	  	// up
	  	if(e.keyCode == 38) {	
			
			// print(pecaAtual.y, pecaAtual.x, false);
			// pecaAtual.matriz = getRandMatriz();
			// print(pecaAtual.y, pecaAtual.x, true);
	  	}

	  	// baixo
	  	else if(e.keyCode == 40) {
	  		if(!game.colidiuY(pecaAtual) && !game.getCampo().fimY(pecaAtual)) {
		  		pecaAtual.desce(campo);
	  		}
  		}

		// left
	  	if(e.keyCode == 37 && !game.getCampo().fimEsquerda(pecaAtual)) {
			if(!colidiuEsquerda(pecaAtual)) {
				print(pecaAtual.y, pecaAtual.x, false);
				pecaAtual.x--;
				print(pecaAtual.y, pecaAtual.x, true);
			}
	  	}	  	

	  	// right
	  	else if(e.keyCode == 39 && !game.getCampo().fimDireita(pecaAtual)) {
			if(!colidiuDireita(pecaAtual)) {
				print(pecaAtual.y, pecaAtual.x, false);
				pecaAtual.x++;
				print(pecaAtual.y, pecaAtual.x, true);
			}
	  	}

	});
});

function colidiuEsquerda(peca) {
	var colididas = game.getPecasMortas().filter(function(pecaMorta) {
		return peca.x <= (pecaMorta.x + peca.matriz[0].length);
	});

	if(colididas.length == 0) {	
		return false;
	} else {

		// Verifica se também colidiram os pixels de dentro da matriz
		var colididasPX = colididas.filter(function(item) {

			var colisoresItem = getPxColisores(item);
			var colisoresPecaAtual = getPxColisores(pecaAtual);

			for (var i = 0; i < colisoresItem.length; i++) {
				for (var j = 0; j < colisoresPecaAtual.length; j++) {
					
					if (
						colisoresItem[i][0] == colisoresPecaAtual[j][0] - 1 &&
						colisoresItem[i][1] == (colisoresPecaAtual[j][1])
					) {
						return true;
					}
				}
			}

			return false;
		});

		return colididasPX.length > 0;
	}
}	

function colidiuDireita(peca) {
	var colididas = game.getPecasMortas().filter(function(pecaMorta) {
		return peca.x >= (pecaMorta.x - peca.matriz[0].length);
	});

	if(colididas.length == 0) {	
		return false;
	} else {
		var colididasPX = colididas.filter(function(item) {

			var colisoresItem = getPxColisores(item);
			var colisoresPecaAtual = getPxColisores(pecaAtual);

			for (var i = 0; i < colisoresItem.length; i++) {
				for (var j = 0; j < colisoresPecaAtual.length; j++) {
					
					if (
						colisoresItem[i][0] == colisoresPecaAtual[j][0] + 1 &&
						colisoresItem[i][1] == (colisoresPecaAtual[j][1])
					) {
						return true;
					}
				}
			}

			return false;
		});

		return colididasPX.length > 0;
	}
}	

// Retorna as coordenadas de todos os pixels das extremidades de uma peça
function getPxColisores(peca) {

	var matriz = peca.matriz;

	var colisores = [];
	for (var i = 0; i < matriz.length; i++) {
		for (var j = 0; j < matriz[i].length; j++) {
			
			if (matriz[i][j] == 1) {
				colisores.push([
					(peca.x + j),
					(peca.y + i) 
				]);
			}		
		}			
	}
	return colisores;
}