$(document).ready(function () { 

    //get the variables
    var inputPlayer = "";
    var playrer = "";


    $("button").on("click", search)
    //listener for calling function search()



    function search() {
            clear();

        if (inputPlayer !== "") {
            player = inputPlayer
            //if there is input save in player variable
        }  else {
            player = $(this).attr("player");
            //then get infro from button. 

        }
        var query = "https://api.giphy.com/v1/gifs/search?q=" + player + "&api_key=dc6zaTOxFJmzC&limit=10";

        $.ajax({
            url: query,
            method: "GET"
        }).then(function (response) {
            console.log(response);

            for (var i = 0; i < response.data.length; i++) {

                var playerDiv = $("<div>");
                var rating = response.data[i].rating;
                var p = $("<div>").text("Rating: " + rating);

                var playerImage = $("<img>");
                playerImage.attr("src", response.data[i].images.fixed_height_still.url);

                //still URL
                playerImage.attr({

                    "data-still": response.data[i].images.fixed_height_still.url,
                    "data-animate": response.data[i].images.fixed_height.url,
                    "data-state": "still",
                    class: "gif"

                });

                playerDiv.append(p);
                playerDiv.append(playerImage);

                $("#playerGif").append(playerDiv);



            } // closing for loop of GIF 
            $(".gif").on("click", click); 
            //after function search is done, GIF is created with pause and animate action. that is why it has to call click function after search function.  
        });

    } //function search 


    function click() {


        console.log("GIF click");
        var state = $(this).attr("data-state");

        if (state == "still") {
            $(this).attr("src", $(this).attr("data-animate"));
            $(this).attr("data-state", "animate");
            console.log("animate");
        } else {
            $(this).attr("src", $(this).attr("data-still"));
            $(this).attr("data-state", "still");
            console.log("pause");
        }
    }


    function clear() {
        $("#playerGif").empty();
        console.log("empty");
    }







    $("#select-player").on("click", function (event) {

        event.preventDefault();
        inputplayer = $("#player-input").val().trim();

        var buttonName = $("<button>");

        buttonName.text(inputplayer);

         

        $(".button").append(buttonName); 
        // making button class with user input.
        $("button").on("click", search);
    
    });


});