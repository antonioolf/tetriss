var Pecas = {
	array: [
		[
			[
				[0, 0, 1],
				[1, 1, 1],
			],
			[
				[1, 0],
				[1, 0],
				[1, 1],
			],
			[
				[1, 1, 1],
				[1, 0, 0],
			],
			[
				[1, 1],
				[0, 1],
				[0, 1],
			],
		],

		[
			[
				[0, 1, 0],
				[1, 1, 1],
			],
			[
				[1, 0],
				[1, 1],
				[1, 0],
			],
			[
				[1, 1, 1],
				[0, 1, 0],
			],
			[
				[0, 1],
				[1, 1],
				[0, 1],
			],
		],

		[
			[
				[0, 1, 1],
				[1, 1, 0],
			],
			[
				[1, 0],
				[1, 1],
				[0, 1],
			],
		],

		[
			[
				[1, 1],
				[1, 1],
			],
		],

		[
			[
				[1],
				[1],
				[1],
				[1],
			],
			[
				[1, 1, 1, 1],
			],		
		],
	],

	rand: function(min, max) {
		return Math.floor(Math.random() * (max - min + 1)) + min;
	},

	getRandPeca: function() {
		var grupoPecas = Pecas.rand(0, Pecas.array.length-1);
		var rotacao = Pecas.rand(0, Pecas.array[grupoPecas].length-1);
		var matriz = Pecas.array[grupoPecas][rotacao];

		var obj = {
			grupoPecas: grupoPecas,
			rotacao: rotacao,
			matriz: matriz,
		};

		// Evita que os objetos mantenham a referencia, já que cada peça terá um estado próprio
		return JSON.parse(JSON.stringify(obj));
	}
};