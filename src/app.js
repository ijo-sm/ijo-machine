const GlobalConfigFile = require("./config/global");
const PrivateConfigFile = require("./config/private");
const PanelClient = require("./net/panel/client");
const Database = require("./db/database");
const NodeListManager = require("./node/manager");

module.exports = class Application {
	constructor() {
		this.globalConfig = new GlobalConfigFile();
		this.privateConfig = new PrivateConfigFile();
		this.panelClient = new PanelClient();
		this.db = new Database();
		this.nodeLists = new NodeListManager();
	}

	async start() {
		await this.db.load();
		await this.nodeLists.initialize();
		await this.globalConfig.load();
		await this.privateConfig.load();
		await this.panelClient.connect();
	}

	async stop() {
		await this.globalConfig.save();
		await this.privateConfig.save();
		await this.panelClient.disconnect();
	}
}