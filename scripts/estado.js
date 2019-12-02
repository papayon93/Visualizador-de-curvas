//0, esperando a seleccionar uma curva
let estados = {
	esperandoCurva:0,
	curvaSeleccionada:1,
	curvaDesenhada:2,
	procurandoVertice:3,
	verticeSeleccionado:4,
}

let estado = 0
let curva = "0";

$("#instrucciones").html("Escolha uma curva");

const reiniciar = function(){
	estado = estados.esperandoCurva;
	$("#instrucciones").html("Escolha uma curva");
	document.getElementById("selectCurva").value = "";
	posicionesIniciais = [];
	colorInicial = [];
	$("#inputGrau").fadeOut();
	$("#numberGrau").fadeOut();
	$("#inputAlpha").fadeOut();
	$("#numberAlpha").fadeOut();
	$("#rangeAlpha").fadeOut();
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
			$("#instrucciones").html("Clique em um ponto que deseja mover");
		}
		else{
			$("#instrucciones").html("Escolha uma curva");
		}
	}
	else{
		$("#instrucciones").html("Sem pontos para mover, Desenhe um ponto");
	}
}

const clickdesenharPonto = function(){
	if(estado != estados.esperandoCurva){
		estado = estados.curvaSeleccionada;
		$("#instrucciones").html("Clique na área para desenhar um ponto");
	}
	else{
		$("#instrucciones").html("Escolha uma curva");	
	}	
}

const clickApagarPonto = function(){
	if(posicionesIniciais.length > 0){
		if(estado != estados.esperandoCurva){
			estado = estados.procurarApagandoVertice;
			$("#instrucciones").html("Clique em um ponto que deseja apagar");	
		}
		else{
			$("#instrucciones").html("Escolha uma curva");	
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
			$("#instrucciones").html("Sem pontos de controle, Desenhe os pontos na área cinza");
			return	
		}
		else if(curva == 1){
			if(estado == estados.curvaSeleccionada || estado == estados.esperandoCurva || estado == estados.curvaDesenhada){
				if(posicionesIniciais.length == 1){
					$("#instrucciones").html("É necessário no mínimo 2 pontos de controle, Desenhe mais pontos na área cinza");
					return
				}
				else {
					$("#instrucciones").html("Clique na área para desenhar um ponto");
				}
			}
			desenharCurvaBezier(posicionesIniciais)	
		}
		else if(curva == 2){
			if(estado == estados.curvaSeleccionada || estado == estados.esperandoCurva || estado == estados.curvaDesenhada){
				if(posicionesIniciais.length < 4){
					$("#instrucciones").html("É necessário no mínimo 4 pontos, Desenhe mais pontos na área cinza");
					return
				}
				else if(estado == estados.curvaSeleccionada || estado == estados.esperandoCurva){
					$("#instrucciones").html("Clique na área para desenhar um ponto");	
				}
			}
			desenharCurvaHermite(posicionesIniciais)		
		}
		else if(curva == 3){
			if(estado == estados.curvaSeleccionada || estado == estados.esperandoCurva || estado == estados.curvaDesenhada){
				if(posicionesIniciais.length < 2){
					$("#instrucciones").html("É necessário no mínimo 2 pontos, Desenhe mais pontos na área cinza");
					return
				}
				else if(estado == estados.curvaSeleccionada || estado == estados.esperandoCurva){
					$("#instrucciones").html("Clique na área para desenhar um ponto");	
				}
			}
			posicionesOrdenadas = [];
			for (var i = 0; i < posicionesIniciais.length; i++) {
				posicionesOrdenadas.push(posicionesIniciais[i])
			}
			posicionesOrdenadas.sort(function(a, b) {
			  return a[0] - b[0];
			});
			desenharCurvaLagrange(posicionesIniciais)		
		}
		// else if(curva == 4){
		// 	if(estado == estados.curvaSeleccionada || estado == estados.esperandoCurva){
		// 		if(posicionesIniciais.length < 4){
		// 			$("#instrucciones").html("É necessário no mínimo 4 pontos, Desenhe mais pontos na área cinza");
		// 			return
		// 		}
		// 		else if(estado == estados.curvaSeleccionada || estado == estados.esperandoCurva){
		// 			$("#instrucciones").html("Clique na área para desenhar um ponto");	
		// 		}
		// 	}			
		// 	desenharCurvaCubicBSpline(posicionesIniciais)		
		// }
		else if(curva == 4){			
			grau = parseInt($("#numberGrau").val()) + 1
			if(estado == estados.curvaSeleccionada || estado == estados.esperandoCurva || estado == estados.curvaDesenhada){
				if(posicionesIniciais.length < 2){
					$("#instrucciones").html("É necessário no mínimo 2 pontos, Desenhe mais pontos na área cinza");
					return
				}
				else if(grau < 1){
					$("#instrucciones").html("O grau da curva não pode ser menor a 1");
					return
				}
				else if(posicionesIniciais.length < grau){
					$("#instrucciones").html("O grau tem que ser como maximo a quantidade dos pontos, diminua o Grau porfavor");
					return
				}
				else if(estado == estados.curvaSeleccionada || estado == estados.esperandoCurva){
					$("#instrucciones").html("Clique na área para desenhar um ponto");	
				}
			}
			desenharCurvaNKCubicBSpline(posicionesIniciais,grau)
		}
		else if(curva == 5){			
			grau = parseFloat($("#numberAlpha").val())
			if(estado == estados.curvaSeleccionada || estado == estados.esperandoCurva || estado == estados.curvaDesenhada){
				if(posicionesIniciais.length < 2){
					$("#instrucciones").html("É necessário no mínimo 2 pontos, Desenhe mais pontos na área cinza");
					return
				}
				else if(estado == estados.curvaSeleccionada || estado == estados.esperandoCurva){
					$("#instrucciones").html("Clique na área para desenhar um ponto");	
				}
			}
			desenharCurvaCatmull(posicionesIniciais,grau)
		}
	}	
}

iniciar()