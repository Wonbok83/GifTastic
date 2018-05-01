$(document).ready(function () { 

    //get the variables
    var inputAnimal = "";
    var animal = "";


    $("button").on("click", search)
    //listener for calling function search()



    function search() {
            clear();

        if (inputAnimal !== "") {
            animal = inputAnimal
            //if there is input save in animal variable
        } else {
            animal = $(this).attr("player");
            //then get infro from button. 

        }
        var query = "https://api.giphy.com/v1/gifs/search?q=" + animal + "&api_key=dc6zaTOxFJmzC&limit=10";

        $.ajax({
            url: query,
            method: "GET"
        }).then(function (response) {
            console.log(response);

            for (var i = 0; i < response.data.length; i++) {

                var animalDiv = $("<div>");
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

                animalDiv.append(p);
                animalDiv.append(animalImage);

                $("#animalGif").append(animalDiv);



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
        $("#animalGif").empty();
        console.log("empty");
    }







    $("#select-animal").on("click", function (event) {

        event.preventDefault();
        inputAnimal = $("#animal-input").val().trim();

        var buttonName = $("<button>");

        buttonName.text(inputAnimal);

         

        $(".button").append(buttonName); 
        // making button class with user input.
        $("button").on("click", search);
    
    });


});