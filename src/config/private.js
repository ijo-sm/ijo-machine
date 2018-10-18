const Path = require("path");
const AbstractConfigFile = require("./abstract");

module.exports = class PrivateConfigFile extends AbstractConfigFile {
	constructor() {
		let defaultPrivateConfigPath = Path.resolve(__dirname, "../../res/defaults/privateConfig.json");
		let destPrivateConfigPath = Path.resolve(__dirname, "../../../data/machine.json");

		super(defaultPrivateConfigPath, destPrivateConfigPath);
	}
}