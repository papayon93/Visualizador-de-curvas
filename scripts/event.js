const VtoW = [
	[2.5,0,0,-1],
	[0,-1/0.45,0,0.55/0.45],
	[0,0,1,0],
	[0,0,0,1],
]

const Hermite = [
  [ 2 ,-2 , 1 , 1 ],
  [-3 , 3 ,-2 ,-1 ],
  [ 0 , 0 , 1 , 0 ],
  [ 1 , 0 , 0 , 0 ],
]

const mouse_click = function (event) {
  if(verticeSeleccionado != -1 && estado == estados.verticeSeleccionado){    
    estado = estados.curvaDesenhada;
    let pX = event.clientX/window.innerWidth;
    let pY = event.clientY/window.innerHeight;
    let pZ = 0
    let point = MatrixXVetor(VtoW,[pX, pY, pZ, 1]);
    posicionesIniciais[verticeSeleccionado] = point;
    colorInicial[verticeSeleccionado] = colores.ponto;
    verticeSeleccionado = -1;
    verticeProcurado = -1;
    estado = estados.procurandoVertice
    desenharCurva()
  }
  else if(estado == estados.curvaSeleccionada || estado == estados.curvaDesenhada){
    // console.log("started mouse drag event x,y = " + event.clientX + " " + event.clientY + "  " + event.which);
    // pX = event.clientX/$("#c").innerWidth();
    // pY = event.clientY/$("#c").innerHeight();
    let pX = event.clientX/window.innerWidth;
    let pY = event.clientY/window.innerHeight;
    let pZ = 0
    let point = MatrixXVetor(VtoW,[pX, pY, pZ, 1])
    posicionesIniciais.push(point)
    colorInicial.push(colores.ponto)
    // console.log(posiciones)
    drawScene() 
    if(posicionesIniciais.length > 1)
      iniciar()
    // start_of_mouse_drag = event;
    // event.preventDefault();

    // if (animate_is_on) {
    //   scene.animate_active = false;
    // }
  }
  else if(estado == estados.procurandoVertice && verticeProcurado != -1){    
    colorInicial[verticeProcurado] = colores.pontoEscolhido
    // drawScene()
    desenharCurva()
    estado = estados.verticeSeleccionado;
    verticeSeleccionado = verticeProcurado;
  }
  else if(estado == estados.procurarApagandoVertice && verticeProcurado != -1){
    if(curva == 1){
      colorInicial.splice(verticeProcurado,1)
      posicionesIniciais.splice(verticeProcurado,1)
    }
    else if(curva == 2){
      if(verticeProcurado%2 == 0){
        colorInicial.splice(verticeProcurado,2)
        posicionesIniciais.splice(verticeProcurado,2)
      }
      else{
        colorInicial.splice(verticeProcurado-1,2)
        posicionesIniciais.splice(verticeProcurado-1,2)
      }
      
    }
    
    if(posicionesIniciais.length > 1)
      desenharCurva()
    else
      drawScene()
    if(posicionesIniciais.length == 0){
      clickdesenharPonto()
    }
  }
};

var scheduled = false, lastEvent;

const mouse_dragged = function (event) {
  lastEvent = event;
  if (!scheduled) {
    scheduled = true;
    setTimeout(function() {
      scheduled = false;
      if(verticeSeleccionado != -1 && estado == estados.verticeSeleccionado)
      {
        moverVertice(lastEvent);
      }
      else if(estado == estados.procurandoVertice || estado == estados.procurarApagandoVertice){
        //Procura ponto proximo ao mouse
        let achei = false;
        let pX = event.clientX/window.innerWidth;
        let pY = event.clientY/window.innerHeight;
        let pZ = 0;        
        let point = MatrixXVetor(VtoW,[pX, pY, pZ, 1]);
        for (var i = 0; i < posicionesIniciais.length; i++) {
          const dis = getDistancia(point,posicionesIniciais[i])
          if(dis < 0.015){
            achei = true;
            colorInicial[i] = colores.escolherPonto
            verticeProcurado = i;
            if(posicionesIniciais.length > 1)
              desenharCurva()
            else
              drawScene()
          }
          else{
            colorInicial[i] = colores.ponto
          }
        }
        if(!achei && verticeProcurado != -1){
          verticeProcurado = -1
          desenharCurva()
        }
      }
    }, 50);
  }
}

const moverVertice = function(event){
  if(verticeSeleccionado != -1 && estado == estados.verticeSeleccionado)
  {
    // console.log("started mouse drag event x,y = " + event.clientX + " " + event.clientY + "  " + event.which);

    // pX = event.clientX/$("#c").innerWidth();
    // pY = event.clientY/$("#c").innerHeight();
    let pX = event.clientX/window.innerWidth;
    let pY = event.clientY/window.innerHeight;
    let pZ = 0;
    let point = MatrixXVetor(VtoW,[pX, pY, pZ, 1]);
    posicionesIniciais[verticeSeleccionado] = point;
    colorInicial[verticeSeleccionado] = colores.pontoEscolhido;
    // console.log(posiciones)
    // drawScene() 
    desenharCurva()
    // start_of_mouse_drag = event;
    // event.preventDefault();

    // if (animate_is_on) {
    //   scene.animate_active = false;
    // }
  }
  else{

  }
};

const changeSelect = function(){
  curva = document.getElementById("selectCurva").value;
  if(curva != ""){
    estado = estados.curvaSeleccionada;
    $("#instrucciones").html("Faça um click na area para desenhar um ponto"); 
    if(posicionesIniciais.length > 1){
      desenharCurva();
    }
  }
  else{
    estado = estados.esperandoCurva;
    $("#instrucciones").html("Escolha una curva");
  }
}

var id = '#c';
$( id ).mousedown( mouse_click );
// $( id ).mouseup( events.mouse_drag_ended );
$( id ).mousemove( mouse_dragged );