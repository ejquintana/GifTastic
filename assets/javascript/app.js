//Array of Pre-Loaded Buttons
var tvShows = [
'Firefly',
'Man in the High Castle', 
'V', 
'Jimmy Kimmel', 
'Teen Titans Go', 
'Bugs Bunny', 
'The Middle', 
'Knight Rider', 
'Batman', 
'Ghost in the Shell', 
'Pokemon'];
var currentGif; 
var pausedGif; 
var animatedGif; 
var stillGif;

//This function populates buttons from the pre-defined array, calls the API, creates buttions, displays in the DOM
function createButtons(){
   $('#showButtons').empty();
		for(var i = 0; i < tvShows.length; i++){
		 var showBtn = $('<button class = "btn btn-success">').text(tvShows[i]).addClass('showBtn').attr({'data-name': tvShows[i]});
		 $('#showButtons').append(showBtn);
 	    }//for loop end bracket
   $('.showBtn').on('click', function(){
		$('.showGifs').empty();
		var thisShow = $(this).data('name');
		var giphyURL = "https://api.giphy.com/v1/gifs/search?q=tv+show+" + thisShow + "&limit=10&api_key=dc6zaTOxFJmzC";
//Calls the Giphy API and pulls in the Giphys
   $.ajax({
	 url: giphyURL, 
	 method: 'GET'
   }).done(function(giphy){
		currentGif = giphy.data;
		$.each(currentGif, function(index,value){
			animatedGif= value.images.original.url;
			pausedGif = value.images.original_still.url;
		   var showRating = value.rating;
			//gives blank ratings 'unrated' text
			if(showRating == ''){
			showRating = 'unrated';
		    }//If Statement End Bracket

			var rating = $('<h5>').html('Rated: '+showRating).addClass('ratingStyle');
			stillGif= $('<img>').attr('data-animated', animatedGif).attr('data-paused', pausedGif).attr('src', pausedGif).addClass('playOnHover');
					
			var fullGifDisplay = $('<button>').append(rating, stillGif);
			$('.showGifs').append(fullGifDisplay);

	    });//.each(function(giphy)) end bracket 
	    console.log(giphy);
   });//.done(function(giphy)) end bracket

 });//.showBtn end bracket

}// function createButtons end bracket

//Animates and Pauses gif on hover
$(document).on('mouseover','.playOnHover', function(){
  $(this).attr('src', $(this).data('animated'));
 });//mouseover end bracket
 $(document).on('mouseleave','.playOnHover', function(){
 	   	$(this).attr('src', $(this).data('paused'));
 });//mouseleave end bracket

//Creating A New Button from User Input
$('#addShow').on('click', function(){
	var newShow = $('#newGify').val().trim();
	tvShows.push(newShow);
	createButtons();
	//clear input text
	$('#newGify').val('');
	return false;
});//addShow function end bracket

	createButtons();


