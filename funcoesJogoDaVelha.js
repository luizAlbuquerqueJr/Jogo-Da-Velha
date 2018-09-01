/*
Autor: luiz Albuquerque
*/



//variaveis da mquina
var infinito =999999;
var previsao = 5;
//variaveis do jogo
var tamanhoTabuleiro = 4;
var limite =tamanhoTabuleiro;

//Faz a matriz do tabuleiro
var matriz = ['*'];
matriz.shift();//remove primeiro item do array


for(var i=0;i<tamanhoTabuleiro;i++){
	matriz.push([]);
	for (var j = 0; j <tamanhoTabuleiro; j++) {
			matriz[i].push('*');
	}
}

//variaveis do mouse
posX1=0;
posY1=0;

//variaveis para indicar de quem é a vez
var suavez1 = true;
var vezDaMaquina1 = false;
//Cria o mapa do jogo visual
function start() {
    var cont = 0;
    console.log("start");

    var img = document.createElement('img');
    img.src = "l.gif";
   // x.appendChild(img);
    // get the reference for the body
    var body = document.getElementsByTagName("body")[0];

    // creates a <table> element and a <tbody> element
    var tbl     = document.createElement("table");
    var tblBody = document.createElement("tbody");

    // creating all cells
    for (var j = 0; j < tamanhoTabuleiro; j++) {
        // creates a table row
        var row = document.createElement("tr");

        for (var i = 0; i < tamanhoTabuleiro; i++) {
            cont++;
            // Create a <td> element and a text node, make the text
            // node the contents of the <td>, and put the <td> at
            // the end of the table row
            var cell = document.createElement("td");
            
            //var cellText = document.createTextNode("cell is row "+j+", column "+i);
            if((cont+j)%2)
              cell.innerHTML="<img src='*.gif' alt='hello'/>";
            else cell.innerHTML="<img src='*.gif' alt='hello'/>";
            row.appendChild(cell);
        }

        // add the row to the end of the table body
        tblBody.appendChild(row);
    }

    // put the <tbody> in the <table>
    tbl.appendChild(tblBody);
    // appends <table> into <body>
    body.appendChild(tbl);
    // sets the border attribute of tbl to 2;
    tbl.setAttribute("border", "2");
}




function atualizaTabuleiro(){
	var i=0;
	var j=0;
  	var cont =0;
  var cell= this.document.getElementsByTagName('td');
  
  for (i = 0;i<tamanhoTabuleiro; i++){
  	for (j = 0; j < tamanhoTabuleiro; j++){
  		 	
	 	if(matriz[i][j] == 'l')cell[cont].innerHTML="<img src='l.gif' alt='hello'/>";	
		else if(matriz[i][j] == '*')cell[cont].innerHTML="<img src='*.gif' alt='hello'/>";	
		else if(matriz[i][j] == 'v')cell[cont].innerHTML="<img src='v.gif' alt='hello'/>";	
		else if(matriz[i][j] == 'c')cell[cont].innerHTML="<img src='c.gif' alt='hello'/>";	
  	 	else if(matriz[i][j] == 'cs')cell[cont].innerHTML="<img src='cs.gif' alt='hello'/>";	
  	 	else if(matriz[i][j] == 'vs')cell[cont].innerHTML="<img src='vs.gif' alt='hello'/>";
  	 	else if(matriz[i][j] == 'cc')cell[cont].innerHTML="<img src='cc.gif' alt='hello'/>";
  	 	else if(matriz[i][j] == 'vv')cell[cont].innerHTML="<img src='vv.gif' alt='hello'/>";
  	 	else if(matriz[i][j] == 'ccs')cell[cont].innerHTML="<img src='ccs.gif' alt='hello'/>";
  	 	else if(matriz[i][j] == 'vvs')cell[cont].innerHTML="<img src='vvs.gif' alt='hello'/>";
  	 	//caso se queira fazer uma dama

  	 	cont++;

	 }
  }
 }

//atualiza o tabuleiro com uma determinada peça
function muda(x,y,peca){
  	
	matriz[y][x]=peca;

 }

//evento para capturar posição do mouse
function whichElement(e) {
    var targ;
    if (!e) {
        var e = window.event;
    }
    if (e.target) {
        targ=e.target;
    } else if (e.srcElement) {
        targ=e.srcElement;
    }
    var tname;
    tname = targ.tagName;

    
//posição do inicio do tabuleiro
	    var posTabX=0;
	    var posTabY=0;
	    
	    
	    	if(suavez1){
		    	console.log("suavez1");
			    if(e.clientX -posTabX  < tamanhoTabuleiro*46 && e.clientY -posTabY < tamanhoTabuleiro*50){
			    	var x = e.clientX;
			    	var y = e.clientY;
			    	var i;
			    	for (i =0; i < tamanhoTabuleiro; i++) {
			    		if(x<46*i)break;
			    	}
			    	posX1=i;
			    	
			    	for (i =0; i < tamanhoTabuleiro; i++) {
			    		
			    		if(y<50*i)break;
			    		
			    	}
			    	posY1=i;
			    	
			    	
			    	if(matriz[posY1-1][posX1-1] == "*"){//1º selecionou a peça
			    		muda(posX1-1,posY1-1,"c");
			    		atualizaTabuleiro();	
			    		document.getElementById("msg").innerHTML = 'Vez do Vermelho';
			    		vezDaMaquina1 = true;
			    		suavez1 = false;
			    		if(verificaGanhador(matriz,'c')){
			    			document.getElementById("msg").innerHTML = 'Branco ganhou';
			    			suavez1 = false;
			    			vezDaMaquina1 = true;
						}

						maquina();
						document.getElementById("msg").innerHTML = 'Vez do Branco';
						if(verificaGanhador(matriz,'v')){
							document.getElementById("msg").innerHTML = 'Vermelho ganhou';
			    			suavez1 = false;
			    			vezDaMaquina1 = true;	
						}
			    	}
			    	
			    }
			}
	    
	
    
}


function verificaGanhador(Estado, letra){
	var i,j;
	
	var pontucao =0;
	var cont;
	for(i=0;i<tamanhoTabuleiro;i++){
		for(j=0;j<tamanhoTabuleiro;j++){
			if(Estado[i][j] == letra){
			
				for(cont=0;cont<limite;cont++){
					if(j+cont>=0 && j+cont<tamanhoTabuleiro)
					if(Estado[i][j+cont] == letra)pontucao++;
				}
				if (pontucao == limite) {return true}
				else pontucao=0;


				for(cont=0;cont<limite;cont++){
					if(i+cont>=0 && i+cont<tamanhoTabuleiro)
					if(Estado[i+cont][j] == letra)pontucao++;
				}
				if (pontucao == limite) {return true}
				else pontucao=0;




				for(cont=0;cont<limite;cont++){
					if(j+cont>=0 && j+cont<tamanhoTabuleiro && i+cont>=0 && i+cont<tamanhoTabuleiro)
					if(Estado[i+cont][j+cont] == letra){
						pontucao++;
					}
				}
				
				if (pontucao == limite) {return true}
				else pontucao=0;
								
				for(cont=0;cont<limite;cont++){
					if(j-cont>=0 && j-cont<tamanhoTabuleiro && i+cont>=0 && i+cont<tamanhoTabuleiro)
					if(Estado[i+cont][j-cont] == letra){
						pontucao++;
					}
				}
				
				if (pontucao == limite) {return true}
				else pontucao=0;
				




			}


		}

	}
	return false;
}

function geraEstados(EstadoAtual, letra){

var fronteira = [[["*"]]];
fronteira.shift();//remove primeiro item do array

var tamFronteira=0;
for (var i = 0; i < EstadoAtual.length; i++) {
	
	for (var j = 0; j < EstadoAtual[i].length; j++) {
		rascunho = EstadoAtual.slice();
		if(EstadoAtual[i][j] == "*"){
			tamFronteira++;
		}
	}

}



for (var k = 0; k <tamFronteira; k++) {

	fronteira.push([]);
	for(var i=0;i<EstadoAtual.length;i++){
		fronteira[k].push([]);
		for (var j = 0; j <EstadoAtual.length; j++) {
				fronteira[k][i].push(EstadoAtual[i][j].slice());
		}
	}

}




var cont=0;
for (var i = 0; i < EstadoAtual.length; i++) {
	
	for (var j = 0; j < EstadoAtual[i].length; j++) {
		
		if(EstadoAtual[i][j] == "*"){
			
			fronteira[cont][i][j] = letra.slice();
			cont++;

		}
		
	}

}
if(fronteira.length==0)return null;
return fronteira;

}

//numero de ameaça
function heuristica(EstadoAtual){
	var i,j;
	//console.log("heuristica");
	
	
	var cont;
	var rodada=0;
	var letra='c';
	var valorHeuristico=0;
	while(rodada<2){
		var pontucao =0;
		if(rodada==1)letra='v';
		for(i=0;i<tamanhoTabuleiro;i++){
			for(j=0;j<tamanhoTabuleiro;j++){
				if(matriz[i][j] == letra){
					pontucao =0;
				
					
					//verifica na horizontal esquerda para direita
					for(cont=0;cont<limite;cont++){
						if(j+cont>=0 && j+cont<tamanhoTabuleiro && j!=tamanhoTabuleiro-(limite-1)){
							if(matriz[i][j+cont] == letra){
								pontucao++;
								
								
							}
							if((letra=='c' && matriz[i][j+cont] =="v") || (letra=='v' && matriz[i][j+cont] =="c")){
								pontucao=0;
							}
						}
					}
					//console.log("heuristica1: "+pontucao);
					if (pontucao == limite-1) {
						if(letra =='c'){
							console.log("i: "+ i +"j: "+ j);
							valorHeuristico--;
						}else{
							valorHeuristico++;
						}	

					}else if(pontucao==limite){
						if(letra=='c'){
							return -9999;
						}else{
							return 9999;
						}

					}
					pontucao=0;

					//na horizontal direita para esquerda
					
					for(cont=0;cont<limite;cont++){
						if(j-cont>=0 && j-cont<tamanhoTabuleiro && j!= limite-2){
							if(matriz[i][j-cont] == letra){
								pontucao++;
							}
							if((letra=='c' && matriz[i][j-cont] =="v") || (letra=='v' && matriz[i][j-cont] =="c")){
								pontucao=0;
							}
						}
					}
					//console.log("heuristica1: "+pontucao);
					if (pontucao == limite-1) {
						if(letra =='c'){
							valorHeuristico--;
						}else{
							valorHeuristico++;
						}	

					}
					if(pontucao==limite){
						if(letra=='c'){
							return -9999;
						}else{
							return 9999;
						}

					}
					pontucao=0;








					//vertical de baixo pra cima
					for(cont=0;cont<limite;cont++){
						if(i+cont>=0 && i+cont<tamanhoTabuleiro && i!=tamanhoTabuleiro - (limite-1)){
							if(matriz[i+cont][j] == letra)pontucao++;
							if((letra=='c' && matriz[i+cont][j] =="v") || (letra=='v' && matriz[i+cont][j] =="c")){
								pontucao=0;
							}
						}
					}
					if (pontucao == limite-1) {
						if(letra =='c'){
							
							valorHeuristico--;
						}else{
							valorHeuristico++;
						}	

					}
					else if(pontucao==limite){
						if(letra=='c'){
							return -9999;
						}else{
							return 9999;
						}

					}
					pontucao=0;

					//vertical de cima para baixo
					for(cont=0;cont<limite;cont++){
						if(i-cont>=0 && i-cont<tamanhoTabuleiro && i!=limite-2){
							if(matriz[i-cont][j] == letra)pontucao++;
							if((letra=='c' && matriz[i-cont][j] =="v") || (letra=='v' && matriz[i-cont][j] =="c")){
								pontucao=0;
							}
						}
					}
					if (pontucao == limite-1) {
						if(letra =='c'){
							
							valorHeuristico--;
						}else{
							valorHeuristico++;
						}	

					}
					else if(pontucao==limite){
						if(letra=='c'){
							return -9999;
						}else{
							return 9999;
						}

					}
					pontucao=0;

					//

					//diagonal esquerdaSuperior-direitaInferior
					for(cont=0;cont<limite;cont++){
						if(j+cont>=0 && j+cont<tamanhoTabuleiro && i+cont>=0 && i+cont<tamanhoTabuleiro && j+(limite-1) <tamanhoTabuleiro && i+(limite-1)<tamanhoTabuleiro){
							if(matriz[i+cont][j+cont] == letra){
								pontucao++;
							}
							if((letra=='c' &&  matriz[i+cont][j+cont] =="v") || (letra=='v' && matriz[i+cont][j+cont] =="c")){
								pontucao=0;
							}
						}
					}
					
					if (pontucao == limite-1) {
						if(letra =='c'){
							valorHeuristico--;
						}else{
							valorHeuristico++;
						}	

					}
					else if(pontucao==limite){
						if(letra=='c'){
							return -9999;
						}else{
							return 9999;
						}

					}
					pontucao=0;
					
					//direita inferio - esquerda superior
					for(cont=0;cont<limite;cont++){
						if(j-cont>=0 && j-cont<tamanhoTabuleiro && i-cont>=0 && i-cont<tamanhoTabuleiro && j-(limite-1) >=0 && i-(limite-1)>=0){
							if(matriz[i-cont][j-cont] == letra){
								pontucao++;
							}
							if((letra=='c' &&  matriz[i-cont][j-cont] =="v") || (letra=='v' && matriz[i-cont][j-cont] =="c")){
								pontucao=0;
							}
						}
					}
					
					if (pontucao == limite-1) {
						if(letra =='c'){
							valorHeuristico--;
						}else{
							valorHeuristico++;
						}	

					}else if(pontucao==limite){
						if(letra=='c'){
							return -9999;
						}else{
							return 9999;
						}

					}
					pontucao=0;


					//esquerda inferior  direita superior
					for(cont=0;cont<limite;cont++){
						if(j-cont>=0 && j-cont<tamanhoTabuleiro && i+cont>=0 && i+cont<tamanhoTabuleiro && i + limite-1 <tamanhoTabuleiro && j-(limite-1)>=0){
							if(matriz[i+cont][j-cont] == letra){
								pontucao++;
							}
							if((letra=='c' && matriz[i+cont][j-cont] =="v") || (letra=='v' && matriz[i+cont][j-cont] =="c")){
								pontucao=0;
							}
						}
					}
					
					if (pontucao == limite-1) {
						if(letra =='c'){
							valorHeuristico--;
						}else{
							valorHeuristico++;
						}	

					}else if(pontucao==limite){
						if(letra=='c'){
							return -9999;
						}else{
							return 9999;
						}

					}
					pontucao=0;

					//direita superior - esquerda inferior
					for(cont=0;cont<limite;cont++){
						if(j+cont>=0 && j+cont<tamanhoTabuleiro && i-cont>=0 && i-cont<tamanhoTabuleiro && i-(limite-1)>=0 && j + limite-1 <tamanhoTabuleiro){
							if(matriz[i-cont][j+cont] == letra){
								pontucao++;
							}
							if((letra=='c' && matriz[i-cont][j+cont] =="v") || (letra=='v' && matriz[i-cont][j+cont] =="c")){
								pontucao=0;
							}
						}
					}
					
					if (pontucao == limite-1) {
						if(letra =='c'){
							valorHeuristico--;
						}else{
							valorHeuristico++;
						}	

					}else if(pontucao==limite){
						if(letra=='c'){
							return -9999;
						}else{
							return 9999;
						}

					}
					 pontucao=0;
					




				}


			}

		}
	rodada++;
	}
	return valorHeuristico;
}

//representa as ações do algoritmo
function maquina(){
	var resposta = maximo(matriz,0,infinito);
	console.log("resposta: "+resposta);
	for (var i = 0; i < matriz.length; i++) {
		for (var j = 0; j < matriz[i].length; j++) {
			if(matriz[i][j] != resposta[i][j]){
				matriz[i][j] = resposta[i][j].slice();
			}
		}
		
	}
	atualizaTabuleiro();
	vezDaMaquina1 = false;
	suavez1 = true;
}
//Algoritmo alfa-beta pruning
function maximo(EstadoInicial, alturaAtual, avoMax){
	
	alturaAtual++;
	
	alt = alturaAtual;
	var posMelhorJogada =0;
	var avoMin=-infinito;
	var maiorValor = -infinito;

	
	var a=0;


	var fronteira = geraEstados(EstadoInicial,'v');
	//console.log(fronteira);
	

	////////////teve um vencedor
	if(verificaGanhador(EstadoInicial,"c")){
	//	console.log("branco venceu");
		//console.log(EstadoInicial);
		
		return -666;
		
	}

	if(verificaGanhador(EstadoInicial,"v")){
	//	console.log("vermelho venceu");
	//	console.log(EstadoInicial);
	//if(alturaAtual==1)console.log("saiu");
		return 666;
	}

	///////////////////////



	if(fronteira == null || alturaAtual > previsao ){
		
		//console.log("Valor da alturaAtual: "+alturaAtual);
		
		return heuristica2();
	}else{
		for (var i = 0; i < fronteira.length; i++) {

			a=minimo(fronteira[i],alturaAtual,avoMin);
			//if(alturaAtual==1)console.log("altura = 1 => a: "+a);
			
			if(a>=avoMax && alturaAtual!=1){
				
				return infinito;	
			} 
			else if(a>maiorValor){
				maiorValor=a;
				avoMin=a;
			//	if(alturaAtual==1)console.log("avo min"+avoMin);
				posMelhorJogada =i;
			}






			
		}

	}
	if(alturaAtual==1)return fronteira[posMelhorJogada];
	else return maiorValor;

}


function minimo(EstadoInicial,alturaAtual,avoMin){
	
	alturaAtual++;
	var avoMax=infinito;
	var fronteira = geraEstados(EstadoInicial,"c");
	var menorValor = infinito;


	var a=0;


	////////////teve um vencedor
	if(verificaGanhador(EstadoInicial,"c")){
	//	console.log("branco venceu");
	//	console.log(EstadoInicial);
		
		return -666;
		
	}

	if(verificaGanhador(EstadoInicial,"v")){
	//	console.log("vermelho venceu");
	//	console.log(EstadoInicial);
		return 666;
	}

	///////////////////////


	
	
	if(fronteira == null || alturaAtual>previsao){
		
		return heuristica2();

	}
	else{
		for (var i = 0; i < fronteira.length; i++) {
			a = maximo(fronteira[i],alturaAtual, avoMax);
			
			if(a<=avoMin)return -infinito;
			 if(a< menorValor){
				menorValor =a;
				avoMax =a;
			}
		}
	}
	return menorValor;
}



function euComeco() {
	for(var i=0;i<tamanhoTabuleiro;i++){
	
		for (var j = 0; j <tamanhoTabuleiro; j++) {
				matriz[i][j] ='*';
		}
	}
	atualizaTabuleiro();
	suavez1 = true;
	vezDaMaquina1 = false;

}	
	// body...


function euNaoComeco() {

	for(var i=0;i<tamanhoTabuleiro;i++){
	
		for (var j = 0; j <tamanhoTabuleiro; j++) {
				matriz[i][j] ='*';
		}
	}
	atualizaTabuleiro();
	maquina();
	

	}	
	// body...

	//heuristica 2: quanto mais oportunidade de fazer um jogo vencedor melhor
function heuristica2(){
		var i,j;
	//console.log("heuristica");
	
	
	var cont;
	var rodada=0;
	var letra='c';
	var valorHeuristicoBranco=0;
	var valorHeuristicoVermelho=0;
	while(rodada<2){
		var pontucao =0;
		if(rodada==1)letra='v';
		for(i=0;i<tamanhoTabuleiro;i++){
			for(j=0;j<tamanhoTabuleiro;j++){
				
					pontucao =0;
				
					
					//verifica na horizontal 
					for(cont=0;cont<limite;cont++){
						if(j+cont>=0 && j+cont<tamanhoTabuleiro ){
							if(matriz[i][j+cont] == letra || matriz[i][j+cont] == "*"){
								pontucao++;
								
								
							}else{
								pontucao =0;
							}
							
						}
					}
					

					if (pontucao == limite) {
						if(letra =='c'){
							valorHeuristicoBranco++;
						}else{
							valorHeuristicoVermelho++;
						}	
					}
					pontucao=0;
					
					// vefifica na vertical
					for(cont=0;cont<limite;cont++){
						if(i+cont>=0 && i+cont<tamanhoTabuleiro){
							if(matriz[i+cont][j] == letra || matriz[i+cont][j] == "*"){
								pontucao++;
								
								
							}else{
								pontucao =0;
							}
							
						}
					}
					//console.log("heuristica1: "+pontucao);
					if (pontucao == limite) {
						if(letra =='c'){
							valorHeuristicoBranco++;
						}else{
							valorHeuristicoVermelho++;
						}	
					}
					pontucao=0;
					
					//esq superior -> direita inferior
					for(cont=0;cont<limite;cont++){
						if(i+cont>=0 && i+cont<tamanhoTabuleiro&&j+cont>=0 && j+cont<tamanhoTabuleiro){
							if(matriz[i+cont][j+cont] == letra || matriz[i+cont][j+cont] == "*"){
								pontucao++;
								
								
							}else{
								pontucao =0;
							}
							
						}
					}
					//console.log("heuristica1: "+pontucao);
					if (pontucao == limite) {
						if(letra =='c'){
							valorHeuristicoBranco++;
						}else{
							valorHeuristicoVermelho++;
						}	
					}
					pontucao=0;

					//esq inferior -> direita superior
					for(cont=0;cont<limite;cont++){
						if(i-cont>=0 && i-cont<tamanhoTabuleiro&&j+cont>=0 && j+cont<tamanhoTabuleiro){
							if(matriz[i-cont][j+cont] == letra || matriz[i-cont][j+cont] == "*"){
								pontucao++;
								
								
							}else{
								pontucao =0;
							}
							
						}
					}
					//console.log("heuristica1: "+pontucao);
					if (pontucao == limite) {
						if(letra =='c'){
							valorHeuristicoBranco++;
						}else{
							valorHeuristicoVermelho++;
						}	
					}
					pontucao=0;


				//na horizontal direita para esquerda
			}
		}
		
		
	rodada++;
	}
	
	
		
	return valorHeuristicoVermelho -valorHeuristicoBranco;	

}
