$(document).ready(function () {

    // Function for dumping the JSON content for each button into the div
    function displayGameInfo() {
        var key = "BkaUZZWcFij6J7AoQj3WtPb1R2p9O6V9"
        var game = $(this).attr("data-name");
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + game + "&apikey=" + key + "&limit=10";

        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {
            // $("#games-view").text(JSON.stringify(response));
            console.log(response);
        });
    }
    var topics = ["Tomb Raider", "Call of Duty", "Destiny", "Mortal Combat"];

    // Function for displaying button data
    function renderButtons() {

        // Delete previous buttons
        $("#buttons-view").empty();

        // Looping through the array of games
        for (var i = 0; i < topics.length; i++) {

            // Create a button for each item in the array
            var a = $("<button>");
            // Adding a class to the button
            a.addClass("game");
            // Adding a data-attribute
            a.attr("data-name", topics[i]);
            // Providing the initial button text
            a.text(topics[i]);
            // Adding the button to the buttons-view div
            $("#buttons-view").append(a);
        }
    }

    renderButtons();
    // This function handles events where one button is clicked
    $("#add-game").on("click", function (event) {
        event.preventDefault();

        // This line grabs the input from the textbox
        var input = $("#game-input").val().trim();

        // Take the input from the textbox and move it to the array
        topics.push(input);
        console.log(input);

        renderButtons();
    });

    // Function for displaying the game info
    $(document).on("click", ".game", displayGameInfo);

    // Calling the renderButtons function to display the initial buttons
    renderButtons();

})