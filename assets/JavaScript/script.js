// //Javascript
var exampleCars = ["mustang", "evo lancer", "rx7", "gtr", "supra", "nissan silvia", "370z", "miata", "mitsubishi 3000gt"]

function carGifs(){
    // console.log("it works");
   var carSearch = $(this).attr("data-car");
   console.log(carSearch);
     var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + carSearch + "&api_key=gBpiXvp8GYVz38NiBBNHJjLI7D3P2pCF&limit=10&rating=PG-13&lang=en";
     console.log(queryURL)
     $.ajax({
         url: queryURL,
         method: "GET"
     })
     .then(function(response){
     
         console.log(response.data);

                 var results = response.data;

                 for (var i = 0; i < results.length; i++){

             var gifDiv = $("<div>");

             var carImage = $("<img>");
            // var rating = results[i].rating;
             var p = $("<p>").text("Rating:" + response.data[0].rating);

             carImage.attr("src", results[i].images.fixed_height.url);
             //gifDiv.append(p);
             gifDiv.append(carImage);

             gifDiv.append(p);

             $("#gifs").prepend(gifDiv);
     }
    });
}
    function renderButtons(){
        
        $("#buttons").empty();

        for (var e = 0; e < exampleCars.length; e++) {

            var makeButtons = $("<button>");

            makeButtons.addClass("car");

            makeButtons.attr("data-car", exampleCars[e]);

            makeButtons.text(exampleCars[e]);

            $("#buttons").append(makeButtons);
        }
    }
    $("#add-car").on("click", function(event){

        event.preventDefault();

        var cars = $("#car-input").val().trim();

        exampleCars.push(cars);

        renderButtons();

    });
    $(document).on("click", ".car", carGifs);
renderButtons();


















