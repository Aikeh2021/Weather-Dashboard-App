$(document).ready(function(){
//DOM Variables
var cityArray = [];
citySearch();

//Function making the sidenav list of cities on the left of the HTML page
  function makeCityList(city){
    var newLiEls = $("<li>");
    newLiEls.text(city);
    newLiEls.addClass("list-group-item");
    $("#ul-element").append(newLiEls)
    //Adding event listeners to each of the list items so we can bring up a city's info if the list item with the city's name gets clicked
    // newLiEls.on("click", function(){
    //   console.log(newLiEls.text());
    //   cityInput = newLiEls.text();
    //   cityArray.push(cityInput);
    //   citySearch();
    // });
  }

//Event Listeners calling the function to search a city in the openweather API
$("#submit-btn").on("click", citySearch);
function citySearch(){
  var cityInput = $("#city-input").val();
  //If there is text in the city input, continue with the city search function and contacting the openweather API
  if(!localStorage.getItem("cityList")){
    return;
  }
  else if(cityInput){
    cityArray.push(cityInput);
  //If there is not text in the city input, go to local storage and get a city to use to contact the openweather API
  }
  // else if(event.target.matches("ul")){
  //   console.log("I was clicked");
  // }
  else{
    var oldCities = JSON.parse(localStorage.getItem("cityList"));
    cityArray = oldCities;
    cityInput = oldCities[oldCities.length-1];
  }
  $("#ul-element").empty("");
  var storedCities = JSON.stringify(cityArray);
  localStorage.setItem("cityList", storedCities);
  cityArray.forEach(makeCityList);
  var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" +cityInput+ "&units=imperial&appid=32b72b4687124665b25a8747960d4793";
  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function(response){
    //Making the forecast div for today
    $("#todays-forecast").empty();
    var cityNameHeader = $("<h1>")
    var weatherIcons = response.weather[0].icon;
    weatherIconsURL = "https://openweathermap.org/img/wn/" + weatherIcons + ".png"
    var weatherImage = $("<img>").attr("src", weatherIconsURL).attr("alt", "weather icon");
    cityNameHeader.text(response.name + " (" + moment().format('L') + ")").addClass("card-title");
    cityNameHeader.append(weatherImage);
    var todayTemp = $("<p>").text("Temperature: " + response.main.temp + "°F");
    var todayHumidity = $("<p>").text("Humidity: " + response.main.humidity + "%");
    var todayWindSpeed = $("<p>").text("Wind Speed: " + response.wind.speed + "MPH")
    var card = $("<div>").addClass("card")
    var cardBody = $("<div>").addClass("card-body")
    cardBody.append(cityNameHeader, todayTemp, todayHumidity, todayWindSpeed);
    card.append(cardBody);
    $("#todays-forecast").append(card);
    //Getting the UV Index for today's forecast
    var responseLat = "" + response.coord.lat;
    var responseLon = "" + response.coord.lon;
    var queryURL2 = "https://api.openweathermap.org/data/2.5/uvi?lat=" + responseLat+ "&lon=" + responseLon + "&appid=32b72b4687124665b25a8747960d4793";
    $.ajax({
      url: queryURL2,
      method: "GET"
    }).then(function(response){
      var todayUVIndex = $("<p>").text("UV Index: " + response.value)
      //If/Else statement to make the UV Index change color depending on what the UV scale says
      if(response.value<3){todayUVIndex.removeClass("btn btn-warning", "btn btn-danger").addClass("btn btn-success");}
        else if(3<response.value && response.value<6){todayUVIndex.removeClass("btn btn-success", "btn btn-danger").addClass("btn btn-warning");}
        else if(6<response.value && response.value<20){todayUVIndex.removeClass("btn btn-success", "btn btn-warning").addClass("btn btn-danger");}
      cardBody.append(todayUVIndex);
    })
  });
  //5 day forecast cards
  var queryURL3 = "https://api.openweathermap.org/data/2.5/forecast?q=" +cityInput+ "&cnt=40&units=imperial&appid=32b72b4687124665b25a8747960d4793";
  $.ajax({
    url: queryURL3,
    method: "GET"
  }).then(function(response){
    // console.log(response);
    $("#five-day").empty();
    //Day 1's card
    var holderDiv = $("<div>").addClass("row")
    var divHeader = $("#five-day").append("<h3>5-Day-Forecast:</h3>");
    var header1 = $("<h6>").addClass("card-header").text(moment().add(1, 'days').calendar('L'));
    var temp1 = $("<p>").addClass("card-text").text("Temp: " + response.list[6].main.temp + " °F");
    var weatherIcons1 = response.list[6].weather[0].icon;
    weatherIconsURL = "https://openweathermap.org/img/wn/" + weatherIcons1 + ".png"
    var weatherImage1 = $("<img>").attr("src", weatherIconsURL).attr("alt", "weather icon");
    var weatherImageDiv1 = $("<div>").append(weatherImage1);
    var humidity1 = $("<p>").addClass("card-text").text("Humidity: " + response.list[6].main.humidity + "%");
    var newDiv1 = $("<div>").addClass("card text-white bg-primary mb-3 col-lg-2").attr("max-width", "18rem");
    var spanEl = $("<span>");
    newDiv1.append(header1, weatherImageDiv1, temp1, humidity1);
    holderDiv.append(newDiv1)
    $("#five-day").append(holderDiv);
    //Day 2's card
    var header2 = $("<h6>").addClass("card-header").text(moment().add(2, 'days').calendar('L'));
    var temp2 = $("<p>").addClass("card-text").text("Temp: " + response.list[14].main.temp + " °F");
    var weatherIcons2 = response.list[14].weather[0].icon;
    weatherIconsURL = "https://openweathermap.org/img/wn/" + weatherIcons2 + ".png"
    var weatherImage2 = $("<img>").attr("src", weatherIconsURL).attr("alt", "weather icon");
    var weatherImageDiv2 = $("<div>").append(weatherImage2);
    var humidity2 = $("<p>").addClass("card-text").text("Humidity: " + response.list[14].main.humidity + "%");
    var newDiv2 = $("<div>").addClass("card text-white bg-primary mb-3 col-lg-2").attr("max-width", "18rem");
    newDiv2.append(header2, weatherImageDiv2, temp2, humidity2);
    holderDiv.append(newDiv2)
    $("#five-day").append(holderDiv);
    //Day 3's card
    var header3 = $("<h6>").addClass("card-header").text(moment().add(3, 'days').calendar('L'));
    var temp3 = $("<p>").addClass("card-text").text("Temp: " + response.list[22].main.temp + " °F");
    var weatherIcons3 = response.list[22].weather[0].icon;
    weatherIconsURL = "https://openweathermap.org/img/wn/" + weatherIcons3 + ".png"
    var weatherImage3 = $("<img>").attr("src", weatherIconsURL).attr("alt", "weather icon");
    var weatherImageDiv3 = $("<div>").append(weatherImage3);
    var humidity3 = $("<p>").addClass("card-text").text("Humidity: " + response.list[22].main.humidity + "%");
    var newDiv3 = $("<div>").addClass("card text-white bg-primary mb-3 col-lg-2").attr("max-width", "18rem");
    newDiv3.append(header3, weatherImageDiv3, temp3, humidity3);
    holderDiv.append(newDiv3)
    $("#five-day").append(holderDiv);
    //Day 4's card
    var header4 = $("<h6>").addClass("card-header").text(moment().add(4, 'days').calendar('L'));
    var temp4 = $("<p>").addClass("card-text").text("Temp: " + response.list[30].main.temp + " °F");
    var weatherIcons4 = response.list[30].weather[0].icon;
    weatherIconsURL = "https://openweathermap.org/img/wn/" + weatherIcons4 + ".png"
    var weatherImage4 = $("<img>").attr("src", weatherIconsURL).attr("alt", "weather icon");
    var weatherImageDiv4 = $("<div>").append(weatherImage4);
    var humidity4 = $("<p>").addClass("card-text").text("Humidity: " + response.list[30].main.humidity + "%");
    var newDiv4 = $("<div>").addClass("card text-white bg-primary mb-3 col-lg-2").attr("max-width", "18rem");
    newDiv4.append(header4, weatherImageDiv4, temp4, humidity4);
    holderDiv.append(newDiv4)
    $("#five-day").append(holderDiv);
    //Day 5's card
    var header5 = $("<h6>").addClass("card-header").text(moment().add(5, 'days').calendar('L'));
    var temp5 = $("<p>").addClass("card-text").text("Temp: " + response.list[38].main.temp + " °F");
    var weatherIcons5 = response.list[38].weather[0].icon;
    weatherIconsURL = "https://openweathermap.org/img/wn/" + weatherIcons5 + ".png"
    var weatherImage5 = $("<img>").attr("src", weatherIconsURL).attr("alt", "weather icon");
    var weatherImageDiv5 = $("<div>").append(weatherImage5);
    var humidity5 = $("<p>").addClass("card-text").text("Humidity: " + response.list[38].main.humidity + "%");
    var newDiv5 = $("<div>").addClass("card text-white bg-primary mb-3 col-lg-2").attr("max-width", "18 rem");
    newDiv5.append(header5, weatherImageDiv5, temp5, humidity5);
    holderDiv.append(newDiv5)
    $("#five-day").append(holderDiv);
    $("#city-input").val("");
  });

};

});
