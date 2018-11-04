const GlobalConfigFile = require("./config/global");
const PrivateConfigFile = require("./config/private");
const PanelClient = require("./net/panel/client");
const Database = require("@ijo-sm/helper-database");
const NodeManager = require("./node/manager");
const PluginManager = require("./plugin/manager");
const UtilsManager = require("@ijo-sm/utils");

module.exports = class Application {
	constructor() {
		this.utils = new UtilsManager();
		
		this.utils.use("process", require("@ijo-sm/utils-process"));
		this.utils.use("path", require("@ijo-sm/utils-path"));

		this.globalConfig = new GlobalConfigFile();
		this.privateConfig = new PrivateConfigFile();
		this.panelClient = new PanelClient();
		this.plugins = new PluginManager();
		this.db = new Database(this.utils.path.resolve("../data/machine.json"));
		this.nodes = new NodeManager();
	}

	async start() {
		await this.nodes.initialize();
		await this.db.load();
		await this.plugins.load();
		await this.nodes.load();
		await this.globalConfig.load();
		await this.privateConfig.load();
		await this.panelClient.connect();
	}

	async stop() {
		await this.nodes.save();
		await this.globalConfig.save();
		await this.privateConfig.save();
		await this.panelClient.disconnect();
	}
}