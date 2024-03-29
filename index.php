<?php  
	$day = new DateTime('NOW');
	// $version = date('dms',$day->getTimestamp());
	$version = 1;
?>
<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8">
		<meta name="viewport" content="initial-scale=1, maximum-scale=1, user-scalable=no, width=device-width">
		<title>Curvas em WebGL</title>

		<!-- CORE CSS-->        
		<link href="style.css" rel="stylesheet">	
		<link href="bootstrap.min.css" rel="stylesheet">	

	</head>

	<body>
		<div class="top">
			<h2 style="margin: auto;padding: 15px">Trabalho de Computação gráfica, Daniel Jimenez 117028769</h2>
		</div>			
		<div class="bot">
			<div class="left">
   			<canvas id="c" style="width: 100%;height: 100%;"></canvas>
   		</div>
   		<div class="right">
   			<div class="top2">
			   	<div class="container">
					  <div class="row">
					    <div class="col-12">
					    	<!-- <button type="button" class="btn btn-success" onclick="iniciar()">Desenhar</button> -->
							<button type="button" class="btn btn-danger" onclick="reiniciar()">Reiniciar</button>
							<br>
							<br>
				      		<select id="selectCurva" onchange="changeSelect()" class="form-control">
							  <option value="" selected="">Selecione uma curva</option> 
							  <option value="1">Bézier</option>
							  <option value="2">Hermite</option>								  
							  <option value="4">Uniform Cubic B-Spline</option>
							  <option value="3">Interpolation Lagrange Curve</option>
							  <option value="5">Interpolating Cardinal / Catmulll-Rom splines</option>
							</select>															
					    </div>
					    <div class="input-group col-12" style="margin-top: 10px ">
					    	<div class="input-group-prepend" id="inputGrau" style="display: none">
							    <span class="input-group-text" id="inputGrau-text">Grau (K)</span>
						  	</div>
						  	<input type="number" value="1" onchange="changeSelect()" style="display: none" class="form-control" id="numberGrau" aria-describedby="basic-addon3">
					    </div>
					    <div class="input-group col-12" style="margin-top: 10px ">
					    	<div class="input-group-prepend" id="inputAlpha" style="display: none">
							    <span class="input-group-text" id="inputGrau-text">α</span>							    
						  	</div>	
						  	<input type="number" value="2" onchange="changeSelect()" style="display: none" class="form-control col-12" id="numberAlpha" aria-describedby="basic-addon3">
						  	<input type="range" oninput="changeRange()" class="form-control-range col-12" id="rangeAlpha" style="margin-top:5px;display: none">
					    </div>
					  </div>
					</div>
				</div>
				<div class="bot2">
					<div class="container">
					  <div class="row">
					    <div class="col-12">
								<button type="button" class="btn btn-primary" onclick="clickmoverVertice()">Mover Ponto</button>
								<button type="button" class="btn btn-info" onclick="clickdesenharPonto()">Desenhar Ponto</button>
								<button type="button" class="btn btn-danger" onclick="clickApagarPonto()">Apagar Ponto</button>
					    </div>
					  </div>
					</div>
					<hr>
					<h1 style="padding-left: 20px;">Instruções:</h1>
				  <h2 id="instrucciones" style="margin:auto; padding: 20px;">Aca van las Instruções</h2>
				</div>
			</div>
		</div>
	</body>
	<script type="text/javascript" src="scripts/jquery.js"></script>
	<script type="text/javascript" src="scripts/bootstrap.min.js"></script>
	<script type="text/javascript" src="scripts/webgl-utils.js"></script>
	<script type="text/javascript" src="scripts/curvas/Bezier.js"></script>
	<script type="text/javascript" src="scripts/curvas/BSpline.js"></script>
	<script type="text/javascript" src="scripts/curvas/Hermite.js"></script>
	<script type="text/javascript" src="scripts/curvas/Lagrange.js"></script>
	<script type="text/javascript" src="scripts/curvas/Catmull-Rom.js"></script>	
	<script type="text/javascript" src="scripts/script.js"></script>
	<script type="text/javascript" src="scripts/event.js"></script>
	<script type="text/javascript" src="scripts/estado.js"></script>
	<script type="text/javascript" src="scripts/live.js"></script>
</html>