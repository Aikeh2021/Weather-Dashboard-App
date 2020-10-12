console.log("hello world!")
$(document).ready(function(){

//DOM Variables
var cityArray = ["Atlanta", "Dallas", "Vegas"];



//JS Variables



//Functions
function makeCityList(){
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
});




});