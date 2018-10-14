const GlobalConfigFile = require("./config/global");
const PanelClient = require("./net/panel/client");

module.exports = class Application {
	constructor() {
		this.globalConfig = new GlobalConfigFile();
		this.panelClient = new PanelClient();
	}

	async start() {
		await this.globalConfig.load();
		await this.panelClient.connect();
	}

	async stop() {
		await this.panelClient.disconnect();
	}
}