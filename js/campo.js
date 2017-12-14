function Campo(params) {
	// Dimensões do campo
	this.x = params.x;
	this.y = params.y;

	this.gerar = function() {
		// i = y
		// j = x
		for (var i = 0; i < this.y; i++) {
			var blocos = '';
			for (var j = 0; j < this.x; j++) {
				// blocos += '<div class="bloco" id="'+ j +'-'+ i +'">'+  j +'-'+ i +'</div>';
				blocos += '<div class="bloco" id="'+ j +'-'+ i +'"></div>';
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
	this.setPixel = function(x, y, flag/*, cor*/) {
		if(flag == 1) {
			$('#' + x + '-' + y).addClass('ativo');
			$('#' + x + '-' + y).addClass('ativo');
			// if(cor != null) {
			// 	$('#' + x + '-' + y).css('background-color', cor);
			// }
		} else {
			$('#' + x + '-' + y).removeClass('ativo');
			// $('#' + x + '-' + y).css('background-color', 'transparent');
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
					var valor = flag ? peca.getMatrizAtual()[i][j] : 0;
					this.setPixel(peca.getX() + j, peca.getY() + i , valor/*, peca.getCor()*/);
				}
			}
		}
	}

	this.getLinhasCheias = function() {
		var cheias = [];

		for (var y = 0; y < this.y; y++) {
			cheia = true;

			for (var x = 0; x < this.x; x++) {
				if($('#' + x + '-' + y).hasClass('ativo') == false) {
					cheia = false;
					break;
				}
			}

			if(cheia) {
				cheias.push(y);
			}
		}

		return cheias;
	};
}