
const desenharCurvaCatmull = function(pontosC,grau){
	tipoColor = 0;
	for (var i = 0; i < colorInicial.length; i++) {
		if(colorInicial[i] != colores.escolherPonto && colorInicial[i] != colores.pontoEscolhido)
			colorInicial[i] = colores.ponto;
	}
	let pontoDesenho = []
	let colorDesenho = []
	let color = getColor()


	let pontosC2 = [[ 0, 0, 0, 1 ]];
	for (var i = 0; i < pontosC.length; i++) {
		pontosC2.push(pontosC[i]);
	}
	pontosC2.push([ 0, 0, 0, 1 ]);

	pontosC2[0][0] = pontosC2[1][0] - (pontosC2[2][0] - pontosC2[1][0])
	pontosC2[0][1] = pontosC2[1][1] - (pontosC2[2][1] - pontosC2[1][1])
	pontosC2[0][2] = pontosC2[1][2] - (pontosC2[2][2] - pontosC2[1][2])
	pontosC2[pontosC2.length-1][0] = pontosC2[pontosC.length][0] + (pontosC2[pontosC.length][0] - pontosC2[pontosC.length-1][0])
	pontosC2[pontosC2.length-1][1] = pontosC2[pontosC.length][1] + (pontosC2[pontosC.length][1] - pontosC2[pontosC.length-1][1])
	pontosC2[pontosC2.length-1][2] = pontosC2[pontosC.length][2] + (pontosC2[pontosC.length][2] - pontosC2[pontosC.length-1][2])

	let divisiones = []
	const paso = 1/(pontosC.length-1)
	for (var i = 0; i < pontosC.length; i++) {
		divisiones.push(i*paso);
	}

	const tama = 26
	let interpolador = calcularArrayCatmull(divisiones,tama)

	let Al = grau;
	const pontoCalc = function(i,c,k){
		return (pontosC2[i][c]*interpolador[k][0] 
			+ (pontosC2[i][c]+(pontosC2[i+1][c]-pontosC2[i-1][c])/Al)*interpolador[k][1] 
			+ (pontosC2[i+1][c]-(pontosC2[i+2][c]-pontosC2[i][c])/Al)*interpolador[k][2]
			+ pontosC2[i+1][c]*interpolador[k][3]);
	}
	for (var i = 1; i < pontosC.length; i++){
		for (var k = 0; k < tama; k++){
			let X = pontoCalc(i,0,k)
			let Y = pontoCalc(i,1,k)
			let Z = pontoCalc(i,2,k)
			pontoDesenho.push([X,Y,Z,1])	
			colorDesenho.push(color);	
		}
		color = getColor()
	}
	drawSceneNotErase(pontoDesenho,colorDesenho)
}

const calcularArrayCatmull = function(pontosL,paso){
	let B = []
	let step = 1/(paso-1)
	for (let i= 0; i < paso; i++){
    	let a = 1-(step*i);
    	let b = step*i
     	B1 = a*a*a; 
     	B2 = 3*b*a*a;
     	B3 = 3*b*b*a; 
     	B4 = b*b*b;
     	B.push([B1,B2,B3,B4]);
    }
    return B
}