	// Initial array of movies
	var animals = ['Cat', 'Tiger', 'Puppy', 'Lion'];

	// ========================================================

	// displayAnimalInfo function now re-renders the HTML to display the appropriate content. 
	function displayAnimalInfo(){

		$('#animalsView').empty();
		var animal = $(this).data('name');
        var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + animal + "&api_key=dc6zaTOxFJmzC&limit=10";
		
		// Creates AJAX call for the specific animal being 
		$.ajax({url: queryURL, method: 'GET'}).done(function(response) {
			console.log(queryURL);
			var results = response.data;
			for (var i = 0; i < results.length; i++) { 
					var animalDiv = $('<div>');

                    var p = $('<p>').text("Rating: " + results[i].rating);

                    var animalImage = $('<img>');
                    animalImage.addClass("animalImage");
                    animalImage.attr('src', results[i].images.fixed_height_still.url);
                    animalImage.attr('data-state', 'still');
                    animalImage.attr('data-still', results[i].images.fixed_height_still.url);
                    animalImage.attr('data-animate', results[i].images.fixed_height.url);
                    animalDiv.append(p);
                    animalDiv.append(animalImage);
                    $('#animalsView').prepend(animalDiv);

			}

			
			
		});

	}


	// Generic function for displaying movie data 
	function renderButtons(){ 

		// Deletes the animals prior to adding new animals (this is necessary otherwise you will have repeat buttons)
		$('#buttonsView').empty();

		// Loops through the array of animals
		for (var i = 0; i < animals.length; i++){

			// Then dynamicaly generates buttons for each movie in the array

			// Note the jQUery syntax here... 
		    var a = $('<button>') // This code $('<button>') is all jQuery needs to create the beginning and end tag. (<button></button>)
		    a.addClass('animal'); // Added a class 
		    a.attr('data-name', animals[i]); // Added a data-attribute
		    a.text(animals[i]); // Provided the initial button text
		    $('#buttonsView').append(a); // Added the button to the HTML
		}
	}

	// ========================================================

	// This function handles events where one button is clicked
	$('#addAnimal').on('click', function(){

		// This line of code will grab the input from the textbox
		var animal = $('#animal-input').val().trim();

		// The movie from the textbox is then added to our array
		animals.push(animal);
		
		// Our array then runs which handles the processing of our movie array
		renderButtons();

		// We have this line so that users can hit "enter" instead of clicking on ht button and it won't move to the next page
		return false;
	})


	// Generic function for displaying the movieInfo
	$(document).on('click', '.animal', displayAnimalInfo);


	// This calls the renderButtons() function
	renderButtons();


$(".animalImage").click(function(){
	var state = $(this).attr('data-state'); 
	        
            if ( state == 'still'){
                $(this).attr('src', $(this).data('animate'));
                $(this).attr('data-state', 'animate');
            }else{
                $(this).attr('src', $(this).data('still'));
                $(this).attr('data-state', 'still');
            }
});

