function Peca(params) {
	var obj = Pecas.getRandPeca();
	this.grupoPecas = obj.grupoPecas;
	this.rotacao = obj.rotacao;
	this.matriz = obj.matriz;

	// Novas peças sempre começam no centro e no topo
	this.x = 8;
	this.y = -1;

	this.cor = params.cor;

	this.getMatrizAtual = function() {
		return this.matriz;
	};

	this.destroiLinha = function(linha) {
		var matriz = this.getMatrizAtual();
		matriz.splice(linha, 1);
		this.matriz = matriz;
		this.reprint();
	};

	this.reprint = function() {
		campo.printPeca(this, false);
		campo.printPeca(this, true);		
	};	

	this.desce = function(campo) {
		campo.printPeca(this, false);
		this.y++;
		campo.printPeca(this, true);
	};

	this.praEsquerda = function(campo) {
		campo.printPeca(this, false);
		this.x--;
		campo.printPeca(this, true);
	};

	this.praDireita = function(campo) {
		campo.printPeca(this, false);
		this.x++;
		campo.printPeca(this, true);
	};

	// Retorna as coordenadas de todos os pixels das extremidades de uma peça
	this.getPxColisores = function() {
		var matriz = this.getMatrizAtual();

		var colisores = [];
		for (var i = 0; i < matriz.length; i++) {
			for (var j = 0; j < matriz[i].length; j++) {
				
				if (matriz[i][j] == 1) {
					colisores.push([
						(this.getX() + j),
						(this.getY() + i) 
					]);
				}		
			}			
		}
		return colisores;
	};	

	this.rotaciona = function() {
		campo.printPeca(this, false);
		
		if(this.rotacao < Pecas.array[this.grupoPecas].length -1) {
			this.rotacao++;
		} else {
			this.rotacao = 0;
		}

		this.matriz = Pecas.array[this.grupoPecas][this.rotacao];
		campo.printPeca(this, true);
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