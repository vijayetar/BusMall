'use strict';
//global variables
var picArray = [];
var picOne = document.getElementById('imgOne');
var picTwo = document.getElementById('imgTwo');
var picThree = document.getElementById('imgThree');
var titleOne = document.getElementById('figOne');
var titleTwo = document.getElementById('figTwo');
var titleThree = document.getElementById('figThree');
var titleCaptions = document.getElementById('captions');
var count = 0;
var mostClicked = '';

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
  picOne.alt = picArray[indexOne].alt;
  titleOne.textContent = picArray[indexOne].alt;
  titleCaptions.appendChild(titleOne);

  picArray[indexOne].viewed ++;

//  // console.log('this is the 1st viewed count',picArray[indexOne].viewed);

// generate second index, make sure it is different from the first and then show it
  var indexTwo = randomIndex(picArray.length);
  
  while(indexOne===indexTwo) {
    indexTwo = randomIndex(picArray.length);
  }
  console.log('index two', indexTwo);

  picTwo.src = picArray[indexTwo].src;
  picTwo.alt = picArray[indexTwo].alt;
  titleTwo.textContent = picArray[indexTwo].alt;
  titleCaptions.appendChild(titleTwo);

  picArray[indexTwo].viewed ++;

  // console.log('this is the 2nd viewed count',picArray[indexTwo].viewed);

  //generate the third image
  var indexThree = randomIndex(picArray.length);

  while(indexThree===indexTwo||indexThree===indexOne){
    indexThree = randomIndex(picArray.length);
  }
  console.log('index three', indexThree);

  picThree.src = picArray[indexThree].src;
  picThree.alt = picArray[indexThree].alt;
  titleThree.textContent = picArray[indexThree].alt;
  titleCaptions.appendChild(titleThree);

  picArray[indexThree].viewed ++;

  picOne.addEventListener('click',handleClick,false);
  picTwo.addEventListener('click',handleClick,false);
  picThree.addEventListener('click',handleClick,false);
}



function handleClick(event) {
  event.preventDefault();
  console.log('click worked');
  var vote = event.target.alt;
  console.log('this is the vote', vote);
  //loop to check what I clicked and add a value to it
  for (var i =0; i<picArray.length; i++){
    if (vote === picArray[i].alt)
    {
      picArray[i].clicked ++;
      count ++;
      console.log('this is what i clicked',picArray[i].alt);
    }
  }
  if (count === 25) {
    console.log('countdown completed');
    picOne.removeEventListener('click',handleClick);
    picTwo.removeEventListener('click',handleClick);
    picThree.removeEventListener('click',handleClick);
    mostViewed();
    endTest();
    return;
  } else {
    console.log('this is the current count',count);
    generateImages();
  }

}

function endTest(){
  event.preventDefault();
  var result = document.getElementById('results');
  var countdown = document.getElementById('countdown');
  countdown.textContent = `You clicked total ${count} times. Thank you for your participation!`;
  countdown.textContent += mostClicked;
  result.appendChild(countdown);
  console.table(picArray);

}

function mostViewed() {
  var viewCount = 0;
  var indexNo = 0;
  for (var i = 0; i<picArray.length; i++) {
    if (viewCount< picArray[i].clicked) {
      viewCount = picArray[i].clicked;
      indexNo = i;
      mostClicked = '';
    } 
    else {
      if (viewCount === picArray[i].clicked) {
        indexNo = i;
        mostClicked = ' There were more than one items you liked! '
      }         
    }
  }    
  mostClicked += `  This is the item most preferred by you ${picArray[indexNo].alt}`;
  return mostClicked;
}

createOnPageLoad();
generateImages();

// console.log('here we go again');
// console.table(picArray);
