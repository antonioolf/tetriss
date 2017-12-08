(function (document, $) {
	
	function Game(velocidade) {
		var campo;
		var velocidade = velocidade;
		var pecaAtual;
		var pecasMortas;

		this.mudarTema = function() {

		};

		this.mataPeca = function(peca) {

		};

		this.getVelocidade = function() {
			return this.velocidade;
		};
	}

	function Campo() {
		// Dimensões do campo
		var x;
		var y;

		this.gerar = function() {

		}

		this.setPixel = function() {

		};

		this.fimDoCampo = function() {

		};	
	}

	function Peca() {
		var grupoPecas;
		var rotacao;
		var x;
		var y;
		var cor;

		this.getMatrizAtual = function() {

		};

		this.colidiuY = function() {

		};

		this.colidiuEsquerda = function() {

		};

		this.colidiuDireita = function() {

		};

		this.rotaciona = function() {

		};

		this.print = function() {

		};
	}

	function Util() {
		this.rand = function() {

		};
	}


	// ------- Inicialização ----------
	var game = new Game();

	setInterval(function() {
		console.log('loop');
	}, config.velocidade);

}(document, jQuery));