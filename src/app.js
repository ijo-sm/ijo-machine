const globalConfig = include("src/config/global");
const privateConfig = include("src/config/private");
const panelClient = include("src/net/panel/client");
const nodeManager = include("src/node/manager");
const pluginManager = include("src/plugin/manager");
const database = include("src/database/database");

module.exports = class Application {
	async start() {
		await nodeManager.initialize();
		await database.load();
		await pluginManager.load();
		await nodeManager.load();
		await globalConfig.load();
		await privateConfig.load();
		await panelClient.connect();
		await pluginManager.enable();
	}

	async stop() {
		await pluginManager.disable();
		await nodeManager.save();
		await globalConfig.save();
		await privateConfig.save();
		await panelClient.disconnect();
		await pluginManager.unload();
	}
}