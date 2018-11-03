const GlobalConfigFile = require("./config/global");
const PrivateConfigFile = require("./config/private");
const PanelClient = require("./net/panel/client");
const Database = require("@ijo-sm/helper-database");
const NodeListManager = require("./node/manager");
const UtilsManager = require("@ijo-sm/utils");

module.exports = class Application {
	constructor() {
		this.utils = new UtilsManager();
		
		this.utils.use("process", require("@ijo-sm/utils-process"));
		this.utils.use("path", require("@ijo-sm/utils-path"));

		this.globalConfig = new GlobalConfigFile();
		this.privateConfig = new PrivateConfigFile();
		this.panelClient = new PanelClient();
		this.db = new Database(this.utils.path.resolve("../data/panel.json"));
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