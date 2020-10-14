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
        $(".list-group-item").on("click", function(){
          console.log("Was I clicked?");
        })
    }
}

//Event Listeners
$("#submit-btn").on("click", function(){
    // console.log("You want to search for a city?");
    var cityInput = $("#city-input");
    cityArray.push(cityInput.val());
    makeCityList();
    var cityName = $("#city-input").val();
    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" +cityName+ "&units=imperial&appid=32b72b4687124665b25a8747960d4793";
    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function(response){
      $("#todays-forecast").empty();
      // console.log(response);
      var cityNameHeader = $("<h1>")
      cityNameHeader.text(response.name + " (" + moment().format('L') + ")").addClass("card-title");
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
    var cityName = $("#city-input").val();
    var queryURL2 = "https://api.openweathermap.org/data/2.5/forecast?q=" +cityName+ "&cnt=40&units=imperial&appid=32b72b4687124665b25a8747960d4793";
    $.ajax({
      url: queryURL2,
      method: "GET"
    }).then(function(response){
      console.log(response);
      $("#five-day").empty();
      var holderDiv = $("<div>").addClass("row")
      var divHeader = $("#five-day").append("<h3>5-Day-Forecast:</h3>");
      var header1 = $("<h6>").addClass("card-header").text(moment().add(1, 'days').calendar('L'));
      var temp1 = $("<p>").addClass("card-text").text("Temp: " + response.list[6].main.temp + " °F");
      var humidity1 = $("<p>").addClass("card-text").text("Humidity: " + response.list[6].main.humidity + "%");
      var newDiv1 = $("<div>").addClass("card text-white bg-primary mb-3 col-lg-2").attr("max-width:", "18 rem");
      newDiv1.append(header1, temp1, humidity1);
      holderDiv.append(newDiv1)
      $("#five-day").append(holderDiv);
      var header2 = $("<h6>").addClass("card-header").text(moment().add(2, 'days').calendar('L'));
      var temp2 = $("<p>").addClass("card-text").text("Temp: " + response.list[14].main.temp + " °F");
      var humidity2 = $("<p>").addClass("card-text").text("Humidity: " + response.list[14].main.humidity + "%");
      var newDiv2 = $("<div>").addClass("card text-white bg-primary mb-3 col-lg-2").attr("max-width:", "18 rem");
      newDiv2.append(header2, temp2, humidity2);
      holderDiv.append(newDiv2)
      $("#five-day").append(holderDiv);
      var header3 = $("<h6>").addClass("card-header").text(moment().add(3, 'days').calendar('L'));
      var temp3 = $("<p>").addClass("card-text").text("Temp: " + response.list[22].main.temp + " °F");
      var humidity3 = $("<p>").addClass("card-text").text("Humidity: " + response.list[22].main.humidity + "%");
      var newDiv3 = $("<div>").addClass("card text-white bg-primary mb-3 col-lg-2").attr("max-width:", "18 rem");
      newDiv3.append(header3, temp3, humidity3);
      holderDiv.append(newDiv3)
      $("#five-day").append(holderDiv);
      var header4 = $("<h6>").addClass("card-header").text(moment().add(4, 'days').calendar('L'));
      var temp4 = $("<p>").addClass("card-text").text("Temp: " + response.list[30].main.temp + " °F");
      var humidity4 = $("<p>").addClass("card-text").text("Humidity: " + response.list[30].main.humidity + "%");
      var newDiv4 = $("<div>").addClass("card text-white bg-primary mb-3 col-lg-2").attr("max-width:", "18 rem");
      newDiv4.append(header4, temp4, humidity4);
      holderDiv.append(newDiv4)
      $("#five-day").append(holderDiv);
      var header5 = $("<h6>").addClass("card-header").text(moment().add(5, 'days').calendar('L'));
      var temp5 = $("<p>").addClass("card-text").text("Temp: " + response.list[38].main.temp + " °F");
      var humidity5 = $("<p>").addClass("card-text").text("Humidity: " + response.list[38].main.humidity + "%");
      var newDiv5 = $("<div>").addClass("card text-white bg-primary mb-3 col-lg-2").attr("max-width:", "18 rem");
      newDiv5.append(header5, temp5, humidity5);
      holderDiv.append(newDiv5)
      $("#five-day").append(holderDiv);
      



    });


});

});
