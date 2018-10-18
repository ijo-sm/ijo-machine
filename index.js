process.stdin.resume();
global.Utils = require("./src/utils/utils");
global.app = new (require("./src/app"))();
app.start()
.then(() => {
	console.log("IJO Machine has started.");
});

Utils.process.onExit(end => {
    app.stop()
    .then(() => {
        end();
    });
});