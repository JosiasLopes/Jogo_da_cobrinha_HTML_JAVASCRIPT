let canvas = document.getElementById("canvas");
canvas.style.backgroundColor = "#FF0F0F";
let context = canvas.getContext("2d");
let box = 32;

//cria um vetor da cobra
let cobra = [];
let pontos = 0;
let devoradas = 0;
let vidas = 5;
let jogo_ativo = true;
let pause = false;
cobra[0] = {x:8*box,y:8*box}
let food = 
	{
		//o random gera numero aleatorio em ponto flutuante
		//o math.floor tira o ponto flutuante ficando um numero inteiro
		x:Math.floor(Math.random()*14+1)*box,
		y:Math.floor(Math.random()*14+1)*box
	};




//seta a direção inicial da cobra;
let direction = "right";
function criarBg(){

	context.fillStyle = "gray";
	context.fillRect(0,0,16*box,16*box);
}

//adiciona um leitor de lefteventos ao documento
document.addEventListener('keydown',update);

function update(event){


	if(event.keyCode==37 && direction != "right" ){
		direction = "left";
	
	}
	if(event.keyCode==38 && direction != "down" ){
		direction = "up";
		
	}
	if(event.keyCode==39 && direction != "left" ){
		direction = "right";
		
	}
	if(event.keyCode==40 && direction != "up" ){
		direction = "down";
			
	}
	if(event.keyCode==32 && direction != "up" ){
		if(pause == true){
			pause = false;
		}else{
			pause = true;
		}
			
	}
	

}



function iniciarJogo(){
	if(jogo_ativo && pause == false){

		criarBg();
drawFood();

criaCobra();
let cobraX = cobra[0].x;
let cobraY = cobra[0].y;


for(i=1;i<cobra.length;i++){
	if(cobra[0].y == cobra[i].y && cobra[0].x == cobra[i].x){
		console.info("Perdeu");
		clearInterval(jogo);
		alert("fim de jogo");
	}

}
if(direction == "right") cobraX += box;
	if(direction == "left") cobraX-= box;
	if(direction == "up") cobraY-= box;
	if(direction == "down") cobraY+= box;

	
	if(cobraX !=food.x || cobraY!= food.y){
		//retira o ultimo elemento do vetor da cobra
	cobra.pop();
}else{

	food.x =Math.floor(Math.random()*14+1)*box;
	food.y =Math.floor(Math.random()*14+1)*box;
}


let newCabeca = {x:cobraX,y:cobraY}
	cobra.unshift(newCabeca);

	if(cobra[0].x>(16*box)){
		cobra[0].x = 0;
	}else if(cobra[0].x<0){
		cobra[0].x = (16*box);

	}else if(cobra[0].y<0){
		cobra[0].y = (16*box);

	}else if(cobra[0].y>(16*box)){
		cobra[0].y = 0;	
	}

	}else{
		pause = true;
	}

	drawTextPause();

	
}

function criaCobra(){

	for(i=0;i<cobra.length;i++){
		context.fillStyle = "green";
		context.fillRect(cobra[i].x,cobra[i].y,box,box);
	}
}

function drawFood(){
	context.fillStyle = "red";
	context.fillRect(food.x,food.y,box,box);
}


function drawTextPause(){
	context.font = "40px arial";
	if(jogo_ativo == true){
		if(pause == true){
		context.fillStyle = 'rgba(220,220,220,1)';
	}else{
		context.fillStyle = 'rgba(220,220,220,0)';
	}
	}
	
	
	context.fillText('Pause', 200, 256);
}
let jogo = setInterval(iniciarJogo,100);
