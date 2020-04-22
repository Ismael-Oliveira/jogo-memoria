window.onload = function(){

	let images = [];
	let flippedCard = [];
	let matches = 0;

	let endGame = document.querySelector('#imgGameOver');
	let modalGame = document.querySelector('.modalGameOver');
	//imagem a ser exibida em caso de acerto
	let matchSign = document.querySelector("#match");

	for (let i = 0; i < 16; i++) {
		
		var img = {
			src:	`img/${i}.jpg`,
			 id:	i%8	 	 
		};
		
		images.push(img);
		
	}
	// console.log(images[i]);
	
	//chama a função de inicialização do jogo
	startGame();
	
	//função de inicialização do jogo
	function startGame(){
		
		flippedCard = [];
		images = randomsort(images);

		//lista de elementos div com as classes back e front
		var backFaces = document.getElementsByClassName("back");
		var frontFaces = document.getElementsByClassName("front");

		//posicionamento das cartas e adição do evento click
		for(var i = 0; i < 16; i++){

			backFaces[i].classList.remove("flipped");
			frontFaces[i].classList.remove("match","flipped");

			//posiciona as cartas no tabuleiro
			var card = document.querySelector("#card" + i);
            
			//adiciona às cartas o evento click chamando a função que vira as cartas
			card.addEventListener("click",flipCard,false);

			frontFaces[i].style.background = `url(${images[i].src})`;
			frontFaces[i].setAttribute('id', images[i].id);
		}
		modalGame.style.zIndex = -1;		
		endGame.removeEventListener('click', startGame, false);
    }
	
	//embaralha os cards
	function randomsort(oldArray){

		let newArray = [];

		while (newArray.length !== oldArray.length) {
			let i = Math.floor(Math.random()*16);
			
			if(newArray.indexOf(oldArray[i]) < 0){
				newArray.push(oldArray[i]);
			}
		}

		return newArray;

	}

    //função que vira as cartas
	function flipCard(){

		if(flippedCard.length < 2){
		
			//pega as faces da carta clicada
			var faces = this.getElementsByClassName("face");

			if(faces[0].classList[2]){
				return;
			}
			// console.log(faces);
			//adiciona a classe flipped às faces da carta para que sejam viradas
			faces[0].classList.toggle("flipped");//verso [back] - que está por cima
			faces[1].classList.toggle("flipped");//verso [back] - que está por baixo

			flippedCard.push(this);	

			if(flippedCard.length === 2){
				
				if(flippedCard[0].childNodes[3].id === flippedCard[1].childNodes[3].id){

					flippedCard[0].childNodes[3].classList.toggle("match");
					flippedCard[1].childNodes[3].classList.toggle("match");

					//chama a função que exibe a mensagem MATCH
					matchCardsSign();
					
					matches++;

					if(matches >= 8){
						gameOver();
					}
					// console.log(matches);
					flippedCard = [];
				}
			}
	

		}else {

			flippedCard[0].childNodes[1].classList.toggle("flipped");
			flippedCard[0].childNodes[3].classList.toggle("flipped");
			flippedCard[1].childNodes[1].classList.toggle("flipped");
			flippedCard[1].childNodes[3].classList.toggle("flipped");
			
			flippedCard = [];			
		}

		// console.log(flippedCard);
		
	}

	//função que gera o sinal de MATCH
	function matchCardsSign(){
		//joga a mensagem de MATCH para o primeiro plano
		matchSign.style.zIndex = "1";
		
		//deixa a mensagem transparente
		matchSign.style.opacity = "0";
		
		//move a mensagem para cima
		matchSign.style.top = "150px";
		
		//função executada após 1.5 segundo
		setTimeout(function(){
			//joga a mensagem de MATCH para o plano de fundo
			matchSign.style.zIndex = "-1";
			
			//remove a transparência da mansagem
			matchSign.style.opacity = "1";
			
			//move a mensagem para o centro da tela
			matchSign.style.top = "250px";
		},1500);
	}//fim da função que exibe mensagem de MATCH


	function gameOver(){
		
		modalGame.style.zIndex = 1;		
		endGame.addEventListener('click', startGame, false);

	}
};