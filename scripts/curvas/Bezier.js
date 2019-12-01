const desenharCurvaBezier = function(pontosB){
	tipoColor = 0;
	for (var i = 0; i < colorInicial.length; i++) {
		if(colorInicial[i] != colores.escolherPonto && colorInicial[i] != colores.pontoEscolhido)
			colorInicial[i] = colores.ponto;
	}
	let pontoDesenho = []
	let colorDesenho = []
	let color = getColor()
	for (let t = 0; t <= 100; t++) {
		pontoDesenho.push(calcularPontoBezier(pontosB,t/100));
		colorDesenho.push(color);
	}	
	drawSceneNotErase(pontoDesenho,colorDesenho)
}

const calcularPontoBezier = function(pontos,t){
	if(pontos.length == 2){
		const ponto1 = pontos[0];
		const ponto2 = pontos[1];
		return sumVV(multVC(ponto1,(1-t)),multVC(ponto2,(t)))
	}
	else{
		let novosPontos = []
		for (let i = 0; i < pontos.length-1; i++) {
			const ponto1 = pontos[i];
			const ponto2 = pontos[i+1];
			const pontoC = sumVV(multVC(ponto1,(1-t)),multVC(ponto2,(t)))
			novosPontos.push(pontoC)
		}
		return calcularPontoBezier(novosPontos,t);
	}
}