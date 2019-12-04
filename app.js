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
var list=document.getElementById('list');
var graph=document.getElementById('graph');


//global variables
var count = 0;
var mostClicked = '';
var picArray = [];
var attempts = 25;
var indexArray = [];
var clickArray=[];
var viewArray=[];

//what sections are hidden
hide(tableResults);
hide(list);
hide(graph);

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

  // while(indexArray.includes(indexOne)){
  //   console.log('inside the whileloop while it is true with indexOne');
  //   indexOne = randomIndex(picArray.length);
  // };

  // indexArray.push(indexOne);
  // get the images into the page
  picOne.src = picArray[indexOne].src;
  picOne.alt = picArray[indexOne].alt;

  // enter the names into the fig captions
  titleOne.textContent = picArray[indexOne].alt;
  titleCaptions.appendChild(titleOne);

  picArray[indexOne].viewed ++;

// generate second index, make sure it is different from the first and then show it
  var indexTwo = randomIndex(picArray.length);

  // while(indexArray.includes(indexTwo)){
  //   console.log('inside the whileloop while it is true with indexTwo');
  //   indexTwo = randomIndex(picArray.length);
  // };

  while(indexOne===indexTwo) {
    indexTwo = randomIndex(picArray.length);
  }

  // indexArray.push(indexTwo);

  picTwo.src = picArray[indexTwo].src;
  picTwo.alt = picArray[indexTwo].alt;

  // enter the names into the fig captions
  titleTwo.textContent = picArray[indexTwo].alt;
  titleCaptions.appendChild(titleTwo);

  picArray[indexTwo].viewed ++;

  //generate the third image
  var indexThree = randomIndex(picArray.length);

  // while(indexArray.includes(indexThree)){
  //   console.log('inside the whileloop while it is true with indexThree');
  //   indexThree = randomIndex(picArray.length);
  // };

  while(indexThree===indexTwo||indexThree===indexOne){
    indexThree = randomIndex(picArray.length);
  }
  indexArray.push(indexOne);
  indexArray.push(indexTwo);
  indexArray.push(indexThree);

  console.log('this is the indexArray',indexArray);

  picThree.src = picArray[indexThree].src;
  picThree.alt = picArray[indexThree].alt;

  // enter the names into the fig captions
  titleThree.textContent = picArray[indexThree].alt;
  titleCaptions.appendChild(titleThree);

  picArray[indexThree].viewed ++;

  picOne.addEventListener('click',handleClick,false);
  picTwo.addEventListener('click',handleClick,false);
  picThree.addEventListener('click',handleClick,false);
}

function handleClick(event) {
  event.preventDefault();
  // console.log('click worked');
  var vote = event.target.alt;
  //loop to check what I clicked and add a value to it
  for (var i =0; i<picArray.length; i++){
    if (vote === picArray[i].alt)
    {
      picArray[i].clicked ++;
      count ++;
      // console.log('this is what i clicked',picArray[i].alt);
    }
  }
  if (count === attempts) {
    console.log('countdown completed');
    picOne.removeEventListener('click',handleClick);
    picTwo.removeEventListener('click',handleClick);
    picThree.removeEventListener('click',handleClick);
    show(tableResults);
    show(list);
    show(graph);
    mostViewed();
    sectionComment();
    makeclickandviewarray();
    generateGraph();

    return;
  } else {
    console.log('this is the current count',count);
    generateImages();
  }

}

//generate results of the participation exercise into the footer
function sectionComment(){
  var result = document.getElementById('results');
  var countdown = document.getElementById('countdown');
  countdown.textContent = `Thank you for your participation! You clicked total ${count} times.`;
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
  generateTable(); 
  var percentage = Math.floor((picArray[indexNo].clicked/picArray[indexNo].viewed)*100);   
  mostClicked += `  You preferred this item the most ${picArray[indexNo].alt} and you clicked it ${percentage} percent of the times it was viewed. `;
  return mostClicked;
}

function generateTable() {
  for (var i = 0; i<picArray.length; i++) {
    var trEl = document.createElement('tr');
    var tdEl = document.createElement('td');
    tdEl.textContent = ` ${picArray[i].title} had ${picArray[i].clicked} votes and was shown ${picArray[i].viewed} times.`;
    trEl.appendChild(tdEl);
    tableResults.appendChild(trEl);
  }
}

function hide(elem) {
  elem.style.display = 'none';
}

function show(elem) {
  elem.style.display = 'block';
}

function makeclickandviewarray() {
  for (var k=0; k<picArray.length; k++) {
    clickArray.push(picArray[i].clicked);
    viewArray.push(picArray[i].viewed);
  }
}

function generateGraph() {
  var ctx = document.getElementById('myChart').getContext('2d');
  var myChart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
        datasets: [{
            label: '# of Votes',
            data: [12, 19, 3, 5, 2, 3],
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true
                }
            }]
        }
    }
});
}

createOnPageLoad();
generateImages();
generateGraph();

// console.log('here we go again');
// console.table(picArray);
