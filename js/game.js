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

	// --------------------------------

	this.colidiuY = function(peca) {
		// Verifica se há alguma peça morta no lugar em que a peça atual está
		var colididas = this.pecasMortas.filter(function(pecaMorta) {
			
											// Compensa o tamanho 
											// da peça morta com o da atual
			return peca.y >= (pecaMorta.y - peca.getAltura());
		});

		if(colididas.length == 0) {	
		
			return false;
		
		} else {

			// Verifica se também colidiram os pixels de dentro da matriz
			var colididasPX = colididas.filter(function(item) {

				var colisoresItem = item.getPxColisores();
				var colisoresPecaAtual = pecaAtual.getPxColisores();

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
	};

	this.colidiuEsquerda = function(peca) {
		var colididas = this.getPecasMortas().filter(function(pecaMorta) {
			return peca.x <= (pecaMorta.x + peca.getLargura());
		});

		if(colididas.length == 0) {	
			return false;
		} else {

			// Verifica se também colidiram os pixels de dentro da matriz
			var colididasPX = colididas.filter(function(item) {

				var colisoresItem = item.getPxColisores();
				var colisoresPecaAtual = pecaAtual.getPxColisores();

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
	};

	this.colidiuDireita = function(peca) {
		var colididas = this.getPecasMortas().filter(function(pecaMorta) {
			return peca.x >= (pecaMorta.x - peca.getLargura());
		});

		if(colididas.length == 0) {	
			return false;
		} else {
			var colididasPX = colididas.filter(function(item) {

				var colisoresItem = item.getPxColisores();
				var colisoresPecaAtual = pecaAtual.getPxColisores();

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
	};

	this.pontuar = function() {
		// Solução
		/*
			Salvar matriz na classe Peca além da rotação e grupoPecas
			para possibilitar fazer alterações na matriz da peça sem afetar a original
		*/
		var linhasCheias = this.getCampo().getLinhasCheias();
		
		if(linhasCheias.length == 0) {
			return false;
		} else {
			linhasCheias.forEach(function(linha) {
				this.pecasMortas.forEach(function(peca) {

					// Resolver essa treta aqui
					// if(linha == ((peca.getAltura() + peca.getY()))) {
					// 	peca.destroiLinha(peca.getY() - linha);
					// }

					if(linha >= (peca.getY() +1) || linha <= (peca.getY() + 1) + peca.getAltura()) {
						// destroi(linha - peca.y)
						peca.destroiLinha(linha - (peca.getY()+1) );
					}
				}.bind(this));
			}.bind(this));
		}
	};	
}