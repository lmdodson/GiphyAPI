$(document).ready(function () {

    //! Function for putting the JSON content for each button into the div
    function displayGameInfo() {
        //API key to use in queryURL
        var key = "BkaUZZWcFij6J7AoQj3WtPb1R2p9O6V9"
        //grabs the data-name from the button pushed(this) to use in queryURL
        var game = $(this).attr("data-name");
        //queryURL built from provided parameters and limited to 10
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + game + "&apikey=" + key + "&limit=10";

        //ajax call sent to giphy server to pull requested info
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {
            // assign the response object data to the results variable
            var results = response.data;
            // console log the data to see the results
            console.log(response);

            for (var i = 0; i < results.length; i++) {
                // create a new div for the gif
                var gifDiv = $("<div>");
                // creates a p tag for the rating
                var p = $("<p>").text("Rating = " + results[i].rating);
                // creates an image tag for the gif
                var gameGif = $("<img>").attr("src", results[i].images.fixed_height.url);
                // adds the gif class to the image
                gameGif.addClass("gif");
                // adds a data-still and data-animate attribute for later
                gameGif.attr("data-still", results[i].images.fixed_height_still.url);
                gameGif.attr("data-animate", results[i].images.fixed_height.url);
                gameGif.attr("data-state", "animate");
                // adds the p tag to the gifDiv
                gifDiv.append(p);
                // adds the image to the gifDiv
                gifDiv.append(gameGif);
                // adds the whole gifDiv to the html page
                $("#games-view").prepend(gifDiv);
            };



        });
    }
    var topics = ["Overwatch", "Tomb Raider", "Call of Duty", "Destiny", "Mortal Kombat"];

    //! Function for displaying button data
    function buttonCreate() {
        // Delete previous buttons to avoid duplicates
        $("#buttons-view").empty();
        $("#game-input").val("");

        // Looping through the array of games
        for (var i = 0; i < topics.length; i++) {

            // Create a button for each item in the array
            var a = $("<button>");
            // Adding the class 'game' to the button
            a.addClass("game");
            // Adding a data-attribute (this is how the data is passed from the button to the queryURL)
            a.attr("data-name", topics[i]);
            // Providing the button text
            a.text(topics[i]);
            // Adding the button to the buttons-view div
            $("#buttons-view").append(a);

        }
    }

    //! Function when the submit button is clicked
    $("#add-game").on("click", function (event) {
        event.preventDefault();

        // Grab the input from the textbox
        var input = $("#game-input").val().trim();

        // Take the input from the textbox and move it to the array
        if (input == 0) {
            alert("Please enter a game name and try again");
        } else {
            topics.push(input);
            console.log(input);
            //runs the function to make buttons
            buttonCreate();
        }
    });

    // Function for displaying the game info once a js created button is clicked
    $(document).on("click", ".game", displayGameInfo);
    // Calling the renderButtons function to display the initial buttons
    buttonCreate();

    $(document).on("click", ".gif", stateSwitch);

    function stateSwitch() {
        var currentState = $(this).attr("data-state");
        console.log(currentState);

        if (currentState == "animate") {
            var stillVal = $(this).attr("data-still");
            $(this).attr("src", stillVal);
            $(this).attr("data-state", "still")
        } else {
            var animateVal = $(this).attr("data-animate");
            $(this).attr("src", animateVal);
            $(this).attr("data-state", "animate");
        }

    };

})