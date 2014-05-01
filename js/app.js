$(document).ready(function(){

  var mysteryNum = numGen();
  var found = false;
  var count = 0;
  var inputChecksOut;
  var userGuess;
  var comparitor;

  newGame();

  function newGame() {
    $("#userGuess").focus();
    clearInputField();
    found = false;
    count = 0;
    displayCount(count);
    mysteryNum = numGen();
    $("#guessList").empty();
    $("#feedback").text("Make your guess!");
  }

   /*--- Generate random number between 1 and 100 ---*/
  function numGen() {
    var num = Math.random();
    return Math.floor(num *= 100);
  }

  function clearInputField() {
    $("#userGuess").val("");
  }
	
	/*--- Display information modal box ---*/
  $(".what").click(function(){
  	$(".overlay").fadeIn(1000);
	});

  /*--- Hide information modal box ---*/
  $("a.close").click(function(){
  	$(".overlay").fadeOut(1000);
  });

  /*--- Display counter ---*/

  function displayCount(number) {
    $("#count").text(number);
  }

  /*--- Check to see how close guess if to mystery number ---*/
  function checkNumber(comparitor) {
    if(comparitor >= 50) {
      $("#feedback").text("You're Ice Cold!");
    } else if (comparitor < 50 && comparitor >= 30 ) {
      $("#feedback").text("You're Cold!");
    } else if (comparitor < 30 && comparitor >= 20) {
      $("#feedback").text("You're Warm!");
    } else if (comparitor < 20 && comparitor >= 10) {
      $("#feedback").text("You're Hot!");
    } else if (comparitor < 10 && comparitor >= 1) {
      $("#feedback").text("You're Red Hot!");
    } else if (comparitor == 0) {
      $("#feedback").text("You got it!!!");
      found = true;
    }
  }

  /*--- Check input to see if it's valid ---*/
  function inputCheck(input) {
      if(isNaN(input)) {
        $("#feedback").text("Only numbers!");
        clearInputField();
        return false;
      } else {
        return true;
      }
  }

  /*--- Update guess counter and clears input after each guess --- */
  $("#guessButton").click(function(event) {
    event.preventDefault();

    if(!found) {
      userGuess = parseInt($("#userGuess").val(), 10);
      inputChecksOut = inputCheck(userGuess);
      if(inputChecksOut) {
        count++;
        displayCount(count);
        checkNumber(Math.abs(userGuess - mysteryNum));
        $(this).closest(".game").find("#guessList").append("<li>" + userGuess + "</li>");
      }
    } else {
      $("#feedback").text("You already got it!!!");
    }
	});

  $("a.new").click(function(event) {
    event.preventDefault();
    newGame();
  });
});



