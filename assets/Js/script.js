$(document).ready(function () {
    // //Javascript
    var exampleCars = ["mustang", "evo lancer", "rx7", "gtr", "supra", "nissan silvia", "370z", "miata", "gti", "bmw E30"]
// use api to grab GIFS corresponding to a car search
    function carGifs() {
        $("#gifs").empty();
        
        var carSearch = $(this).attr("data-car");

        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + carSearch + "&api_key=gBpiXvp8GYVz38NiBBNHJjLI7D3P2pCF&limit=10&rating=PG-13&lang=en";
       //ajax call to the api grabing results and adding the exampleCars
        $.ajax({
                url: queryURL,
                method: "GET"
            })
            .then(function (response) {

               // console.log(response.data);

                var results = response.data;
                //loop the each result to add tags 
                for (var i = 0; i < results.length; i++) {
                    

                    var gifDiv = $("<div>");

                    var carImage = $("<img>");
                    // var rating = results[i].rating;
                    var p = $("<p>").text("Rating:" + response.data[0].rating);

                    carImage.attr("src", results[i].images.fixed_height.url);
                    carImage.addClass("gifAdded");
                  
                    gifDiv.append(carImage);

                    gifDiv.append(p);

                    $("#gifs").prepend(gifDiv);
                    
                

                };
                $(".gifAdded").on("click", function(){
                    console.log(this)
                    $(".gifAdded").stop()
                })
            });
            
    };

    // $(".gifAdded").on("click", function(){
    //     console.log("hey")
    // })
    
    //renders buttons to the screen
    function renderButtons() {

        $("#buttons").empty();

        for (var e = 0; e < exampleCars.length; e++) {

            var makeButtons = $("<button>");

            makeButtons.addClass("car");

            makeButtons.attr("data-car", exampleCars[e]);

            makeButtons.text(exampleCars[e]);

            $("#buttons").append(makeButtons);
            
        };
    };

    $(document).on("click", ".car", carGifs);
    
    renderButtons();
//adds button on click and validates each input to see if it already exist if it doesnt it adds it 
    $("#add-car").on("click", function (event) {

        event.preventDefault();

        var input = $("#car-input").val().trim();
        
        var existingCar = "";

        for (var i = 0; i < exampleCars.length; i++) {
            if(exampleCars[i] === input) {
                existingCar = exampleCars[i];
            };
        };

        if (input === "" || input === existingCar) {
            alert("Please Fill in Text!! or Input already exist!!");
        } else if (input) {
            exampleCars.push(input);
            renderButtons();
        };
    });
    
});
// enjoy the GIFS!!! 😁