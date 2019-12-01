

const desenharCurvaCubicBSpline = function(pontosH){
	tipoColor = 0;
	for (var i = 0; i < colorInicial.length; i++) {
		if(colorInicial[i] != colores.escolherPonto && colorInicial[i] != colores.pontoEscolhido)
			colorInicial[i] = colores.ponto;
	}
	let pontoDesenho = []
	let colorDesenho = []
	let color = getColor()
	for (let i = 0; i <= pontosH.length - 4; i++) {
		const pontoA = pontosH[i];
		const pontoB = pontosH[i+1];
		const pontoC = pontosH[i+2];
		const pontoD = pontosH[i+3];
		const tam = 40
		for (let u = 0; u <= tam; u++) {
			let x = calcularPontoCubicBSpline(pontoA[0],pontoB[0],pontoC[0],pontoD[0],u/tam)
			let y = calcularPontoCubicBSpline(pontoA[1],pontoB[1],pontoC[1],pontoD[1],u/tam)
			let z = calcularPontoCubicBSpline(pontoA[2],pontoB[2],pontoC[2],pontoD[2],u/tam)
			pontoDesenho.push([x,y,z,1]);
			colorDesenho.push(color);
		}	
	}	
	drawSceneNotErase(pontoDesenho,colorDesenho)
}

const calcularPontoCubicBSpline = function(p0,p1,p2,p3,u){
	const abcd = MatrixXVetor(CubicBSpline,[p0,p1,p2,p3])
	const vetorU = [u*u*u,u*u,u,1]
	return mulVV(vetorU,abcd)/6;
}

const desenharCurvaNKCubicBSpline = function(puntosC,k){
	tipoColor = 0;
	let n = puntosC.length-1;
	for (var i = 0; i < colorInicial.length; i++) {
		if(colorInicial[i] != colores.escolherPonto && colorInicial[i] != colores.pontoEscolhido)
			colorInicial[i] = colores.ponto;
	}
	let pontoDesenho = []
	let colorDesenho = []
	let color = getColor()

	let number = n+1
	let nti = n+k+1

   	let divisiones = []
	const paso = 1/(nti-1)
	for (var i = 0; i < nti; i++) {
		divisiones.push(i*paso);
	}

	const tama = 768
	const step = 1/tama
	let to = Math.floor((divisiones[k-1]/step)) + 1;
	let ntii = to*nti;
	let interpolador = calcularArrayBSpline(divisiones,tama,n,k)

	for (var j = k-1; j < number; j++){
		var t = Math.floor((divisiones[j+1])/step);
		for (var i = to; i < t; i++){
			sX = sY = sZ = 0;
			ntii += nti;
			for (var m = 0; m < number; m++){
				sX += puntosC[m][0]*interpolador[m + ntii];  
				sY += puntosC[m][1]*interpolador[m + ntii];
				sZ += puntosC[m][2]*interpolador[m + ntii];
			}
			pontoDesenho.push([sX,sY,sZ,1])
			colorDesenho.push(color)
		}
		color = getColor()
		to = t;
	}
	drawSceneNotErase(pontoDesenho,colorDesenho)
}

const calcularArrayBSpline = function(divisiones,tama,n,k){
	const step = 1/tama
	let L = []
	for (let i = 0; i < tama*(n+k+1); i++) {
        L.push(0);
    }
    let paso = 0
    let i1 = 0
    for (let l = 0; l < tama; l++){
		while (paso >= divisiones[i1] ) i1++;
		let i = i1-1, ntil = (n+k+1)*l;
		L[i + ntil] = 1;
		for (let m = 2; m <= k; m++){        //  basis functions calculation
			let jb = i-m+1;  if (jb < 0) jb = 0;
			for (let j = jb; j <= i; j++)
			 	L[j + ntil] = L[j + ntil]*(paso - divisiones[j])/(divisiones[j+m-1] - divisiones[j]) + L[j+1 +ntil]*(divisiones[j+m] - paso)/(divisiones[j+m] - divisiones[j+1]);
		}
		paso += step;
	}
	
	// let paso = 0
	
 //    for (var j = 0; j < tamano; j++){
	// 	for (let i = 0; i < divisiones.length; i++) {
	// 		let P = 1;
	//         for (let k = 0; k < divisiones.length; k++) {
	//             if (k != i)
	//             	P *= (paso - divisiones[k]) / (divisiones[i] - divisiones[k]);
	//         }        
	//         L[m++] = P
	//     }
	//     paso+=step
	// }
    return L;
}

const desenharCurvaCoxBoor = function(pontosC){

}
