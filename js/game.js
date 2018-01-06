function Game(params) {
    this.campo = params.campo;
    this.campoPreview = params.campoPreview;
    this.info = params.info;
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

    this.getCampoPreview = function() {
        return this.campoPreview;
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
        var linhaCheia;

        while(linhaCheia = this.getCampo().getLinhaCheia()) {
            if(!linhaCheia) {
                return false;
            } else {
                this.info.aumentaPontuacao();
                this.destroiLinha(linhaCheia);
                this.desceTodasAcima(linhaCheia);
            }
        }
    };

    this.destroiLinha = function(linha) {

        this.pecasMortas.forEach(function(peca) {
            if(peca.contemLinha(linha)) {
                var indice = peca.getIndiceCortadoPelaLinha(linha);
                
                if(indice >= 0) {
                    peca.destroiIndice(indice, this.getCampo());
                }
            }
        }.bind(this));
    };

    this.desceTodasAcima = function(linha) {
        var naoAtingidas = this.pecasMortas.filter(function(peca) {
            return !peca.contemLinha(linha);
        }.bind(this));

        naoAtingidas.forEach(function(peca) {
            
            // Desce apenas as peças que tiverem acima da linha que foi destruída
            if (peca.getY() < linha) {
                peca.desce(this.getCampo());    
            }

        }.bind(this));
    };  
}