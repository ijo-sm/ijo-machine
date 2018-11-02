const Path = require("path");

class ProcessUtilities {
	onExit(callback) {
		process.on('message', message => {
			if(typeof message !== "object" || message.message !== "kill") {
				return;
			}

			callback(() => {
				process.exit(123);
			});
		});

		process.on("SIGINT", () => {});
	}
}

class PathUtilities {
	resolve(path) {
		return Path.resolve(__dirname, "../../", path);
	}
}

class Utilities {
	constructor() {
		this.process = new ProcessUtilities();
		this.path = new PathUtilities();
	}
}

module.exports = new Utilities();