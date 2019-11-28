'use strict';
//global variables
var picArray = [];
var picOne = document.getElementById('imgOne');
var picTwo = document.getElementById('imgTwo');
var picThree = document.getElementById('imgThree');

//random number function from MDN
function randomIndex(max) {
  return Math.floor(Math.random()*Math.floor(max));
}

//make a constructor function for images so that they are also saved into a global array
function Picture(src,name) {
  this.src = `../images/${src}.jpg`;
  this.title = name;
  this.alt = name;
  this.clicked = 0;
  this.viewed = 0;
  picArray.push(this);
}

// function to upload pictures into the array
function createOnPageLoad() {
  new Picture('bag','StarWars themed carry-on');
  new Picture('banana','Banana Slicer');
  new Picture('bathroom','Ipad ToiletPaper stand');
  new Picture('boots','Yellow toeless gubboots');
  new Picture('breakfast','Toast Cofee and Egg maker');
  new Picture('bubblegum', 'Meatball Bubble Gum');
  new Picture('chair','Hyperbolic Red Chair');
  new Picture('cthulhu','Not sure what this is');
  new Picture('dog-duck', 'Duck mouthpiece for dog');
  new Picture('dragon', 'Dragon meat not for faint hearted');
  new Picture('pen','Blue Cutlery Pen Caps');
  new Picture('pet-sweep','Pet sweep');
  new Picture('scissors','Pizza Scissors');
  new Picture('shark','Shark bed');
  new Picture('sweep','Baby Sweep');
  new Picture('tauntaun','Tauntaun');
  new Picture('unicorn','Unicorn Meat');
  new Picture('usb','dragon tail usb');
  new Picture('water-can','A pointless watercan');
  new Picture('wine-glass','Wine glass to sniff and drink at the same time');
}
// // generate the images into the page

function generateImages() {
  // generate the first image
  var indexOne = randomIndex(picArray.length);
  console.log('index one',indexOne);

  picOne.src = picArray[indexOne].src;

  picArray[indexOne].viewed ++;

  console.log('this is the 1st viewed count',picArray[indexOne].viewed);
// generate second index, make sure it is different from the first and then show it
  var indexTwo = randomIndex(picArray.length);
  
  while(indexOne===indexTwo) {
    indexTwo = randomIndex(picArray.length);
  }
  console.log('index two', indexTwo);

  picTwo.src = picArray[indexTwo].src;
  picArray[indexTwo].viewed ++;

  console.log('this is the 2nd viewed count',picArray[indexTwo].viewed);

  //generate the third image
  var indexThree = randomIndex(picArray.length);

  while(indexThree===indexTwo||indexThree===indexOne){
    indexThree = randomIndex(picArray.length);
  }
  console.log('index three', indexThree);

  picThree.src = picArray[indexThree].src;
  picArray[indexThree].viewed ++;
  
  console.log('this is the 3rd viewed count',picArray[indexThree].viewed);
  console.table(picArray);

}

// fucntion handleClick (){
//   var vote = event.target.title;
//   // var clickVote = event.target.index
//   // var globalPickedArray = e
//   for (var i =0; i<picArray.length; i++){
//   if (vote === picArray[i].title)
//   {
//     picArray[i].clicked++
//   }
//   }
//   generateImages();
// }
createOnPageLoad();
generateImages();
// console.table(picArray);
