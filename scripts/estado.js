//0, esperando a seleccionar uma curva
let estados = {
	esperandoCurva:0,
	curvaSeleccionada:1,
	curvaDesenhada:2,
	procurandoVertice:3,
	verticeSeleccionado:4,
}

let estado = 1
let curva = "2";

$("#instrucciones").html("Escolha una curva");

const reiniciar = function(){
	estado = estados.esperandoCurva;
	$("#instrucciones").html("Escolha una curva");
	document.getElementById("selectCurva").value = "";
	posicionesIniciais = [];
	colorInicial = [];
	drawScene() 
}

const iniciar = function(){
	estado = estados.curvaDesenhada;
	desenharCurva()
}

const clickmoverVertice = function(){
	if(posicionesIniciais.length > 0){
		if(estado != estados.esperandoCurva){
			estado = estados.procurandoVertice;
			$("#instrucciones").html("Faça click em um ponto que deseja mover");
		}
		else{
			$("#instrucciones").html("Escolha una curva");
		}
	}
	else{
		$("#instrucciones").html("Sem pontos para mover, Desenhe um ponto");
	}
}

const clickdesenharPonto = function(){
	if(estado != estados.esperandoCurva){
		estado = estados.curvaSeleccionada;
		$("#instrucciones").html("Faça um click na area para desenhar um ponto");
	}
	else{
		$("#instrucciones").html("Escolha una curva");	
	}	
}

const clickApagarPonto = function(){
	if(posicionesIniciais.length > 0){
		if(estado != estados.esperandoCurva){
			estado = estados.procurarApagandoVertice;
			$("#instrucciones").html("Faça click em um ponto que deseja apagar");	
		}
		else{
			$("#instrucciones").html("Escolha una curva");	
		}
	}
	else{
		$("#instrucciones").html("Sem pontos para apagar, Desenhe um ponto");
	}
}

const desenharCurva = function(){
	if(posicionesIniciais.length > 1){
		if(curva == ""){
			$("#instrucciones").html("Curva Invalida, Escolha uma valida");
			return
		}
		else if(posicionesIniciais.length == 0){
			$("#instrucciones").html("Sem pontos de controle, Desenhe os pontos na area cinza");
			return	
		}
		else if(curva == 1){
			if(estado == estados.curvaSeleccionada || estado == estados.esperandoCurva){
				if(posicionesIniciais.length == 1){
					$("#instrucciones").html("Preciso de minimo 2 pontos de controle, Desenhe mais pontos na area cinza");
					return
				}
				else {
					$("#instrucciones").html("Faça um click na area para desenhar um ponto");
				}
			}
			desenharCurvaBezier(posicionesIniciais)	
		}
		else if(curva == 2){
			if(estado == estados.curvaSeleccionada || estado == estados.esperandoCurva){
				if(posicionesIniciais.length < 4){
					$("#instrucciones").html("Preciso de minimo 4 pontos, Desenhe mais pontos na area cinza");
					return
				}
				else if(estado == estados.curvaSeleccionada || estado == estados.esperandoCurva){
					$("#instrucciones").html("Faça um click na area para desenhar um ponto");	
				}
			}
			desenharCurvaHermite(posicionesIniciais)		
		}
	}	
}

const desenharCurvaBezier = function(pontosB){
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

const desenharCurvaHermite = function(pontosH){
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
		const tam = 20
		for (let t = 0; t <= tam; t++) {
			let x = calcularPontoHermite(pontoA[0],pontoB[0],tan1[0]-pontoA[0],tan2[0]-pontoB[0],t/tam)
			let y = calcularPontoHermite(pontoA[1],pontoB[1],tan1[1]-pontoA[1],tan2[1]-pontoB[1],t/tam)
			let z = calcularPontoHermite(pontoA[2],pontoB[2],tan1[2]-pontoA[2],tan2[2]-pontoB[2],t/tam)
			pontoDesenho.push([x,y,z,1]);
			colorDesenho.push(color);
		}	
	}	
	drawSceneNotErase(pontoDesenho,colorDesenho)
}

const calcularPontoHermite = function(p0,p1,v0,v1,t){
	const abcd = MatrixXVetor(Hermite,[p0,p1,v0,v1])
	const vetorT = [t*t*t,t*t,t,1]
	return mulVV(vetorT,abcd);
}

iniciar()