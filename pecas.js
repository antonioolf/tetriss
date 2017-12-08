var pecas = [
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
];

function rand(min, max) {
		return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandMatriz() {
	var randPeca = rand(0, pecas.length-1);
	var randRotacao = rand(0, pecas[randPeca].length-1);
	return pecas[randPeca][randRotacao];
}