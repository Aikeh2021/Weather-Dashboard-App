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
        $("#ul-element").prepend(newLiEls)
    }
}

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
      $("#todays-forecast").empty();
      console.log(response);
      var cityNameHeader = $("<h1>")
      cityNameHeader.text(response.name).addClass("card-title");
      var todayTemp = $("<p>").text("Temperature: " + response.main.temp + "°F");
      var todayHumidity = $("<p>").text("Humidity: " + response.main.humidity + "%");
      var todayWindSpeed = $("<p>").text("Wind Speed: " + response.wind.speed + "MPH")
      var todayUVIndex = $("<p>").text(response.main.temp)
      var card = $("<div>").addClass("card")
      var cardBody = $("<div>").addClass("card-body")
      cardBody.append(cityNameHeader, todayTemp, todayHumidity, todayWindSpeed, todayUVIndex);
      card.append(cardBody);
      $("#todays-forecast").append(card);

      
      
    });


});

});
