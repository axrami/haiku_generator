var haiku = require("./myHaiku");
var args = getArgs();
var structure = args.slice(0,3);
var corpus = args[3];

function getArgs() {
	var args = [];
	process.argv.forEach(function (val) {
		args.push(val);
	});
	args.splice(0, 2);
	return args;
}

haiku.createHaiku(structure, corpus);
// node haiku_generator.js [[5],[7],[5]] cmudict.txt;