
const desenharCurvaLagrange = function(pontosL){
	tipoColor = 0;
	for (var i = 0; i < colorInicial.length; i++) {
		if(colorInicial[i] != colores.escolherPonto && colorInicial[i] != colores.pontoEscolhido)
			colorInicial[i] = colores.ponto;
	}
	let pontoDesenho = []
	let colorDesenho = []
	let color = getColor()


	let divisiones = []
	const paso = 1/(pontosL.length-1)
	for (var i = 0; i < pontosL.length; i++) {
		divisiones.push(i*paso);
	}

	const tama = 1000
	let interpolador = calcularArrayLagrange(divisiones,tama)

	let sX = pontosL[0][0]
	let sY = pontosL[0][1]
	let sZ = pontosL[0][2]
	pontoDesenho.push([sX,sY,sZ,1])
	colorDesenho.push(color)

	m = divisiones.length;
	for (var k = 1; k < tama; k++){
		let sX = sY = sZ = 0;
		for (var j = 0; j < divisiones.length; j++){
	 		sX += pontosL[j][0]*interpolador[m];  
	 		sY += pontosL[j][1]*interpolador[m];
	 		sY += pontosL[j][2]*interpolador[m];  
	 		m++;
	 		if(m%(Math.floor(interpolador.length/(divisiones.length-1))) == 0)
				color = getColor()
	 	}
		pontoDesenho.push([sX,sY,sZ,1])	
		colorDesenho.push(color);	
	}
	// let Xmin = 1;
	// let Xmax = -1;

	// for (var i = 0; i < pontosL.length; i++) {
	// 	if(pontosL[i][0] < Xmin)
	// 		Xmin = pontosL[i][0]
	// 	if(pontosL[i][0] > Xmax)
	// 		Xmax = pontosL[i][0]
	// }

	// console.log(Xmin,Xmax)
	// const tam = 300
	// for (let t = 0; t <= tam; t++) {
	// 	let paso = ((Xmax-Xmin)/tam)*t
	//  	pontoDesenho.push(calcularPontoLagrange(pontosL,Xmin+paso));
	//  	colorDesenho.push(color);
	// }	
	drawSceneNotErase(pontoDesenho,colorDesenho)
}

const calcularArrayLagrange = function(divisiones,tamano){
	let m = 0;
	let step = 1/(tamano-1)
	let L = []
	let paso = 0
	for (let i = 0; i < tamano*divisiones.length; i++) {
        L.push(1);
    }
    for (var j = 0; j < tamano; j++){
		for (let i = 0; i < divisiones.length; i++) {
			let P = 1;
	        for (let k = 0; k < divisiones.length; k++) {
	            if (k != i)
	            	P *= (paso - divisiones[k]) / (divisiones[i] - divisiones[k]);
	        }        
	        L[m++] = P
	    }
	    paso+=step
	}
    return L;
}

const calcularPontoLagrange = function(pontosL,paso){
	let L = [];
	for (let i = 0; i < pontosL.length; i++) {
        L.push(1);
    }
	for (let i = 0; i < pontosL.length; i++) {
        for (let k = 0; k < pontosL.length; k++) {
            if (i != k)
            	L[i] *= (0 - pontosL[k][0]) / (pontosL[i][0] - pontosL[k][0]);
        }        
    }
    let y = 0
    for (let i = 0; i < pontosL.length; i++) {
        y += L[i] * pontosL[i][1];
    }
    console.log(paso,y)
    return [paso,y,0,1]
}