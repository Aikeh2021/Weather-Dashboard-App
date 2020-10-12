console.log("hello world!")
$(document).ready(function(){

//DOM Variables
var cityArray = [];



//JS Variables



//Functions
function makeCityList(){
    $("#ul-element").empty("");
    for(var i = 0; i < cityArray.length; i++){
        console.log(cityArray[i]);
        var newLiEls = $("<li>")
        newLiEls.text(cityArray[i])
        newLiEls.addClass("list-group-item")
        $("#ul-element").append(newLiEls)
    }
}

makeCityList();

 


//Function Calls



//Event Listeners
$("#submit-btn").on("click", function(){
    console.log("You want to search for a city?");
    var cityInput = $("#city-input");
    cityArray.push(cityInput.val());
    makeCityList();


});





});