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

class Utilities {
	constructor() {
		this.process = new ProcessUtilities();
	}
}

module.exports = new Utilities();