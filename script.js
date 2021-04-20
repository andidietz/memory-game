const gameContainer = document.getElementById("game");


const COLORS = [
  "red",
  "blue",
  "green",
  "orange",
  "purple",
  "red",
  "blue",
  "green",
  "orange",
  "purple"
];

let flippedCardArray = [];


// here is a helper function to shuffle an array
// it returns the same array with values shuffled
// it is based on an algorithm called Fisher Yates if you want ot research more
function shuffle(array) {
  let counter = array.length;

  // While there are elements in the array
  while (counter > 0) {
    // Pick a random index
    let index = Math.floor(Math.random() * counter);

    // Decrease counter by 1
    counter--;

    // And swap the last element with it
    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }

  return array;
}

let shuffledColors = shuffle(COLORS);

// this function loops over the array of colors
// it creates a new div and gives it a class with the value of the color
// it also adds an event listener for a click for each card
function createDivsForColors(colorArray) {
  for (let color of colorArray) {
    // create a new div
    const newDiv = document.createElement("div");

    // give it a class attribute for the value we are looping over
    newDiv.classList.add(color);
    newDiv.dataset.matched = false;

    // call a function handleCardClick when a div is clicked on
    newDiv.addEventListener("click", handleCardClick);

    // append the div to the element with an id of game
    gameContainer.append(newDiv);
  }
}

// TODO: Implement this function!
function handleCardClick(event) {
  // Making sure only two cards can be "flipped" (display color changed) in one turn
  if(flippedCardArray.length < 2){

    // Push card into the flipped card array
    flippedCardArray.push(event.target)
    
    // Set Background Color to TagName
    let color = event.target.className
    event.target.style.backgroundColor = color
    }
    

  // If the same card is clicked twice, pop the second instance of the card from the array, returning the array back to holding only one instance of the card
  if(flippedCardArray.length === 2){
    if(flippedCardArray[0] === event.target){
      flippedCardArray.pop()
    }
  }


  // If two different cards have been flipped, run this function
  if (flippedCardArray.length > 1){      

      // Check if both flipped card are same color
      if(flippedCardArray[0].className !== flippedCardArray[1].className){

        // If the two flipped cards are not same
        const unmatched = document.querySelectorAll('div [data-matched="false"]')
        setTimeout(function(){
          for(let card of unmatched){
            card.style.backgroundColor = "white";
            flippedCardArray = []
          }
        }, 1000) 
      // If the two flipped cards are same
      } else {
        flippedCardArray[0].dataset.matched = true;
        flippedCardArray[1].dataset.matched = true;
        flippedCardArray = []
      }

  }
}

// when the DOM loads
createDivsForColors(shuffledColors);
