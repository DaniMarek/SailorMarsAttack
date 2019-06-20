// variables
	var noOfTileGame = 28;
	var tileIndexes = [];
	var noOfClick = 0;
	var clickCounter = 0;
	var correctGuess = 0;
	var clickImages = [];
	var timeOutRestore = 1000;

// page load
$(function(){
	// render game
	marsAttack.renderGameLayout();

	$("#btnRestart").on("click", function(){marsAttack.renderGameLayout();
	});

});


// game class
marsAttack = {

	//This is to shuffle the images/ load the default game array
	initData: function(){
		for(var x=0; x<=1; x++){for(var i=0; i<= (noOfTileGame/2)-1; i++){tileIndexes.push(i);}}
		this.shuffleArray(tileIndexes);
	},

	//function to shuffle array
	shuffleArray: function(array){
		for (var i = array.length - 1; i > 0; i--) {
			var j = Math.floor(Math.random() * (i + 1));
			var temp = array[i];
			array[i] = array[j];
			array[j] = temp;
		}
	},

	buildGameTiles: function(){
		var tiles = "";
		var tileCover = "";

		// generate the images and image cover
		for(var i = 1; i <= noOfTileGame; i++){
			tiles += "<div id='tile-" + i + "'class='tile-picture'><img src='img/" + (parseInt(tileIndexes[i-1]) + 1) + ".jpg'/></div>";
			tileCover += "<div id='tile-cover-" + i + "' class='tile-cover' data-id='" + (parseInt(tileIndexes[i-1]) + 1) +"'></div>";
		}
		tileCover = "<div class='tile-cover-container'>" + tileCover + "</div>";
		$("#gameboard").html(tiles + tileCover);
		$(".tile-picture").show();
	
		// add event to click the cover image
		$(".tile-cover").off("click");
		$(".tile-cover").on("click", function(){
			if(noOfClick <= 1){
				clickCounter++;
				$("#no-of-clicks").html(clickCounter);
				noOfClick++;

				$(this).addClass('animated flipOutX');
				var clickCover = {
					ImageID: $(this).attr("data-id"),
					CoverID: $(this).attr("id").replace("tile-cover-","")
				}
				clickImages.push(clickCover);

				if(noOfClick >= 2){
					// checks if the revealed images are correct
					
					if(clickImages[0].ImageID == clickImages[1].ImageID && clickImages[0].CoverID !== clickImages[1].CoverID){
						correctGuess++;
						$("#correct-guess").html(correctGuess);
						  
						// reset the variables
						noOfClick = 0;
						clickImages = [];

						// if the game is completed, congrats message pops down, then a reset is run
						if(correctGuess >= (noOfTileGame/2)){
							$("#game-table, #game_stats").fadeOut(1000);
							$("#game-msg").addClass('animated bounceInDown').css('animation-delay', '1s').show();
							correctGuess = 0;
							$("#correct-guess").html(correctGuess);
							clickCounter =0;
							$("#no-of-clicks").html(clickCounter);
						}

					}

					else{
						// if cards don't match, then card flips back to cover
						setTimeout(function(){
							clickImages.forEach(
								function(item, index){
									$("#tile-cover-" + item.CoverID).removeClass("flipOutX").addClass('animated flipInX');
						});
							// reset
							noOfClick = 0;
							clickImages = [];
						}, timeOutRestore);
					}

				}
			}
		});

	},

	// function to call main functions to render the game
	renderGameLayout: function(){
		$("#game-msg").hide();
		$("#game-table, #game_stats").show();
		this.initData();
		this.buildGameTiles();
	}
}