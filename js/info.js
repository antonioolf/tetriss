function Info(params) {
    this.pontuacao = 0;
    $('#pontuacao').text(this.pontuacao);

    this.getPontuacao = function () {
        return this.pontuacao;
    };

    this.aumentaPontuacao = function() {
        this.pontuacao++;
        $('#pontuacao').text(info.getPontuacao());
    };

    this.updateProximas = function(array) {
        for (var i = 0; i < 3; i++) {
            $('#proximasPecasBox .'+ i)
            .html(array[i]
                .getMatrizAtual()
                .reduce(function(total, currentValue) {
                    var linha = '<div class="linha">';
                    for (var i = 0; i < currentValue.length; i++) {
                        var ativo = currentValue[i] == 1 ? 'ativo' : '';
                        linha += '<div class="bloco '+ ativo +'"></div>';
                    }
                    linha += '</div>';
                    return total + linha;
                }, '')
            );
        }
    };
}