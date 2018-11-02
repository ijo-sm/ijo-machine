const NodeList = require("./model");

module.exports = class NodeManager {
	async initialize() {
		await app.db.create("nodelists");
	}
}