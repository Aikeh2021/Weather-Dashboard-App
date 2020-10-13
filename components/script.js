// console.log("hello world!")
$(document).ready(function(){

//DOM Variables
var cityArray = [];
var cityName = $("#city-input").text();



//JS Variables



//Functions
function makeCityList(){
    $("#ul-element").empty("");
    for(var i = 0; i < cityArray.length; i++){
        // console.log(cityArray[i]);
        var newLiEls = $("<li>")
        newLiEls.text(cityArray[i])
        newLiEls.addClass("list-group-item")
        $("#ul-element").append(newLiEls)
    }
}

//Function Calls
makeCityList();


//Event Listeners
$("#submit-btn").on("click", function(){
    // console.log("You want to search for a city?");
    var cityInput = $("#city-input");
    cityArray.push(cityInput.val());
    makeCityList();
    var cityName = $("#city-input").val();
    var queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" +cityName+ "&units=imperial&appid=32b72b4687124665b25a8747960d4793";
    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function(response){
      console.log(response);
    });


});

});
