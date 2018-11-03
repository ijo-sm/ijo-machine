process.stdin.resume();

global.ijo = new (require("./src/app"))();

ijo.start()
.then(() => {
	console.log("IJO Machine has started.");
});

ijo.utils.process.onExit(end => {
    ijo.stop()
    .then(() => {
        end();
    });
});