# BusMall 
**Purpose:** 
- To allow a user to vote for their favorite product out of three images a total of 25 times and then view their voting results in a graph.

**Required additional features:**
- Images are dynamically updated ensuring that no continuous six images are similar. 
- Local storage feature used to save the votes.

​
**Author:** Vijayeta Rangarajan
**Last Updated:** December 7, 2019
**Deployed Site:** [BusMall](https://vijayetar.github.io/BusMall/)
​
## How to Run the App
From the terminal `open index.html` from root of the project.
​
OR 
​
`live-server` from the root of the project
​
## *Comments about deployed site*

*Resolved on Dec 9th!!*

*As of Dec 7, the live-server works but the deployed site is not rendering with an error message. I am speculating that this is because the deployed site does not have any images on local storage and so when it reaches line 51, it is unable to go forward where it is trying to fulfill the condition if the parsed array from local storage has any content. Unfortunately, I do not get the similar error message with live-server and so unable to trouble shoot it.*

## Resources

**This is the link to [google fonts](https://fonts.googleapis.com/css?family=Julee&display=swap) used in the page**


**Random Number Function from MDN**
[Math.Random - MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random)
​

**Show/Hide an Element**
[gomakethings.com](https://gomakethings.com/how-to-show-and-hide-elements-with-vanilla-javascript/)
​

**Chart JS**
[Chart JS Detailed Documentaiton](https://www.chartjs.org/docs/latest/)
Collapse


**JSON stringify**
[JSON stringify function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify)

**JSON parse**
[JSON parse function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/parse)

