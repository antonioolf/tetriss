function Info(params) {

	this.pontuacao = 0;

	this.getPontuacao = function () {
		return this.pontuacao;
	}

	this.aumentaPontuacao = function() {
		this.pontuacao++;
		$('#pontuacao').text(info.getPontuacao());
	}
}