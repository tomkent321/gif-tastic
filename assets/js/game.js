
      
      
      // Initial array of animals


      var animals = [];

    

      
      function displayAnimalInfo() {

      $("#gifs-appear-here").empty(); 

        var animal = $(this).attr("data-name");
        
        
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
        animal + "&api_key=dc6zaTOxFJmzC&limit=10&rating=g";
        // Creating an AJAX call for the specific animal button being clicked
        $.ajax({
          url: queryURL,
          method: "GET"
        })
        


        .then(function(response) {


      // build the individual displays

          var results = response.data;
console.log(results);

         
          for (var i = 0; i < results.length; i++) {

            var animalDiv = $("<div>");
            var animalImage = $("<img>");

            animalImage.attr("src", results[i].images.fixed_height_still.url).attr("data-animate",results[i].images.fixed_height.url).attr("data-still",results[i].images.fixed_height_still.url).attr("data-state","still").addClass("gif");
            animalImage.addClass("float-pics pic-style");
            animalDiv.append(animalImage);
            
            


            $("#gifs-appear-here").append(animalDiv);

          }
        });

          
      }; 
     

      function renderButtons() {

        $("#buttons-view").empty();
        $("#animal-input").val("");

        for (var i = 0; i < animals.length; i++) {

          var a = $("<button>");
          a.addClass("animal-btn");
          a.attr("data-name", animals[i]);
          a.text(animals[i]);
          $("#buttons-view").append(a);
        }
      }


      $("#add-animal").on("click", function(event) {
        event.preventDefault();
        var animal = $("#animal-input").val().trim();
        animals.push(animal);
        renderButtons();
        $('animal-input').attr("value", "");
      });


    $(document).on("click", ".gif", function() {

      var state = $(this).attr("data-state");

      if (state === "still") {
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");
      } else {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
      }
    });

      $(document).on("click", ".animal-btn", displayAnimalInfo);

      // Calling the renderButtons function to display the intial buttons
      renderButtons();
 