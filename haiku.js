var fs = require('fs');
var cmudictFile;

// Convert text to string 
function readCmudictFile(file) {
  return fs.readFileSync(file).toString(); 
}

var syllabelsArr = []; 
//var numberedArr = []; 
//var wordArr = [];
//var getNumInPhoneme;


// Split newlines and double whitespace 
// Create master array with all words and their respective syllable counts 
function formatData(data){    
  var lines = data.toString().split("\n");
  var numberedArr = []; 
  var wordArr;
  var getNumInPhoneme; 
  var testArr = [];
  lines.forEach(function(line, index){  
    numberedArr[index] = line.split("  ");   
    wordArr = numberedArr[index];
    //console.log(wordArr[1]); 
    getNumInPhoneme = wordArr[1].match(/\d/g);
    //console.log(getNumInPhoneme); 

    if(!getNumInPhoneme || getNumInPhoneme === undefined || getNumInPhoneme === null || wordArr[1] === undefined) {  
      testArr.push(wordArr.concat(0)); 
      //console.log(wordArr[0]); 
      //console.log(testArr);
      return testArr; 
    } 

    if(getNumInPhoneme) {
      syllabelsArr.push(wordArr.concat(getNumInPhoneme.length)); 
      //return syllabelsArr;  //console.log(syllabelsArr); 
      //console.log(syllabelsArr); 
      return syllabelsArr; 
    }
  });  
  //return syllabelsArr; 
}



// Function loops through syllabelsArr and pushes only the words with the chosen 
// number of syllabels to a new array 
function syllNums(syllabelsArr, numSylls) {
  var sortedArr = [];
  for(var i = 0; i < syllabelsArr.length; i++) {
    if(syllabelsArr[i][2] === numSylls) {
      sortedArr.push(syllabelsArr[i][0]); 
    }
  }
  return sortedArr;
}


// var fiveSyll = []; 
// var sevenSyll = []; 


// Generate Haiku with the chosen structure and text body 
function createHaiku(structure, corpus){
  var cmudictFile = readCmudictFile('./' + corpus);
  var sortedDictArray = formatData(cmudictFile); 
  var haikuResult = []; 
  // var fiveSyll = syllNums(sortedDictArray, 5);
  // var sevenSyll = syllNums(sortedDictArray, 7); 
  
  for(var i = 0; i < structure.length; i++) {
    for(var j = 0; j < structure[i].length; j++) {

      // var randomIndexFive = Math.floor(Math.random() * fiveSyll.length - 1); 
      // var randomIndexSeven = Math.floor(Math.random() * sevenSyll.length - 1); 
      
      var numSyllArray = syllNums(sortedDictArray, structure[i]); 
      var randomIndex = Math.floor(Math.random() * numSyllArray.length - 1); // get index
      haikuResult.push(numSyllArray[randomIndex]);
    }
  }
  return haikuResult; 
  
}

module.exports = {
  createHaiku: createHaiku
}; 




















