const ConfigFile = include("@ijo-sm/helper-config");
const Utils = include("@ijo-sm/utils");

class PrivateConfigFile extends ConfigFile {
	constructor() {
		let defaultPrivateConfigPath = Utils.path.resolve("res/defaults/privateConfig.json");
		let destPrivateConfigPath = Utils.path.resolve("../data/machineVariables.json");

		super(defaultPrivateConfigPath, destPrivateConfigPath);
	}
}

module.exports = new PrivateConfigFile();