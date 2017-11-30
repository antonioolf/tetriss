/* TODO
//	- Remover uso do jQuery
*/
var matriz = { x: 20, y: 30 };
var config = {
	velocidade: 300
}

// A primeira peça começa no centro e no topo
var pecaAtual = { 
	x: 8, 
	y: -1,
	matriz: getRandMatriz(),
};

var pecasMortas = [];

$(document).ready(function() {
	gerarMatriz(matriz.x, matriz.y);
	
	// Loop principal
	setInterval(function() {
		
		if(colidiuY(pecaAtual) || fimDoCampo(pecaAtual)) {
			var pecaMorta = {
				x: pecaAtual.x,
				y: pecaAtual.y,
				matriz: pecaAtual.matriz
			};

			pecasMortas.push(pecaMorta);
			
			// Volta peça atual para o topo
			pecaAtual.y = -1;
			pecaAtual.x = 8;
			
			// Pega uma peça aleatória do repositório e define como a matriz
			pecaAtual.matriz = getRandMatriz();
		}

		// Apaga pecaAtual e desenha 1 pixel abaixo
		print(pecaAtual.y, pecaAtual.x, false);
		pecaAtual.y++;
		print(pecaAtual.y, pecaAtual.x, true);			

		// console.log('loop');
	}, config.velocidade);

	// Verifica se alguma tecla foi pressionada
	$("body").keydown(function(e) {
	  	// left
	  	if(e.keyCode == 37) {
			if(!colidiuEsquerda(pecaAtual)) {
				print(pecaAtual.y, pecaAtual.x, false);
				pecaAtual.x--;
				print(pecaAtual.y, pecaAtual.x, true);
			}

	  	}

	  	// up
	  	if(e.keyCode == 38) {	
			print(pecaAtual.y, pecaAtual.x, false);
			pecaAtual.matriz = getRandMatriz();
			print(pecaAtual.y, pecaAtual.x, true);
	  	}

	  	// right
	  	else if(e.keyCode == 39) {
			if(!colidiuDireita(pecaAtual)) {
				print(pecaAtual.y, pecaAtual.x, false);
				pecaAtual.x++;
				print(pecaAtual.y, pecaAtual.x, true);
			}
	  	}

	  	// baixo
	  	else if(e.keyCode == 40) {
	  		if(!colidiuY(pecaAtual) && !fimDoCampo(pecaAtual)) {
		  		print(pecaAtual.y, pecaAtual.x, false);
				pecaAtual.y++;
				print(pecaAtual.y, pecaAtual.x, true);
	  		}
  		}
	});
});

function fimDoCampo(peca) {
	return peca.y >= (matriz.y - peca.matriz.length);
}

function colidiuY(peca) {
	// Verifica se tem alguma peça morta no lugar que a peça atual está
	var colididas = pecasMortas.filter(function(pecaMorta) {
		
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

function colidiuEsquerda(peca) {
	var colididas = pecasMortas.filter(function(pecaMorta) {
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
	var colididas = pecasMortas.filter(function(pecaMorta) {
		return peca.x >= (pecaMorta.x - peca.matriz[0].length);
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

/*
* Printa uma peça na posição X,Y
* Se a flag for false apaga todos os pixels da peça, sejam eles 0 ou 1
* Se a flag for true seta pixels de acordo com o array da peça */
function print(x, y, flag) {
	
	for (var i = 0; i < pecaAtual.matriz.length; i++) {
		for (var j = 0; j < pecaAtual.matriz[i].length; j++) {
			
			// Evita que a peça atual apague os rastros das outras
			if(pecaAtual.matriz[i][j] != 0) {
				var valor = flag ? pecaAtual.matriz[i][j] : 0;
				setPixel(x + i, y + j, valor);
			}
		}
	}
}

// Ativa/Inativa pixel baseado no Id que é uma string com as coordenadas (ex: #25-19)
function setPixel(x, y, flag) {
	if(flag == 1) {
		$('#' + x + '-' + y).addClass('ativo');
	} else {
		$('#' + x + '-' + y).removeClass('ativo');
	}
}

function gerarMatriz(x, y) {
	for (var i = 0; i < y; i++) {
		var blocos = '';
		for (var j = 0; j < x; j++) {
			blocos += '<div class="bloco" id="'+ i +'-'+ j +'"></div>';
		}

		$('#matriz').append('<div class="linha">'+ blocos +'</div>');
	}
}

function rand(min, max) {
  	return Math.floor(Math.random() * (max - min + 1)) + min;
}