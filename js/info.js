function Info(params) {

	this.pontuacao = 0;
	$('#pontuacao').text(this.pontuacao);


	this.getPontuacao = function () {
		return this.pontuacao;
	}

	this.aumentaPontuacao = function() {
		this.pontuacao++;
		$('#pontuacao').text(info.getPontuacao());
	}
}