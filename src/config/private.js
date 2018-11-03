const Path = require("path");
const ConfigFile = require("@ijo-sm/helper-config");

module.exports = class PrivateConfigFile extends ConfigFile {
	constructor() {
		let defaultPrivateConfigPath = Path.resolve(__dirname, "../../res/defaults/privateConfig.json");
		let destPrivateConfigPath = Path.resolve(__dirname, "../../../data/machineVariables.json");

		super(defaultPrivateConfigPath, destPrivateConfigPath);
	}
}