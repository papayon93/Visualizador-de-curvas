const desenharCurvaHermite = function(pontosH){
	tipoColor = 0;
	for (var i = 0; i < colorInicial.length; i++) {
		if(colorInicial[i] != colores.escolherPonto && colorInicial[i] != colores.pontoEscolhido){
			if(i%2 == 0)
				colorInicial[i] = colores.ponto;
			else
				colorInicial[i] = colores.tangente;
		}
	}
	let pontoDesenho = []
	let colorDesenho = []
	let color = getColor()
	for (let i = 0; i < Math.floor(pontosH.length/2) - 1; i++) {
		const pontoA = pontosH[i*2];
		const pontoB = pontosH[i*2+2];
		const tan1 = pontosH[i*2+1];
		const tan2 = pontosH[i*2+3];
		const tam = 40
		for (let t = 0; t <= tam; t++) {
			let x = calcularPontoHermite(pontoA[0],pontoB[0],tan1[0]-pontoA[0],tan2[0]-pontoB[0],t/tam)
			let y = calcularPontoHermite(pontoA[1],pontoB[1],tan1[1]-pontoA[1],tan2[1]-pontoB[1],t/tam)
			let z = calcularPontoHermite(pontoA[2],pontoB[2],tan1[2]-pontoA[2],tan2[2]-pontoB[2],t/tam)
			pontoDesenho.push([x,y,z,1]);
			colorDesenho.push(color);
		}
		color = getColor()
	}	
	drawSceneNotErase(pontoDesenho,colorDesenho)
}

const calcularPontoHermite = function(p0,p1,v0,v1,t){
	const abcd = MatrixXVetor(Hermite,[p0,p1,v0,v1])
	const vetorT = [t*t*t,t*t,t,1]
	return mulVV(vetorT,abcd);
}
