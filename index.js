process.stdin.resume();

global.include = require("@ijo-sm/helper-include");
const Utils = include("@ijo-sm/utils");

let ijo = new (include("src/app"))();
ijo.start()
.then(() => {
	console.log("IJO Machine has started.");
});

Utils.process.onExit(end => {
    ijo.stop()
    .then(() => {
        end();
    });
});