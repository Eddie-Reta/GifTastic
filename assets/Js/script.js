$(document).ready(function () {
     //Javascript + JQUERY

    var exampleCars = ["Mustang", "Evo Lancer", "Rx7", "G.T.R.", "Supra", "Nissan Silvia", "370z", "Miata", "GTI", "BMW E30"]
    // Use api to grab GIFS corresponding to a car search

    //This function is for the initial page, so gifs will be loaded on the page.
    function firstCar() {

        var mustang = "https://api.giphy.com/v1/gifs/search?q=mustang&api_key=gBpiXvp8GYVz38NiBBNHJjLI7D3P2pCF&limit=9&rating=PG-13&lang=en";
        $.ajax({
                url: mustang,
                method: "GET"
            })
            .then(function (response) {

                var results = response.data;

                //loop through the results to find  each gif image
                for (var i = 0; i < results.length; i++) {

                    var gifDiv = $("<div>");

                    var carImage = $("<img>");

                    var p = $("<p class='rating'>").text("Rating:" + response.data[0].rating);

                    carImage.attr("src", results[i].images.original_still.url);

                    carImage.attr("id", results[i].id)

                    carImage.addClass("gifAdded");

                    gifDiv.append(carImage);

                    gifDiv.append(p);

                    $("#gifs").prepend(gifDiv);

                };
                
                 //Function to play and stop gif
             playGif(results);
            });
    };

    firstCar();

    //This function  interacts with each button pressed supplying the appropriate gifs.
    function carGifs() {
        $("#gifs").empty();

        var carSearch = $(this).attr("data-car");
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + carSearch + "&api_key=gBpiXvp8GYVz38NiBBNHJjLI7D3P2pCF&limit=9&rating=PG-13&lang=en";

        //ajax call to the api grabing results and adding the exampleCars
        $.ajax({
                url: queryURL,
                method: "GET"
            })
            .then(function (response) {

                console.log(response.data);
                let paused = true;
                var results = response.data;

                //loop the each result to add tags 
                for (var i = 0; i < results.length; i++) {

                    var gifDiv = $("<div>");

                    var carImage = $("<img>");
                    
                    var paragraph = $("<p class='rating'>").text("Rating:" + response.data[0].rating);
                    
                    carImage.attr("id", results[i].id);

                    carImage.attr("src", results[i].images.original_still.url);
                  
                    carImage.addClass("gifAdded");

                    gifDiv.append(carImage);

                    gifDiv.append(paragraph);

                    $("#gifs").prepend(gifDiv);
                };

                //Function to play and stop gif
                playGif(results);
                
            });

    };


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
            if (exampleCars[i] === input) {
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
    ////Every click on the gif it will determine which gif is loaded either the  moving or paused one.
    function playGif(results) {
        $(".gifAdded").on("click", function () {

            for (var i = 0; i < results.length; i++) {

                if (results[i].id === this.id) {

                    if (this.src === results[i].images.original_still.url) {
                        this.src = results[i].images.fixed_height.url;
                        break;
                    };
                    if (this.src === results[i].images.fixed_height.url) {
                        this.src = results[i].images.original_still.url
                        break;
                    };

                };
            };
        });
    }





});

// enjoy the GIFS!!! 😁