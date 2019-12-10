'use strict';
//DOM variables
var picOne = document.getElementById('imgOne');
var picTwo = document.getElementById('imgTwo');
var picThree = document.getElementById('imgThree');
var titleOne = document.getElementById('figOne');
var titleTwo = document.getElementById('figTwo');
var titleThree = document.getElementById('figThree');
var titleCaptions = document.getElementById('captions');
var tableResults = document.getElementById('tableResults');
var list = document.getElementById('list');
var graph = document.getElementById('graph');
var banner = document.getElementById('banner');
var imageEl = document.getElementById('images');

//global variables
var images = 3;
var imageArray = [picOne, picTwo, picThree];
var titleArray = [titleOne, titleTwo, titleThree];
var attempts = 25;
var mostClicked = '';
var picArray = [];
var indexArray = [];
var clickArray = [];
var viewArray = [];
var nameArray = [];
var parseAllpicArray = [];

//what sections are hidden
hide(tableResults);
hide(list);
hide(graph);

//random number function from MDN
function randomIndex(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

//make a constructor function for images so that they are also saved into a global array
function Picture(src, name) {
  this.src = `./images/${src}.jpg`;
  this.title = name;
  this.alt = name;
  this.clicked = 0;
  this.viewed = 0;
  picArray.push(this);
}

// On page load - this function will upload pictures into the array, generate graph, and the first set of images
function createOnPageLoad() {
  parseAllpicArray = JSON.parse(localStorage.getItem('picSelection6'));
  if (parseAllpicArray){
    picArray = parseAllpicArray;
    // console.table('the new picArray',picArray);
  }
  else {
    new Picture('bag', 'StarWars themed carry-on');
    new Picture('banana', 'Banana Slicer');
    new Picture('bathroom', 'Ipad ToiletPaper stand');
    new Picture('boots', 'Yellow toeless gubboots');
    new Picture('breakfast', 'Toast Cofee and Egg maker');
    new Picture('bubblegum', 'Meatball Bubble Gum');
    new Picture('chair', 'Hyperbolic Red Chair');
    new Picture('cthulhu', 'green monster');
    new Picture('dog-duck', 'Duck mouthpiece for dog');
    new Picture('dragon', 'Dragon meat not for faint hearted');
    new Picture('pen', 'Blue Cutlery Pen Caps');
    new Picture('pet-sweep', 'Pet sweep');
    new Picture('scissors', 'Pizza Scissors');
    new Picture('shark', 'Shark bed');
    new Picture('sweep', 'Baby Sweep');
    new Picture('tauntaun', 'Tauntaun');
    new Picture('unicorn', 'Unicorn Meat');
    new Picture('usb', 'dragon tail usb');
    new Picture('water-can', 'A pointless watercan');
    new Picture('wine-glass', 'Wine glass to sniff and drink at the same time');
  }
  generateGraph();
  generateLoopImages();
}

function generateLoopImages() {
  for (var i = 0; i < images; i++) {
    var indexNumber = randomIndex(picArray.length);
    while (indexArray.includes(indexNumber)) {
      indexNumber = randomIndex(picArray.length);
    }
    indexArray.push(indexNumber);
    // get the images into the page
    imageArray[i].src = picArray[indexNumber].src;
    imageArray[i].alt = picArray[indexNumber].alt;
    // count viewed images
    picArray[indexNumber].viewed++;
    // enter the names into the fig captions
    titleArray[i].textContent = picArray[indexNumber].alt;
    titleCaptions.appendChild(titleArray[i]);
    imageArray[i].addEventListener('click', handleClick, false);
  }

  // to make sure that the next three images are not the same as the last three images
  if (indexArray.length === 6) {
    for (var k = 0; k < 3; k++) {
      indexArray.shift();
    }
  }
}

function handleClick(event) {
  event.preventDefault();
  // console.log('click worked');
  var vote = event.target.alt;
  //loop to check what I clicked and add a value to it
  for (var i = 0; i < picArray.length; i++) {
    if (vote === picArray[i].alt) {
      picArray[i].clicked++;
      attempts--;
      makeBanner(attempts);
    }
  }
  if (attempts === 0) {
    // console.log("countdown completed");
    for (var j = 0; j < imageArray.length; j++) {
      imageArray[j].removeEventListener('click', handleClick);
    }
    // show(tableResults);
    show(list);
    show(graph);
    hide(imageEl);
    hide(titleCaptions);
    hide(banner);
    mostViewed();
    sectionComment();
    makeclicknameandviewarray();
    makeLocalStorage();

    return;
  } else {
    generateLoopImages();
  }
}

//generate results of the participation exercise into the footer
function sectionComment() {
  var result = document.getElementById('results');
  var countdown = document.getElementById('countdown');
  countdown.textContent = 'Thank you for your participation!';
  countdown.textContent += mostClicked;
  result.appendChild(countdown);
}

function mostViewed() {
  var viewCount = 0;
  var indexNo = 0;
  for (var i = 0; i < picArray.length; i++) {
    if (viewCount < picArray[i].clicked) {
      viewCount = picArray[i].clicked;
      indexNo = i;
      mostClicked = '';
    } else {
      if (viewCount === picArray[i].clicked) {
        indexNo = i;
        mostClicked = ' There were more than one items you liked! ';
      }
    }
  }
  generateTable();
  var percentage = Math.floor(
    (picArray[indexNo].clicked / picArray[indexNo].viewed) * 100
  );
  mostClicked += `  You preferred this item the most ${picArray[indexNo].alt} and you clicked it ${percentage} percent of the times it was viewed. `;
  return mostClicked;
}

function generateTable() {
  for (var i = 0; i < picArray.length; i++) {
    var trEl = document.createElement('tr');
    var tdEl = document.createElement('td');
    tdEl.textContent = ` ${picArray[i].title} had ${picArray[i].clicked} votes and was shown ${picArray[i].viewed} times.`;
    trEl.appendChild(tdEl);
    tableResults.appendChild(trEl);
  }
}
// functions to show and hide the various sections
function hide(elem) {
  elem.style.display = 'none';
}

function show(elem) {
  elem.style.display = 'block';
}

function makeBanner(number) {
  var h3El = document.getElementById('bannerhead');
  h3El.textContent = `You have ${number} clicks remaining`;
  banner.appendChild(h3El);
}

function makeclicknameandviewarray() {
  for (var k = 0; k < picArray.length; k++) {
    clickArray.push(picArray[k].clicked);
    viewArray.push(picArray[k].viewed);
    nameArray.push(picArray[k].title);
  }
}

function generateGraph() {
  var ctx = document.getElementById('myChart').getContext('2d');
  var myChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: nameArray,
      datasets: [
        {
          label: '# Clicked',
          data: clickArray,
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(255, 99, 132, 0.2)',
            'rgba(255, 99, 132, 0.2)',
            'rgba(255, 99, 132, 0.2)',
            'rgba(255, 99, 132, 0.2)',
            'rgba(255, 99, 132, 0.2)',
            'rgba(255, 99, 132, 0.2)',
            'rgba(255, 99, 132, 0.2)',
            'rgba(255, 99, 132, 0.2)',
            'rgba(255, 99, 132, 0.2)',
            'rgba(255, 99, 132, 0.2)',
            'rgba(255, 99, 132, 0.2)',
            'rgba(255, 99, 132, 0.2)',
            'rgba(255, 99, 132, 0.2)',
            'rgba(255, 99, 132, 0.2)',
            'rgba(255, 99, 132, 0.2)',
            'rgba(255, 99, 132, 0.2)',
            'rgba(255, 99, 132, 0.2)',
            'rgba(255, 99, 132, 0.2)',
            'rgba(255, 99, 132, 0.2)',
            'rgba(255, 99, 132, 0.2)',
            'rgba(255, 99, 132, 0.2)',
            'rgba(255, 99, 132, 0.2)',
            'rgba(255, 99, 132, 0.2)',
            'rgba(255, 99, 132, 0.2)'
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(255, 99, 132, 1)',
            'rgba(255, 99, 132, 1)',
            'rgba(255, 99, 132, 1)',
            'rgba(255, 99, 132, 1)',
            'rgba(255, 99, 132, 1)',
            'rgba(255, 99, 132, 1)',
            'rgba(255, 99, 132, 1)',
            'rgba(255, 99, 132, 1)',
            'rgba(255, 99, 132, 1)',
            'rgba(255, 99, 132, 1)',
            'rgba(255, 99, 132, 1)',
            'rgba(255, 99, 132, 1)',
            'rgba(255, 99, 132, 1)',
            'rgba(255, 99, 132, 1)',
            'rgba(255, 99, 132, 1)',
            'rgba(255, 99, 132, 1)',
            'rgba(255, 99, 132, 1)',
            'rgba(255, 99, 132, 1)',
            'rgba(255, 99, 132, 1)',
            'rgba(255, 99, 132, 1)',
            'rgba(255, 99, 132, 1)',
            'rgba(255, 99, 132, 1)',
            'rgba(255, 99, 132, 1)',
            'rgba(255, 99, 132, 1)'
          ],
          borderWidth: 2
        },
        {
          label: '# Viewed',
          data: viewArray,
          backgroundColor: [
            'rgba(0,0,0,0.2)',
            'rgba(0,0,0,0.2)',
            'rgba(0,0,0,0.2)',
            'rgba(0,0,0,0.2)',
            'rgba(0,0,0,0.2)',
            'rgba(0,0,0,0.2)',
            'rgba(0,0,0,0.2)',
            'rgba(0,0,0,0.2)',
            'rgba(0,0,0,0.2)',
            'rgba(0,0,0,0.2)',
            'rgba(0,0,0,0.2)',
            'rgba(0,0,0,0.2)',
            'rgba(0,0,0,0.2)',
            'rgba(0,0,0,0.2)',
            'rgba(0,0,0,0.2)',
            'rgba(0,0,0,0.2)',
            'rgba(0,0,0,0.2)',
            'rgba(0,0,0,0.2)',
            'rgba(0,0,0,0.2)',
            'rgba(0,0,0,0.2)',
            'rgba(0,0,0,0.2)',
            'rgba(0,0,0,0.2)',
            'rgba(0,0,0,0.2)',
            'rgba(0,0,0,0.2)',
            'rgba(0,0,0,0.2)'
          ],
          borderColor: [
            'rgba(0,0,0,0.2)',
            'rgba(0,0,0,0.2)',
            'rgba(0,0,0,0.2)',
            'rgba(0,0,0,0.2)',
            'rgba(0,0,0,0.2)',
            'rgba(0,0,0,0.2)',
            'rgba(0,0,0,0.2)',
            'rgba(0,0,0,0.2)',
            'rgba(0,0,0,0.2)',
            'rgba(0,0,0,0.2)',
            'rgba(0,0,0,0.2)',
            'rgba(0,0,0,0.2)',
            'rgba(0,0,0,0.2)',
            'rgba(0,0,0,0.2)',
            'rgba(0,0,0,0.2)',
            'rgba(0,0,0,0.2)',
            'rgba(0,0,0,0.2)',
            'rgba(0,0,0,0.2)',
            'rgba(0,0,0,0.2)',
            'rgba(0,0,0,0.2)',
            'rgba(0,0,0,0.2)',
            'rgba(0,0,0,0.2)',
            'rgba(0,0,0,0.2)',
            'rgba(0,0,0,0.2)',
            'rgba(0,0,0,0.2)'
          ],
          borderWidth: 2
        }
      ]
    },
    options: {
      scales: {
        yAxes: [
          {
            ticks: {
              beginAtZero: true
            }
          }
        ]
      }
    }
  });
}

// function to make and retrieve local Storage
function makeLocalStorage() {
  var stringAllpicArray = JSON.stringify(picArray);
  localStorage.setItem('picSelection6', stringAllpicArray);
}

createOnPageLoad();
