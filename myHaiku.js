var fs = require('fs');
var haikuLines = ['lineOne', 'lineTwo', 'lineThree'];
var cmuDict;
var words;
var haiku = {
	lineOne: {
		words: [],
		syllableCount: 0,
		expectedSyllable: 0
	},
	lineTwo: {
		words: [],
		syllableCount: 0,
		expectedSyllable: 0
	},
	lineThree: {
		words: [],
		syllableCount: 0,
		expectedSyllable: 0
	}
};

// Convert text to string
function readFile(file) {
	return fs.readFileSync(file).toString();
}

function createHaiku(structure, corpus) {
	for (var i = 0; i < structure.length; i++) {
		var hLine = haikuLines[i];
		haiku[hLine].expectedSyllable = structure[i];
	}
	cmuDict = readFile(corpus);
	words = formatData(cmuDict);
	completeHaiku();
	returnHaiku();
	console.log("done?");
}

function completeHaiku() {
	haikuLines.forEach(function (lines) {
		completeLines(lines);
	});
}

function completeLines(line) {
	while (haiku[line].syllableCount != haiku[line].expectedSyllable) {
		var syllableCount = haiku[line].syllableCount;
		var word = getWord();
		if (word.syllable + syllableCount <= haiku[line].expectedSyllable) {
			haiku[line].words.push(word);
			haiku[line].syllableCount += word.syllable;
		}
	}
}

function getWord() {
	var randomInt = Math.floor(Math.random() * words.length);
	var data = {};
	data.word = words[randomInt][0];
	data.syllable = words[randomInt][2];
	return data;
}

function formatData(data) {
	var lines = data.toString().split("\n");
	var numberedArr = [];
	var wordArr;
	var regex = /\d/g;
	var getNumInPhoneme;
	var syllabelsArr = [];
	lines.forEach(function (line, index) {
		wordArr = numberedArr[index] = line.split("  ");
		getNumInPhoneme = wordArr[1].match(regex);

		if (wordArr[1].match(regex)) {
			syllabelsArr.push(wordArr.concat(getNumInPhoneme.length));
		}
	});
	return syllabelsArr;
}

function returnHaiku() {
	// print
}

module.exports = {
	createHaiku: createHaiku
};