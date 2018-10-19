const GlobalConfigFile = require("./config/global");
const PrivateConfigFile = require("./config/private");
const PanelClient = require("./net/panel/client");

module.exports = class Application {
	constructor() {
		this.globalConfig = new GlobalConfigFile();
		this.privateConfig = new PrivateConfigFile();
		this.panelClient = new PanelClient();
	}

	async start() {
		await this.globalConfig.load();
		await this.privateConfig.load();
		await this.panelClient.connect();
	}

	async stop() {
		await this.panelClient.disconnect();
	}
}